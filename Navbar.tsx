import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-brand-primary/95 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col leading-none" aria-label="4VISION home">
          <span className="font-serif text-2xl font-bold tracking-[0.12em] text-brand-gold">4VISION</span>
          <span className="mt-1 hidden text-[10px] uppercase tracking-[0.25em] text-brand-champagne/80 sm:block">
            Versatile | Vastu | View | Value
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm transition hover:text-brand-gold ${isActive ? 'text-brand-gold' : 'text-brand-cream/85'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact#enquiry" className="btn-gold !min-h-[40px] !px-5 !py-2">
            Get Free Consultation
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-full text-brand-cream lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="container-x flex flex-col gap-1 pb-8 pt-2 lg:hidden"
        >
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex min-h-[48px] items-center border-b border-brand-gold/10 font-serif text-xl ${
                  isActive ? 'text-brand-gold' : 'text-brand-cream'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact#enquiry" className="btn-gold mt-6">
            Get Free Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
