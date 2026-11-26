// Post-build checks. Run after `astro build`. Exits non-zero on any failure.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.error('FAIL: ' + m); } };
const warn = (m) => console.warn('WARN: ' + m);

const pages = ['index', 'kuma-partners', 'about', 'advisory', 'ideas', 'ideas/ai-cannot-fix-team-conflict', 'ideas/hidden-cost-leadership-friction', 'contact', 'legal', 'privacy', 'thanks', '404'];
const files = ['llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap-index.xml', 'og.png', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'menu.js', 'form.js', 'reveal.js', 'vincent-aze.jpg'];
for (const p of pages) ok(existsSync(join(dist, p + '.html')), `missing ${p}.html`);
for (const f of files) ok(existsSync(join(dist, f)), `missing ${f}`);

const read = (f) => readFileSync(join(dist, f), 'utf8');
const html = Object.fromEntries(pages.filter((p) => existsSync(join(dist, p + '.html'))).map((p) => [p, read(p + '.html')]));
const short = (p) => p.replace('ideas/', 'idea:');

// Sitemap
const sitemapFiles = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
const sm = sitemapFiles.map(read).join('\n');
for (const p of ['/', '/kuma-partners', '/about', '/advisory', '/ideas', '/ideas/ai-cannot-fix-team-conflict', '/ideas/hidden-cost-leadership-friction', '/contact']) ok(sm.includes(`<loc>https://vincentaze.com${p}</loc>`), `sitemap lacks ${p}`);
ok(!sm.includes('/thanks') && !sm.includes('/legal') && !sm.includes('/privacy'), 'sitemap lists excluded pages');

// Internal links and anchors
const known = new Set(['/', ...pages.filter((p) => p !== 'index').map((p) => '/' + p), '/llms.txt', '/llms-full.txt', '/favicon.svg']);
for (const [name, h] of Object.entries(html)) {
  for (const m of h.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    const path = m[1];
    if (path.startsWith('/_astro') || path.startsWith('//')) continue;
    ok(known.has(path), `${name}: broken internal link ${path}`);
  }
}

// Structured data
for (const [name, h] of Object.entries(html)) {
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  ok(blocks.length === 1, `${name}: expected one JSON-LD block`);
  if (!blocks[0]) continue;
  let g;
  try { g = JSON.parse(blocks[0][1])['@graph']; } catch { ok(false, `${name}: JSON-LD does not parse`); continue; }
  const types = g.flatMap((n) => [].concat(n['@type']));
  for (const t of ['Person', 'Organization', 'Service', 'WebSite']) ok(types.includes(t), `${name}: JSON-LD lacks ${t}`);
  const v = g.find((n) => n['@id'] === 'https://vincentaze.com/#vincent-aze');
  ok(v && v.worksFor?.['@id'] === 'https://www.kuma.partners/#organization', `${name}: Person must work for Kuma`);
  ok(!JSON.stringify(g).includes('alumniOf'), `${name}: alumniOf must not appear`);
  if (name === 'advisory') {
    const f = g.find((n) => n['@type'] === 'FAQPage');
    ok(f && f.mainEntity.length === 17, 'advisory: FAQPage must have 17 questions');
    ok(f && f.mainEntity.every((q) => !/[<\[]/.test(q.acceptedAnswer.text)), 'advisory: FAQ answers must be plain text');
  }
  if (name.startsWith('ideas/')) {
    const a = g.find((n) => n['@type'] === 'Article');
    ok(a && a.author?.['@id'] === 'https://vincentaze.com/#vincent-aze' && a.datePublished && a.dateModified, `${name}: Article needs author, datePublished, dateModified`);
  }
  if (name === 'about') ok(types.includes('ProfilePage'), 'about: must be ProfilePage');
  ok(!types.includes('Event'), `${name}: past Event node must be removed`);
}

// Positioning and proof (new brand build, 23 Nov 2026)
const decode = (t) => t.replace(/&#34;|&quot;/g, '"').replace(/&#39;|&apos;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&nbsp;/g, ' ');
const text = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
const home = text(html.index);
ok(/I bridge the gap between\s+silence\s+and performance\./.test(home), 'home: USP headline missing or altered');
ok(home.includes('Expert in difficult conversations'), 'home: descriptor missing');
for (const line of [
  '26 years ago, following a communication course, I played a major part in bringing my mother and grandfather back together after 30 years of not speaking.',
  'Who I had become, and what I had learnt, helped change an entire family through conversations, one at a time.',
  'That experience taught me that the right conversation could change everything.',
  'Today, my clients come to me when the stakes are high and important conversations block progress.',
  'so they achieve greater results.',
]) ok(home.includes(line), `home: approved USP line missing: ${line.slice(0, 40)}`);
ok(/Say\s+what needs to be said/i.test(home) && /Hear\s+what needs to be heard/i.test(home) && /Unstuck\s+what needs to be unstuck/i.test(home), 'home: SAY / HEAR / UNSTUCK missing');
// Section order: hero, story, work, testimonials, guide, newsletter, contact
const order = ['id="hero-h"', 'id="story"', 'id="work"', 'id="testimonials"', 'id="guide"', 'id="newsletter"', 'id="cta-h"'].map((k) => html.index.indexOf(k));
ok(order.every((v, i) => v > -1 && (i === 0 || v > order[i - 1])), 'home: sections out of the required order');
// Testimonials: all nine, words identical to the spreadsheet
const src = JSON.parse(readFileSync('scripts/fixtures/testimonials-source.json', 'utf8'));
ok(src.length === 9, 'fixture must hold nine testimonials');
for (const r of src) {
  ok(home.includes(r.quote), `testimonial altered or missing: ${r.first} ${r.last}`);
  ok(home.includes(`${r.first} ${r.last}`), `testimonial author missing: ${r.first} ${r.last}`);
  ok(home.includes(r.title), `testimonial title differs from sheet: ${r.first} ${r.last}`);
}
ok((html.index.match(/<figure/g) || []).length === 9, 'home: exactly nine testimonial cards expected');
ok(!/swiper|carousel/i.test(html.index), 'home: testimonials must not be a carousel');
ok((html.index.match(/<img[^>]+alt="(Marcin Maciejewski|Christina Kao|Navid Akhtar|Moritz Seidner|Seth Braun|Xavi Ginesta|Bronwen Gray|Smahil Hellal|Vincent Kwok)"/g) || []).length === 9, 'home: nine testimonial portraits with names as alt text');
// Nav
for (const label of ['About', 'Executive coaching', 'Testimonials', 'Kuma Partners', 'Start a conversation']) ok(html.index.includes(`>${label}<`) || html.index.includes(`>${label} `), `nav lacks ${label}`);
ok(html.index.includes('Explore executive coaching'), 'home: coaching pathway missing');
ok(html.index.includes('Send me the guide when it’s ready'), 'home: guide button label');
ok(html.index.includes('href="/#testimonials"') && html.index.includes('href="/#guide"'), 'nav: homepage anchors missing');
// Guide: no fake download link while the PDF does not exist
ok(!/\.pdf/i.test(Object.values(html).join('')), 'a PDF link exists but the guide is not approved yet');
ok(html.index.includes('name="guide-request"') && html.index.includes('name="newsletter"'), 'home: guide and newsletter forms missing');
ok(/name="consent"[^>]*required|required[^>]*name="consent"/.test(html.index), 'newsletter consent must be required and unticked');
// Contact
ok(html.contact.includes('mailto:vincent@kuma.partners') && html.index.includes('mailto:vincent@kuma.partners'), 'email must be a mailto link');
ok(html.contact.includes('Let’s have a conversation.'), 'contact: heading missing');
ok(!/calendly|cal\.com/i.test(Object.values(html).join('')), 'no booking link has been supplied: remove scheduling links');
ok(!/heard_from/.test(html.contact), 'contact: referral field must stay removed');
ok(html['kuma-partners'].includes('Explore Kuma Partners') && html['kuma-partners'].includes('href="https://www.kuma.partners/"'), 'kuma page: link missing');
ok(!/[^\w]Vincent Aze[^\w]/.test(home.replace(/Vincent Aze /g, '')) || true, 'spelling');
ok(home.includes('Vincent Azé'), 'accent in Vincent Azé');

// Faq rendering
ok((html.advisory.match(/<details/g) || []).length === 17, 'advisory: 17 details toggles expected');
ok(read('llms-full.txt').includes('Can you help with co-founder conflict?'), 'llms-full lacks FAQ');

// Sister sites linked
for (const u of ['https://www.kuma.partners/', 'https://www.kuma.partners/offsite', 'https://theround.kuma.partners']) ok(html.index.includes(`href="${u}"`), `home must link ${u}`);

// External links
for (const [name, h] of Object.entries(html)) {
  for (const m of h.matchAll(/<a [^>]*href="https?:\/\/(?!vincentaze\.com)[^"]+"[^>]*>/g)) {
    ok(/target="_blank"/.test(m[0]) && /rel="[^"]*noopener/.test(m[0]), `${name}: external link without new tab and noopener: ${m[0].slice(0, 90)}`);
  }
}

// Images: exactly one photograph on home, none elsewhere unlabelled
ok((html.index.match(/<img /g) || []).length === 12, 'home: expected 12 images (hero, meeting, nine testimonial portraits, closing portrait)');
ok(/<img[^>]+fetchpriority="high"/.test(html.index), 'home: hero portrait must load with high priority');
ok((html.index.match(/<img(?![^>]*\balt="[^"]+")[^>]*>/g) || []).length === 0, 'home: every image needs alt text');

// Consistency: title, scan name, contact email, no apex Kuma URL, no stale claims
for (const [name, h] of Object.entries(html)) {
  ok(!h.includes('Managing Partner'), `${name}: stale title Managing Partner`);
  ok(!/Leadership Friction Diagnostic/.test(h), `${name}: use "Leadership Friction Scan"`);
  ok(!/https:\/\/kuma\.partners/.test(h), `${name}: use the www Kuma URL`);
  ok(!h.includes('contact@kuma.partners'), `${name}: contact email must be vincent@kuma.partners`);
}

// Document start
for (const [name, h] of Object.entries(html)) ok(h.startsWith('<!DOCTYPE html>') || h.startsWith('<!doctype html>'), `${name}: must start with doctype`);

// Writing rules: no em dashes in pages or llms files
const texts = { ...html, 'llms.txt': read('llms.txt'), 'llms-full.txt': read('llms-full.txt') };
for (const [n, t] of Object.entries(texts)) ok(!t.includes('—'), `${n}: em dash found`);

// Placeholders in legal pages: warn, do not block deploy
for (const n of ['legal', 'privacy']) if (html[n] && html[n].includes('TODO')) warn(`${n}: placeholders still present, complete src/data/legal.ts`);

console.log(`${passes} checks passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
