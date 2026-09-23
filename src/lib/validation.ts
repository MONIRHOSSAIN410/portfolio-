import type { ContactPayload } from "@/lib/types";

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form-এর ভ্যালিডেশন। ক্লায়েন্ট আর সার্ভার — দুই জায়গাতেই
 * একই ফাংশন চলে, তাই নিয়ম কখনো আলাদা হয়ে যায় না।
 */
export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const subject = input.subject?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
  else if (name.length > 80) errors.name = "That name is a bit too long.";

  if (!email) errors.email = "An email address is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email.";

  if (subject.length < 3) errors.subject = "Add a short subject (at least 3 characters).";
  else if (subject.length > 120) errors.subject = "Please keep the subject under 120 characters.";

  if (message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  else if (message.length > 3000) errors.message = "Please keep the message under 3000 characters.";

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
