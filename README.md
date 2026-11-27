# MEDIL — Next.js + Supabase

MEDIL is a French CPGE (MPSI / MP) resource platform: courses, corrected exercises,
concours papers, a daily challenge and a community forum.

This repository is the migration of the original static SPA to a server-rendered
Next.js app with a real database, real authentication and a secure admin area.
The visual design is intentionally unchanged: the original CSS lives in
`app/globals.css` and the original assets are in `public/assets/`.

The old static site is preserved in `legacy/` and remains the rollback target
until the new deployment is validated.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Supabase** (Postgres, Auth, Storage, RLS)
- **Cloudflare Workers** via `@opennextjs/cloudflare`
- **KaTeX** rendered on the server, `sanitize-html` for editorial HTML
- No Tailwind, no component-library redesign

## Requirements

- Node.js **20.9+** (22 LTS recommended)
- npm
- A Supabase project
- A Cloudflare account for deployment

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill in the Supabase values in .env.local
npm run dev
```

Open <http://localhost:3000>.

The app will not render real content until the migrations are applied and the
seed has run.

## 1. Create the Supabase project

Create a **new** Supabase project. This migration deliberately starts from an
empty database: editorial content is imported from `legacy/data.js`, while old
auth users and personal data are not migrated.

From **Project Settings → API**, copy:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` / publishable key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never commit)

Also set `NEXT_PUBLIC_SITE_URL` to the canonical origin, e.g.
`http://localhost:3000` locally or `https://medil.io` in production.

## 2. Apply the migrations

Run the files in `supabase/migrations/` **in numeric order**:

1. `0001_profiles_and_helpers.sql`
2. `0002_content_tables.sql`
3. `0003_forum_and_newsletter.sql`
4. `0004_personal_tables.sql`
5. `0005_indexes_and_search.sql`
6. `0006_rls_policies.sql`
7. `0007_storage.sql`

### Option A — SQL Editor

Open the Supabase SQL Editor and paste each file in order. The migrations are
written to be idempotent, but they are intended for a fresh project.

### Option B — Supabase CLI

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

`0007_storage.sql` creates the public `covers` and `papers` buckets and their
admin-only write policies.

## 3. Configure Auth

In **Authentication → Providers**:

- Enable **Email**.
- Optionally enable **Google** and **GitHub** for parity with the old site.
- For OAuth, the Supabase callback is
  `https://<project-ref>.supabase.co/auth/v1/callback`.

In **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` in development, `https://medil.io` in
  production.
- **Redirect URLs**:
  - `http://localhost:3000/**`
  - `http://127.0.0.1:3000/**` (Supabase treats `localhost` and `127.0.0.1`
    as different origins)
  - `https://medil.io/**`
  - any Cloudflare preview URL you use

Email confirmation can stay enabled in production. If you want instant local
signups, disable **Confirm email** in the local project only.

## 4. Seed the editorial content

The seed reads `legacy/data.js` and upserts courses, exercises, concours papers,
the daily challenge and the five original forum threads with their replies.

```bash
npm run seed
# Verify without writing anything:
npm run seed -- --dry-run
```

The script uses the service-role key, so it bypasses RLS. Run it only locally or
in a trusted CI job. It is safe to re-run: rows are upserted on their stable IDs.

Forum replies use IDs of the form `<thread-id>--<reply-id>` because the original
`r1`, `r2`, … IDs are only unique inside a thread.

## 5. Create the admin account

1. Sign up normally through the app (or create the user in
   **Authentication → Users**).
2. Confirm the email if confirmation is enabled.
3. Promote the profile in the SQL Editor:

```sql
update public.profiles
set is_admin = true
where id = (
  select id from auth.users where email = 'you@example.com'
);
```

The old client-side admin password is intentionally gone. Admin access is now
enforced by `profiles.is_admin` and RLS, with server-side guards in the app.

## 6. Run locally

```bash
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
npm test
npm run test:e2e
```

## Deploy to Cloudflare Workers

The app uses OpenNext. `wrangler.jsonc` already enables `nodejs_compat` and the
Workers assets binding.

### Local Workers preview

Create `.dev.vars` from `.dev.vars.example` and fill in the Supabase values.
`NEXT_PUBLIC_*` variables are inlined by Next.js at build time, so they must also
be present in the shell (or in `.env.local`) when building:

```bash
npm run preview
```

### Production

```bash
npx wrangler login

# Build-time public variables:
export NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
export NEXT_PUBLIC_SITE_URL="https://medil.io"

# Runtime secret (never in wrangler.jsonc):
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

npm run deploy
```

If you use a custom domain, attach it to the Worker in the Cloudflare dashboard
and update the Supabase **Site URL** / **Redirect URLs** to match.

### Optional R2 incremental cache

`open-next.config.ts` has the R2 cache commented out. To enable it:

```bash
npx wrangler r2 bucket create medil-next-cache
```

Then uncomment `incrementalCache: r2IncrementalCache` and add the binding to
`wrangler.jsonc` as documented by OpenNext.

### Rollback

The existing Cloudflare Pages project is not touched by this migration. Keep it
and its DNS record until the Workers deployment has been validated. To roll
back, point the domain back to Pages; `legacy/` contains the full static site.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Start the production Node server |
| `npm run seed` | Upsert editorial content into Supabase |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright |
| `npm run preview` | Build and preview the Worker locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run upload` | Build and upload a Worker version |
| `npm run cf:build` | OpenNext build only |
| `npm run cf:typegen` | Generate Cloudflare env types |

## Project layout

```
app/                 Next.js App Router (pages, layouts, actions)
  globals.css        Original MEDIL design system
components/          UI components (added phase by phase)
lib/
  supabase/          Browser and server Supabase clients
content/             Legacy per-item JSON exports (reference)
legacy/              Original static site — rollback copy
public/assets/       Fonts, KaTeX and images
scripts/seed.mjs     Editorial content importer
supabase/migrations/ Schema, indexes, RLS and storage policies
proxy.ts             Next.js 16 session refresh (replaces middleware.ts)
wrangler.jsonc       Cloudflare Workers configuration
```

## Security notes

- RLS is enabled on every application table.
- Public users can read published content only.
- Forum writes require an authenticated user; seeded threads have
  `author_id = null` and keep their original display names.
- Newsletter writes go through the server with the service-role key; the table
  is not writable from the browser.
- Personal tables (`user_saves`, `user_completed`, `user_likes`,
  `challenge_completions`) are restricted to their owner.
- Never commit `.env.local`, `.dev.vars`, or the service-role key.
