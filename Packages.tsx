import { Link } from 'react-router-dom';
import { Check, MessageCircle, FileText, CalendarCheck, Receipt } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, Reveal, SectionHeading } from '../components/ui';
import { PACKAGES, PACKAGE_NOTE, SERVICES } from '../data/content';
import { whatsappLink, WA_MESSAGES } from '../lib/config';

export default function Packages() {
  useDocumentMeta({
    title: '2 BHK & 3 BHK Interior Packages in Pune | 4VISION',
    description:
      'Compare 4VISION complete home interior packages: 2 BHK at ₹14,99,000/- and 3 BHK at ₹19,99,000/-. All eight services included, subject to terms and conditions.',
    path: '/packages',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Packages' }]} />
      <section className="container-x pb-12">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Interior packages &amp; pricing</p>
          <h1 className="title-xl">Complete home interiors, priced clearly.</h1>
          <p className="mt-6 text-lg text-brand-cream/75">Choose the package that matches your home. Each one includes all eight services.</p>
        </Reveal>
      </section>

      {/* Package cards */}
      <section className="container-x grid gap-8 pb-20 md:grid-cols-2">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <div className="card flex h-full flex-col p-8 sm:p-10">
              <p className="eyebrow">{p.propertyType}</p>
              <h2 className="mt-3 text-3xl font-semibold">{p.name}</h2>
              <p className="mt-6 font-serif text-5xl text-brand-gold">{p.price}</p>
              <p className="mt-3 text-sm text-brand-cream/60">{PACKAGE_NOTE}</p>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a href={whatsappLink(WA_MESSAGES.pkg(p.name, p.price))} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <FileText size={16} aria-hidden /> Get Package Details
                </a>
                <Link to="/contact#enquiry" className="btn-outline">
                  <CalendarCheck size={16} aria-hidden /> Book Free Consultation
                </Link>
                <Link to={`/contact?property=${encodeURIComponent(p.propertyType)}#enquiry`} className="btn-outline">
                  <Receipt size={16} aria-hidden /> Request Custom Quote
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Compare */}
      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="Compare packages" title="2 BHK vs 3 BHK at a glance" />
          <Reveal className="overflow-x-auto rounded-2xl border border-brand-gold/15">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">Comparison of 2 BHK and 3 BHK interior packages</caption>
              <thead className="bg-brand-secondary/70">
                <tr>
                  <th scope="col" className="p-5 font-sans font-semibold text-brand-champagne">Feature</th>
                  {PACKAGES.map((p) => (
                    <th key={p.slug} scope="col" className="p-5 font-serif text-lg text-brand-gold">{p.propertyType} Package</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10">
                <tr>
                  <th scope="row" className="p-5 font-normal text-brand-cream/80">Property type</th>
                  {PACKAGES.map((p) => (<td key={p.slug} className="p-5">{p.propertyType}</td>))}
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-normal text-brand-cream/80">Package price</th>
                  {PACKAGES.map((p) => (<td key={p.slug} className="p-5 font-semibold text-brand-gold">{p.price}</td>))}
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-normal text-brand-cream/80">Services included</th>
                  {PACKAGES.map((p) => (<td key={p.slug} className="p-5">All {SERVICES.length} services listed below</td>))}
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-normal text-brand-cream/80">Consultation</th>
                  {PACKAGES.map((p) => (<td key={p.slug} className="p-5">Free consultation available</td>))}
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-normal text-brand-cream/80">Pricing terms</th>
                  {PACKAGES.map((p) => (<td key={p.slug} className="p-5 text-brand-cream/65">Subject to terms and conditions and final requirements</td>))}
                </tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What's included" title="All work included in every package" subtitle="Both packages cover the following eight services." />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 0.06}>
                <li className="flex items-start gap-4 rounded-xl border border-brand-gold/15 bg-brand-secondary/40 p-5">
                  <Check className="mt-0.5 shrink-0 text-brand-gold" size={20} aria-hidden />
                  <span className="text-brand-cream/90">{s.title}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-brand-cream/60">{PACKAGE_NOTE}</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="title-lg">Have a question about a package?</h2>
            <p className="mt-4 text-brand-cream/70">Our team will walk you through the scope and the consultation process.</p>
            <a href={whatsappLink(WA_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
              <MessageCircle size={18} aria-hidden /> Chat on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
