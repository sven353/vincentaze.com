// Single source for both legal pages and the form notice.
// PLACEHOLDERS: every value starting with TODO must be completed by Vincent before relying on these pages.
export const legal = {
  owner: 'Vincent Azé',
  taxId: 'TODO: tax identification number',
  address: 'TODO: full postal address (street, number, postcode, town, country)',
  email: 'vincent@kuma.partners',
  hosting: 'Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
  updated: '25 October 2026',
};
export const hasPlaceholders = Object.values(legal).some((v) => v.startsWith('TODO'));
