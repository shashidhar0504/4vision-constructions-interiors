// Central place for every contact channel and third-party ID.
// Values come from environment variables so nothing fake ever ships.

export const WHATSAPP_NUMBER = '918999377902';

export const PHONE_NUMBERS = [
  { label: '+91 8999377902', href: 'tel:+918999377902' },
  { label: '+91 8805405738', href: 'tel:+918805405738' },
] as const;

export const PRIMARY_CALL_HREF = 'tel:+918999377902';

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? '';
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL?.trim() ?? '';
export const MAPS_EMBED_URL = import.meta.env.VITE_MAPS_EMBED_URL?.trim() ?? '';
export const SITE_URL = (import.meta.env.VITE_SITE_URL?.trim() ?? '').replace(/\/$/, '');
export const GA_ID = import.meta.env.VITE_GA_ID?.trim() ?? '';
export const GSC_VERIFICATION = import.meta.env.VITE_GSC_VERIFICATION?.trim() ?? '';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string): string | null {
  if (!CONTACT_EMAIL) return null;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const DEFAULT_EMAIL_SUBJECT = 'Interior Design Enquiry – 4VISION';
export const DEFAULT_EMAIL_BODY =
  'Hello 4VISION Team,\n\nI am interested in your home interior services. Please share more details about your packages, pricing, and consultation process.\n\nThank you.';

export const WA_MESSAGES = {
  general:
    'Hello 4VISION Team, I am interested in your complete home interior services. I would like to know more about your packages and consultation process.',
  pkg: (name: string, price: string) =>
    `Hello 4VISION Team, I am interested in the ${name} (${price}). Please share the package details and the consultation process.`,
  service: (name: string) =>
    `Hello 4VISION Team, I would like to enquire about your ${name} service. Please share more details.`,
  project: (name: string) =>
    `Hello 4VISION Team, I came across the "${name}" on your website and would like to discuss a similar interior for my home.`,
  location: (area: string) =>
    `Hello 4VISION Team, I am looking for home interior services in ${area}, Pune. Please share more details.`,
  enquiry: (v: { fullName: string; propertyType: string; service: string; location: string }) =>
    `Hello 4VISION Team, I am ${v.fullName}. I have submitted an enquiry on your website for a ${v.propertyType} interior (${v.service}) in ${v.location}. Please get in touch.`,
};
