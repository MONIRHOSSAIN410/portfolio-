"use client";

import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

export function Contact({ profile }: { profile: Profile }) {
  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: profile.phoneDisplay,
      href: profile.whatsappUrl,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      icon: Github,
      label: "GitHub",
      value: profile.githubUser,
      href: profile.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "monir-hossain",
      href: profile.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind or a role to discuss? Send a message below — I usually reply within a day."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal direction="left" className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand transition-transform group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className="truncate font-medium">{value}</div>
                </div>
              </a>
            ))}

            <div className="flex justify-center pt-2">
              <Magnetic>
                <Button size="lg" variant="outline" asChild>
                  <a href={profile.cvUrl} download>
                    <Download className="size-4" /> Download Full CV
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <ContactForm profile={profile} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
