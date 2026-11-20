import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Secondary routes are code-split so the homepage loads quickly on mobile.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Packages = lazy(() => import('./pages/Packages'));
const Locations = lazy(() => import('./pages/Locations'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change; scroll to anchors (e.g. /contact#enquiry) when present.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <Layout>
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-brand-gold" role="status">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
