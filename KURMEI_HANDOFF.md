# KURMEI — HANDOFF FOR THE NEXT AI AGENT

## 1. What the user asked for
The user wants Kurmei (`kurmei.com`) to become a premium, interactive, source-first history of Sudan — effectively a connected historical atlas/knowledge graph covering Sudan and Sudan-related world events.

The core promise is:
- “Sudan, connected.”
- Every event, person, place and connection.
- Do not just show what happened; show what happened before it, what it changed, where it happened and which sources support the claim.

Primary public axes:
1. Timeline
2. Map
3. Connections / knowledge graph

Core entities:
- events
- people
- places
- organizations
- sources
- documents
- claims
- relationships
- media
- periods
- topics

Relationship types to support:
- caused
- contributed_to
- preceded
- followed_by
- occurred_during
- located_in
- involved
- influenced
- opposed
- allied_with
- related_to
- mentioned_in

Editorial states:
- draft
- proposed
- review
- approved
- published
- archived

Historical uncertainty must be explicit:
- date precision: exact / approximate / range / century / era / unknown
- location precision: exact / approximate / region / route / unknown
- relationship confidence
- distinguish direct causality from broader context or contested interpretation

## 2. Design direction
Premium digital museum + modern technology product, Sudan/Nubian-inspired.
- dark charcoal / near-black
- cream / sand / gold
- subtle Nile blue / earth accents
- Nubian geometric pattern language
- elegant serif display typography + clean sans-serif UI
- strong historical photography/maps/illustrations when licensed
- avoid cheesy overuse of ancient-Egypt aesthetics
- easy exploration

## 3. What I did in this iteration
Starting from the supplied Kurmei v0.3 package, I rebuilt the scaffold into v0.4 and fixed broken prototype code.

Implemented:
- Shared seed data in `app/data.ts` for events and places.
- Fixed the homepage event rendering.
- Fixed the map page/imports and centralized map data.
- Added a working prototype search over seeded events and places.
- Added consistent navigation and footer.
- Added About page.
- Added Methodology page.
- Added Sources page.
- Added Contact page.
- Added Privacy Policy template.
- Added Terms of Use template.
- Added Support Kurmei page.
- Added `SupportBanner` CTA.
- Added `AdSlot` component and conditional Google AdSense script.
- Added AdSense environment variables.
- Added `public/ads.txt` placeholder; no fake publisher ID.
- Added `public/robots.txt` with `/admin` disallowed.
- Added dynamic sitemap.
- Added `/api/health`.
- Added `.env.example`.
- Added admin warning that authentication is not implemented.
- Updated README.
- Added this handoff document.

## 4. Monetization requested
The user explicitly wants the site to make money. Monetization direction:

### AdSense
Build AdSense into the architecture, but do NOT pretend the site is approved.
Required later:
- Google AdSense account/site verification
- sufficient original useful content
- privacy/cookie/consent implementation as applicable
- real contact/about/methodology/source pages
- Search Console + Analytics
- exact Google-provided publisher line in `ads.txt`
- ad placements that do not damage UX

Current code supports this through:
- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_HOME_SLOT`
- `AdSlot.tsx`

Ads show placeholders until configured.

### Support payments
The user wants support/donations. Because the site operator is in the UAE, do not automatically describe a payment button as a charitable donation campaign. Use “Support Kurmei” unless the legal structure/authorization is established.

Current code supports:
- `NEXT_PUBLIC_SUPPORT_URL`
- `/support` page

The next agent should connect the actual payment provider only after confirming the operator’s legal/payment setup.

### Later revenue
Potential future layers:
- Kurmei Plus subscription
- ad-free experience
- advanced historical maps
- research collections/export tools
- books/affiliate links where appropriate
- institutional licensing
- sponsorships
- direct advertising

## 5. Book Agent requirement
The user wants an AI research agent that can receive a book/PDF and extract structured historical data. Required workflow:

BOOK / PDF
↓
OCR / TEXT EXTRACTION
↓
CHAPTERS + PAGES
↓
AI RESEARCH AGENT
↓
EVENTS / PEOPLE / PLACES / DATES / ORGANIZATIONS / CLAIMS / RELATIONSHIPS
↓
DUPLICATE DETECTION
↓
CONTRADICTION CHECK
↓
SOURCE VERIFICATION
↓
USER REVIEW
↓
APPROVE / EDIT / REJECT / MERGE
↓
KURMEI DATABASE
↓
TIMELINE + MAP + SEARCH + GRAPH

Agent rules:
- never invent facts unsupported by supplied source
- never rewrite uncertainty into certainty
- never publish directly
- never erase an existing record because a new source disagrees
- never claim causality without evidence
- proposals must include entity type, title/name, dates, date precision, place/coordinates only if supported, summary, claims, relationships, source ID, page/section evidence, confidence, uncertainty notes and possible duplicate IDs
- conflicting sources remain separate claims with provenance for human review
- process only books/documents the user has lawful rights/permission to process
- do not redistribute copyrighted book text; store only what is needed for verification, such as short evidence snippets/locations

## 6. Map requirement
Map is a core feature. Future production map should support:
- event markers
- places
- battle locations
- archaeological sites
- people
- political movements
- migration
- trade routes
- historical kingdoms
- colonial boundaries
- modern borders
- time slider (`2500 BCE → 2026`)
- map filters
- uncertainty visualization
- map → event deep links
- historical boundary GeoJSON layers
- routes / battle movements
- eventually “Play History” animation

Current prototype uses Leaflet + OpenStreetMap and seeded place markers.

## 7. Backend architecture still required
Recommended direction:
- Next.js App Router
- PostgreSQL
- PostgreSQL full-text search first; vector/semantic search later
- private object storage for books/media
- authentication + RBAC for admin
- extraction/OCR worker
- LLM API for structured extraction/synthesis
- persistent AI review queue
- audit/revision history
- historical GeoJSON storage/layers
- GitHub + Vercel or comparable Node host

Suggested database entities/tables:
- events
- people
- places
- organizations
- sources
- documents
- document_pages
- claims
- relationships
- media
- periods
- topics
- proposals
- revisions
- users
- audit_logs

## 8. Admin requirements
Admin should eventually allow the owner to:
- add/edit/remove events
- add/edit/remove people
- add/edit/remove places
- manage sources/documents
- upload books privately
- run extraction jobs
- inspect page-level evidence
- approve/edit/reject/merge AI proposals
- resolve duplicates
- handle contradictory claims
- edit map coordinates/boundaries/routes
- publish/unpublish/archive
- see revision history/audit logs

CRITICAL: do not expose production admin without authentication/RBAC.

## 9. Content and research direction
Initial source foundations previously identified include institutional and archival material such as:
- Library of Congress Sudan Country Study material
- UNESCO documentation for Kerma and Meroë
- Sudan Archaeological Research Society / Sudan Memory materials

The next agent should verify rights/terms and build a properly attributed source registry rather than copying copyrighted content.

## 10. AdSense readiness checklist
Before applying:
- substantial original historical content
- no mass AI filler
- working About
- working Contact with a real address configured
- Privacy Policy finalized
- Terms finalized
- cookie/consent handling as applicable
- Sources/Methodology page
- copyright/takedown process
- clear attribution
- sitemap.xml
- robots.txt
- search
- no empty template pages exposed as if complete
- Search Console
- Analytics
- ads.txt after publisher ID is available

## 11. Current limitations / what is left
The current package is NOT production-ready. The remaining work is substantial:

### Highest priority
1. Add authentication/RBAC and protect `/admin`.
2. Add PostgreSQL schema + migrations.
3. Replace prototype managers with real CRUD.
4. Add private document/object storage.
5. Build PDF/OCR/text extraction pipeline with page/chapter references.
6. Build the research agent and structured proposal schema.
7. Persist review queue with approve/edit/reject/merge.
8. Add revision history and audit logs.
9. Build full search/filtering.
10. Expand the historical dataset dramatically with sourced records.

### Map
11. Add historical boundaries and GeoJSON.
12. Add time slider.
13. Add event/people/routes/battle layers.
14. Add uncertainty visualization.

### Public site
15. Replace prototype event pages with real source-backed records.
16. Add person/place/source detail pages backed by DB.
17. Build real knowledge graph visualization.
18. Add media/image rights metadata and optimized visual presentation.
19. Add accessibility and performance review.
20. Add structured metadata/OG images/schema.org where appropriate.

### Monetization
21. Finalize legal/privacy/cookie implementation.
22. Configure real contact channel.
23. Configure lawful support-payment flow.
24. Apply for AdSense only after substantial content and policy readiness.
25. Add exact approved AdSense publisher entry to `ads.txt`.
26. Add analytics and conversion/support measurement.

## 12. Do not do these things
- Do not claim the site is production-ready while admin has no auth.
- Do not invent historical facts.
- Do not silently convert disputed claims into facts.
- Do not use AI-generated filler just to increase page count for AdSense.
- Do not upload copyrighted books to public GitHub.
- Do not invent an AdSense publisher ID.
- Do not automatically call support payments charitable donations.
- Do not publish AI book-agent output without human review.
- Do not make political/editorial judgments about Sudanese political actors; present documented facts, sources and competing interpretations neutrally.

## 13. Immediate next build target
The next AI agent should turn this scaffold into a real data-backed application. Recommended sequence:

A. inspect and run the repo
B. install dependencies and confirm `npm run build`
C. add PostgreSQL + ORM/migrations
D. add auth/RBAC
E. build event/place/person/source CRUD
F. build document upload/storage
G. implement Book Agent extraction + proposal persistence
H. implement review/merge workflow
I. connect public pages to database
J. implement historical map layers/time slider
K. seed a carefully sourced initial corpus
L. finalize legal/privacy/contact/consent
M. configure AdSense and support payments only after approval/legal setup
N. deploy to staging, test, then production at `kurmei.com`
