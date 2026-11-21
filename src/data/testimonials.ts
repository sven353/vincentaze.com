// Recommendations written by clients and colleagues on Vincent's LinkedIn profile, quoted word for word (whole sentences only).
// Publish only with each person's permission. Remove an entry here and it disappears from every page.
// "source" states where and when the words were written, so visitors can see they are real.
export type Testimonial = { id: string; quote: string[]; name: string; role: string; source: string };

export const testimonials: Record<string, Testimonial> = {
  marcin: {
    id: 'marcin',
    quote: ['Vincent is an extremely powerful coach who supported me in taking bold actions.', 'His style is straight, but loving.'],
    name: 'Marcin Maciejewski',
    role: 'Founder and CEO',
    source: 'LinkedIn recommendation, April 2021',
  },
  navid: {
    id: 'navid',
    quote: ["I've worked closely with Vincent over the past 4 years and he has coached me, as I've faced up to the challenges of building a global business.", 'He has a passionate and supportive style of coaching that works and delivers results.'],
    name: 'Navid Akhtar',
    role: 'CEO and Founder, Alchemiya.com',
    source: 'LinkedIn recommendation, May 2021',
  },
  moritz: {
    id: 'moritz',
    quote: ['Vincent has helped the leadership of our company through a very trying time.', 'This enabled us to not only get through it but also come out a lot stronger than before.'],
    name: 'Moritz Seidner',
    role: 'B2B Customer Service, Arvato',
    source: 'LinkedIn recommendation, May 2021',
  },
  christina: {
    id: 'christina',
    quote: ["My business partner and I have been working with Vincent for over 2 years and it's been an incredible guidance for us.", "Vincent has helped us cut through the noise and consistently brings us back to what's important to us personally and professionally and focus on why we are doing this."],
    name: 'Christina Kao',
    role: 'Co-founder, Le Mini Macaron',
    source: 'LinkedIn recommendation, April 2021',
  },
  seth: {
    id: 'seth',
    quote: ['Vincent took bold and innovative approaches to coaching me on a major project.', 'I appreciated his commitment to courageously explore with me.'],
    name: 'Seth Braun',
    role: 'Director of Intervention Design, Stagen Leadership Academy',
    source: 'LinkedIn recommendation, March 2021',
  },
  xavi: {
    id: 'xavi',
    quote: ['Vincent is a very empathetic person with a great capacity to understand the teams he works with and for whom the common good always comes first.'],
    name: 'Xavi Ginesta',
    role: 'Founder of Voxel, former director of the Conscious Capitalism Foundation Spain',
    source: 'LinkedIn recommendation, March 2021',
  },
  yann: {
    id: 'yann',
    quote: ['His knowledge of the Asian market and communication skills made the collaboration with GL Trade easy and efficient at the time.'],
    name: 'Yann Kayode',
    role: 'Solutions Architect, Philip Morris International, then a client at Credit Agricole CIB Hong Kong',
    source: 'LinkedIn recommendation, November 2014',
  },
  smahil: {
    id: 'smahil',
    quote: ['I worked with Vincent when he was [in] Sales at GL Trade and saw him opening new markets in the Nordics that resulted in revenue growth for the region and the opening of new offices to manage our new clients.'],
    name: 'Smahil Hellal',
    role: 'CFO, Strategic FP&A',
    source: 'LinkedIn recommendation, November 2014',
  },
};
