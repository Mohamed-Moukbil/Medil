-- ============================================================================
-- MEDIL — 0007 · Storage buckets
-- Public read for covers and paper PDFs; admin-only writes.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('papers', 'papers', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- covers
-- ---------------------------------------------------------------------------
drop policy if exists "covers public read" on storage.objects;
create policy "covers public read"
  on storage.objects for select
  using (bucket_id = 'covers');

drop policy if exists "covers admin insert" on storage.objects;
create policy "covers admin insert"
  on storage.objects for insert
  with check (bucket_id = 'covers' and public.is_admin());

drop policy if exists "covers admin update" on storage.objects;
create policy "covers admin update"
  on storage.objects for update
  using (bucket_id = 'covers' and public.is_admin())
  with check (bucket_id = 'covers' and public.is_admin());

drop policy if exists "covers admin delete" on storage.objects;
create policy "covers admin delete"
  on storage.objects for delete
  using (bucket_id = 'covers' and public.is_admin());

-- ---------------------------------------------------------------------------
-- papers
-- ---------------------------------------------------------------------------
drop policy if exists "papers public read" on storage.objects;
create policy "papers public read"
  on storage.objects for select
  using (bucket_id = 'papers');

drop policy if exists "papers admin insert" on storage.objects;
create policy "papers admin insert"
  on storage.objects for insert
  with check (bucket_id = 'papers' and public.is_admin());

drop policy if exists "papers admin update" on storage.objects;
create policy "papers admin update"
  on storage.objects for update
  using (bucket_id = 'papers' and public.is_admin())
  with check (bucket_id = 'papers' and public.is_admin());

drop policy if exists "papers admin delete" on storage.objects;
create policy "papers admin delete"
  on storage.objects for delete
  using (bucket_id = 'papers' and public.is_admin());
