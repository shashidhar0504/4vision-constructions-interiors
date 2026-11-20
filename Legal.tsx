import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs } from '../components/ui';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How 4VISION collects, uses and protects the personal information you share through this website.',
    sections: [
      ['Information we collect', 'When you submit an enquiry, we collect the details you provide in the form, such as your name, phone number, email address (if given), property type, preferred service, location, budget and requirements.'],
      ['How we use it', 'We use your information only to respond to your enquiry, discuss your interior requirements, and provide a quotation. We do not sell your personal information.'],
      ['Storage and security', 'Enquiries are stored on our systems with access limited to the 4VISION team. Please contact us if you would like your information updated or removed.'],
      ['Cookies and analytics', 'If analytics is enabled, we use aggregated tools to understand how visitors use the website. Where required by law, we will request your consent.'],
      ['Contact', 'For privacy questions, reach us on +91 8999377902 or through the enquiry form on our Contact page.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    description: 'Terms governing the use of the 4VISION website and the interior packages displayed on it.',
    sections: [
      ['Website information', 'Information on this website is provided for general guidance. Service descriptions, package details and images may change without notice.'],
      ['Pricing', 'Package prices, including ₹14,99,000/- for 2 BHK and ₹19,99,000/- for 3 BHK, are subject to terms and conditions and final project requirements. A written scope and quotation are required before any project begins.'],
      ['Sample imagery', 'Images labelled as sample designs are illustrative. They are not photographs of completed 4VISION projects unless stated otherwise.'],
      ['Enquiries', 'Submitting an enquiry does not create a binding contract. Our team will confirm details with you directly.'],
      ['Governing law', 'These terms are governed by the laws of India. Disputes fall under the jurisdiction of the courts of Pune, Maharashtra.'],
    ],
  },
} as const;

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const c = CONTENT[kind];
  useDocumentMeta({ title: `${c.title} | 4VISION`, description: c.description, path: kind === 'privacy' ? '/privacy' : '/terms' });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: c.title }]} />
      <section className="container-x pb-28">
        <h1 className="title-lg mb-4">{c.title}</h1>
        <p className="mb-10 rounded-xl border border-brand-gold/20 bg-brand-secondary/50 p-4 text-sm text-brand-cream/75">
          Draft text for review. Please have this page checked by your legal advisor before publishing.
        </p>
        <div className="max-w-3xl space-y-10">
          {c.sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="mb-3 font-sans text-lg font-semibold text-brand-champagne">{heading}</h2>
              <p className="leading-relaxed text-brand-cream/75">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
