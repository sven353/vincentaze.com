// Single source for both legal pages and the form notice.
// Address: interim postal address supplied by Vincent on 26 Nov 2026, until the Kuma Partners company name change is finalised.
// PLACEHOLDERS: every value starting with TODO must be completed by Vincent before relying on these pages.
export const legal = {
  owner: 'Vincent Azé',
  taxId: 'TODO: tax identification number',
  address: 'Kuma Partners, c/o Sven Mulfinger, Calle de la Tramuntana 26, 08950 Esplugues de Llobregat, Barcelona, Spain',
  email: 'vincent@kuma.partners',
  hosting: 'Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
  updated: '26 November 2026',
};
export const hasPlaceholders = Object.values(legal).some((v) => v.startsWith('TODO'));
