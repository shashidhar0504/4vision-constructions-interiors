import { z } from 'zod';

// Shared by the browser form and the server, so both enforce identical rules.
export const PROPERTY_TYPES = ['2 BHK', '3 BHK', 'Other'] as const;

export const SERVICE_OPTIONS = [
  'Complete home interiors',
  'Space Planning & Design',
  'False Ceiling & Lighting',
  'Electrical Work',
  'Modular Furniture',
  'Modular Kitchen',
  'Wardrobes & Storage Solutions',
  'Painting & Finishing',
  'Décor & Styling',
  'Not sure yet',
] as const;

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = v.replace(/\D/g, '');
      return /^\+?[\d\s()-]+$/.test(v) && digits.length >= 10 && digits.length <= 13;
    }, 'Please enter a valid phone number'),
  email: z
    .union([z.literal(''), z.string().trim().email('Please enter a valid email address').max(150)])
    .optional(),
  propertyType: z.enum(PROPERTY_TYPES, {
    errorMap: () => ({ message: 'Please select a property type' }),
  }),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Please select a preferred service' }),
  }),
  location: z.string().trim().min(2, 'Please enter your project location').max(100),
  budget: z.string().trim().max(60).optional(),
  requirements: z.string().trim().max(1500, 'Please keep requirements under 1500 characters').optional(),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
