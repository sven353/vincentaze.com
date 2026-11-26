// The nine approved testimonials for the personal site.
// Source: Temoignages_site_personnel_Vincent.numbers, sheet "Pour le site", column "Témoignage raccourci — MOTS D'ORIGINE".
// Words are copied exactly. Do not edit quotes, add dates or change punctuation.
// Titles and companies are copied from the same sheet (LinkedIn capture columns). Open points are listed in `flag`.
import bronwen from '../assets/people/bronwen.jpg';
import christina from '../assets/people/christina.jpg';
import marcin from '../assets/people/marcin.jpg';
import moritz from '../assets/people/moritz.jpg';
import navid from '../assets/people/navid.jpg';
import seth from '../assets/people/seth.jpg';
import smahil from '../assets/people/smahil.jpg';
import kwok from '../assets/people/kwok.jpg';
import xavi from '../assets/people/xavi.jpg';

export type Testimonial = {
  id: string;
  first: string;
  last: string;
  title: string;
  company: string;
  quote: string;
  /** coaching = worked with Vincent as a coach or adviser; career = recommendation from his earlier commercial career. To be confirmed by Vincent. */
  group: 'coaching' | 'career';
  photo: ImageMetadata;
  /** Open point to confirm with Vincent before launch. Not shown on the site. */
  flag?: string;
};

// Display order: coaching clients first, earlier commercial colleagues last.
export const testimonialList: Testimonial[] = [
  {
    id: 'marcin', group: 'coaching', first: 'Marcin', last: 'Maciejewski', title: 'Founder | CEO', company: 'A360', photo: marcin,
    quote: 'Vincent is an extremely powerful coach who supported me in taking bold actions. His style is straight, but loving. I highly recommend working with Vincent to play a bigger game in business, but also "have it all" in various areas of life.',
  },
  {
    id: 'christina', group: 'coaching', first: 'Christina', last: 'Kao', title: 'Co-Founder', company: 'Le Mini Macaron', photo: christina,
    quote: 'Vincent has helped us cut through the noise and consistently brings us back to what’s important to us personally and professionally and focus on why we are doing this. He helps us set short term and long term goals so that we hit milestones and structure our business in a way that is oriented toward growth, yet makes it all a little easier to manage.',
  },
  {
    id: 'navid', group: 'coaching', first: 'Navid', last: 'Akhtar', title: 'CEO & Founder', company: 'Alchemiya', photo: navid,
    quote: "He has a passionate and supportive style of coaching that works and delivers results. It's not easy, but for anyone looking to challenge themselves and gain deeper insight into their own performance, I can highly recommend him.",
  },
  {
    id: 'moritz', group: 'coaching', first: 'Moritz', last: 'Seidner', title: 'General Manager Berlin', company: 'Ideawise', photo: moritz,
    quote: 'Vincent has helped the leadership of our company through a very trying time. This enabled us to not only get through it but also come out a lot stronger than before.',
    flag: 'The full original lists Arvato, B2B Customer Service. The shortened sheet lists Ideawise, General Manager Berlin. Confirm which is current.',
  },
  {
    id: 'seth', group: 'coaching', first: 'Seth', last: 'Braun', title: 'Director of Intervention Design', company: 'Stagen Leadership Academy', photo: seth,
    quote: 'Vincent took bold and innovative approaches to coaching me on a major project. I felt his commitment to my best and highest outcomes and feel grateful for his willingness to roll up his sleeves and extend himself on my behalf.',
  },
  {
    id: 'xavi', group: 'coaching', first: 'Xavi', last: 'Ginesta', title: 'Founder', company: 'Voxel', photo: xavi,
    quote: 'He transmits positivism to the teams he interacts with and always shows great enthusiasm for new, risky and disruptive initiatives, looking for connections, alliances and new lines of personal development. Vincent is a very empathetic person with a great capacity to understand the teams he works with and for whom the common good always comes first. Assertiveness, flexibility and availability stand out in him.',
    flag: 'The original capture lists three organisations (Voxel; Fundació Humanitas; Institut de Neurociència Avançada de Barcelona) and the title "Fundador". The sheet for the site says Founder, Voxel.',
  },
  {
    id: 'bronwen', group: 'career', first: 'Bronwen', last: 'Gray', title: 'Project partnerships', company: '', photo: bronwen,
    quote: 'As sales director in the Asian markets Vincent always demonstrated his superior knowledge of his local clients and markets as well as liaising effectively with London and Paris when working with the key worldwide client accounts.',
    flag: 'No company in the sheet and the LinkedIn headline is "Creating connections, project partnerships, delivering recurring revenue". Please supply her company and a proper job title.',
  },
  {
    id: 'smahil', group: 'career', first: 'Smahil', last: 'Hellal', title: 'CFO | Strategic FP&A | M&A & Exit Specialist', company: 'Rimes', photo: smahil,
    quote: 'I worked with Vincent and saw him opening new markets in the Nordics that resulted in revenue growth for the region and the opening of new offices to manage our new clients.',
    flag: 'Company is Rimes in the site sheet and "not stated" in the capture. Confirm. The title is the LinkedIn headline and is long; a short form (for example CFO) needs his approval.',
  },
  {
    id: 'kwok', group: 'career', first: 'Vincent', last: 'Kwok', title: 'Strategy Risk & Transactions', company: 'Deloitte', photo: kwok,
    quote: 'He is a very capable winner of new business and is able to demonstrate the patience required in order to win top notch client from scratch as he is very close to his clients. I can tell he has also a very good team spirit able to motivate people around him for the same good cause.',
    flag: 'The full original lists "Global Risk Analytics and Finance Leader". The site sheet lists Deloitte, Strategy Risk & Transactions. Confirm. Not Vincent Azé: the photo file named Vincent.png belongs to Vincent Kwok.',
  },
];

export const coachingTestimonials = testimonialList.filter((t) => t.group === 'coaching');
export const careerTestimonials = testimonialList.filter((t) => t.group === 'career');

export const testimonials: Record<string, Testimonial> = Object.fromEntries(testimonialList.map((t) => [t.id, t]));
