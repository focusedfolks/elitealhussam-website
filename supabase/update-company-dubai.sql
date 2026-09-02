  -- Run in Supabase SQL editor to refresh public company contact details
  -- (seed insert uses ON CONFLICT DO NOTHING, so existing rows need this update)

  update public.site_settings
  set value = '{
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
    "address": "No. 54, M Floor, Smart Eyes Business Centre, AG House Building, P.O. Box: 35127, Dubai, UAE",
    "offices": [
      {
        "id": "dubai",
        "city": "Dubai",
        "label": "Dubai Office",
        "companyName": "Elite Alhussam Travel and Tourism L.L.C",
        "lines": [
          "No. 54, M Floor",
          "Smart Eyes Business Centre",
          "AG House Building",
          "P.O. Box: 35127",
          "Dubai, UAE"
        ]
      }
    ],
    "social": {
      "facebook": "https://www.facebook.com/AlhussamToursandtravel/?modal=admin_todo_tour",
      "twitter": "https://twitter.com/AlhussamTravel",
      "youtube": "https://www.youtube.com/@alhussamhajumrahservice6083"
    }
  }'::jsonb,
  updated_at = now()
  where key = 'company';

  update public.site_settings
  set value = '{
    "intro": "A pilgrimage to the holy land is a sacred mission for spiritual enlightenment. Makkah is Allah’s chosen land. Millions of Muslims visit the city of Qibla for peace and tranquillity. Al Hussam is a reliable name with four decades of spotless reputation for Hajj & Umrah services.",
    "legacy": "Al Hussam is a Saudi-based company predominantly operating in hospitality management, originally known as Aziz Khogeer group Hotels, with 45 years of experience in rendering Hajj & Umrah services. The company has impeccable lineage from Abdul Aziz Khogeer Hotels Establishment.",
    "profile": "Our leadership brings decades of Holy Land hospitality experience - serving pilgrims with organised care, quality stays, and sincere guidance throughout the sacred journey.",
    "india": "Elite Alhussam Travel and Tourism L.L.C operates from Dubai, UAE. Hajj services are strictly for Indian passport holders only, with Umrah packages arranged for eligible travellers through our Dubai office.",
    "leadership": "Managing Director Mr. Basheer Ahmed continues this tradition of organised, experienced and genuine tour operation with top-class accommodation and efficient service for elite and regular guests alike."
  }'::jsonb,
  updated_at = now()
  where key = 'about';

  -- Remove year-range season labels from package cards
  update public.packages
  set season = '', updated_at = now()
  where season in ('2025 – 26', '2026 – 27');

  -- Upgrade Classic Hajj to Business Class Hajj Package
  update public.packages
  set
    title = 'Business Class Hajj Package',
    tag = 'Business Class',
    summary = 'Premium Business Class Hajj from Dubai, UAE — elevated hotel stays, priority transfers, and dedicated support for Indian passport holders.',
    pricing = '{"adult":385000,"child":295000,"infant":72000,"currency":"INR","note":"Contact for Business Class rates"}'::jsonb,
    features = '["Business Class hotels","Priority Dubai, UAE support","Indian passport holders only"]'::jsonb,
    highlights = '["Elevated Business Class comfort","Dubai, UAE departures","Indian passport holders only"]'::jsonb,
    amenities = '[{"key":"hotel","title":"Business Hotels","subtitle":"Premium near Haram"},{"key":"transport","title":"Priority Transport","subtitle":"Comfort transfers"},{"key":"meals","title":"Quality Dining","subtitle":"Curated meals"},{"key":"support","title":"Dedicated Support","subtitle":"Dubai team 24/7"},{"key":"visa","title":"Visa Assistance","subtitle":"Full documentation"}]'::jsonb,
    updated_at = now()
  where id = 'classic-hajj-2025';

-- Package restructure: Umrah first (4 tiers), Hajj 3 tiers
update public.packages set published = false, updated_at = now()
where id in ('platinum-short-2025', 'individual-hajj', 'umrah-classic', 'umrah-individual');

insert into public.packages (
  id, category, title, tag, season, summary, locations, duration, image,
  pricing, features, highlights, amenities, available_travel_modes, popular, featured, sort_order, published
) values
(
  'umrah-economy', 'umrah', 'Economic Umrah Package', 'Economic', '',
  'A comfortable & affordable Umrah from Dubai, UAE — quality hotels, transport, and visa support handled end-to-end.',
  'Makkah • Madinah', '10–12 Days', '/images/safa-marwa.webp',
  '{"adult":89999,"child":72999,"infant":24999,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Group departure from Dubai","Shared transport","Visa help"]'::jsonb,
  '["Best for budget-conscious travellers","Comfortable Dubai · UAE departure","Hassle-free Umrah journey"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Economy stay"},{"key":"transport","title":"Transport","subtitle":"All ground"},{"key":"meals","title":"Meals","subtitle":"Daily included"},{"key":"support","title":"Support","subtitle":"24/7 care"},{"key":"visa","title":"Visa","subtitle":"Docs help"}]'::jsonb,
  '["air","road"]'::jsonb, true, false, 1, true
),
(
  'umrah-premium', 'umrah', 'Premium Umrah Package', 'Premium', '',
  'Closer hotels, smoother transfers, and attentive care for a peaceful Umrah from Dubai, UAE.',
  'Makkah • Madinah', '14–16 Days', '/images/luxury-stay.webp',
  '{"adult":185000,"child":145000,"infant":42000,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Near Haram hotels","Private transfers option","Priority support"]'::jsonb,
  '["Near Haram hotels","Smoother transfers","Priority Dubai support"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Near Haram"},{"key":"transport","title":"Transport","subtitle":"Private option"},{"key":"meals","title":"Meals","subtitle":"Quality dining"},{"key":"support","title":"Support","subtitle":"Priority care"},{"key":"visa","title":"Visa","subtitle":"Docs help"}]'::jsonb,
  '["air"]'::jsonb, false, false, 2, true
),
(
  'umrah-group', 'umrah', 'Group Umrah Package', 'Group', '',
  'Coordinated group Umrah departures from Dubai, UAE — shared hotels, transport, and dedicated group leader support.',
  'Makkah • Madinah', 'TBC', '/images/family-travel.webp',
  '{"adult":0,"child":0,"infant":0,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Group coordination","Shared transport","Dubai, UAE departures"]'::jsonb,
  '["Ideal for families & friends travelling together","Group leader support throughout","Package details — coming soon"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Group allocation"},{"key":"transport","title":"Transport","subtitle":"Shared coaches"},{"key":"meals","title":"Meals","subtitle":"As per package"},{"key":"support","title":"Support","subtitle":"Group leader"},{"key":"visa","title":"Visa","subtitle":"Group processing"}]'::jsonb,
  '["air","road"]'::jsonb, false, false, 3, true
),
(
  'umrah-customise', 'umrah', 'Customise Your Umrah', 'Customise', '',
  'Tell us your preferred dates, group size, and hotel class — our Dubai team will tailor your Umrah itinerary.',
  'Makkah • Madinah', 'Flexible', '/images/theme-offer-1.webp',
  '{"adult":145000,"child":112000,"infant":35000,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Choose your dates","Room preference","Family-friendly"]'::jsonb,
  '["Flexible Dubai · UAE planning","Tailored hotel & transport options","Enquiry-based itinerary — contact our team"]'::jsonb,
  '[{"key":"hotel","title":"Hotel Stay","subtitle":"Quality lodging"},{"key":"transport","title":"Transport","subtitle":"All transfers"},{"key":"meals","title":"Daily Meals","subtitle":"As per package"},{"key":"support","title":"24/7 Support","subtitle":"Always available"},{"key":"visa","title":"Visa Help","subtitle":"Documentation"}]'::jsonb,
  null, false, false, 4, true
),
(
  'platinum-2025', 'hajj', 'Platinum Hajj Package', 'Platinum', '',
  'Full platinum Hajj from Dubai, UAE — premium Haramain stays, guided spiritual care, and decades of trusted hospitality.',
  'Makkah • Madinah • Arafat', '30–35 Days', '/images/kiswah-detail.webp',
  '{"adult":545000,"child":415000,"infant":95000,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Premium hotels near Haram","Full Hajj guidance","Indian passport holders only"]'::jsonb,
  '["Premium Haramain hotels","Full spiritual care","Indian passport holders only"]'::jsonb,
  '[{"key":"hotel","title":"Hotel","subtitle":"Luxury near Haram"},{"key":"transport","title":"Transport","subtitle":"Comfort coaches"},{"key":"meals","title":"Meals","subtitle":"Quality dining"},{"key":"support","title":"Support","subtitle":"Dedicated team"},{"key":"visa","title":"Visa","subtitle":"Full help"}]'::jsonb,
  '["air","road"]'::jsonb, true, true, 5, true
),
(
  'classic-hajj-2025', 'hajj', 'Business Hajj Package', 'Business', '',
  'Business Class Hajj from Dubai, UAE — elevated stays, priority transfers, and dedicated support for Indian passport holders.',
  'Makkah • Madinah • Arafat', '28–32 Days', '/images/makkah-clock-tower.webp',
  '{"adult":385000,"child":295000,"infant":72000,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Business Class hotels","Priority Dubai, UAE support","Indian passport holders only"]'::jsonb,
  '["Elevated Business Class comfort","Dubai, UAE departures","Indian passport holders only"]'::jsonb,
  '[{"key":"hotel","title":"Business Hotels","subtitle":"Premium near Haram"},{"key":"transport","title":"Priority Transport","subtitle":"Comfort transfers"},{"key":"meals","title":"Quality Dining","subtitle":"Curated meals"},{"key":"support","title":"Dedicated Support","subtitle":"Dubai team 24/7"},{"key":"visa","title":"Visa Assistance","subtitle":"Full documentation"}]'::jsonb,
  '["air","road"]'::jsonb, true, false, 6, true
),
(
  'hajj-budget', 'hajj', 'Budget Hajj Package', 'Budget', '',
  'Value-focused Hajj from Dubai, UAE for Indian passport holders — organised rites, comfortable stays, and group support.',
  'Makkah • Madinah • Arafat', '28–32 Days', '/images/hajj-arafat.webp',
  '{"adult":385000,"child":295000,"infant":72000,"currency":"INR","note":"Details on enquiry"}'::jsonb,
  '["Organised Hajj rites","Shared transport","Indian passport holders only"]'::jsonb,
  '["Best value Hajj from Dubai","Group leader throughout","Indian passport holders only"]'::jsonb,
  '[{"key":"hotel","title":"Hotel Stay","subtitle":"Quality lodging"},{"key":"transport","title":"Transport","subtitle":"All transfers"},{"key":"meals","title":"Daily Meals","subtitle":"As per package"},{"key":"support","title":"24/7 Support","subtitle":"Always available"},{"key":"visa","title":"Visa Help","subtitle":"Documentation"}]'::jsonb,
  '["air","road"]'::jsonb, false, false, 7, true
)
on conflict (id) do update set
  category = excluded.category,
  title = excluded.title,
  tag = excluded.tag,
  summary = excluded.summary,
  locations = excluded.locations,
  duration = excluded.duration,
  image = excluded.image,
  pricing = excluded.pricing,
  features = excluded.features,
  highlights = excluded.highlights,
  amenities = excluded.amenities,
  available_travel_modes = excluded.available_travel_modes,
  popular = excluded.popular,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  published = excluded.published,
  updated_at = now();

