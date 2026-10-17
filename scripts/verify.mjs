// Post-build checks. Run after `astro build`. Exits non-zero on any failure.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.error('FAIL: ' + m); } };
const warn = (m) => console.warn('WARN: ' + m);

const pages = ['index', 'about', 'work', 'contact', 'legal', 'privacy', 'thanks', '404'];
const files = ['llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap-index.xml', 'og.png', 'favicon.svg', 'menu.js', 'form.js', 'reveal.js', 'vincent-aze.jpg'];
for (const p of pages) ok(existsSync(join(dist, p + '.html')), `missing ${p}.html`);
for (const f of files) ok(existsSync(join(dist, f)), `missing ${f}`);

const read = (f) => readFileSync(join(dist, f), 'utf8');
const html = Object.fromEntries(pages.filter((p) => existsSync(join(dist, p + '.html'))).map((p) => [p, read(p + '.html')]));

// Sitemap
const sitemapFiles = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
const sm = sitemapFiles.map(read).join('\n');
for (const p of ['/', '/about', '/work', '/contact']) ok(sm.includes(`<loc>https://vincentaze.com${p}</loc>`), `sitemap lacks ${p}`);
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
  ok(v && v.worksFor?.['@id'] === 'https://kuma.partners/#organization', `${name}: Person must work for Kuma`);
  ok(!JSON.stringify(g).includes('alumniOf'), `${name}: alumniOf must not appear`);
  if (name === 'work') {
    const f = g.find((n) => n['@type'] === 'FAQPage');
    ok(f && f.mainEntity.length === 6, 'work: FAQPage must have 6 questions');
    ok(f && f.mainEntity.every((q) => !/[<\[]/.test(q.acceptedAnswer.text)), 'work: FAQ answers must be plain text');
  }
  if (name === 'about') ok(types.includes('ProfilePage'), 'about: must be ProfilePage');
  if (name === 'index') ok(types.includes('Event'), 'index: Event node expected');
}

// Faq rendering
ok((html.work.match(/<details/g) || []).length === 6, 'work: 6 details toggles expected');
ok(read('llms-full.txt').includes('What is decision latency?'), 'llms-full lacks FAQ');

// Sister sites linked
for (const u of ['https://kuma.partners', 'https://kuma.partners/offsite', 'https://theround.kuma.partners']) ok(html.index.includes(`href="${u}"`), `home must link ${u}`);

// External links
for (const [name, h] of Object.entries(html)) {
  for (const m of h.matchAll(/<a [^>]*href="https?:\/\/(?!vincentaze\.com)[^"]+"[^>]*>/g)) {
    ok(/target="_blank"/.test(m[0]) && /rel="[^"]*noopener/.test(m[0]), `${name}: external link without new tab and noopener: ${m[0].slice(0, 90)}`);
  }
}

// Images: exactly one photograph on home, none elsewhere unlabelled
ok((html.index.match(/<img /g) || []).length === 1, 'home must carry exactly one <img>');

// Document start
for (const [name, h] of Object.entries(html)) ok(h.startsWith('<!DOCTYPE html>') || h.startsWith('<!doctype html>'), `${name}: must start with doctype`);

// Writing rules: no em dashes in pages or llms files
const texts = { ...html, 'llms.txt': read('llms.txt'), 'llms-full.txt': read('llms-full.txt') };
for (const [n, t] of Object.entries(texts)) ok(!t.includes('—'), `${n}: em dash found`);

// Placeholders in legal pages: warn, do not block deploy
for (const n of ['legal', 'privacy']) if (html[n] && html[n].includes('TODO')) warn(`${n}: placeholders still present, complete src/data/legal.ts`);

console.log(`${passes} checks passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
