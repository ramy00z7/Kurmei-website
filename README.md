# Kurmei v0.4 — website + monetization readiness scaffold

## What was applied
- Rebuilt the v0.3 scaffold into a coherent, runnable Next.js site.
- Fixed invalid JSX/imports and the missing seed event dataset.
- Added public About, Methodology, Sources, Contact, Privacy, Terms and Support pages.
- Added footer navigation and a Support Kurmei CTA.
- Added AdSense-ready script/slot components controlled by environment variables; ads remain placeholders until approval/configuration.
- Added `public/ads.txt` placeholder without inventing a publisher ID.
- Added `robots.txt` and dynamic sitemap.
- Added `/api/health`.
- Added a prototype search over seeded events/places.
- Added map data as a shared dataset.
- Added admin security warning and kept `/admin` disallowed in robots.
- Added `.env.example` for contact, support, AdSense and future backend services.

## Important production caveats
This is still a scaffold, not a production backend. `/admin` has no authentication. There is no PostgreSQL, object storage, real CRUD, document extraction worker, LLM integration, review persistence, audit log or production search index yet.

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Build check
```bash
npm run build
```

## Environment
Copy `.env.example` to `.env.local`. Before launch, configure at minimum:
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_SUPPORT_URL` (only after the legal/payment structure is ready)
- AdSense client + slot IDs after Google approval

## AdSense
Do not fabricate a publisher ID in `ads.txt`. After approval, replace the placeholder with the exact publisher line supplied by Google.

## Support payments
The site deliberately calls this “Support Kurmei” rather than automatically labeling it charitable fundraising. Any UAE charitable fundraising/donation mechanism needs the appropriate legal/authorized structure.

## Next AI-agent handoff
See `KURMEI_HANDOFF.md` for the full project brief, what was requested, what has been built, and the remaining production work.
