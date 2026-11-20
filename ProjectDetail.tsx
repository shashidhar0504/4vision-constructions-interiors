import { Link, useParams } from 'react-router-dom';
import { MessageCircle, ArrowLeft, Phone } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, ImageWithFallback, Reveal } from '../components/ui';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/content';
import { PRIMARY_CALL_HREF, whatsappLink, WA_MESSAGES } from '../lib/config';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const categoryLabel = PROJECT_CATEGORIES.find((c) => c.slug === project?.category)?.label ?? 'Projects';

  useDocumentMeta({
    title: project ? `${project.title} | 4VISION Interior Design Pune` : '4VISION Projects',
    description: project
      ? `${project.summary} Sample design by 4VISION, Pune.`
      : 'Project details by 4VISION.',
    path: `/projects/${slug ?? ''}`,
  });

  if (!project) return <NotFound />;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      />
      <article className="container-x pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <ImageWithFallback src={project.image} alt={`${project.title} – sample interior design by 4VISION`} className="w-full rounded-2xl object-cover aspect-[4/3]" />
            {project.isDemo && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-champagne/70">Demo imagery – not an actual completed project</p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="card p-8">
            <p className="eyebrow">{categoryLabel}</p>
            <h1 className="title-lg mt-3">{project.title}</h1>
            <p className="mt-5 leading-relaxed text-brand-cream/75">{project.summary}</p>
            <dl className="mt-8 space-y-4 border-t border-brand-gold/15 pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-brand-cream/60">Category</dt>
                <dd className="text-right">{categoryLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brand-cream/60">Location</dt>
                <dd className="text-right">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brand-cream/60">Status</dt>
                <dd className="text-right">{project.isDemo ? 'Sample design' : 'Completed project'}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappLink(WA_MESSAGES.project(project.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle size={18} aria-hidden /> Enquire on WhatsApp
              </a>
              <a href={PRIMARY_CALL_HREF} className="btn-outline">
                <Phone size={18} aria-hidden /> Call Now
              </a>
              <Link to="/contact#enquiry" className="btn-outline">
                Request a consultation
              </Link>
            </div>
          </Reveal>
        </div>

        <Link to="/projects" className="mt-12 inline-flex min-h-[44px] items-center gap-2 text-brand-gold transition hover:text-brand-champagne">
          <ArrowLeft size={16} aria-hidden /> Back to all projects
        </Link>
      </article>
    </>
  );
}
