-- ============================================================================
-- MEDIL — 0006 · Row Level Security
-- Public read for published content; writes only for admins or the owner.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles public read" on public.profiles;
create policy "profiles public read"
  on public.profiles for select
  using (true);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
alter table public.courses enable row level security;

drop policy if exists "courses public read" on public.courses;
create policy "courses public read"
  on public.courses for select
  using (status = 'published' or public.is_admin());

drop policy if exists "courses admin insert" on public.courses;
create policy "courses admin insert"
  on public.courses for insert
  with check (public.is_admin());

drop policy if exists "courses admin update" on public.courses;
create policy "courses admin update"
  on public.courses for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "courses admin delete" on public.courses;
create policy "courses admin delete"
  on public.courses for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- exercises
-- ---------------------------------------------------------------------------
alter table public.exercises enable row level security;

drop policy if exists "exercises public read" on public.exercises;
create policy "exercises public read"
  on public.exercises for select
  using (status = 'published' or public.is_admin());

drop policy if exists "exercises admin insert" on public.exercises;
create policy "exercises admin insert"
  on public.exercises for insert
  with check (public.is_admin());

drop policy if exists "exercises admin update" on public.exercises;
create policy "exercises admin update"
  on public.exercises for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "exercises admin delete" on public.exercises;
create policy "exercises admin delete"
  on public.exercises for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- papers
-- ---------------------------------------------------------------------------
alter table public.papers enable row level security;

drop policy if exists "papers public read" on public.papers;
create policy "papers public read"
  on public.papers for select
  using (status = 'published' or public.is_admin());

drop policy if exists "papers admin insert" on public.papers;
create policy "papers admin insert"
  on public.papers for insert
  with check (public.is_admin());

drop policy if exists "papers admin update" on public.papers;
create policy "papers admin update"
  on public.papers for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "papers admin delete" on public.papers;
create policy "papers admin delete"
  on public.papers for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- daily_challenges
-- ---------------------------------------------------------------------------
alter table public.daily_challenges enable row level security;

drop policy if exists "daily public read" on public.daily_challenges;
create policy "daily public read"
  on public.daily_challenges for select
  using (status = 'published' or public.is_admin());

drop policy if exists "daily admin insert" on public.daily_challenges;
create policy "daily admin insert"
  on public.daily_challenges for insert
  with check (public.is_admin());

drop policy if exists "daily admin update" on public.daily_challenges;
create policy "daily admin update"
  on public.daily_challenges for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "daily admin delete" on public.daily_challenges;
create policy "daily admin delete"
  on public.daily_challenges for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- forum_threads
-- ---------------------------------------------------------------------------
alter table public.forum_threads enable row level security;

drop policy if exists "threads public read" on public.forum_threads;
create policy "threads public read"
  on public.forum_threads for select
  using (status = 'published' or public.is_admin());

drop policy if exists "threads auth insert" on public.forum_threads;
create policy "threads auth insert"
  on public.forum_threads for insert
  with check (auth.uid() is not null and author_id = auth.uid());

drop policy if exists "threads owner update" on public.forum_threads;
create policy "threads owner update"
  on public.forum_threads for update
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());

drop policy if exists "threads owner delete" on public.forum_threads;
create policy "threads owner delete"
  on public.forum_threads for delete
  using (author_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- forum_replies
-- ---------------------------------------------------------------------------
alter table public.forum_replies enable row level security;

drop policy if exists "replies public read" on public.forum_replies;
create policy "replies public read"
  on public.forum_replies for select
  using (status = 'published' or public.is_admin());

drop policy if exists "replies auth insert" on public.forum_replies;
create policy "replies auth insert"
  on public.forum_replies for insert
  with check (
    auth.uid() is not null
    and author_id = auth.uid()
    and exists (
      select 1
      from public.forum_threads t
      where t.id = thread_id
        and t.status = 'published'
        and t.locked = false
    )
  );

drop policy if exists "replies owner update" on public.forum_replies;
create policy "replies owner update"
  on public.forum_replies for update
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());

drop policy if exists "replies owner delete" on public.forum_replies;
create policy "replies owner delete"
  on public.forum_replies for delete
  using (author_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- newsletter_subscribers — service role only, admins can inspect
-- ---------------------------------------------------------------------------
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter admin all" on public.newsletter_subscribers;
create policy "newsletter admin all"
  on public.newsletter_subscribers for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Personal data — self only
-- ---------------------------------------------------------------------------
alter table public.user_saves enable row level security;
drop policy if exists "saves self" on public.user_saves;
create policy "saves self"
  on public.user_saves for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.user_completed enable row level security;
drop policy if exists "completions self" on public.user_completed;
create policy "completions self"
  on public.user_completed for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.user_likes enable row level security;
drop policy if exists "likes self" on public.user_likes;
create policy "likes self"
  on public.user_likes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.challenge_completions enable row level security;
drop policy if exists "challenge completions self" on public.challenge_completions;
create policy "challenge completions self"
  on public.challenge_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
