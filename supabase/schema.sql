-- ============================================================
-- Torpaq, Su ve Bitki Analizleri Laboratoriyasi -- DB SCHEMA
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- ============================================================

-- ---------- SERVICE CATEGORIES ----------
create table if not exists service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_az text not null,
  description_az text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- SERVICES (individual analyses / packages) ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references service_categories(id) on delete cascade,
  name_az text not null,
  description_az text,
  is_package boolean not null default false,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- CONTACT / ORDER SUBMISSIONS ----------
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text,
  company text,
  service_interest text,
  message text,
  status text not null default 'yeni' check (status in ('yeni', 'baxilir', 'cavablandirilib', 'baglanib')),
  admin_note text
);

-- ---------- FILES ATTACHED TO A SUBMISSION ----------
create table if not exists submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references submissions(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  uploaded_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table service_categories enable row level security;
alter table services enable row level security;
alter table submissions enable row level security;
alter table submission_files enable row level security;

-- Public (anon) can read active services/categories
create policy "public read categories" on service_categories
  for select using (true);

create policy "public read active services" on services
  for select using (active = true);

-- Authenticated staff can manage categories/services
create policy "staff manage categories" on service_categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "staff manage services" on services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Anyone (anon) can submit a contact/order request, but cannot read them back
create policy "public can insert submissions" on submissions
  for insert with check (true);

-- Only staff can read/update/delete submissions
create policy "staff read submissions" on submissions
  for select using (auth.role() = 'authenticated');

create policy "staff update submissions" on submissions
  for update using (auth.role() = 'authenticated');

create policy "staff delete submissions" on submissions
  for delete using (auth.role() = 'authenticated');

-- Files: anon can insert a row (right after uploading to storage), staff can read/delete
create policy "public can insert submission files" on submission_files
  for insert with check (true);

create policy "staff read submission files" on submission_files
  for select using (auth.role() = 'authenticated');

create policy "staff delete submission files" on submission_files
  for delete using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET for uploaded files (create via SQL or dashboard)
-- ============================================================
insert into storage.buckets (id, name, public)
  values ('submission-uploads', 'submission-uploads', false)
  on conflict (id) do nothing;

-- Anyone can upload (insert) into this bucket -- needed for the public contact form
create policy "public upload submission files"
  on storage.objects for insert
  with check (bucket_id = 'submission-uploads');

-- Only authenticated staff can read/download files back out
create policy "staff read submission files storage"
  on storage.objects for select
  using (bucket_id = 'submission-uploads' and auth.role() = 'authenticated');

create policy "staff delete submission files storage"
  on storage.objects for delete
  using (bucket_id = 'submission-uploads' and auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA -- categories + services (from the lab's actual service list)
-- ============================================================
insert into service_categories (slug, name_az, description_az, sort_order) values
  ('bitki-analizi', 'Bitki yarpaqlarının analizi', 'Bitki yarpaqlarında qida elementlərinin təyini.', 1),
  ('torpaq-kimyevi', 'Torpağın kimyəvi göstəricilərinin təyini', 'Torpaq nümunələrinin götürülməsi və kimyəvi tərkibin analizi.', 2),
  ('torpaq-fiziki', 'Torpağın fiziki göstəricilərinin təyini', 'Torpağın struktur, tutum və sıxlıq göstəriciləri.', 3),
  ('suvarma-suyu', 'Suvarma suyunun analizi', 'Suvarma suyunun kimyəvi və fiziki göstəricilərinin təyini.', 4)
on conflict (slug) do nothing;

insert into services (category_id, name_az, sort_order, is_package)
select id, v.name_az, v.sort_order, v.is_package
from service_categories, (values
  ('bitki-analizi', 'Ümumi azotun təyini', 1, false),
  ('bitki-analizi', 'Toplam makroelementlər (P, K, Ca, Mg, Na)', 2, false),
  ('bitki-analizi', 'Toplam mikroelementlər (Mn, Cu, Zn, Fe, Al)', 3, false),
  ('torpaq-kimyevi', 'Torpaq nümunələrinin götürülməsi', 1, false),
  ('torpaq-kimyevi', 'pH-ın (torpaq ekstratında) təyini', 2, false),
  ('torpaq-kimyevi', 'Əhəngin (karbonatlıq) təyini', 3, false),
  ('torpaq-kimyevi', 'Duzluluğun təyini', 4, false),
  ('torpaq-kimyevi', 'Üzvi maddənin (humus) təyini', 5, false),
  ('torpaq-kimyevi', 'Nitrat azotunun (NO3), ammonium azotunun (NH4) və ümumi azotun (N) təyini', 6, false),
  ('torpaq-kimyevi', 'Mütəhərrik fosforun (P2O5) təyini', 7, false),
  ('torpaq-kimyevi', 'Mənimsənilən kaliumun (K2O) təyini', 8, false),
  ('torpaq-kimyevi', 'Mənimsənilən natriumun (Na) təyini', 9, false),
  ('torpaq-kimyevi', 'Mənimsənilən kalsiumun (Ca) və maqneziumun (Mg) təyini', 10, false),
  ('torpaq-kimyevi', 'Mənimsənilə bilən mikroelementlərin (Fe, Cu, Zn, Mn, B) təyini', 11, false),
  ('torpaq-kimyevi', 'KDK (torpaqda dəyişə bilən kationların ümumi miqdarı)', 12, false),
  ('torpaq-kimyevi', 'Torpaq analizi -- Paket 1 (struktur, duzluluq (EC), pH, əhəng, fosfor, kalium və üzvi maddələrin təyini)', 13, true),
  ('torpaq-kimyevi', 'Torpaq analizi -- Paket 2 (struktur, duzluluq, pH, əhəng, azot, fosfor, kalium, kalsium, natrium, maqnezium və üzvi maddələrin təyini)', 14, true),
  ('torpaq-kimyevi', 'Torpaq analizi -- Paket 3 (struktur, duzluluq (EC), pH, əhəng, azot, fosfor, kalium, natrium, üzvi maddələr, mikroelementlərin (Fe, Cu, Zn, Mn) təyini)', 15, true),
  ('torpaq-kimyevi', 'Torpaq analizi -- Paket 4 (struktur, duzluluq (anion və kationlar), pH, əhəng, üzvi maddələr, azot, fosfor, kalium, natrium, kalsium, maqnezium, mikroelementlərin (Fe, Cu, Zn, Mn) təyini)', 16, true),
  ('torpaq-fiziki', 'Torpağın strukturunun təyini', 1, false),
  ('torpaq-fiziki', 'Mexaniki tərkib (qum, gil, lil faizlə)', 2, false),
  ('torpaq-fiziki', 'Torpaqda solma nöqtəsinin və tarla tutumunun təyini', 3, false),
  ('torpaq-fiziki', 'Torpaq ekstratında elektrik keçiriciliyinin təyini', 4, false),
  ('torpaq-fiziki', 'Torpaqda nəmliyin və su keçiriciliyinin təyini', 5, false),
  ('torpaq-fiziki', 'Torpaqda həcm çəkisinin (pozulmamışdırsa) və sıxlığın, xüsusi çəkinin təyini', 6, false),
  ('torpaq-fiziki', 'Torpağın standart fiziki analizi (struktur, tarla tutumu, solma nöqtəsi, həcm çəkisi)', 7, true),
  ('suvarma-suyu', 'Suvarma suyu nümunələrinin götürülməsi', 1, false),
  ('suvarma-suyu', 'İy, rəng və görünüşün təyini', 2, false),
  ('suvarma-suyu', 'Elektrik keçiriciliyinin təyini', 3, false),
  ('suvarma-suyu', 'Temperaturun, şəffaflığın və bulanıqlığın təyini', 4, false),
  ('suvarma-suyu', 'pH-ın təyini', 5, false),
  ('suvarma-suyu', 'Ümumi codluğun (Ca2+ + Mg2+) təyini', 6, false),
  ('suvarma-suyu', 'Duzluluğun təyini', 7, false),
  ('suvarma-suyu', 'Quru qalığın (105°C-də qurudularaq) təyini', 8, false),
  ('suvarma-suyu', 'Üzvi maddənin (permanqanat əmsalı) təyini', 9, false),
  ('suvarma-suyu', 'Karbonatın (CO3²⁻) və bikarbonatın (HCO3⁻) təyini', 10, false),
  ('suvarma-suyu', 'Kationların (Li+, Na+, K+, NH4+, Mg2+, Ca2+) təyini', 11, false),
  ('suvarma-suyu', 'Anionların (Cl-, PO4³⁻, NO3-, NO2-, SO4²⁻, F-, B-) təyini', 12, false),
  ('suvarma-suyu', 'Mikroelementlərin (Fe, Cu, Zn, Mn) təyini', 13, false),
  ('suvarma-suyu', 'Suvarma suyunun standart analizi (pH, EC, Ca, Ca+Mg, Na, K, B, CO3²⁻, HCO3⁻, Cl-, SO4²⁻)', 14, true)
) as v(cat_slug, name_az, sort_order, is_package)
where service_categories.slug = v.cat_slug
on conflict do nothing;
