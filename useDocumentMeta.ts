import { useEffect } from 'react';
import { SITE_URL } from './config';

type DocumentMeta = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Sets unique title, description, canonical, Open Graph and optional JSON-LD for each page.
export function useDocumentMeta({ title, description, path, jsonLd }: DocumentMeta) {
  useEffect(() => {
    const origin = SITE_URL || window.location.origin;
    const url = `${origin}${path}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:card', 'summary_large_image');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const id = 'page-jsonld';
    const existing = document.getElementById(id);
    if (jsonLd) {
      const script = (existing as HTMLScriptElement | null) ?? document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, jsonLd]);
}
