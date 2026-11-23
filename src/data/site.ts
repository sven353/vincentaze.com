// Single source for names, links and public claims.
// Sources: Vincent's briefing (Vincent_Aze_Website_Content_SEO_GEO.docx, 24 Oct 2026) and "My USP.png" (23 Nov 2026), as confirmed by Sven.

export const site = {
  url: 'https://vincentaze.com',
  name: 'Vincent Azé',
  descriptor: 'Expert in difficult conversations',
  profession: 'Executive Coach and Strategic Advisor',
  title: 'Founding Partner',
  org: 'Kuma Partners',
  usp: 'I bridge the gap between silence and performance.',
  tagline: 'Expert in difficult conversations',
  description:
    'Vincent Azé is an expert in difficult conversations. Executive coach and founding partner of Kuma Partners, based in Lisbon. I bridge the gap between silence and performance.',
  email: 'vincent@kuma.partners',
  linkedin: 'https://www.linkedin.com/in/vincentaze/',
  links: {
    kuma: 'https://www.kuma.partners/',
    scan: 'https://www.kuma.partners/',
    offsite: 'https://www.kuma.partners/offsite',
    round: 'https://theround.kuma.partners',
    sven: 'https://mulfinger.com',
    svenLinkedin: 'https://www.linkedin.com/in/svenmulfinger',
  },
  place: 'Lisbon, Portugal',
  footerLine: 'Expert in difficult conversations · Lisbon, Portugal · Working internationally · English / Français',
  // Main navigation: five items, as briefed.
  nav: [
    { href: '/', label: 'Home' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/kuma-partners', label: 'Kuma Partners' },
    { href: '/#guide', label: 'Free Guide' },
    { href: '/contact', label: 'Contact' },
  ],
  // Supporting pages kept for depth and search visibility. Linked from the footer only.
  more: [
    { href: '/about', label: 'About' },
    { href: '/advisory', label: 'Executive coaching' },
    { href: '/ideas', label: 'Ideas' },
  ],
  features: {
    // The guide PDF does not exist yet. While false, the guide button opens a "tell me when it is ready" form
    // and there is no download link. Switch to true and set guideUrl once Vincent has approved the PDF.
    guideReady: false,
    guideUrl: '',
  },
};
