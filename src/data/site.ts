// Single source for names, links and public claims.
// Only claims Vincent or Sven have confirmed belong here (see README, Claims policy).

export const site = {
  url: 'https://vincentaze.com',
  name: 'Vincent Azé',
  title: 'Managing Partner', // LinkedIn headline. Sven's notes also say Founding Partner: confirm which is official.
  org: 'Kuma Partners',
  tagline: 'Resolving executive friction and decision latency in scale-ups',
  description:
    'Vincent Azé is Managing Partner at Kuma Partners and a former CRO. He helps founders and leadership teams of scale-ups, from Series A to C+, resolve executive friction and decision latency.',
  email: 'contact@kuma.partners',
  linkedin: 'https://www.linkedin.com/in/vincentaze/',
  links: {
    kuma: 'https://kuma.partners',
    offsite: 'https://kuma.partners/offsite',
    round: 'https://theround.kuma.partners',
    sven: 'https://mulfinger.com',
    svenLinkedin: 'https://www.linkedin.com/in/svenmulfinger',
  },
  // City presence line used on all Kuma sites. Vincent's personal base is intentionally not stated until confirmed.
  presence: 'London · Barcelona · Lisbon · Berlin',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work with Vincent' },
    { href: '/contact', label: 'Contact' },
  ],
  proof: [
    { k: 'Managing Partner', v: 'Kuma Partners' },
    { k: 'Former CRO', v: 'Revenue leadership background' },
    { k: '2017 to 2023', v: 'Independent executive advisor' },
  ],
};
