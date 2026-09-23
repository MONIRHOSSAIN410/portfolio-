"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import type { ContactPayload, ContactResponse, Profile } from "@/lib/types";
import { hasErrors, validateContact, type FieldErrors } from "@/lib/validation";

const EMPTY: ContactPayload = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactForm({ profile }: { profile: Profile }) {
  const { toast } = useToast();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof ContactPayload) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // সার্ভারে পাঠানোর আগেই ক্লায়েন্টে একই নিয়মে চেক
    const clientErrors = validateContact(values);
    if (hasErrors(clientErrors)) {
      setErrors(clientErrors);
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as ContactResponse;

      if (!data.ok) {
        if (data.errors) setErrors(data.errors);
        toast({ title: "Couldn't send", description: data.message, variant: "error" });
        return;
      }

      setValues(EMPTY);
      setErrors({});
      toast({
        title: "Message sent",
        description: data.message,
        variant: "success",
      });
    } catch {
      toast({
        title: "Network error",
        description: `Please try again, or message me on WhatsApp at ${profile.phoneDisplay}.`,
        variant: "error",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* honeypot — স্ক্রিন রিডার ও চোখ, দুটোর কাছেই লুকানো */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={values.website}
        onChange={(e) => set("website")(e.target.value)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <Input
            name="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            disabled={pending}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            disabled={pending}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject}>
        <Input
          name="subject"
          value={values.subject}
          onChange={(e) => set("subject")(e.target.value)}
          placeholder="Project enquiry, role, collaboration…"
          aria-invalid={Boolean(errors.subject)}
          disabled={pending}
        />
      </Field>

      <Field
        label="Message"
        error={errors.message}
        hint={`${values.message.length}/3000`}
      >
        <Textarea
          name="message"
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Tell me about what you're building…"
          maxLength={3000}
          aria-invalid={Boolean(errors.message)}
          disabled={pending}
        />
      </Field>

      <Button type="submit" variant="brand" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send message
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
