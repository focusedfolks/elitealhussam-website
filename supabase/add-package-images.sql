-- Enable package image uploads for an existing Supabase CMS.
insert into storage.buckets (id, name, public)
values ('package-images', 'package-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read package images" on storage.objects;
create policy "Public read package images"
  on storage.objects for select
  using (bucket_id = 'package-images');

drop policy if exists "Admin upload package images" on storage.objects;
create policy "Admin upload package images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'package-images');

drop policy if exists "Admin update package images" on storage.objects;
create policy "Admin update package images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'package-images')
  with check (bucket_id = 'package-images');

drop policy if exists "Admin delete package images" on storage.objects;
create policy "Admin delete package images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'package-images');
