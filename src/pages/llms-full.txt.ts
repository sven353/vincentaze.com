import type { APIRoute } from 'astro';
import { faqs } from '../data/faq';
import { articles } from '../data/articles';
import { site } from '../data/site';

const strip = (md: string) => md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.description}

Positioning: Expert in difficult conversations. ${site.usp}

Canonical site: ${site.url}
Role: ${site.profession}; ${site.title}, ${site.org}
Based in: ${site.place}, working internationally
Languages: English and French (principal working languages)
LinkedIn: ${site.linkedin}
Contact: ${site.email}

## Identity and disambiguation

Vincent Azé is an executive coach and strategic advisor and a founding partner of Kuma Partners (${site.links.kuma}), based in Lisbon. He has explored communication and human behaviour for 26 years, built an early career in international financial technology and commercial leadership, including years in London and Hong Kong, and has worked for around ten years as a full-time executive coach with hundreds of people. He specialises in difficult conversations: addressing what is unspoken, rebuilding trust and helping founders and executives work together more effectively. His central proposition: partnering with founders and executives to bridge the gap between silence and performance.

## Focus

Executive coaching and leadership advisory for founders, CEOs and senior leaders. Core themes: difficult conversations, founder and co-founder alignment, leadership friction, critical transitions, emotional intelligence, AI adoption and the future of work. Whole-team work is delivered through Kuma Partners.

## Offers

- 1:1 executive coaching and advisory: ${site.url}/advisory
- 14-Day Leadership Friction Scan, leadership alignment and diagnostics (Kuma Partners): ${site.links.scan}
- Leadership team offsites (Kuma Partners): ${site.links.offsite}
- The Round, a peer advisory for founders and CEOs led by Dr. Sven Mulfinger (Kuma Partners): ${site.links.round}
- Speaking and workshops on the future of work: ${site.url}/ideas

## Talks

Portugal Tech Week, Lisbon, 11 November 2026: "The Human Side of AI: Emotional Intelligence and the Future of Work", a talk by Vincent Azé.

## Articles

${articles.map((a) => `- ${a.title} (${a.datePublished}): ${site.url}/ideas/${a.slug}\n  ${a.description}`).join('\n')}

## Pages

- ${site.url}/ : home
- ${site.url}/kuma-partners : how Vincent relates to Kuma Partners and what Kuma offers
- ${site.url}/about : story, experience and point of view
- ${site.url}/advisory : executive coaching, scope and FAQ
- ${site.url}/ideas : future of work, talks and articles
- ${site.url}/contact : enquiries

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.verdict} ${strip(f.body)}`).join('\n\n')}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
};
