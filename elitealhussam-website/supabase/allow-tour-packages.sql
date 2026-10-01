-- Run once for existing Supabase projects to allow International Tour records.
alter table public.packages
  drop constraint if exists packages_category_check;

alter table public.packages
  add constraint packages_category_check
  check (category in ('hajj', 'umrah', 'tour'));