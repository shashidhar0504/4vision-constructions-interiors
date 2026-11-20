import { useSearchParams } from 'react-router-dom';
import { Briefcase, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, Reveal, SectionHeading } from '../components/ui';
import EnquiryForm from '../components/EnquiryForm';
import {
  CONTACT_EMAIL,
  DEFAULT_EMAIL_BODY,
  DEFAULT_EMAIL_SUBJECT,
  INSTAGRAM_URL,
  MAPS_EMBED_URL,
  PHONE_NUMBERS,
  mailtoLink,
  whatsappLink,
  WA_MESSAGES,
} from '../lib/config';
import { SERVICE_OPTIONS, PROPERTY_TYPES } from '../../shared/enquiry';

export default function Contact() {
  useDocumentMeta({
    title: 'Contact 4VISION | Interior Designers in Pune',
    description:
      'Contact 4VISION for complete home interiors in Pune. Call, WhatsApp, or send an enquiry for a free consultation and customised quotation.',
    path: '/contact',
  });

  // Pre-select service or property type when arriving from a package or service link.
  const [params] = useSearchParams();
  const service = params.get('service') ?? undefined;
  const property = params.get('property') ?? undefined;
  const mailto = mailtoLink(DEFAULT_EMAIL_SUBJECT, DEFAULT_EMAIL_BODY);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
      <section className="container-x pb-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Get in touch</p>
          <h1 className="title-xl">Let's talk about your home.</h1>
          <p className="mt-6 text-lg text-brand-cream/75">Call, message on WhatsApp, or send us an enquiry below.</p>
        </Reveal>
      </section>

      {/* Channels */}
      <section className="container-x pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="card h-full p-7">
              <Phone className="mb-4 text-brand-gold" size={26} aria-hidden />
              <h2 className="text-xl font-semibold">Call us</h2>
              <ul className="mt-4 space-y-3">
                {PHONE_NUMBERS.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-brand-cream/85 transition hover:text-brand-gold">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col p-7">
              <MessageCircle className="mb-4 text-brand-gold" size={26} aria-hidden />
              <h2 className="text-xl font-semibold">WhatsApp</h2>
              <p className="mt-3 text-sm text-brand-cream/65">Chat with our team and share your requirements.</p>
              <a href={whatsappLink(WA_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-auto">
                Message on WhatsApp
              </a>
            </div>
          </Reveal>

          {mailto && (
            <Reveal delay={0.16}>
              <div className="card flex h-full flex-col p-7">
                <Mail className="mb-4 text-brand-gold" size={26} aria-hidden />
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="mt-3 break-all text-sm text-brand-cream/65">{CONTACT_EMAIL}</p>
                <a href={mailto} className="btn-outline mt-auto">
                  Send an email
                </a>
              </div>
            </Reveal>
          )}

          {INSTAGRAM_URL && (
            <Reveal delay={0.24}>
              <div className="card flex h-full flex-col p-7">
                <Instagram className="mb-4 text-brand-gold" size={26} aria-hidden />
                <h2 className="text-xl font-semibold">Instagram</h2>
                <p className="mt-3 text-sm text-brand-cream/65">Follow our work and latest updates.</p>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline mt-auto">
                  Follow Us
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="section scroll-mt-24 bg-brand-secondary/25">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow mb-4">Business enquiry</p>
            <h2 className="title-lg">Send us your requirements</h2>
            <p className="mt-4 text-brand-cream/70">
              Share your property type, preferred services and location. Our team will get back to you to discuss the next steps and a customised quotation.
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-brand-gold/15 p-5 text-sm text-brand-cream/70">
              <Briefcase className="mt-0.5 shrink-0 text-brand-gold" size={18} aria-hidden />
              <p>For business, builder, or site-partner enquiries, select "Other" under property type and describe your requirements.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EnquiryForm
              defaultService={SERVICE_OPTIONS.find((s) => s === service)}
              defaultProperty={PROPERTY_TYPES.find((p) => p === property)}
            />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Location" title="Find us" subtitle="Our office map will be shown here once the business address is published." />
          {MAPS_EMBED_URL && (
            <iframe title="4VISION location map" src={MAPS_EMBED_URL} className="h-[380px] w-full rounded-2xl border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          )}
        </div>
      </section>
    </>
  );
}
