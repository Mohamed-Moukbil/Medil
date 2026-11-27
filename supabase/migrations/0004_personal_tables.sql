-- ============================================================================
-- MEDIL — 0004 · Personal data
-- All rows are scoped to auth.uid() by RLS in 0006.
-- ============================================================================

create table if not exists public.user_saves (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('course', 'exercise')),
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create table if not exists public.user_completed (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create table if not exists public.user_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('thread', 'reply')),
  target_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

create table if not exists public.challenge_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_date date not null,
  created_at timestamptz not null default now(),
  primary key (user_id, challenge_date)
);
