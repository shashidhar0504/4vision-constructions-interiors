// All site copy and sample data. Verified facts only: the brand brief, the price list, and the listed service areas.
// Project imagery is demo/sample material (isDemo: true) until real 4VISION completed projects are supplied.

export type Service = {
  slug: string;
  title: string;
  short: string;
  details: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'space-planning',
    title: 'Space Planning & Design',
    short: 'Layouts and design concepts shaped around how you live, with Vastu and functionality in mind.',
    details:
      'We begin by understanding how each room will be used, then plan circulation, furniture zones and proportions before any execution starts.',
  },
  {
    slug: 'false-ceiling-lighting',
    title: 'False Ceiling & Lighting',
    short: 'Ceiling designs and lighting layouts that add depth, warmth and a refined finish to every room.',
    details:
      'Ceiling profiles and lighting plans are designed together, so the final ambience matches the design intent.',
  },
  {
    slug: 'electrical-work',
    title: 'Electrical Work',
    short: 'Planned electrical points and wiring for lighting, appliances and modern living needs.',
    details:
      'Electrical planning is coordinated with the design, so switches, points and fittings sit exactly where they are needed.',
  },
  {
    slug: 'modular-furniture',
    title: 'Modular Furniture',
    short: 'Custom modular furniture designed around your space, storage needs and personal style.',
    details:
      'Each piece is planned for its room and its purpose, so furniture feels built in rather than placed.',
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen',
    short: 'Functional, well-planned modular kitchens with practical layouts and thoughtful storage.',
    details:
      'Counter, appliance and storage zones are planned for everyday cooking, so the kitchen works as well as it looks.',
  },
  {
    slug: 'wardrobes-storage',
    title: 'Wardrobes & Storage Solutions',
    short: 'Wardrobes and storage units that make the most of every wall and corner.',
    details:
      'Storage is planned around how your family uses the home, with internal layouts that keep daily items within easy reach.',
  },
  {
    slug: 'painting-finishing',
    title: 'Painting & Finishing',
    short: 'Careful surface preparation and finishing for a clean, consistent look throughout the home.',
    details:
      'Finishes are chosen to complement the design palette and applied as the final step of execution.',
  },
  {
    slug: 'decor-styling',
    title: 'Décor & Styling',
    short: 'Final styling with curated décor, textures and accents that complete the home.',
    details:
      'Décor and styling bring the finished interior together, so every room feels considered from the first day.',
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  image: string;
  isDemo: boolean;
};

export const PROJECT_CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'living-room', label: 'Living Room' },
  { slug: 'bedroom', label: 'Bedroom' },
  { slug: 'modular-kitchen', label: 'Modular Kitchen' },
  { slug: 'dining-area', label: 'Dining Area' },
  { slug: 'wardrobes', label: 'Wardrobes' },
  { slug: 'false-ceiling', label: 'False Ceiling' },
  { slug: '2-bhk', label: 'Complete 2 BHK' },
  { slug: '3-bhk', label: 'Complete 3 BHK' },
] as const;

// Sample imagery only. Replace with real 4VISION project photography and set isDemo to false.
export const PROJECTS: Project[] = [
  { slug: 'living-room-demo', title: 'Warm Contemporary Living Room', category: 'living-room', location: 'Sample design', summary: 'A layered living room with warm ambient lighting, a feature wall and custom storage.', image: '/images/projects/living-room-demo.jpg', isDemo: true },
  { slug: 'bedroom-demo', title: 'Calm Master Bedroom', category: 'bedroom', location: 'Sample design', summary: 'A restful bedroom with a headboard wall, concealed lighting and wardrobe integration.', image: '/images/projects/bedroom-demo.jpg', isDemo: true },
  { slug: 'modular-kitchen-demo', title: 'Modular Kitchen with Warm Tones', category: 'modular-kitchen', location: 'Sample design', summary: 'A practical modular kitchen with tall storage units and a clean, uncluttered countertop.', image: '/images/projects/modular-kitchen-demo.jpg', isDemo: true },
  { slug: 'dining-area-demo', title: 'Dining Area with Pendant Lighting', category: 'dining-area', location: 'Sample design', summary: 'A dining zone anchored by pendant lighting and a crockery unit that doubles as décor.', image: '/images/projects/dining-area-demo.jpg', isDemo: true },
  { slug: 'wardrobe-demo', title: 'Sliding Wardrobe with Champagne Accents', category: 'wardrobes', location: 'Sample design', summary: 'A full-height sliding wardrobe with internal drawers and a contrast finish.', image: '/images/projects/wardrobe-demo.jpg', isDemo: true },
  { slug: 'false-ceiling-demo', title: 'Layered False Ceiling Design', category: 'false-ceiling', location: 'Sample design', summary: 'A coved false ceiling with cove lighting that adds height and softness to the room.', image: '/images/projects/false-ceiling-demo.jpg', isDemo: true },
  { slug: '2-bhk-demo', title: 'Complete 2 BHK Interior', category: '2-bhk', location: 'Sample design', summary: 'A full 2 BHK interior covering living, kitchen, bedrooms and storage in one cohesive scheme.', image: '/images/projects/2-bhk-demo.jpg', isDemo: true },
  { slug: '3-bhk-demo', title: 'Complete 3 BHK Interior', category: '3-bhk', location: 'Sample design', summary: 'A complete 3 BHK interior with a consistent material palette across every room.', image: '/images/projects/3-bhk-demo.jpg', isDemo: true },
];

export type Package = {
  slug: string;
  name: string;
  propertyType: '2 BHK' | '3 BHK';
  price: string;
  priceValue: number;
};

export const PACKAGES: Package[] = [
  { slug: '2-bhk', name: '2 BHK Complete Home Interiors', propertyType: '2 BHK', price: '₹14,99,000/-', priceValue: 1499000 },
  { slug: '3-bhk', name: '3 BHK Complete Home Interiors', propertyType: '3 BHK', price: '₹19,99,000/-', priceValue: 1999000 },
];

export const PACKAGE_NOTE =
  'Prices are subject to terms and conditions and final project requirements. Please confirm the scope with our team before booking.';

export const LOCATIONS = [
  'Hinjewadi',
  'Baner',
  'Punawale',
  'Wakad',
  'Hadapsar',
  'Kalyani Nagar',
  'Keshav Nagar',
  'Kothrud',
  'Karve Nagar',
];

export const STATS = [
  { value: 8, label: 'Interior services under one roof' },
  { value: 9, label: 'Pune localities served' },
  { value: 2, label: 'Complete home package options' },
];

export const WHY_CHOOSE = [
  { title: 'Design-led planning', text: 'Every home starts with space planning and design, so the interior is considered before a single wall is changed.' },
  { title: 'Complete execution', text: 'From false ceilings and electrical work to painting and styling, the full scope is delivered by one team.' },
  { title: 'Clear packages', text: 'Our 2 BHK and 3 BHK packages show what is covered, so you can plan with confidence.' },
  { title: 'Direct communication', text: 'Reach us on WhatsApp or by phone. You will speak with the people planning your home.' },
];

export const TESTIMONIALS_PLACEHOLDER = [
  { name: 'Client name', location: 'Pune', text: 'Placeholder – replace with a verified client review.' },
  { name: 'Client name', location: 'Pune', text: 'Placeholder – replace with a verified client review.' },
  { name: 'Client name', location: 'Pune', text: 'Placeholder – replace with a verified client review.' },
];

export const FAQS = [
  { q: 'What services does 4VISION provide?', a: 'We provide complete home interiors across eight areas: space planning and design, false ceiling and lighting, electrical work, modular furniture, modular kitchens, wardrobes and storage, painting and finishing, and décor and styling.' },
  { q: 'Do you provide complete 2 BHK and 3 BHK interiors?', a: 'Yes. We offer a 2 BHK Complete Home Interiors package and a 3 BHK Complete Home Interiors package. Both are listed on our Packages page.' },
  { q: 'What is included in the interior package?', a: 'Each package covers all eight services: space planning and design, false ceiling and lighting, electrical work, modular furniture, modular kitchen, wardrobes and storage solutions, painting and finishing, and décor and styling. Pricing is subject to terms and conditions and final project requirements.' },
  { q: 'Do you provide modular kitchen solutions?', a: 'Yes. Modular kitchen is one of our core services and is included in our complete home packages.' },
  { q: 'Which areas in Pune do you serve?', a: 'We serve Hinjewadi, Baner, Punawale, Wakad, Hadapsar, Kalyani Nagar, Keshav Nagar, Kothrud and Karve Nagar.' },
  { q: 'How can I book a consultation?', a: 'Use the Get Free Consultation button, fill in the enquiry form, or message us on WhatsApp. You can also call either number listed on our Contact page.' },
  { q: 'How can I request a customised quotation?', a: 'Share your property type, location, preferred services and requirements through the enquiry form, or on WhatsApp. Our team will follow up with a customised quotation.' },
  { q: 'How can I contact your team?', a: 'Call +91 8999377902 or +91 8805405738, message us on WhatsApp at +91 8999377902, or use the enquiry form on our Contact page.' },
];

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/packages', label: 'Packages' },
  { to: '/locations', label: 'Locations' },
  { to: '/contact', label: 'Contact Us' },
];
