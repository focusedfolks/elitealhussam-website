-- ELITE ALHUSSAM CMS schema
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- Packages
create table if not exists public.packages (
  id text primary key,
  category text not null check (category in ('hajj', 'umrah')),
  title text not null,
  tag text not null default '',
  season text not null default '',
  summary text not null default '',
  locations text not null default '',
  duration text not null default '',
  image text not null default '/images/theme-hero.webp',
  pricing jsonb not null default '{"adult":0,"child":0,"infant":0,"currency":"INR"}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  amenities jsonb not null default '[]'::jsonb,
  available_travel_modes jsonb default null,
  popular boolean not null default false,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  date date not null default current_date,
  author text not null default 'ELITE ALHUSSAM Team',
  category text not null check (
    category in ('Hajj Guide', 'Umrah Tips', 'Travel Advice', 'Company News')
  ),
  excerpt text not null default '',
  cover_image text not null default '/images/family-makkah.webp',
  read_time text not null default '5 min read',
  body_markdown text not null default '',
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  place text not null default '',
  quote text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Site settings (company + about copy as JSON)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Leads from the website form
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  interest text not null default '',
  travellers text not null default '',
  message text not null default '',
  travel_mode text not null default '',
  departure_date text not null default '',
  departure_airport text not null default '',
  preferred_airline text not null default '',
  departure_city text not null default '',
  pickup_point text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

-- Updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists packages_updated_at on public.packages;
create trigger packages_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.packages enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.leads enable row level security;

-- Public read published content
drop policy if exists "Public read packages" on public.packages;
create policy "Public read packages"
  on public.packages for select
  using (published = true);

drop policy if exists "Public read blog" on public.blog_posts;
create policy "Public read blog"
  on public.blog_posts for select
  using (published = true);

drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials"
  on public.testimonials for select
  using (published = true);

drop policy if exists "Public read settings" on public.site_settings;
create policy "Public read settings"
  on public.site_settings for select
  using (true);

-- Anyone can submit a lead
drop policy if exists "Public insert leads" on public.leads;
create policy "Public insert leads"
  on public.leads for insert
  with check (true);

-- Authenticated admins can manage everything
drop policy if exists "Admin all packages" on public.packages;
create policy "Admin all packages"
  on public.packages for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all blog" on public.blog_posts;
create policy "Admin all blog"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all testimonials" on public.testimonials;
create policy "Admin all testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all settings" on public.site_settings;
create policy "Admin all settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin read leads" on public.leads;
create policy "Admin read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "Admin update leads" on public.leads;
create policy "Admin update leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin delete leads" on public.leads;
create policy "Admin delete leads"
  on public.leads for delete
  to authenticated
  using (true);

-- Seed company settings
insert into public.site_settings (key, value) values
(
  'company',
  '{
    "name": "Elite Alhussam Travel and Tourism L.L.C",
    "shortName": "ELITE ALHUSSAM",
    "legalName": "Elite Alhussam Travel and Tourism L.L.C",
    "indiaName": "Elite Alhussam Travel and Tourism L.L.C",
    "tagline": "TRAVEL AND TOURISM L.L.C",
    "positioning": "Premium pilgrimage brand with Saudi hospitality roots - serving pilgrims from our Dubai, UAE office.",
    "experience": "45+ years of trusted Hajj & Umrah service",
    "background": "Saudi-based hospitality lineage connected with Aziz Khogeer Group Hotels. Elite Alhussam Travel and Tourism L.L.C operates from Dubai, UAE, arranging Hajj and Umrah with dedicated local support.",
    "phones": ["+971 56 574 6678"],
    "whatsapp": "971565746678",
    "email": "alhussamuae@gmail.com",
    "address": "Office Cabin No. 54, Mezzanine Floor, Smart Eye Business Centre, AG House Building, P.O. Box 35127, Dubai, UAE",
    "offices": [
      {
        "id": "dubai",
        "city": "Dubai",
        "label": "Dubai Office",
        "companyName": "Elite Alhussam Travel and Tourism L.L.C",
        "lines": ["Mezzanine Floor", "Smart Eye Business Centre", "Office Cabin No. 54", "AG House Building", "P.O. Box 35127", "Dubai, UAE"]
      }
    ],
    "social": {
      "facebook": "https://www.facebook.com/AlhussamToursandtravel/?modal=admin_todo_tour",
      "twitter": "https://twitter.com/AlhussamTravel",
      "youtube": "https://www.youtube.com/@alhussamhajumrahservice6083"
    }
  }'::jsonb
),
(
  'about',
  '{
    "intro": "A pilgrimage to the holy land is a sacred mission for spiritual enlightenment. Makkah is Allah’s chosen land. Millions of Muslims visit the city of Qibla for peace and tranquillity. Al Hussam is a reliable name with four decades of spotless reputation for Hajj & Umrah services.",
    "legacy": "Al Hussam is a Saudi-based company predominantly operating in hospitality management, originally known as Aziz Khogeer group Hotels, with 45 years of experience in rendering Hajj & Umrah services. The company has impeccable lineage from Abdul Aziz Khogeer Hotels Establishment.",
    "profile": "Our leadership brings decades of Holy Land hospitality experience - serving pilgrims with organised care, quality stays, and sincere guidance throughout the sacred journey.",
    "india": "Elite Alhussam Travel and Tourism L.L.C operates from Dubai, UAE. Hajj services are strictly for Indian passport holders only, with Umrah packages arranged for eligible travellers through our Dubai office.",
    "leadership": "Managing Director Mr. Basheer Ahmed continues this tradition of organised, experienced and genuine tour operation with top-class accommodation and efficient service for elite and regular guests alike."
  }'::jsonb
)
on conflict (key) do nothing;

-- Seed testimonials
insert into public.testimonials (name, place, quote, sort_order) values
(
  'Fathima R.',
  'Dubai pilgrim · Umrah',
  'From visa to Ziyarat, everything was organised with sincerity. We could focus on our prayers.',
  1
),
(
  'Imran S.',
  'Family group · Hajj',
  'They treated our elderly parents with respect and patience. A trustworthy guide for the sacred journey.',
  2
),
(
  'Ayesha K.',
  'Dubai · Economy package',
  'Clear communication, dedicated support, and spiritual care. ELITE ALHUSSAM feels like family.',
  3
)
on conflict do nothing;

-- Seed packages (core set)
insert into public.packages (
  id, category, title, tag, season, summary, locations, duration, image,
  pricing, features, highlights, amenities, available_travel_modes, popular, featured, sort_order
) values
(
  'platinum-short-2025', 'hajj', 'Platinum Short Package', 'Platinum', '',
  'Premium short-duration Hajj with guided spiritual care and close Haramain stays.',
  'Makkah • Madinah • Arafat', '18–22 Days', '/images/hajj-arafat.webp',
  '{"adult":485000,"child":365000,"infant":85000,"currency":"INR","note":"Starting from · per person"}'::jsonb,
  '["Visa assistance","Hotels near Haram","Religious guidance"]'::jsonb,
  '["Close Haram stays","Guided spiritual care","Short-duration Hajj"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Near Haram"},{"key":"transport","title":"Transport","subtitle":"All transfers"},{"key":"meals","title":"Meals","subtitle":"Package meals"},{"key":"support","title":"Support","subtitle":"Group leader"},{"key":"visa","title":"Visa","subtitle":"Full help"}]'::jsonb,
  '["air"]'::jsonb, false, false, 1
),
(
  'platinum-2025', 'hajj', 'Platinum Hajj Package', 'Platinum', '',
  'Full platinum Hajj experience with hospitality rooted in decades of Holy Land service.',
  'Makkah • Madinah • Arafat', '30–35 Days', '/images/kiswah-detail.webp',
  '{"adult":545000,"child":415000,"infant":95000,"currency":"INR","note":"Starting from · per person"}'::jsonb,
  '["Premium hotels","Transport care","Group leader support"]'::jsonb,
  '["Premium hotels","Full spiritual care","Trusted 45+ years"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Luxury stay"},{"key":"transport","title":"Transport","subtitle":"Comfort coaches"},{"key":"meals","title":"Meals","subtitle":"Quality dining"},{"key":"support","title":"Support","subtitle":"Dedicated team"},{"key":"visa","title":"Visa","subtitle":"Full help"}]'::jsonb,
  '["air","road"]'::jsonb, true, true, 2
),
(
  'classic-hajj-2025', 'hajj', 'Business Class Hajj Package', 'Business Class', '',
  'Premium Business Class Hajj from Dubai, UAE — elevated hotel stays, priority transfers, and dedicated support for Indian passport holders.',
  'Makkah • Madinah • Arafat', '28–32 Days', '/images/makkah-clock-tower.webp',
  '{"adult":385000,"child":295000,"infant":72000,"currency":"INR","note":"Contact for Business Class rates"}'::jsonb,
  '["Business Class hotels","Priority Dubai, UAE support","Indian passport holders only"]'::jsonb,
  '["Elevated Business Class comfort","Dubai, UAE departures","Indian passport holders only"]'::jsonb,
  '[{"key":"hotel","title":"Business Hotels","subtitle":"Premium near Haram"},{"key":"transport","title":"Priority Transport","subtitle":"Comfort transfers"},{"key":"meals","title":"Quality Dining","subtitle":"Curated meals"},{"key":"support","title":"Dedicated Support","subtitle":"Dubai team 24/7"},{"key":"visa","title":"Visa Assistance","subtitle":"Full documentation"}]'::jsonb,
  '["air","road"]'::jsonb, true, false, 3
),
(
  'individual-hajj', 'hajj', 'Individual Hajj Planning', 'Custom', 'Flexible',
  'Personalised Hajj planning with enquiry-based dates, rooms, and family support.',
  'Makkah • Madinah', 'Flexible', '/images/theme-pilgrim.webp',
  '{"adult":425000,"child":325000,"infant":78000,"currency":"INR","note":"Custom quote · per person"}'::jsonb,
  '["Private options","Family rooms","Flexible dates"]'::jsonb,
  '["Private options","Family rooms","Flexible dates"]'::jsonb,
  '[{"key":"hotel","title":"Hotel Stay","subtitle":"Quality lodging"},{"key":"transport","title":"Transport","subtitle":"All transfers"},{"key":"meals","title":"Daily Meals","subtitle":"As per package"},{"key":"support","title":"24/7 Support","subtitle":"Always available"},{"key":"visa","title":"Visa Help","subtitle":"Documentation"}]'::jsonb,
  '["air","road"]'::jsonb, false, false, 4
),
(
  'umrah-economy', 'umrah', 'Economy Umrah Package', 'Economy', '',
  'A comfortable & affordable Umrah experience with quality service and care.',
  'Makkah • Madinah', '10–12 Days', '/images/safa-marwa.webp',
  '{"adult":89999,"child":72999,"infant":24999,"currency":"INR","note":"Starting from · per person"}'::jsonb,
  '["Group departure","Shared transport","Visa help"]'::jsonb,
  '["Best for budget travelers","Comfortable stay","Hassle-free journey"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Economy stay"},{"key":"transport","title":"Transport","subtitle":"All ground"},{"key":"meals","title":"Meals","subtitle":"Daily included"},{"key":"support","title":"Support","subtitle":"24/7 care"},{"key":"visa","title":"Visa","subtitle":"Docs help"}]'::jsonb,
  '["air","road"]'::jsonb, true, false, 5
),
(
  'umrah-classic', 'umrah', 'Classic Umrah Package', 'Classic', '',
  'Comfortable Makkah & Madinah stays with a balanced itinerary for families.',
  'Makkah • Madinah', '12–14 Days', '/images/mount-uhud.webp',
  '{"adult":125000,"child":99000,"infant":32000,"currency":"INR","note":"Starting from · per person"}'::jsonb,
  '["Better hotels","Ziyarat tours","Multilingual guide"]'::jsonb,
  '["Family-friendly","Ziyarat tours","Better hotels"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Comfort stay"},{"key":"transport","title":"Transport","subtitle":"All ground"},{"key":"meals","title":"Meals","subtitle":"Daily included"},{"key":"support","title":"Support","subtitle":"Guide care"},{"key":"visa","title":"Visa","subtitle":"Docs help"}]'::jsonb,
  '["air","road"]'::jsonb, false, false, 6
),
(
  'umrah-premium', 'umrah', 'Premium Umrah Package', 'Premium', '',
  'Closer hotels, smoother transfers, and attentive care for a peaceful Umrah.',
  'Makkah • Madinah', '14–16 Days', '/images/luxury-stay.webp',
  '{"adult":185000,"child":145000,"infant":42000,"currency":"INR","note":"Starting from · per person"}'::jsonb,
  '["Near Haram hotels","Private transfers option","Priority support"]'::jsonb,
  '["Near Haram hotels","Smoother transfers","Priority support"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Near Haram"},{"key":"transport","title":"Transport","subtitle":"Private option"},{"key":"meals","title":"Meals","subtitle":"Quality dining"},{"key":"support","title":"Support","subtitle":"Priority care"},{"key":"visa","title":"Visa","subtitle":"Docs help"}]'::jsonb,
  '["air"]'::jsonb, false, false, 7
),
(
  'umrah-individual', 'umrah', 'Individual Umrah Package', 'Custom', 'Flexible',
  'Travel on your preferred dates with rooms sized for adults, children, and infants.',
  'Makkah • Madinah', 'Flexible', '/images/theme-offer-1.webp',
  '{"adult":145000,"child":112000,"infant":35000,"currency":"INR","note":"Custom quote · per person"}'::jsonb,
  '["Choose your dates","Room preference","Family-friendly"]'::jsonb,
  '["Choose your dates","Room preference","Family-friendly"]'::jsonb,
  '[{"key":"hotel","title":"Hotel Stay","subtitle":"Quality lodging"},{"key":"transport","title":"Transport","subtitle":"All transfers"},{"key":"meals","title":"Daily Meals","subtitle":"As per package"},{"key":"support","title":"24/7 Support","subtitle":"Always available"},{"key":"visa","title":"Visa Help","subtitle":"Documentation"}]'::jsonb,
  null, false, false, 8
)
on conflict (id) do nothing;
