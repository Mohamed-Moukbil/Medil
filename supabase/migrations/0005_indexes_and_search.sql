-- ============================================================================
-- MEDIL — 0005 · Indexes and search
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Content indexes
-- ---------------------------------------------------------------------------
create index if not exists courses_subject_idx on public.courses (subject);
create index if not exists courses_level_idx on public.courses (level);
create index if not exists courses_status_idx on public.courses (status);
create index if not exists courses_featured_idx on public.courses (featured) where featured = true;
create index if not exists courses_search_idx on public.courses using gin (
  to_tsvector(
    'french',
    coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(tag, '')
  )
);

create index if not exists exercises_subject_idx on public.exercises (subject);
create index if not exists exercises_level_idx on public.exercises (level);
create index if not exists exercises_stars_idx on public.exercises (stars);
create index if not exists exercises_status_idx on public.exercises (status);
create index if not exists exercises_search_idx on public.exercises using gin (
  to_tsvector(
    'french',
    coalesce(title, '') || ' ' || coalesce(teaser, '') || ' ' || coalesce(tag, '') || ' ' || coalesce(source, '')
  )
);

create index if not exists papers_school_idx on public.papers (school);
create index if not exists papers_subject_idx on public.papers (subject);
create index if not exists papers_year_idx on public.papers (year desc);
create index if not exists papers_status_idx on public.papers (status);
create index if not exists papers_search_idx on public.papers using gin (
  to_tsvector(
    'french',
    coalesce(title, '') || ' ' || coalesce(school, '') || ' ' || coalesce(subject, '') || ' ' || coalesce(track, '')
  )
);

create index if not exists daily_challenges_status_idx on public.daily_challenges (status);

-- ---------------------------------------------------------------------------
-- Forum indexes
-- ---------------------------------------------------------------------------
create index if not exists forum_threads_category_idx on public.forum_threads (category);
create index if not exists forum_threads_status_idx on public.forum_threads (status);
create index if not exists forum_threads_created_at_idx on public.forum_threads (created_at desc);
create index if not exists forum_threads_pinned_idx on public.forum_threads (pinned) where pinned = true;
create index if not exists forum_threads_search_idx on public.forum_threads using gin (
  to_tsvector(
    'french',
    coalesce(title, '') || ' ' || coalesce(body, '') || ' ' || coalesce(category, '')
  )
);

create index if not exists forum_replies_thread_idx on public.forum_replies (thread_id, created_at);
create index if not exists forum_replies_created_at_idx on public.forum_replies (created_at desc);

-- ---------------------------------------------------------------------------
-- Personal data indexes
-- ---------------------------------------------------------------------------
create index if not exists user_saves_user_idx on public.user_saves (user_id);
create index if not exists user_completed_user_idx on public.user_completed (user_id);
create index if not exists user_likes_user_idx on public.user_likes (user_id);
create index if not exists challenge_completions_user_idx on public.challenge_completions (user_id, challenge_date desc);

-- ---------------------------------------------------------------------------
-- search_content(): unified search across courses, exercises, papers and threads
-- ---------------------------------------------------------------------------
create or replace function public.search_content(search_query text)
returns table (
  result_type text,
  result_id text,
  title text,
  meta text,
  score real
)
language sql
stable
security definer
set search_path = public, extensions
as $$
  with params as (
    select
      nullif(trim(search_query), '') as raw,
      websearch_to_tsquery('french', coalesce(nullif(trim(search_query), ''), '')) as tsq,
      extensions.unaccent(coalesce(nullif(trim(search_query), ''), '')) as uq
  )
  select results.*
  from (
    select
      'course'::text as result_type,
      c.id as result_id,
      c.title,
      concat_ws(' · ', c.subject, c.level, c.tag) as meta,
      (
        ts_rank(
          to_tsvector(
            'french',
            coalesce(c.title, '') || ' ' || coalesce(c.description, '') || ' ' || coalesce(c.tag, '')
          ),
          p.tsq
        )
        + case when extensions.unaccent(c.title) ilike '%' || p.uq || '%' then 0.5 else 0 end
      )::real as score
    from public.courses c, params p
    where p.raw is not null
      and c.status = 'published'
      and (
        to_tsvector(
          'french',
          coalesce(c.title, '') || ' ' || coalesce(c.description, '') || ' ' || coalesce(c.tag, '')
        ) @@ p.tsq
        or extensions.unaccent(c.title) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(c.description, '')) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(c.tag, '')) ilike '%' || p.uq || '%'
      )

    union all

    select
      'exercise'::text,
      e.id,
      e.title,
      concat_ws(' · ', e.subject, e.level, e.tag),
      (
        ts_rank(
          to_tsvector(
            'french',
            coalesce(e.title, '') || ' ' || coalesce(e.teaser, '') || ' ' || coalesce(e.tag, '') || ' ' || coalesce(e.source, '')
          ),
          p.tsq
        )
        + case when extensions.unaccent(e.title) ilike '%' || p.uq || '%' then 0.5 else 0 end
      )::real
    from public.exercises e, params p
    where p.raw is not null
      and e.status = 'published'
      and (
        to_tsvector(
          'french',
          coalesce(e.title, '') || ' ' || coalesce(e.teaser, '') || ' ' || coalesce(e.tag, '') || ' ' || coalesce(e.source, '')
        ) @@ p.tsq
        or extensions.unaccent(e.title) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(e.teaser, '')) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(e.tag, '')) ilike '%' || p.uq || '%'
      )

    union all

    select
      'paper'::text,
      paper.id,
      paper.title,
      concat_ws(' · ', paper.school, paper.subject, paper.year::text),
      (
        ts_rank(
          to_tsvector(
            'french',
            coalesce(paper.title, '') || ' ' || coalesce(paper.school, '') || ' ' || coalesce(paper.subject, '') || ' ' || coalesce(paper.track, '')
          ),
          p.tsq
        )
        + case when extensions.unaccent(paper.title) ilike '%' || p.uq || '%' then 0.5 else 0 end
      )::real
    from public.papers paper, params p
    where p.raw is not null
      and paper.status = 'published'
      and (
        to_tsvector(
          'french',
          coalesce(paper.title, '') || ' ' || coalesce(paper.school, '') || ' ' || coalesce(paper.subject, '') || ' ' || coalesce(paper.track, '')
        ) @@ p.tsq
        or extensions.unaccent(paper.title) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(paper.school, '')) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(paper.subject, '')) ilike '%' || p.uq || '%'
      )

    union all

    select
      'thread'::text,
      thread.id,
      thread.title,
      concat_ws(' · ', thread.category, thread.author_name),
      (
        ts_rank(
          to_tsvector(
            'french',
            coalesce(thread.title, '') || ' ' || coalesce(thread.body, '') || ' ' || coalesce(thread.category, '')
          ),
          p.tsq
        )
        + case when extensions.unaccent(thread.title) ilike '%' || p.uq || '%' then 0.5 else 0 end
      )::real
    from public.forum_threads thread, params p
    where p.raw is not null
      and thread.status = 'published'
      and (
        to_tsvector(
          'french',
          coalesce(thread.title, '') || ' ' || coalesce(thread.body, '') || ' ' || coalesce(thread.category, '')
        ) @@ p.tsq
        or extensions.unaccent(thread.title) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(thread.body, '')) ilike '%' || p.uq || '%'
        or extensions.unaccent(coalesce(thread.category, '')) ilike '%' || p.uq || '%'
      )
  ) results
  order by results.score desc, results.title asc
  limit 30;
$$;

revoke all on function public.search_content(text) from public;
grant execute on function public.search_content(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- increment_thread_views(): called when a thread page is opened
-- ---------------------------------------------------------------------------
create or replace function public.increment_thread_views(thread_id text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.forum_threads
  set views = views + 1
  where id = thread_id
    and status = 'published';
$$;

revoke all on function public.increment_thread_views(text) from public;
grant execute on function public.increment_thread_views(text) to anon, authenticated;
