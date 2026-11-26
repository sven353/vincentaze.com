// Content preservation check.
//   node scripts/content-lock.mjs snapshot   -> writes scripts/fixtures/content-baseline.json from dist/
//   node scripts/content-lock.mjs compare    -> compares dist/ with the baseline and lists every text change
// Text is split into the visible text nodes of each page (scripts, styles and SVG removed).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
const mode = process.argv[2] || 'compare';
const base = 'scripts/fixtures/content-baseline.json';
const decode = (t) => t.replace(/&#34;|&quot;/g, '"').replace(/&#39;|&apos;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
function pages() {
  const out = {};
  for (const dir of ['dist', 'dist/ideas']) for (const f of readdirSync(dir)) if (f.endsWith('.html')) {
    const html = readFileSync(`${dir}/${f}`, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<(head)[\s\S]*?<\/\1>/g, '');
    const parts = html.split(/<[^>]+>/).map((s) => decode(s).replace(/\s+/g, ' ').trim()).filter(Boolean).filter((s) => s !== '“' && s !== '”').map((s) => s.replace(/^“(.+)”$/, '$1'));
    out[`${dir === 'dist' ? '' : 'ideas/'}${f}`] = parts;
  }
  return out;
}
if (mode === 'snapshot') { writeFileSync(base, JSON.stringify(pages(), null, 1)); console.log('baseline written'); process.exit(0); }
if (!existsSync(base)) { console.error('no baseline'); process.exit(1); }
const norm = (arr) => arr.filter((s) => s !== '“' && s !== '”').map((s) => s.replace(/^“(.+)”$/, '$1'));
const before = Object.fromEntries(Object.entries(JSON.parse(readFileSync(base, 'utf8'))).map(([k, v]) => [k, norm(v)])), after = pages();
let removed = 0, added = 0;
for (const p of Object.keys({ ...before, ...after })) {
  const b = before[p] || [], a = after[p] || [];
  const sa = new Set(a), sb = new Set(b);
  const gone = b.filter((x) => !sa.has(x)), nu = a.filter((x) => !sb.has(x));
  if (!gone.length && !nu.length) continue;
  console.log(`\n## ${p}`);
  gone.forEach((x) => { console.log(`  - ${x}`); removed++; });
  nu.forEach((x) => { console.log(`  + ${x}`); added++; });
}
console.log(`\n${removed} text pieces removed or changed, ${added} added`);
