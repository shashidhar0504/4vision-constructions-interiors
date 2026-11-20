import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-brand-primary"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
