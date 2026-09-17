"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Projects"
          title="A few things I've shipped"
          description="Live platforms and applications I've built and deployed for clients and personal projects."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14"
        >
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {projects.map((p) => (
                <CarouselItem key={p.title} className="sm:basis-1/2 lg:basis-1/3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold leading-snug">
                          {p.title}
                        </h3>
                        <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="brand">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
