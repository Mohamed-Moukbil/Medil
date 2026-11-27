-- ============================================================================
-- MEDIL — 0003 · Forum and newsletter
-- ============================================================================

-- ---------------------------------------------------------------------------
-- forum_threads
-- IDs are readable slugs for seeded content and generated text UUIDs for new
-- threads, so existing URLs stay stable.
-- ---------------------------------------------------------------------------
create table if not exists public.forum_threads (
  id text primary key default gen_random_uuid()::text,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text,
  author_grade text,
  author_initials text,
  avatar_color text,
  excerpt text,
  title text not null,
  body text not null,
  category text not null check (category in ('Maths', 'Physique', 'Informatique', 'Concours', 'Méthode')),
  tags text[] not null default '{}',
  pinned boolean not null default false,
  locked boolean not null default false,
  views integer not null default 0 check (views >= 0),
  upvotes integer not null default 0 check (upvotes >= 0),
  status text not null default 'published' check (status in ('published', 'hidden', 'deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists forum_threads_set_updated_at on public.forum_threads;
create trigger forum_threads_set_updated_at
  before update on public.forum_threads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- forum_replies
-- ---------------------------------------------------------------------------
create table if not exists public.forum_replies (
  id text primary key default gen_random_uuid()::text,
  thread_id text not null references public.forum_threads(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text,
  author_grade text,
  author_initials text,
  avatar_color text,
  body text not null,
  upvotes integer not null default 0 check (upvotes >= 0),
  status text not null default 'published' check (status in ('published', 'hidden', 'deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists forum_replies_set_updated_at on public.forum_replies;
create trigger forum_replies_set_updated_at
  before update on public.forum_replies
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- newsletter_subscribers
-- Written by a server action using the service-role key, never directly by
-- the browser.
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  source text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Emails are normalized to lowercase by the server action before insert.
create unique index if not exists newsletter_subscribers_email_unique
  on public.newsletter_subscribers (email);
