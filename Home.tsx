import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageCircle, Phone, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { PACKAGES, PROJECTS, SERVICES, STATS, WHY_CHOOSE, LOCATIONS, TESTIMONIALS_PLACEHOLDER, FAQS } from '../data/content';
import { PHONE_NUMBERS, WA_MESSAGES, whatsappLink, SITE_URL } from '../lib/config';
import { Counter, ImageWithFallback, Reveal, SectionHeading, Faq } from '../components/ui';
import * as Icons from 'lucide-react';
import EnquiryCta from '../components/EnquiryCta';

export default function Home() {
  useDocumentMeta({
    title: '4VISION | Interior Designers in Pune | Complete Home Interiors',
    description:
      'Complete home interiors in Pune by 4VISION: space planning, modular kitchens, false ceilings, wardrobes and 2 BHK & 3 BHK packages. Get a free consultation.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: '4VISION – Construction & Interiors',
      description: 'Complete home interior design, build and delivery company in Pune.',
      url: SITE_URL || undefined,
      telephone: ['+918999377902', '+918805405738'],
      areaServed: LOCATIONS.map((l) => ({ '@type': 'Place', name: `${l}, Pune` })),
      makesOffer: PACKAGES.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: p.priceValue,
        priceCurrency: 'INR',
      })),
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <ImageWithFallback
          src="/images/hero/hero-living-room.jpg"
          alt="Luxury living room interior designed by 4VISION"
          label="Hero photograph coming soon"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-primary via-brand-primary/85 to-brand-primary/30" />
        <div className="container-x pt-28 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
            <p className="font-serif text-2xl font-bold tracking-[0.2em] text-brand-gold">4VISION</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-champagne/80">Versatile | Vastu | View | Value</p>
            <h1 className="title-xl mt-8">Complete Home Interiors</h1>
            <p className="mt-4 font-serif text-2xl italic text-brand-champagne">Design • Build • Deliver</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-cream/80">
              A thoughtfully designed, fully executed interior solution for your dream home.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact#enquiry" className="btn-gold">
                Get Free Consultation <ArrowRight size={18} aria-hidden />
              </Link>
              <Link to="/projects" className="btn-outline">
                Explore Our Projects
              </Link>
            </div>
            <a
              href={whatsappLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-brand-champagne transition hover:text-brand-gold"
            >
              <MessageCircle size={18} aria-hidden /> Or start the conversation on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="4VISION at a glance" className="border-y border-brand-gold/15 bg-brand-secondary/40">
        <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-serif text-6xl font-semibold text-brand-gold">
                <Counter to={s.value} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-cream/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title="Eight services. One complete home." subtitle="From the first layout to the final décor, every part of your interior is planned and delivered by 4VISION." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.08}>
                <Link to="/services" className="card group block h-full p-6 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-xl hover:shadow-black/30">
                  <h3 className="text-xl font-semibold group-hover:text-brand-gold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="Featured designs" title="Residential interiors, thoughtfully composed" subtitle="Sample designs shown below. Actual completed-project photography will replace these as it becomes available." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/projects/${p.slug}`} className="group relative block overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={p.image}
                    alt={`${p.title} – 4VISION interior design`}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary via-brand-primary/70 to-transparent p-5 pt-16">
                    <span className="rounded-full bg-brand-primary/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-champagne">Sample design</span>
                    <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="btn-outline">View all projects</Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Interior packages" title="2 BHK & 3 BHK complete home packages" subtitle="Every package covers all eight services. Prices are subject to terms and conditions and final project requirements." />
          <div className="grid gap-8 md:grid-cols-2">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <div className="card flex h-full flex-col p-8 sm:p-10">
                  <p className="eyebrow">{p.propertyType}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{p.name}</h3>
                  <p className="mt-6 font-serif text-5xl text-brand-gold">{p.price}</p>
                  <p className="mt-3 text-sm text-brand-cream/60">All eight services included. Subject to terms and conditions.</p>
                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                    <Link to="/packages" className="btn-gold flex-1">View package details</Link>
                    <a href={whatsappLink(WA_MESSAGES.pkg(p.name, p.price))} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1">
                      <MessageCircle size={16} aria-hidden /> WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="Why 4VISION" title="Why choose 4VISION?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((w, i) => {
              const icons = ['Compass', 'Hammer', 'ListChecks', 'MessagesSquare'] as const;
              const Icon = Icons[icons[i]] ?? Icons.Sparkles;
              return (
                <Reveal key={w.title} delay={i * 0.08}>
                  <div className="card h-full p-7">
                    <Icon className="mb-5 text-brand-gold" size={30} aria-hidden />
                    <h3 className="text-xl font-semibold">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Where we work" title="Serving homes across Pune" subtitle="Interior design and execution for residences in these localities." />
          <ul className="flex flex-wrap justify-center gap-3">
            {LOCATIONS.map((l) => (
              <li key={l}>
                <Link to="/locations" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-gold/25 px-5 py-2.5 text-sm transition hover:border-brand-gold hover:text-brand-gold">
                  <MapPin size={14} aria-hidden /> {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials (placeholders until verified reviews are supplied) */}
      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="Client stories" title="What our clients say" subtitle="Placeholder testimonials. Verified client reviews will appear here." />
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS_PLACEHOLDER.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure className="card h-full p-8">
                  <Quote className="mb-4 text-brand-gold/70" size={28} aria-hidden />
                  <blockquote className="text-brand-cream/80">{t.text}</blockquote>
                  <figcaption className="mt-6 text-sm text-brand-champagne">
                    {t.name}, {t.location}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="title-lg">Frequently asked questions</h2>
            <p className="mt-4 text-brand-cream/70">Quick answers about our services, packages and how to get started.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={FAQS.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      {/* Contact band */}
      <EnquiryCta />
      <section className="pb-24 md:pb-28">
        <div className="container-x">
          <div className="card flex flex-col items-center gap-6 p-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="title-lg !text-3xl">Ready to plan your home?</h2>
              <p className="mt-2 text-brand-cream/70">Speak to our team directly, or send us your requirements.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {PHONE_NUMBERS.map((p) => (
                <a key={p.href} href={p.href} className="btn-outline">
                  <Phone size={16} aria-hidden /> {p.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
