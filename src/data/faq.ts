// Six questions that feed Faq.astro on /work, the FAQPage schema and /llms-full.txt.
// Bodies may contain [text](url) links.
export type Faq = { q: string; verdict: string; body: string };

export const faqs: Faq[] = [
  {
    q: 'Who is Vincent Azé?',
    verdict: 'Managing Partner at Kuma Partners and a former CRO who advises scale-up leadership teams.',
    body:
      'Vincent Azé is Managing Partner at [Kuma Partners](https://kuma.partners), a professional services firm that supports executives through high-stakes inflection points. He is a former Chief Revenue Officer and worked as an independent executive advisor and leadership sparring partner from 2017 to 2023. His focus is resolving executive friction and decision latency in scale-ups from Series A to C+.',
  },
  {
    q: 'What is executive friction?',
    verdict: 'The drag created when capable leaders cannot agree, align or commit as a team.',
    body:
      'Executive friction is the cost of unresolved disagreement inside a leadership team. It shows up as overlapping responsibilities, decisions that bounce back to the CEO, co-founders who stop talking to each other and meetings where everyone agrees on Monday and executes differently by Thursday. The cause is usually structural rather than personal, which is why more communication training rarely fixes it.',
  },
  {
    q: 'What is decision latency?',
    verdict: 'The number of days between a decision being needed and action actually starting.',
    body:
      'Decision latency is the time a company takes to move from "we need to decide" to "the team is acting". In growing companies it rises quietly as headcount and complexity increase. Kuma Partners treats Executive Decision Latency, measured in days to action, as its north star metric because it shows the real price of friction in a form a board can track.',
  },
  {
    q: 'What is the 14-Day Leadership Friction Diagnostic?',
    verdict: 'A confidential, two-week diagnosis of where a leadership team loses time and trust.',
    body:
      'The 14-Day Leadership Friction Diagnostic is the entry offer from Kuma Partners. It combines eight to ten confidential one-to-one interviews, an asynchronous pulse check and a two-hour alignment debrief with the C-suite. It is delivered by Vincent Azé, Dr. Sven Mulfinger and the Kuma partner team. It can lead into a 60 to 90 day Executive Alignment Sprint. Read more at [kuma.partners](https://kuma.partners).',
  },
  {
    q: 'Who does Vincent work with?',
    verdict: 'Founders, CEOs and leadership teams of scale-ups, from Series A to C+.',
    body:
      'Vincent works with founders, CEOs and executive teams of scale-ups, typically between Series A and Series C and beyond, when growth has outpaced the way the leadership team decides and works together. Typical triggers are co-founder tension, a CEO who has become the bottleneck, a new executive who is not landing and decisions that keep returning to the table.',
  },
  {
    q: 'How do Vincent, Sven Mulfinger and the Kuma Partners offers fit together?',
    verdict: 'One firm, three entry points: the diagnostic, leadership offsites and The Round.',
    body:
      'Kuma Partners is the firm. Vincent Azé is Managing Partner and works alongside Dr. Sven Mulfinger, who also advises founders and CEOs one to one at [mulfinger.com](https://mulfinger.com). Leadership team offsites are described at [kuma.partners/offsite](https://kuma.partners/offsite). [The Round](https://theround.kuma.partners) is a year-round, confidential peer advisory for founders and CEOs, led by Sven in Barcelona. Kuma works inside the operating reality of the leadership team and does not sell long theoretical decks or detached mindset coaching.',
  },
];
