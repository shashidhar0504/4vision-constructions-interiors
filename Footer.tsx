import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM_URL, PHONE_NUMBERS } from '../lib/config';
import { NAV_LINKS } from '../data/content';

const SERVICE_LINKS = ['Space Planning', 'Modular Kitchen', 'Furniture', 'Electrical', 'Painting', 'Décor'];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-brand-gold/15 bg-brand-secondary/40">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-3xl font-bold tracking-[0.12em] text-brand-gold">4VISION</p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-brand-champagne/80">Versatile | Vastu | View | Value</p>
          <p className="mt-5 text-sm leading-relaxed text-brand-cream/70">
            Complete home interiors in Pune: thoughtfully designed, fully executed, and delivered for dream homes.
          </p>
        </div>

        <div>
          <h2 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-brand-champagne">Quick Links</h2>
          <ul className="space-y-3 text-sm text-brand-cream/75">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-brand-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-brand-champagne">Our Services</h2>
          <ul className="space-y-3 text-sm text-brand-cream/75">
            {SERVICE_LINKS.map((s) => (
              <li key={s}>
                <Link to="/services" className="transition hover:text-brand-gold">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-brand-champagne">Contact</h2>
          <ul className="space-y-3 text-sm text-brand-cream/75">
            {PHONE_NUMBERS.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="flex items-center gap-2 transition hover:text-brand-gold">
                  <Phone size={15} aria-hidden /> {p.label}
                </a>
              </li>
            ))}
            {CONTACT_EMAIL && (
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 break-all transition hover:text-brand-gold">
                  <Mail size={15} aria-hidden /> {CONTACT_EMAIL}
                </a>
              </li>
            )}
            {INSTAGRAM_URL && (
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-brand-gold"
                >
                  <Instagram size={15} aria-hidden /> Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-gold/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-cream/60 sm:flex-row">
          <p>© {year} 4VISION. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-brand-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-gold">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
