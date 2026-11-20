import 'dotenv/config';
import Fastify from 'fastify';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import nodemailer from 'nodemailer';
import { existsSync } from 'node:fs';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { enquirySchema, type EnquiryInput } from '../shared/enquiry.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '..');
const DATA_DIR = path.join(ROOT, 'data');
const DIST_DIR = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT ?? 8787);

type Lead = Omit<EnquiryInput, 'website'> & { id: string; receivedAt: string };

const app = Fastify({ logger: true, bodyLimit: 32 * 1024, trustProxy: true });

// Rate limiting is applied per route; the enquiry endpoint allows 5 submissions per IP per 10 minutes.
await app.register(rateLimit, { global: false });

async function sendLeadEmail(lead: Lead): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_FROM_EMAIL, LEAD_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !LEAD_TO_EMAIL) return false;

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const lines = Object.entries(lead)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join('\n');

  await transporter.sendMail({
    from: LEAD_FROM_EMAIL || SMTP_USER,
    to: LEAD_TO_EMAIL,
    replyTo: lead.email || undefined,
    subject: `Interior Design Enquiry – 4VISION (${lead.fullName})`,
    text: `New website enquiry received:\n\n${lines}`,
  });
  return true;
}

app.get('/api/health', async () => ({ ok: true }));

app.post(
  '/api/enquiries',
  { config: { rateLimit: { max: 5, timeWindow: '10 minutes' } } },
  async (req, reply) => {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot: pretend success for bots without storing anything.
    if (typeof body.website === 'string' && body.website.length > 0) {
      return reply.code(202).send({ ok: true });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: 'Please check the highlighted fields.',
        issues: parsed.error.flatten().fieldErrors,
      });
    }

    const { website: _ignored, ...fields } = parsed.data;
    const lead: Lead = { ...fields, id: randomUUID(), receivedAt: new Date().toISOString() };

    // Storage is the source of truth. If it fails, the visitor is told the enquiry was not received.
    try {
      await mkdir(DATA_DIR, { recursive: true });
      await appendFile(path.join(DATA_DIR, 'enquiries.jsonl'), `${JSON.stringify(lead)}\n`, 'utf8');
    } catch (err) {
      req.log.error({ err }, 'Failed to store enquiry');
      return reply.code(500).send({
        ok: false,
        message: 'We could not save your enquiry. Please try WhatsApp or call us instead.',
      });
    }

    let emailed = false;
    try {
      emailed = await sendLeadEmail(lead);
    } catch (err) {
      req.log.error({ err }, 'Failed to send enquiry email');
    }

    return reply.code(200).send({ ok: true, emailed });
  },
);

// In production the built frontend is served by this same process.
if (existsSync(DIST_DIR)) {
  await app.register(fastifyStatic, { root: DIST_DIR, prefix: '/' });
  app.setNotFoundHandler((req, reply) => {
    if (req.method === 'GET' && !req.url.startsWith('/api')) {
      return reply.type('text/html').sendFile('index.html');
    }
    return reply.code(404).send({ ok: false, message: 'Not found' });
  });
}

await app.listen({ port: PORT, host: '0.0.0.0' });
