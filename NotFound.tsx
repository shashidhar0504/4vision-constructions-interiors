import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found | 4VISION', description: 'The page you are looking for could not be found.', path: '/404' });
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 pb-20 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="title-lg">This page could not be found.</h1>
      <p className="mt-4 text-brand-cream/70">The link may be outdated, or the page may have moved.</p>
      <Link to="/" className="btn-gold mt-8">Return to homepage</Link>
    </section>
  );
}
