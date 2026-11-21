# vincentaze.com

Personal site of Vincent Azé, Founding Partner at Kuma Partners. Static Astro site styled with Tailwind CSS v4, deployed from GitHub to Netlify. Built on the same architecture as mulfinger.com, in the Kuma Partners palette.

Purpose: strengthen the generative engine optimisation (GEO) credibility of kuma.partners, kuma.partners/offsite and theround.kuma.partners by giving AI search engines a second, consistent, machine-readable source for who Vincent is and how he relates to the firm and its offers.

## Tech stack

- Astro 7, fully static output in `dist/`, `build.format: file`
- Tailwind CSS v4 via `@tailwindcss/vite`, plus `@tailwindcss/typography`
- Self-hosted fonts via Fontsource: Newsreader (headings) and Inter (body). No calls to Google.
- `@astrojs/sitemap` for `sitemap-index.xml`
- Netlify: hosting, CDN, HTTPS, Forms
- No front-end framework and no trackers. Three small scripts in `public/`: `menu.js`, `form.js`, `reveal.js`

## Structure

```
src/
  data/
    site.ts        names, links, nav, proof bar. Edit public claims here.
    legal.ts       owner, tax ID, address, hosting: feeds both legal pages and the form notice
    faq.ts         17 questions. Feed Faq.astro on /advisory, the FAQPage schema and /llms-full.txt
    testimonials.ts  eight LinkedIn recommendations, quoted word for word. Feeds Testimonials.astro on home, About and Advisory
    articles.ts    the two Ideas articles (text, dates, related links). Feeds /ideas, /ideas/[slug] and the Article schema
  layouts/Layout.astro
  components/      Seo (JSON-LD graph), Header, Footer, Faq, ContactForm, LegalShell
  pages/           index, about, advisory, ideas, ideas/[slug], contact, legal, privacy, thanks, 404, llms-full.txt.ts
  styles/global.css  design tokens
public/            llms.txt, robots.txt, favicon.svg, og.png, vincent-aze.jpg, menu.js, form.js, reveal.js
scripts/verify.mjs post-build checks
netlify.toml       build, www redirect, security headers, caching
KUMA-SITES-SNIPPET.md  JSON-LD and link text to add to the three Kuma sites
```

## Local development

Node 22.

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # build + verify
```

## GEO layer

Entity graph in `src/components/Seo.astro`, on every page: Person `https://vincentaze.com/#vincent-aze` (executive coach and strategic advisor, homeLocation Lisbon, knowsLanguage en and fr, worksFor Kuma, colleague Sven, sameAs LinkedIn), Organization and ProfessionalService `https://www.kuma.partners/#organization` (founders Vincent and Sven, sameAs offsite and The Round), a stub Person for Sven at `https://mulfinger.com/#sven-mulfinger` (same id as on mulfinger.com), three Service nodes (1:1 coaching, 14-Day Leadership Friction Scan, offsites), WebSite and WebPage (ProfilePage on /about, CollectionPage on /ideas, ContactPage on /contact). Extra nodes: FAQPage with 17 questions on /advisory and Article with Vincent as author on each article. The Event node was removed after Portugal Tech Week (11 November 2026). No alumniOf.

Kuma URL decision: kuma.partners declares `https://www.kuma.partners/` as its canonical, so every link and schema id here uses the www form. Make sure the apex redirects to www (301) and use the same form on the Kuma sites, see `KUMA-SITES-SNIPPET.md`. The Round stays on `https://theround.kuma.partners`.

`llms.txt` and `llms-full.txt` follow llmstxt.org and carry an entity summary, ecosystem routing, a disambiguation note and the article list. `robots.txt` allows the main AI crawlers.

## Positioning

Lead with difficult conversations (decided by Sven, 21 November 2026). Central line: "I partner with founders and executives to bridge the gap between silence and high performance." Opening line on the home page: "Some conversations are damn hard to have." The human side of AI is a secondary theme, kept on Ideas and the FAQ.

## Claims policy

Vincent's own briefing (`Vincent_Aze_Website_Content_SEO_GEO.docx`, 24 October 2026) is the source of truth, confirmed by Sven on 25 October 2026. Decisions taken: title Founding Partner, offer name 14-Day Leadership Friction Scan, contact vincent@kuma.partners, base Lisbon, principal languages English and French.

The briefing avoids dates, degrees and job titles it cannot confirm, and so does the site. The employers GL Trade, SunGard, FIS and Glownet appear only as "work associated with". The former CRO role from his LinkedIn headline is deliberately not claimed, because the briefing treats it as unconfirmed.

Confirmed by Sven on 21 November 2026 from Vincent's own brief: 26 years exploring and training in communication and human behaviour, around ten years as a full-time executive coach (his LinkedIn shows independent practice from March 2017) and hundreds of people worked with. Refresh "26 years" each year. London and Hong Kong are stated as places he worked. Berlin and Barcelona appear in Vincent's brief but are not on the site until he confirms them.

Testimonials: eight LinkedIn recommendations, quoted verbatim and dated, each with its source line. Publish only with each person's permission.

Not stated anywhere, on purpose: client names, testimonials, fees, degrees, the international Round pilot.

## Content to complete before launch

- `src/data/legal.ts`: tax ID and full postal address. Both legal pages show TODO until then, and `npm run verify` prints a warning. Both pages need a lawyer or gestor review and a retention period set by the controller.
- Testimonials: ask the eight authors for permission to publish their LinkedIn words with name and role (see `testimonials.ts`). Remove any entry that is declined.
- No booking link: the contact page uses the form and vincent@kuma.partners only. Add a link to /contact if Vincent gets one, and update the verify check that blocks Calendly.
- Portugal Tech Week has passed. The ideas page now says "Recent talk". Remove it if the talk did not take place as listed.
- Align LinkedIn with the site: headline, title (Founding Partner), base (Lisbon) and the CRO line. Search engines compare them.
- Confirm the publication date of the two articles (`articles.ts`, currently 25 October 2026).
- Search Console and Bing Webmaster Tools: verify the domain, submit `sitemap-index.xml`.
- Add a speaking photograph and an event photograph when rights are secured. The site carries one portrait.

## Possible next steps from the briefing

Six more articles are proposed in section 10 of the briefing. Write them only from lived experience or attributed research. Create a separate /speaking page only once there is an archive of talks.

## Deployment

GitHub repo `sven353/vincentaze.com`, branch `main`. Netlify builds every push (`npm run build`, publish `dist`). Upload through the GitHub web interface (Add file, Upload files), or use git. Files deleted locally must be deleted in the repo by hand.

## DNS

Point the apex `A` record to `75.2.60.5` and `CNAME www` to `<project-name>.netlify.app`. Keep existing MX, SPF, DKIM and DMARC records. Netlify issues the certificate once DNS resolves. `netlify.toml` redirects www to the apex.

## Forms

Netlify Form `executive-diagnostic` (name kept from the first deploy), with honeypot, optional enquiry type and required privacy consent. After the first deploy add an email notification in Netlify (Forms, Form notifications) to the address that should receive enquiries.

## Writing rules

UK spelling, no serial comma, no em dashes, no bold labels, short paragraphs. `npm run verify` fails on em dashes.

## Changelog

- 2026-11-21 (v3): Repositioned on difficult conversations. New home hero (USP), five recognisable situations, cost of silence, what becomes possible, eight real testimonials on home, About and Advisory, About arc with 26 years and hundreds of people, four advisory pathways, 17-question FAQ, updated schema and llms files. Event band, Event schema and the old /work page removed.
- 2026-10-25 (v2): Rebuilt on Vincent's briefing. Five pages (Home, About, Advisory, Ideas, Contact), 14-question FAQ, two Ideas articles with Article schema, enquiry-type field, Founding Partner and Lisbon throughout, www.kuma.partners as the Kuma URL, 14-Day Leadership Friction Scan, vincent@kuma.partners. /work removed.
- 2026-10-17 (v1): Initial build.
