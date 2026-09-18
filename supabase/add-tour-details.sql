-- Add editable Package Info / Itinerary / Inclusions / Exclusions content.
do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'packages'
      and column_name = 'tour_details'
  ) then
    alter table public.packages
      add column tour_details jsonb default null;
  end if;
end
$$;