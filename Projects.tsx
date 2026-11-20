import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ArrowRight, Maximize2 } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, ImageWithFallback, Reveal } from '../components/ui';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/content';

export default function Projects() {
  useDocumentMeta({
    title: 'Interior Design Portfolio | 2 BHK & 3 BHK Projects in Pune | 4VISION',
    description:
      'Browse 4VISION interior design samples: living rooms, bedrooms, modular kitchens, dining areas, wardrobes, false ceilings and complete 2 BHK and 3 BHK interiors.',
    path: '/projects',
  });

  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const close = () => setLightbox(null);
  const step = (dir: 1 | -1) =>
    setLightbox((i) => (i === null ? null : (i + dir + visible.length) % visible.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, visible.length]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />
      <section className="container-x pb-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Portfolio</p>
          <h1 className="title-xl">Residential interiors, designed room by room.</h1>
          <p className="mt-6 rounded-xl border border-brand-gold/20 bg-brand-secondary/50 p-4 text-sm text-brand-cream/75">
            <strong className="text-brand-champagne">Note:</strong> The images on this page are sample designs for illustration. They are not photographs of completed 4VISION projects.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-8" aria-label="Filter projects by category">
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={filter === c.slug}
              onClick={() => setFilter(c.slug)}
              className={`min-h-[44px] shrink-0 rounded-full border px-5 py-2 text-sm transition ${
                filter === c.slug
                  ? 'border-brand-gold bg-brand-gold text-brand-primary'
                  : 'border-brand-gold/25 text-brand-cream/80 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-28" aria-live="polite">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((p, i) => (
            <figure key={p.slug} className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-brand-gold/15 bg-brand-secondary/40">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`View ${p.title} full screen`}
                className="relative block w-full overflow-hidden"
              >
                <ImageWithFallback
                  src={p.image}
                  alt={`${p.title} – sample interior design by 4VISION`}
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/70 text-brand-gold opacity-0 transition group-hover:opacity-100">
                  <Maximize2 size={18} aria-hidden />
                </span>
              </button>
              <figcaption className="flex items-start justify-between gap-4 p-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-champagne/70">Sample design</span>
                  <h2 className="mt-1 text-lg font-semibold">{p.title}</h2>
                  <p className="mt-2 text-sm text-brand-cream/65">{p.summary}</p>
                </div>
              </figcaption>
              <div className="px-5 pb-5">
                <Link to={`/projects/${p.slug}`} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-brand-gold hover:text-brand-champagne">
                  View project details <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </figure>
          ))}
        </div>
        {visible.length === 0 && <p className="text-brand-cream/70">No projects in this category yet.</p>}
      </section>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4" onClick={close}>
          <button type="button" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close preview" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/80 text-brand-cream">
            <X size={22} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary/80 text-brand-cream">
            <ChevronLeft size={24} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary/80 text-brand-cream">
            <ChevronRight size={24} />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback src={current.image} alt={current.title} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-champagne/70">Sample design</p>
              <p className="font-serif text-xl">{current.title}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
