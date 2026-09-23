import { NextResponse, type NextRequest } from "next/server";

import { profile } from "@/lib/data";
import type { ContactPayload, ContactResponse } from "@/lib/types";
import { hasErrors, validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------ rate limiting ------------------------------ */
/** ছোট in-memory limiter — এক IP থেকে ১০ মিনিটে সর্বোচ্চ ৫টা মেসেজ। */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/* --------------------------------- handler -------------------------------- */

export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  // honeypot — আসল মানুষ এই ফিল্ডটা দেখতেই পায় না
  if (body.website) {
    return json({ ok: true, message: "Thanks for reaching out!", delivered: false });
  }

  if (isRateLimited(clientIp(request))) {
    return json(
      { ok: false, message: "Too many messages from this address. Please try again later." },
      429
    );
  }

  const errors = validateContact(body);
  if (hasErrors(errors)) {
    return json({ ok: false, message: "Please fix the highlighted fields.", errors }, 400);
  }

  const payload: ContactPayload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    subject: body.subject!.trim(),
    message: body.message!.trim(),
  };

  const delivered = await deliver(payload);

  return json({
    ok: true,
    delivered,
    message: delivered
      ? "Thanks! Your message is on its way — I usually reply within a day."
      : "Thanks! Your message was received. For anything urgent, WhatsApp is fastest.",
  });
}

/* -------------------------------- delivery -------------------------------- */

/**
 * RESEND_API_KEY সেট থাকলে Resend দিয়ে মেইল পাঠায়, না থাকলে সার্ভার লগে
 * লিখে রাখে। অন্য প্রোভাইডার (SendGrid, Nodemailer, SMTP) ব্যবহার করতে চাইলে
 * শুধু এই একটা ফাংশন বদলান।
 *
 * সেটআপ: .env.local এ —
 *   RESEND_API_KEY=re_xxxxxxxx
 *   CONTACT_FROM=Portfolio <onboarding@resend.dev>
 *   CONTACT_TO=mh0168916@gmail.com
 */
async function deliver(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info("[contact] new message (email provider not configured):", payload);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? profile.email],
        reply_to: payload.email,
        subject: `Portfolio — ${payload.subject}`,
        text: [
          `Name:    ${payload.name}`,
          `Email:   ${payload.email}`,
          `Subject: ${payload.subject}`,
          "",
          payload.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contact] provider rejected the message:", res.status, await res.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return false;
  }
}

function json(payload: ContactResponse, status = 200) {
  return NextResponse.json(payload, { status });
}
