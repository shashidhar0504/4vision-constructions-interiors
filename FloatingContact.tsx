import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MessageCircle, Phone, ClipboardList } from 'lucide-react';
import { PRIMARY_CALL_HREF, whatsappLink, WA_MESSAGES } from '../lib/config';

// WhatsApp floating button, mobile contact bar (Call / WhatsApp / Enquire) and back-to-top button.
export default function FloatingContact() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = whatsappLink(WA_MESSAGES.general);

  return (
    <>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 4VISION on WhatsApp"
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105 md:bottom-8 md:right-8"
      >
        <MessageCircle size={28} aria-hidden />
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-24 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-secondary/90 text-brand-gold shadow-lg transition duration-300 md:bottom-8 md:left-8 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp size={20} aria-hidden />
      </button>

      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/20 bg-brand-primary/95 backdrop-blur-md md:hidden"
      >
        <ul className="grid grid-cols-3">
          <li>
            <a href={PRIMARY_CALL_HREF} className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs text-brand-cream">
              <Phone size={20} className="text-brand-gold" aria-hidden />
              Call
            </a>
          </li>
          <li>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs text-brand-cream"
            >
              <MessageCircle size={20} className="text-brand-gold" aria-hidden />
              WhatsApp
            </a>
          </li>
          <li>
            <Link to="/contact#enquiry" className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs text-brand-cream">
              <ClipboardList size={20} className="text-brand-gold" aria-hidden />
              Enquire
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
