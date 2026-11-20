import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useInView } from 'framer-motion';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto mb-14 max-w-2xl text-center' : 'mb-12 max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="title-lg">{title}</h2>
      {subtitle && <p className="mt-4 text-brand-cream/70">{subtitle}</p>}
    </Reveal>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-28 pb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-brand-cream/60">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="transition hover:text-brand-gold">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-brand-champagne">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  label = 'Photograph coming soon',
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-brand-secondary via-brand-primary to-brand-secondary ${className}`}
      >
        <span className="px-4 text-center text-[11px] uppercase tracking-[0.25em] text-brand-champagne/60">{label}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n}</span>;
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-brand-gold/15 rounded-2xl border border-brand-gold/15 bg-brand-secondary/40">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full min-h-[44px] items-center justify-between gap-4 px-5 py-5 text-left font-serif text-lg text-brand-cream sm:px-7"
              >
                {item.q}
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-brand-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="px-5 pb-6 text-brand-cream/75 sm:px-7"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
