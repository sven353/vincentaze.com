// Single source for both legal pages and the form notice.
// PLACEHOLDERS: every value marked TODO must be completed by Vincent before relying on these pages.
export const legal = {
  owner: 'Vincent Azé',
  taxId: 'TODO: tax identification number (NIF or equivalent)',
  address: 'TODO: full postal address (street, number, postcode, town, country)',
  email: 'contact@kuma.partners',
  hosting: 'Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
  updated: '17 October 2026',
};
export const hasPlaceholders = Object.values(legal).some((v) => v.startsWith('TODO'));
