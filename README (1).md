# 4VISION – Construction & Interiors website

Premium, responsive website for 4VISION (Pune home interiors). React + Vite + TypeScript + Tailwind on the front end, Fastify on the back end for the enquiry form.

## Quick start

```bash
npm install
cp .env.example .env          # then fill in the values listed below
npm run dev                    # frontend on http://localhost:5173
npm run api                    # enquiry API on http://localhost:8787 (run in a second terminal)
```

Production:

```bash
npm run build                  # type-checks and builds to dist/
npm start                      # serves dist/ and the /api routes on PORT (default 8787)
```

## What is built

| Area | Status |
| --- | --- |
| Pages | Home, About, Services, Projects (with filter, lightbox, detail pages), Packages (with comparison and inclusions), Locations, Contact, Privacy, Terms, 404 |
| WhatsApp | Floating button, mobile bar, every service/package/location/project CTA. Uses `wa.me/918999377902` with prefilled, package-specific messages |
| Calls | `tel:+918999377902` and `tel:+918805405738` wherever a number appears |
| Email | `mailto:` links with the subject and default message pre-filled. Shown only when `VITE_CONTACT_EMAIL` is set |
| Instagram | Footer and Contact links. Shown only when `VITE_INSTAGRAM_URL` is set |
| Enquiry form | Validated with the same Zod schema on the browser and the server. Honeypot anti-spam, 5 submissions per IP per 10 minutes, success shown only after the server confirms storage, WhatsApp continuation |
| SEO | Unique title, description, canonical and Open Graph per page, LocalBusiness JSON-LD (verified details only), robots.txt, sitemap.xml, GA4 and Search Console hooks |
| Performance | Routes code-split; images lazy-loaded |

## Configuration

All values live in `.env`. Nothing fake ships: optional channels stay hidden until you add real values.

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_EMAIL` | Official business email (shows email links) |
| `VITE_INSTAGRAM_URL` | Actual 4VISION Instagram profile URL |
| `VITE_MAPS_EMBED_URL` | Google Maps embed URL, once the business address is published |
| `VITE_SITE_URL` | Live domain, used for canonical URLs and structured data |
| `VITE_GA_ID` | Google Analytics 4 measurement ID |
| `VITE_GSC_VERIFICATION` | Search Console HTML-tag verification token |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Outgoing mail server for enquiry notifications (server only) |
| `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL` | Sender and recipient for enquiry emails (server only) |

Secrets (`SMTP_*`, `LEAD_*`) are read only on the server and never sent to the browser.

## Items still needed before launch

1. **Real project photography.** Gallery items and service/hero images are placeholders. Drop files into `public/images/` using the names in `public/images/README.md`. Until a file exists, a branded panel is shown. Gallery items are labelled "Sample design" and `isDemo: true` in `src/data/content.ts`. Set it to `false` when a real project is added.
2. **Verified client testimonials.** The three homepage testimonials are clearly marked placeholders in `src/data/content.ts`.
3. **Business address.** Needed for the office map and for Google Business Profile. The Locations and Contact pages say the map will appear once the address is published.
4. **Email and Instagram.** Set `VITE_CONTACT_EMAIL` and `VITE_INSTAGRAM_URL`. Without them those buttons stay hidden.
5. **Domain.** Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`, and set `VITE_SITE_URL`.
6. **Analytics and verification.** Set `VITE_GA_ID` and `VITE_GSC_VERIFICATION`.
7. **Legal pages.** Privacy Policy and Terms are drafts. Have them reviewed before publishing.
8. **Enquiry storage.** Enquiries are appended to `data/enquiries.jsonl`, which is fine for a launch-stage site. For higher volume or a CRM, move storage to PostgreSQL. The `enquiries` insert in `server/index.ts` is the only place to change.
9. **Package pricing.** ₹14,99,000/- (2 BHK) and ₹19,99,000/- (3 BHK) come from the brief. Confirm them before launch, since the site says they are subject to terms and conditions.

## Content rules followed

- No invented awards, years of experience, certifications, project counts, warranties or extra package inclusions.
- The homepage statistics are limited to counts that are verifiable from the brief: 8 services, 9 Pune localities, 2 packages.
- No fake email addresses, Instagram handles or reviews.

## Folder layout

```
shared/enquiry.ts        Zod schema shared by form and server
server/index.ts          Fastify API, rate limiting, storage, email, static hosting
src/data/content.ts      All copy, services, projects, packages, FAQs
src/lib/config.ts        WhatsApp, phone, email, Instagram, analytics configuration
src/components/          Layout, navigation, footer, floating contact, enquiry form, UI primitives
src/pages/               One file per route
public/                  robots.txt, sitemap.xml, favicon, image folders
```
