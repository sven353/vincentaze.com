// Single source for names, links and public claims.
// Source of truth: Vincent's own briefing (Vincent_Aze_Website_Content_SEO_GEO.docx, 24 Oct 2026), as confirmed by Sven on 25 Oct 2026.

export const site = {
  url: 'https://vincentaze.com',
  name: 'Vincent Azé',
  profession: 'Executive Coach and Strategic Advisor',
  title: 'Founding Partner',
  org: 'Kuma Partners',
  tagline: 'Executive coaching for the conversations that matter most',
  description:
    'Executive coach and Kuma Partners founding partner in Lisbon. I partner with founders and executives to bridge the gap between silence and high performance.',
  email: 'vincent@kuma.partners',
  linkedin: 'https://www.linkedin.com/in/vincentaze/',
  // Kuma's own pages declare https://www.kuma.partners as canonical, so every link and schema id here uses the www form.
  links: {
    kuma: 'https://www.kuma.partners/',
    scan: 'https://www.kuma.partners/',
    offsite: 'https://www.kuma.partners/offsite',
    round: 'https://theround.kuma.partners',
    sven: 'https://mulfinger.com',
    svenLinkedin: 'https://www.linkedin.com/in/svenmulfinger',
  },
  place: 'Lisbon, Portugal',
  footerLine: 'Executive Coach & Strategic Advisor · Lisbon, Portugal · Working internationally · English / Français',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/advisory', label: 'Executive coaching' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/contact', label: 'Contact' },
  ],
  proof: [
    { k: 'Founding Partner', v: 'Kuma Partners' },
    { k: '26 years', v: 'Exploring communication and human behaviour' },
    { k: 'Around ten years', v: 'Full-time executive coaching' },
  ],
};
