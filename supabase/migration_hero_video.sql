-- ============================================================
-- Hero video support -- run in Supabase SQL Editor after the
-- earlier schema.sql and migration_i18n.sql files.
-- ============================================================

create table if not exists site_settings (
  id int primary key default 1,
  hero_video_path text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1)
  on conflict (id) do nothing;

alter table site_settings enable row level security;

create policy "public read site_settings" on site_settings
  for select using (true);

create policy "staff update site_settings" on site_settings
  for update using (auth.role() = 'authenticated');

create policy "staff insert site_settings" on site_settings
  for insert with check (auth.role() = 'authenticated');

-- Public bucket -- the hero video needs to be readable by every visitor,
-- not just logged-in staff, so (unlike submission-uploads) this one is public.
insert into storage.buckets (id, name, public)
  values ('site-assets', 'site-assets', true)
  on conflict (id) do nothing;

create policy "public read site-assets" on storage.objects
  for select using (bucket_id = 'site-assets');

create policy "staff write site-assets" on storage.objects
  for insert with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

create policy "staff update site-assets" on storage.objects
  for update using (bucket_id = 'site-assets' and auth.role() = 'authenticated');

create policy "staff delete site-assets" on storage.objects
  for delete using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
