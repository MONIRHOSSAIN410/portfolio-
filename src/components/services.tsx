"use client";

import { Gauge, LayoutTemplate, Server, Smartphone, type LucideIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { SectionHeading } from "@/components/section-heading";
import type { Service } from "@/lib/types";

const ICONS: Record<Service["icon"], LucideIcon> = {
  layout: LayoutTemplate,
  server: Server,
  smartphone: Smartphone,
  gauge: Gauge,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="scroll-mt-24 bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="What I Do"
          title="Four things I'm hired for"
          description="Whether it's a greenfield product or an existing codebase that needs momentum, this is where I add the most value."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <RevealItem key={service.title} direction="up">
                <TiltCard className="h-full" max={6}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold">{service.title}</h3>
                    <p className="mt-2.5 text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
