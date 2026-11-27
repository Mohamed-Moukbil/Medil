-- ============================================================================
-- MEDIL — Phase 1 : schéma base de données + RLS (Supabase)
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query
-- (idempotent : safe to re-run)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles : 1:1 avec auth.users
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Utilisateur',
  grade text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "profiles public read" on profiles;
create policy "profiles public read"
  on profiles for select
  using (true);

drop policy if exists "profiles self update" on profiles;
create policy "profiles self update"
  on profiles for update
  using (auth.uid() = id);

-- Trigger : création du profil automatique à l'inscription
-- (robuste : ne jamais laisser `name` à NULL, sinon l'inscription échoue
-- avec « Database error saving new user »)
create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id, name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'user_name',
      new.email,
      'Utilisateur'
    )
  );
  return new;
end;
$$ language plpgsql security definer
set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- Contenu éditorial (admin) : tables clé / valeur JSON
-- ---------------------------------------------------------------------------
create table if not exists courses (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists exercises (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists papers (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists daily_challenges (
  id text primary key,
  data jsonb not null,
  "date" date not null
);

-- Contenu éditorial : lecture publique, écriture ouverte (l'admin est protégé
-- par un mot de passe côté client, comme avant — pas d'auth Supabase pour l'admin).
alter table courses enable row level security;
drop policy if exists "content public read" on courses;
create policy "content public read" on courses for select using (true);
drop policy if exists "content anon write" on courses;
create policy "content anon write" on courses for all
  using (true) with check (true);

alter table exercises enable row level security;
drop policy if exists "content public read" on exercises;
create policy "content public read" on exercises for select using (true);
drop policy if exists "content anon write" on exercises;
create policy "content anon write" on exercises for all
  using (true) with check (true);

alter table papers enable row level security;
drop policy if exists "content public read" on papers;
create policy "content public read" on papers for select using (true);
drop policy if exists "content anon write" on papers;
create policy "content anon write" on papers for all
  using (true) with check (true);

alter table daily_challenges enable row level security;
drop policy if exists "content public read" on daily_challenges;
create policy "content public read" on daily_challenges for select using (true);
drop policy if exists "content anon write" on daily_challenges;
create policy "content anon write" on daily_challenges for all
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Données personnelles (Phase 3) : sauvegardes / complétions / likes / streaks
-- ---------------------------------------------------------------------------
create table if not exists user_saves (
  user_id uuid references auth.users,
  item_type text,
  item_id text,
  primary key (user_id, item_type, item_id)
);

create table if not exists user_completed (
  user_id uuid references auth.users,
  item_id text,
  primary key (user_id, item_id)
);

create table if not exists user_likes (
  user_id uuid references auth.users,
  target_type text,
  target_id text,
  primary key (user_id, target_type, target_id)
);

alter table user_saves enable row level security;
drop policy if exists "saves self" on user_saves;
create policy "saves self" on user_saves for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table user_completed enable row level security;
drop policy if exists "completions self" on user_completed;
create policy "completions self" on user_completed for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table user_likes enable row level security;
drop policy if exists "likes self" on user_likes;
create policy "likes self" on user_likes for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists challenge_completions (
  user_id uuid references auth.users,
  challenge_date date not null,
  primary key (user_id, challenge_date)
);

alter table challenge_completions enable row level security;
drop policy if exists "completions self" on challenge_completions;
create policy "completions self" on challenge_completions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Forum (Phase 4 — prérequis pour la suite)
-- ---------------------------------------------------------------------------
create table if not exists forum_threads (
  id text primary key,
  author_id uuid references auth.users not null,
  title text not null,
  body text not null,
  category text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists forum_replies (
  id text primary key,
  thread_id text references forum_threads(id) on delete cascade,
  author_id uuid references auth.users not null,
  body text not null,
  created_at timestamptz default now()
);

alter table forum_threads enable row level security;
drop policy if exists "threads public read" on forum_threads;
create policy "threads public read" on forum_threads for select using (true);
drop policy if exists "threads auth insert" on forum_threads;
create policy "threads auth insert" on forum_threads for insert with check (auth.uid() = author_id);
drop policy if exists "threads owner update/delete" on forum_threads;
create policy "threads owner update/delete" on forum_threads for update using (auth.uid() = author_id);
drop policy if exists "threads owner delete" on forum_threads;
create policy "threads owner delete" on forum_threads for delete using (auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and is_admin));

alter table forum_replies enable row level security;
drop policy if exists "replies public read" on forum_replies;
create policy "replies public read" on forum_replies for select using (true);
drop policy if exists "replies auth insert" on forum_replies;
create policy "replies auth insert" on forum_replies for insert with check (auth.uid() = author_id);
drop policy if exists "replies owner delete" on forum_replies;
create policy "replies owner delete" on forum_replies for delete using (auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and is_admin));

-- ---------------------------------------------------------------------------
-- Admin : flag l'utilisateur admin (à exécuter après le schéma)
-- Remplace 'TON_EMAIL@ex.fr' par l'e-mail du compte admin.
-- ---------------------------------------------------------------------------
update profiles set is_admin = true
where id = (select id from auth.users where email = 'TON_EMAIL@ex.fr');
