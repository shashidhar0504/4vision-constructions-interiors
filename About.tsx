import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Breadcrumbs, Reveal, SectionHeading } from '../components/ui';
import { WHY_CHOOSE } from '../data/content';

const APPROACH = [
  { step: '01', title: 'Understand', text: 'We listen to how you live, what you need from each room, and the budget you are working within.' },
  { step: '02', title: 'Design', text: 'Space planning, layouts and material palettes are developed and reviewed with you before execution.' },
  { step: '03', title: 'Build', text: 'False ceilings, electrical work, carpentry, modular units and finishes are executed with careful coordination.' },
  { step: '04', title: 'Deliver', text: 'The finished interior is styled, handed over, and ready to live in.' },
];

export default function About() {
  useDocumentMeta({
    title: 'About 4VISION | Interior Design Company in Pune',
    description:
      'Learn about 4VISION, a Pune-based home interior design and execution company focused on thoughtful design, transparency and complete delivery.',
    path: '/about',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
      <section className="container-x pb-16">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">About 4VISION</p>
          <h1 className="title-xl">Complete home interiors, designed and delivered with care.</h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
            4VISION – Construction &amp; Interiors is a Pune-based company that takes a home from first concept to finished interior. We believe a good interior is planned as a whole, not assembled one room at a time.
          </p>
        </Reveal>
      </section>

      <section className="section bg-brand-secondary/25">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="title-lg mb-5">Our Story</h2>
            <p className="leading-relaxed text-brand-cream/75">
              4VISION was built around a simple observation: homeowners often have to coordinate designers, carpenters, electricians and painters separately, and the result can feel disconnected. We set out to offer one complete path, from space planning through to execution and final styling.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-10">
            <div>
              <h2 className="title-lg mb-3 !text-3xl">Our Vision</h2>
              <p className="leading-relaxed text-brand-cream/75">
                To be a trusted name for complete home interiors in Pune, known for thoughtful design and dependable execution.
              </p>
            </div>
            <div>
              <h2 className="title-lg mb-3 !text-3xl">Our Mission</h2>
              <p className="leading-relaxed text-brand-cream/75">
                To design and deliver homes that are beautiful, functional and well built, with clear communication at every step.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="title-lg mb-5">Our Design Philosophy</h2>
            <p className="leading-relaxed text-brand-cream/75">
              We design around the people who live in the home. Our brand promise, Versatile | Vastu | View | Value, reflects how we plan: flexible layouts, Vastu-conscious orientation, the view and light each room deserves, and value in every decision.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="title-lg mb-6 !text-3xl">Why clients choose 4VISION</h2>
            <ul className="space-y-5">
              {WHY_CHOOSE.map((w) => (
                <li key={w.title} className="border-l-2 border-brand-gold/60 pl-5">
                  <h3 className="text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-cream/65">{w.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-secondary/25">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="Our approach: Understand, Design, Build, Deliver" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <p className="font-serif text-4xl text-brand-gold/80">{a.step}</p>
                  <h3 className="mt-4 text-xl font-semibold">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="title-lg">Let's plan your home together</h2>
            <Link to="/contact#enquiry" className="btn-gold mt-8">
              Get Free Consultation <ArrowRight size={18} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
