import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, Reveal, ImageWithFallback } from '../components/ui';
import { SERVICES } from '../data/content';
import { whatsappLink, WA_MESSAGES } from '../lib/config';

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `service-${service.slug}-details`;
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article id={service.slug} className="card group flex h-full flex-col overflow-hidden scroll-mt-28 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-2xl hover:shadow-black/40">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={`/images/services/${service.slug}.jpg`}
            alt={`${service.title} by 4VISION`}
            label={service.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h2 className="text-2xl font-semibold">{service.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-cream/70">{service.short}</p>

          <div id={panelId} hidden={!expanded} className="mt-4 border-t border-brand-gold/15 pt-4 text-sm leading-relaxed text-brand-cream/65">
            {service.details}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((v) => !v)}
              className="btn-outline flex-1"
            >
              {expanded ? 'Show less' : 'Explore Service'}
              <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            <a
              href={whatsappLink(WA_MESSAGES.service(service.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex-1"
            >
              <MessageCircle size={16} aria-hidden /> WhatsApp Enquiry
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  useDocumentMeta({
    title: 'Interior Design Services in Pune | 4VISION',
    description:
      'Space planning, false ceilings, electrical work, modular furniture, modular kitchens, wardrobes, painting and décor by 4VISION in Pune.',
    path: '/services',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
      <section className="container-x pb-12">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Our services</p>
          <h1 className="title-xl">Every part of your home interior, in one place.</h1>
          <p className="mt-6 text-lg text-brand-cream/75">
            Choose the services you need, or book a complete home interior package that covers all eight.
          </p>
        </Reveal>
      </section>
      <section className="container-x pb-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
