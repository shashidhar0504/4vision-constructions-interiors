import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import {
  enquirySchema,
  PROPERTY_TYPES,
  SERVICE_OPTIONS,
  type EnquiryInput,
} from '../../shared/enquiry';
import { whatsappLink, WA_MESSAGES } from '../lib/config';

type Props = { defaultService?: string; defaultProperty?: string };

function Field({
  label,
  error,
  children,
  optional,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="label">
        {label} {optional && <span className="text-brand-cream/40">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm({ defaultService, defaultProperty }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState<EnquiryInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      propertyType: PROPERTY_TYPES.find((p) => p === defaultProperty),
      service: SERVICE_OPTIONS.find((s) => s === defaultService),
      location: '',
      budget: '',
      requirements: '',
      website: '',
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(
          res.status === 429
            ? 'Too many enquiries from this connection. Please try again later, or reach us on WhatsApp.'
            : body.message ?? 'Something went wrong. Please try again, or contact us on WhatsApp.',
        );
        return;
      }
      setStatus('success');
      setSubmitted(values);
      reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success' && submitted) {
    return (
      <div className="card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 text-brand-gold" size={48} aria-hidden />
        <h3 className="title-lg !text-3xl">Thank you, {submitted.fullName}</h3>
        <p className="mx-auto mt-4 max-w-md text-brand-cream/75">
          Your enquiry has been received. Our team will get in touch shortly. To speed things up, you can also continue on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(WA_MESSAGES.enquiry(submitted))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <MessageCircle size={18} aria-hidden /> Continue on WhatsApp
          </a>
          <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  const inputClass = 'field';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-6 p-6 sm:p-10" aria-label="Enquiry form">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input id="fullName" autoComplete="name" className={inputClass} placeholder="Your full name" {...register('fullName')} />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input id="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="+91 XXXXX XXXXX" {...register('phone')} />
        </Field>
        <Field label="Email Address" error={errors.email?.message} optional>
          <input id="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" {...register('email')} />
        </Field>
        <Field label="Property Type" error={errors.propertyType?.message}>
          <select id="propertyType" className={inputClass} {...register('propertyType')} defaultValue="">
            <option value="" disabled>
              Select property type
            </option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Service" error={errors.service?.message}>
          <select id="service" className={inputClass} {...register('service')} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project Location (Pune area)" error={errors.location?.message}>
          <input id="location" className={inputClass} placeholder="e.g. Baner, Wakad, Kothrud" {...register('location')} />
        </Field>
        <Field label="Approximate Budget" error={errors.budget?.message} optional>
          <input id="budget" className={inputClass} placeholder="e.g. ₹15–20 lakh" {...register('budget')} />
        </Field>
      </div>

      <Field label="Additional Requirements" error={errors.requirements?.message} optional>
        <textarea
          id="requirements"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your home, timeline, or any specific needs."
          {...register('requirements')}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {status === 'error' && message && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p>{message}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-brand-cream/50">We use your details only to respond to your enquiry.</p>
        <button type="submit" disabled={status === 'submitting'} className="btn-gold disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            'Submit Enquiry'
          )}
        </button>
      </div>
    </form>
  );
}
