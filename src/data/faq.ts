// Fourteen questions from Vincent's briefing. They feed Faq.astro on /advisory, the FAQPage schema and /llms-full.txt.
// Bodies may contain [text](url) links.
export type Faq = { q: string; verdict: string; body: string };

export const faqs: Faq[] = [
  {
    q: 'Who is Vincent Azé?',
    verdict: 'Vincent Azé is an executive coach and a founding partner of Kuma Partners, based in Lisbon.',
    body: 'After an international career in fintech and commercial leadership, Vincent moved into executive coaching around ten years ago. He works with founders, CEOs and leadership teams on human dynamics, difficult conversations, execution and the future of work. [Kuma Partners](https://www.kuma.partners/) is the leadership advisory firm he co-founded.',
  },
  {
    q: 'Who do you coach?',
    verdict: 'I work primarily with founders, CEOs and senior leaders.',
    body: 'The common factor is responsibility. Clients are often facing growth, conflict, a leadership transition, a difficult decision or a situation that cannot be solved by adding another meeting.',
  },
  {
    q: 'What does executive coaching with you involve?',
    verdict: 'Confidential, challenging conversations grounded in your real leadership situation.',
    body: 'We look at the facts, your interpretations, what may be avoided and which action is yours to take. Sessions combine reflection with practical commitments and follow-up.',
  },
  {
    q: 'What is the difference between coaching and consulting?',
    verdict: 'Coaching strengthens your judgement and behaviour; consulting may redesign a process or organisation.',
    body: 'I work across the boundary when useful, but a whole-team transformation is normally better handled through Kuma Partners. We agree the scope clearly rather than making coaching a substitute for every other form of help.',
  },
  {
    q: 'Can you help with co-founder conflict?',
    verdict: 'Yes. Founder relationships and difficult executive conversations are central topics in my work.',
    body: 'In individual coaching, we work on your perspective, responsibility and preparation. Where the situation requires facilitated dialogue among several people, we can discuss a separate joint intervention.',
  },
  {
    q: 'Do you work with leadership teams?',
    verdict: 'Yes, through Kuma Partners.',
    body: 'Kuma Partners delivers diagnostics, leadership alignment programmes and strategic offsites for companies dealing with growth, decision bottlenecks, founder tensions or organisational change. Its entry offer is the [14-Day Leadership Friction Scan](https://www.kuma.partners/).',
  },
  {
    q: 'How do you approach AI adoption?',
    verdict: 'I focus on the human and leadership conditions that make AI adoption useful.',
    body: 'Technology can improve the work, but leaders still need clarity on roles, expectations, trust, accountability and what collaboration should look like. I do not offer technical software implementation as part of personal executive coaching.',
  },
  {
    q: 'Why is emotional intelligence important in the age of AI?',
    verdict: 'Because better tools do not automatically produce better decisions between people.',
    body: 'Emotional intelligence includes noticing reactions, listening, dealing with disagreement and taking responsibility for the impact we have on others. These capabilities matter when technology accelerates the pace and complexity of work.',
  },
  {
    q: 'Where are you based?',
    verdict: 'I am based in Lisbon, Portugal, and work internationally.',
    body: 'Many coaching engagements work well remotely. In-person meetings and workshops can be arranged by agreement, depending on the context and travel schedule.',
  },
  {
    q: 'In which languages do you work?',
    verdict: 'English and French are my principal working languages.',
    body: 'I also speak Spanish, and we can discuss whether a particular conversation is suitable in Spanish.',
  },
  {
    q: 'How long does coaching last?',
    verdict: 'The duration depends on the challenge and the agreed objectives.',
    body: 'Some situations call for a short series of focused conversations. Others benefit from a longer relationship through a leadership transition. We decide together after understanding the context.',
  },
  {
    q: 'How much does executive coaching cost?',
    verdict: 'Fees are discussed after we understand the scope and format.',
    body: 'You will know the proposed cadence, financial terms and working agreement before any paid engagement begins. The first conversation is exploratory and carries no obligation to proceed.',
  },
  {
    q: 'How confidential is the work?',
    verdict: 'Confidentiality and data handling are explicitly agreed before an engagement begins.',
    body: 'Sensitive discussions require discretion and clear expectations. Any exceptions, for example legal duties or situations involving several stakeholders, should be covered in the written agreement.',
  },
  {
    q: 'What happens after I get in touch?',
    verdict: 'I review your message and propose a first conversation if the request is a potential fit.',
    body: 'Describe your role, the organisation and the challenge you want to explore. There is no need for a polished pitch. If another form of support would be more appropriate, I will say so.',
  },
];
