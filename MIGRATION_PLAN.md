# MEDIL — Migration plan: static SPA → cloud-backed (Supabase)

Goal: keep the static, no-build frontend, but move auth, user data, admin content, and the forum to Supabase so every user has their own cross-device saves/streaks and admins edit live.

Provider choice: **Supabase** (Postgres + Auth + RLS + Realtime + Storage). It supports Google and GitHub OAuth, Row-Level Security, and a JS SDK loadable from a CDN (no bundler), which preserves the current "no build step" workflow.

---

## Phase 0 — Project & auth provider setup (manual, ~1 day)

1. Create a Supabase project. Note `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
2. Auth → Providers:
   - **Email**: enable. Disable "Confirm email" for dev; re-enable for prod.
   - **Google**: create OAuth client in Google Cloud Console, paste client id/secret into Supabase, add redirect `https://<project>.supabase.co/auth/v1/callback` and your site origin.
   - **GitHub**: create an OAuth App in GitHub (Settings → Developer settings → OAuth Apps), set the callback URL to `https://<project>.supabase.co/auth/v1/callback`, then paste the client id/secret into Supabase. No paid account needed.
3. Auth → URL Configuration: set Site URL to your deployed origin and add redirect allow-list (localhost + prod).
4. Create a storage bucket `avatars` (public) for profile pictures (optional).

Deliverable: a working Supabase project with Google + GitHub providers enabled.

---

## Phase 1 — Database schema + RLS

Run in Supabase SQL editor. Core tables:

```sql
-- profiles (1:1 with auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  grade text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "profiles public read" on profiles for select using (true);
create policy "profiles self update" on profiles for update using (auth.uid() = id);

-- trigger: create profile on signup
create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- editorial content (admin-managed)
create table courses (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table exercises (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table papers (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table daily_challenges (id text primary key, data jsonb not null, date date not null);
alter table courses enable row level security;
-- (repeat for exercises, papers, daily_challenges)
create policy "content public read" on courses for select using (true);
create policy "content admin write" on courses for all
  using (exists (select 1 from profiles where id = auth.uid() and is_admin))
  with check (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- user progress
create table user_saves (user_id uuid references auth.users, item_type text, item_id text, primary key (user_id, item_type, item_id));
create table user_completed (user_id uuid references auth.users, item_id text, primary key (user_id, item_id));
create table user_likes (user_id uuid references auth.users, target_type text, target_id text, primary key (user_id, target_type, target_id));
alter table user_saves enable row level security;
create policy "saves self" on user_saves for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- (repeat for user_completed, user_likes)

-- streaks
create table challenge_completions (
  user_id uuid references auth.users,
  challenge_date date not null,
  primary key (user_id, challenge_date)
);
alter table challenge_completions enable row level security;
create policy "completions self" on challenge_completions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- forum
create table forum_threads (
  id text primary key,
  author_id uuid references auth.users not null,
  title text not null,
  body text not null,
  category text,
  tags text[] default '{}',
  created_at timestamptz default now()
);
create table forum_replies (
  id text primary key,
  thread_id text references forum_threads(id) on delete cascade,
  author_id uuid references auth.users not null,
  body text not null,
  created_at timestamptz default now()
);
alter table forum_threads enable row level security;
alter table forum_replies enable row level security;
create policy "threads public read" on forum_threads for select using (true);
create policy "threads auth insert" on forum_threads for insert with check (auth.uid() = author_id);
create policy "threads owner update/delete" on forum_threads for update using (auth.uid() = author_id);
create policy "threads owner delete" on forum_threads for delete using (auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "replies public read" on forum_replies for select using (true);
create policy "replies auth insert" on forum_replies for insert with check (auth.uid() = author_id);
create policy "replies owner delete" on forum_replies for delete using (auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and is_admin));
```

Deliverable: tables + RLS in place; admin user flagged via `profiles.is_admin = true`.

---

## Phase 2 — Frontend auth wiring (app.js + index.html)

Files: `index.html`, `app.js`.

1. Add Supabase SDK to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
2. In `app.js`, init client near top:
   ```js
   const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   ```
   (Store URL/key in a small `config.js` or inline constants; never the service role key.)
3. Replace `currentUser = readJSON(STORAGE.user, null)` bootstrap with:
   - `const { data: { session } } = await supabase.auth.getSession();`
   - map session.user → `currentUser` shape (`{ id, name, email, avatarUrl, isAdmin }`).
   - `supabase.auth.onAuthStateChange((_event, session) => { ... update currentUser + re-render header ... })`.
4. Replace auth modal submit handler (around `form.matches('[data-auth-form]')`) to call `supabase.auth.signInWithPassword` / `signUp`; on success set user and close modal. Keep the existing demo fallback if Supabase unreachable? Recommend: no, require network.
5. Add Google/GitHub buttons in the auth modal:
   ```js
   supabase.auth.signInWithOAuth({ provider: 'google' });
   supabase.auth.signInWithOAuth({ provider: 'github' });
   ```
6. Logout button → `supabase.auth.signOut()`.

Keep anonymous browsing working (no session → `currentUser = null`, same as today).

---

## Phase 3 — Cloud sync for personal data + streaks

Files: `app.js`.

Replace direct `localStorage` writes for `STORAGE.courses/exercises/completed/liked*` with a sync helper:

```js
async function syncSave(type, id, saved) {
  // optimistic local
  const set = setsByType[type];
  if (saved) set.add(id); else set.delete(id);
  writeJSON(storageKeyByType[type], [...set]);
  if (!currentUser) return;
  if (saved) await supabase.from('user_saves').upsert({ user_id: currentUser.id, item_type: type, item_id: id });
  else await supabase.from('user_saves').delete().match({ user_id: currentUser.id, item_type: type, item_id: id });
}
```

On login: fetch `user_saves`, `user_completed`, `user_likes` for the user and merge (union) into the in-memory Sets + localStorage, then re-render.

**Streaks (daily challenge):**
- Add `challenge_completions` fetch on login.
- "Mark daily challenge done" button → insert row with today's date (UTC). Compute streak = consecutive days ending today.
- Show streak badge in profile/header.

---

## Phase 4 — Community forum (shared)

Files: `app.js`.

1. Replace `forumThreads = readJSON(STORAGE.threads, ...)` seed with a fetch from `forum_threads` joined to `profiles` (author name/avatar).
2. Keep seed data as a one-time import script (insert into Supabase once) so existing content isn't lost.
3. Create thread/reply forms → insert into Supabase (RLS ensures auth).
4. Author display uses `profiles.name` / avatar instead of stored strings.
5. Subscribe to realtime: `supabase.channel('forum').on('postgres_changes', ...)` to prepend new replies/threads without refresh.
6. Likes on threads/replies → `user_likes` with `target_type = 'thread'|'reply'`.

---

## Phase 5 — Live admin studio (admin.js)

Files: `admin.js`.

1. Gate admin routes on Supabase session + `profiles.is_admin` (replace `adminPasswordMatches` / `isAdminUnlocked`).
2. Replace `readStore`/`writeStore` for content with Supabase queries:
   - Load: `supabase.from('courses').select('*')` etc.
   - Save: upsert row `{ id, data }`.
   - Delete: delete row.
3. Remove localStorage content key (`medil.content.v1`) usage; keep only as offline cache if desired.
4. Export/import JSON can remain (download/upload full dump) but operates on Supabase data.
5. Because content is in DB with RLS public-read, edits appear to all users on next fetch; add realtime or a "refresh content" toast to push updates live.

---

## Phase 6 — Deployment & cutover

1. Host frontend on Vercel/Netlify/Cloudflare Pages (static). Set env vars `SUPABASE_URL`, `SUPABASE_ANON_KEY` (inject into a generated `config.js` at build, or use a runtime config file committed with placeholders).
2. Run the seed import once (courses/exercises/papers/threads/daily).
3. Migrate existing users' localStorage data: add a one-time "Import my local data" button that upserts current Sets into Supabase after first login.
4. Update Playwright tests: use email/password test account (skip OAuth in E2E), handle session persistence, add streak + forum assertions.

---

## Phase 7 — Testing & hardening

- RLS audit: try reading/writing as anon and as another user; must fail.
- OAuth E2E cannot drive Google/GitHub popups easily → test with email/password + a dedicated test user; smoke-test OAuth manually.
- Rate limit / abuse: enable Supabase rate limits; add profanity/spam basic checks on forum inserts.
- Backups: enable Supabase point-in-time recovery.

---

## File touch summary

| File | Change |
|---|---|
| `index.html` | Add Supabase SDK + config script |
| `app.js` | Auth bootstrap, OAuth buttons, cloud sync helpers, forum fetch/realtime, streak UI |
| `admin.js` | Supabase-backed CRUD, admin role gating, drop localStorage content store |
| `data.js` | Keep as seed reference; optionally trim to fallback only |
| `styles.css` | Streak badge, OAuth buttons, forum composer styles |
| New: `config.js` | Supabase URL + anon key (gitignored for secrets) |
| New: `supabase/seed.sql` | One-time content import |

## Order of execution (do not skip)

0 → 1 → 2 → (3 + 4 can run in parallel) → 5 → 6 → 7.

Start with Phase 0+1 (backend ready) before touching frontend, so `app.js` always has something to talk to.

## Risks / notes

- GitHub OAuth needs an OAuth App registered in GitHub (free); set the callback URL to your Supabase callback. No paid account required.
- OAuth popups can't be automated in Playwright — keep email/password path for tests.
- Migrating localStorage → cloud must be idempotent (upsert, not insert) to survive re-runs.
- Keep the site browsable anonymously; gate only writes (saves, forum posts, admin) behind auth.