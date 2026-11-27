-- ============================================================================
-- MEDIL — 0002 · Editorial content tables
-- Indexed columns for filtering/sorting + JSONB for rich nested blocks.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id text primary key,
  title text not null,
  tag text,
  subject text not null check (subject in ('Maths', 'Physique', 'Informatique')),
  level text not null check (level in ('MPSI', 'MP', 'MP*')),
  color text,
  cover_type text,
  cover_eq text,
  chapters_count integer not null default 0 check (chapters_count >= 0),
  duration text,
  students text,
  rating numeric(2, 1) check (rating >= 0 and rating <= 5),
  featured boolean not null default false,
  description text,
  formula text,
  objectives text[] not null default '{}',
  toc text[] not null default '{}',
  sections jsonb not null default '[]'::jsonb,
  exercise jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- exercises
-- ---------------------------------------------------------------------------
create table if not exists public.exercises (
  id text primary key,
  title text not null,
  subject text not null check (subject in ('Maths', 'Physique', 'Informatique')),
  tag text,
  source text,
  level text check (level in ('MPSI', 'MP', 'MP*')),
  stars integer not null default 1 check (stars between 1 and 5),
  minutes integer check (minutes >= 0),
  equation text,
  teaser text,
  statement text,
  hint text,
  solution jsonb not null default '[]'::jsonb,
  answer text,
  solves integer not null default 0 check (solves >= 0),
  verified boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists exercises_set_updated_at on public.exercises;
create trigger exercises_set_updated_at
  before update on public.exercises
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- papers (concours)
-- ---------------------------------------------------------------------------
create table if not exists public.papers (
  id text primary key,
  school text not null check (school in ('X/ENS', 'Mines-Ponts', 'Centrale', 'CCINP', 'e3a')),
  short text,
  year integer not null check (year between 1900 and 2100),
  subject text not null check (subject in ('Maths', 'Physique', 'Informatique')),
  title text not null,
  track text,
  duration text,
  difficulty integer check (difficulty between 1 and 5),
  parts text,
  hot boolean not null default false,
  correction boolean not null default false,
  color text,
  pdf_url text,
  content jsonb,
  correction_content jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists papers_set_updated_at on public.papers;
create trigger papers_set_updated_at
  before update on public.papers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- daily_challenges
-- ---------------------------------------------------------------------------
create table if not exists public.daily_challenges (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  exercise_id text references public.exercises(id) on delete set null,
  eyebrow text,
  title text not null,
  statement text,
  equation text,
  participants integer not null default 0 check (participants >= 0),
  xp integer not null default 0 check (xp >= 0),
  steps jsonb not null default '[]'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists daily_challenges_set_updated_at on public.daily_challenges;
create trigger daily_challenges_set_updated_at
  before update on public.daily_challenges
  for each row execute function public.set_updated_at();
