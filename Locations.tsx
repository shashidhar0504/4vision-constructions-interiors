import { MapPin, MessageCircle, Info } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, Reveal, SectionHeading } from '../components/ui';
import { LOCATIONS } from '../data/content';
import { MAPS_EMBED_URL, whatsappLink, WA_MESSAGES } from '../lib/config';

export default function Locations() {
  useDocumentMeta({
    title: 'Interior Design Locations in Pune | 4VISION',
    description:
      '4VISION serves homes across Pune: Hinjewadi, Baner, Punawale, Wakad, Hadapsar, Kalyani Nagar, Keshav Nagar, Kothrud and Karve Nagar.',
    path: '/locations',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Locations' }]} />
      <section className="container-x pb-12">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Service locations</p>
          <h1 className="title-xl">Interiors across Pune.</h1>
          <p className="mt-6 text-lg text-brand-cream/75">
            We design and execute home interiors in the following Pune localities. Select your area to start an enquiry.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((area, i) => (
            <Reveal key={area} delay={(i % 3) * 0.08}>
              <li className="card flex h-full flex-col justify-between gap-6 p-7 hover:-translate-y-1 hover:border-brand-gold/50">
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-gold" size={22} aria-hidden />
                  <h2 className="text-2xl font-semibold">{area}</h2>
                </div>
                <p className="text-sm text-brand-cream/60">Pune, Maharashtra</p>
                <a
                  href={whatsappLink(WA_MESSAGES.location(area))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <MessageCircle size={16} aria-hidden /> Enquire for {area}
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="Find us" title="Our location on the map" />
          {MAPS_EMBED_URL ? (
            <div className="overflow-hidden rounded-2xl border border-brand-gold/15">
              <iframe
                title="4VISION location map"
                src={MAPS_EMBED_URL}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="card flex items-start gap-4 p-8">
              <Info className="mt-0.5 shrink-0 text-brand-gold" size={22} aria-hidden />
              <p className="text-brand-cream/75">
                The office map will appear here once our business address is published. Until then, please reach us by phone or WhatsApp for directions.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
