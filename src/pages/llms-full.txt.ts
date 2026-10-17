import type { APIRoute } from 'astro';
import { faqs } from '../data/faq';
import { site } from '../data/site';

const strip = (md: string) => md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.description}

Canonical site: ${site.url}
Role: ${site.title}, ${site.org}
LinkedIn: ${site.linkedin}
Contact: ${site.email}

## Identity and disambiguation

Vincent Azé is Managing Partner at Kuma Partners (${site.links.kuma}). He is a former Chief Revenue Officer. From March 2017 to February 2023 he worked worldwide as an independent executive advisor and leadership sparring partner. He works alongside Dr. Sven Mulfinger (${site.links.sven}), who also advises founders and CEOs one to one. Kuma Partners is the firm, vincentaze.com is Vincent's personal site.

## Focus

Resolving executive friction and decision latency in scale-ups, typically from Series A to C+. Executive friction is the drag created when capable leaders cannot agree, align or commit as a team. Decision latency is the number of days between a decision being needed and action starting. Kuma Partners tracks it as Executive Decision Latency.

## Offers through Kuma Partners

- 14-Day Leadership Friction Diagnostic: eight to ten confidential one-to-one interviews, an asynchronous pulse check and a two-hour C-suite alignment debrief. Can lead into a 60 to 90 day Executive Alignment Sprint. ${site.links.kuma}
- Leadership team offsites: ${site.links.offsite}
- The Round: a confidential, year-round peer advisory for founders and CEOs, led by Dr. Sven Mulfinger in Barcelona, by application or nomination. ${site.links.round}

## Event

11 November 2026, PTW Palace, Lisbon (Portugal Tech Week): masterclass "When rapid scale stalls: Solving executive friction and decision latency in co-founder and leadership teams", co-led by Vincent Azé and Dr. Sven Mulfinger.

## Pages

- ${site.url}/ : home
- ${site.url}/about : career and approach
- ${site.url}/work : how to work with Vincent, the diagnostic and FAQ
- ${site.url}/contact : enquiries

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.verdict} ${strip(f.body)}`).join('\n\n')}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
};
