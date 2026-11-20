import { Reveal } from './ui';
import EnquiryForm from './EnquiryForm';

// Lead form section used on the homepage; anchors to #enquiry so mobile "Enquire" links land here too.
export default function EnquiryCta() {
  return (
    <section id="enquiry" className="section scroll-mt-24 bg-brand-secondary/25">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow mb-4">Free consultation</p>
          <h2 className="title-lg">Tell us about your home</h2>
          <p className="mt-4 text-brand-cream/70">
            Share a few details and our team will get in touch to discuss your requirements and next steps.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
