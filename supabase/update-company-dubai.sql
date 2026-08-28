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
  "leadership": "Managing Director Mr. B. Sameer Ahmed continues this tradition of organised, experienced and genuine tour operation with top-class accommodation and efficient service for elite and regular guests alike."
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

