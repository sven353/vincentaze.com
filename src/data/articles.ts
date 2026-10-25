// Two articles from Vincent's briefing, lightly edited for the site's writing rules.
// datePublished is the publication date to confirm on go-live.
export type Block = { h?: string; p?: string; related?: boolean };
export type Article = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  intro: string;
  body: Block[];
  related: { href: string; label: string; external?: boolean }[];
};

export const articles: Article[] = [
  {
    slug: 'ai-cannot-fix-team-conflict',
    title: 'AI Will Not Fix a Team That Cannot Talk',
    description:
      'AI can improve individual output, but it cannot automatically repair trust or resolve team conflict. Why the future of work still depends on difficult conversations.',
    datePublished: '2026-10-25',
    dateModified: '2026-10-25',
    intro:
      'Imagine two exceptionally capable managers in the same company who no longer speak to one another. They avoid direct contact, route disagreements through colleagues and turn team meetings into careful theatre.',
    body: [
      { p: 'Now give them both an AI assistant. Each can analyse more data, write more convincing proposals and automate more of their work. Their individual productivity may rise dramatically. But the relationship between them remains exactly where it was.' },
      { p: 'This is one of the paradoxes of the AI transition. Companies are acquiring extraordinary tools for creating, analysing and executing. At the same time, they still depend on people who need to negotiate priorities, express disagreement, make commitments and live with decisions they did not choose.' },
      { p: 'AI is powerful enough. Collaboration is a separate capability, and it has to be built separately.' },
      { h: 'Individual intelligence is not collective intelligence' },
      { p: 'A group of excellent individuals does not automatically become an excellent team. People interpret the same situation differently. They protect identities, avoid embarrassment and carry assumptions about one another that rarely get tested in the open.' },
      { p: 'When nobody addresses those patterns, organisations build increasingly complicated processes around them. More meetings, approval steps and software can make the difficulty less visible. They do not necessarily remove it.' },
      { h: 'What leaders can do differently' },
      { p: 'First, notice where work depends on conversations people are avoiding. The indicators are often practical: decisions repeatedly returning to the same person, messages travelling through intermediaries or agreements that disappear after a meeting.' },
      { p: 'Second, treat disagreement as information. Ask people what they see that others may not. Distinguish a disagreement about the task from a judgement about the person.' },
      { p: 'Third, make ownership explicit. A constructive conversation should produce clarity about what has been decided, what remains open and who is responsible for the next step.' },
      { p: 'Finally, give attention to how the conversation happens. People rarely do their best thinking while defending themselves. Curiosity, emotional regulation and the willingness to acknowledge one\'s part in a problem make serious business conversations possible.' },
      { h: 'The human side of the future of work' },
      { p: 'I am optimistic about AI. It gives people extraordinary leverage. Yet leverage amplifies what is already present. A team with trust and clear decision-making can become more capable. A team caught in avoidance may simply become faster at producing competing arguments.' },
      { p: 'The future of work therefore calls for technological fluency and an intentional investment in human intelligence: listening, candour, judgement, responsibility and the ability to move forward together.' },
      { p: 'Leaders can ask what their people can now do with AI. The harder question is what they must learn to do with one another.' },
    ],
    related: [
      { href: '/ideas', label: 'The Future of Work' },
      { href: 'https://www.kuma.partners/', label: 'Leadership team alignment at Kuma Partners', external: true },
    ],
  },
  {
    slug: 'hidden-cost-leadership-friction',
    title: 'The Invisible Cost of Leadership Friction',
    description:
      'Leadership friction can delay decisions, weaken trust and slow execution. Learn how founders and executives can recognise the patterns and address them.',
    datePublished: '2026-10-25',
    dateModified: '2026-10-25',
    intro:
      'Leadership friction rarely announces itself as a leadership problem. It often appears as slow execution, recurring meetings, departments that do not coordinate or a founder who feels that nothing moves unless they intervene.',
    body: [
      { p: 'The individuals involved may all be intelligent, competent and committed. That is what makes the situation confusing. If everyone is trying hard, why is progress so difficult?' },
      { p: 'Sometimes the missing piece is the quality of the relationships and conversations through which the plan has to travel.' },
      { h: 'The difference between agreement and alignment' },
      { p: 'Teams can agree in a meeting while leaving with different interpretations. One executive heard an ambitious target. Another heard a provisional direction. A third heard a threat to their department\'s resources.' },
      { p: 'The minutes record agreement. The following week, behaviour reveals something else.' },
      { p: 'Alignment takes more than saying yes to the same slide. It requires a shared understanding of priorities, trade-offs, decision rights and what happens when reality changes.' },
      { h: 'What friction actually costs' },
      { p: 'The effects can be hard to attribute. Important decisions require extra approvals. People spend time managing relationships rather than solving problems. Responsibility becomes blurred. High performers may withdraw or leave, while executives become increasingly frustrated.' },
      { p: 'Not every disagreement is harmful. In fact, constructive tension can improve a decision. The cost arises when disagreement cannot be expressed or resolved, and instead becomes avoidance, politics or passive resistance.' },
      { h: 'Where to start' },
      { p: 'Start with the pattern rather than the personalities. Which decisions regularly stall? Where do handovers fail? What do people say privately that they do not say together? What is assumed to be obvious but has never been made explicit?' },
      { p: 'Then bring the right people into a conversation designed to understand the situation rather than determine who is at fault. Listen for differences in meaning, incentives and expectations. Make the disagreements visible enough to work with.' },
      { p: 'Finally, translate the conversation into behaviour. Who owns the decision? How will people raise a concern? When will the team review whether the new agreement is working?' },
      { h: 'Why it matters more in the AI era' },
      { p: 'AI will make many aspects of work faster. That does not remove the organisational cost of a delayed decision or an unresolved relationship. In some cases, it makes the contrast more obvious. The systems accelerate while the leadership team remains stuck.' },
      { p: 'For leaders, improving human coordination is part of how performance becomes possible.' },
    ],
    related: [
      { href: '/advisory', label: 'Executive coaching' },
      { href: 'https://www.kuma.partners/', label: '14-Day Leadership Friction Scan at Kuma Partners', external: true },
    ],
  },
];
