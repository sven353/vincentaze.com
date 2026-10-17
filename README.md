# vincentaze.com

Personal site of Vincent Azé, Managing Partner at Kuma Partners. Static Astro site styled with Tailwind CSS v4, deployed from GitHub to Netlify. Built on the same architecture as mulfinger.com, in the Kuma Partners palette.

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
    faq.ts         6 questions. Feed Faq.astro on /work, the FAQPage schema and /llms-full.txt
  layouts/Layout.astro
  components/      Seo (JSON-LD graph), Header, Footer, Faq, ContactForm, LegalShell
  pages/           index, about, work, contact, legal, privacy, thanks, 404, llms-full.txt.ts
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

Entity graph in `src/components/Seo.astro`, on every page: Person `https://vincentaze.com/#vincent-aze` (worksFor Kuma, colleague Sven, sameAs LinkedIn and kuma.partners), Organization and ProfessionalService `https://kuma.partners/#organization` (founders Vincent and Sven, sameAs offsite and The Round), a stub Person for Sven at `https://mulfinger.com/#sven-mulfinger` (same id as on mulfinger.com), three Service nodes (14-Day Diagnostic, offsites, The Round), WebSite, WebPage (ProfilePage on /about, ContactPage on /contact), FAQPage on /work, and an Event node for the Lisbon masterclass on the home page. No alumniOf.

The Kuma organisation id is the same on every site in the ecosystem. Use it on kuma.partners too, see `KUMA-SITES-SNIPPET.md`.

`llms.txt` and `llms-full.txt` follow llmstxt.org and carry an entity summary, ecosystem routing and a disambiguation note. `robots.txt` allows the main AI crawlers.

## Claims policy

Only claims confirmed by Vincent or Sven appear on the site. Sources so far: Vincent's LinkedIn profile (17 Oct 2026), the Kuma Partners positioning notes and Sven's confirmation of the Lisbon masterclass.

Not stated anywhere, on purpose: Vincent's base city, employers behind "former CRO", education, languages, client names, testimonials, fees.

## Content to complete before launch

- `src/data/legal.ts`: tax ID and full postal address. Both legal pages show TODO until then. `npm run verify` prints a warning.
- Confirm the official title: LinkedIn says Managing Partner, Sven's notes say Founding Partner. Change `title` in `src/data/site.ts`.
- Confirm the contact email: currently contact@kuma.partners, and the "reply within 24 to 48 hours" promise on the form.
- Add employers, years, education and languages to `src/pages/about.astro` and the schema once Vincent supplies them.
- Process wording on home and /work paraphrases the Kuma diagnostic description. Vincent should approve it.
- The paragraph "From Vincent's writing" paraphrases his LinkedIn post about two product managers. Confirm he is happy for it to appear.
- Remove the Event node in `Seo.astro`, the event band on home and the line on /about after 11 November 2026.
- Review both legal pages with a lawyer or gestor.

## Deployment

GitHub repo `sven353/vincentaze.com`, branch `main`. Netlify builds every push (`npm run build`, publish `dist`). Upload through the GitHub web interface (Add file, Upload files), or use git. Files deleted locally must be deleted in the repo by hand.

## DNS

Point the apex `A` record to `75.2.60.5` and `CNAME www` to `<project-name>.netlify.app`. Keep existing MX, SPF, DKIM and DMARC records. Netlify issues the certificate once DNS resolves. `netlify.toml` redirects www to the apex.

## Forms

Netlify Form `executive-diagnostic`, with honeypot and required privacy consent. After the first deploy add an email notification in Netlify (Forms, Form notifications) to the address that should receive enquiries.

## Writing rules

UK spelling, no serial comma, no em dashes, no bold labels, short paragraphs. `npm run verify` fails on em dashes.

## Changelog

- 2026-10-17 (v1): Initial build.
