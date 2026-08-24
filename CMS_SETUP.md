# Supabase CMS setup — ELITE ALHUSSAM

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Open **Project Settings → API**.
3. Copy **Project URL** and **anon public** key.

## 2. Add environment variables

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Restart the Vite dev server after saving `.env`.

For Vercel: add the same two variables in **Project Settings → Environment Variables**.

## 3. Run the database schema

1. In Supabase, open **SQL Editor**.
2. Paste and run the full contents of `supabase/schema.sql`.
3. This creates tables, RLS policies, and seed data (packages, company, about, testimonials).

## 4. Create an admin user

1. Supabase → **Authentication → Users → Add user**.
2. Create with email + password (confirm email if required, or disable email confirm in Auth settings for testing).
3. Sign in at `/admin/login` on your site.

Anyone who can authenticate is treated as an admin (RLS allows authenticated full access).

## 5. Use the CMS

Open `/admin` for:

- **Packages** — prices, images, features, publish/draft
- **Blog** — Markdown posts
- **Leads** — form enquiries (also still opens WhatsApp/email)
- **Testimonials** — homepage quotes
- **Company** — phones, WhatsApp, email, social
- **About copy** — about page paragraphs

The public site reads from Supabase when configured, and falls back to built-in content if Supabase is offline or empty.

## 6. Optional: seed blog posts

Blog seed is not in SQL (body is long Markdown). Add posts from **Admin → Blog → New post**, or keep using the Markdown files in `content/blog/` until you migrate them.
