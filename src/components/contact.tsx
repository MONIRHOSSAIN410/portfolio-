"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Have a project in mind or a role to discuss? I usually reply within a day."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <a
          href={profile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <MessageCircle className="size-5" />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">WhatsApp</div>
            <div className="font-medium">{profile.phoneDisplay}</div>
          </div>
        </a>

        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Mail className="size-5" />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium break-all">{profile.email}</div>
          </div>
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Github className="size-5" />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">GitHub</div>
            <div className="font-medium">MONIRHOSSAIN410</div>
          </div>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Linkedin className="size-5" />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">LinkedIn</div>
            <div className="font-medium">monir-hossain</div>
          </div>
        </a>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Button size="lg" variant="brand" asChild>
          <a href={profile.cvUrl} download>
            <Download className="size-4" /> Download Full CV
          </a>
        </Button>
      </div>
    </section>
  );
}
