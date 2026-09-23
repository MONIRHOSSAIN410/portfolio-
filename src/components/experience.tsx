"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import type { Education, Job } from "@/lib/types";

export function Experience({
  experience,
  education,
}: {
  experience: Job[];
  education: Education;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  // টাইমলাইনের লাইনটা স্ক্রলের সাথে সাথে ভরে ওঠে
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section
      id="experience"
      className="mx-auto max-w-4xl scroll-mt-24 bg-secondary/0 px-6 py-24 md:px-10"
    >
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Three years of shipping production software across agencies and remote teams."
      />

      <div ref={ref} className="relative mt-16 space-y-10 pl-8 sm:pl-10">
        <div className="absolute inset-y-0 left-0 w-px bg-border" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-y-0 left-0 w-px bg-brand"
        />

        {experience.map((job, i) => (
          <Reveal key={job.company} direction="left" delay={i * 0.05} className="relative">
            <span className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-md sm:-left-[3.05rem]">
              <Briefcase className="size-3.5" />
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">{job.role}</h3>
              {job.current && (
                <Badge variant="brand" className="gap-1.5">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Current
                </Badge>
              )}
            </div>

            <p className="mt-1 text-sm font-medium text-brand">{job.company}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {job.location}
              </span>
              <span>· {job.period}</span>
            </p>

            <ul className="mt-4 space-y-2">
              {job.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.stack.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal direction="left" delay={experience.length * 0.05} className="relative">
          <span className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full bg-secondary text-foreground sm:-left-[3.05rem]">
            <GraduationCap className="size-3.5" />
          </span>
          <h3 className="font-display text-lg font-semibold">{education.degree}</h3>
          <p className="mt-1 text-sm font-medium text-brand">{education.school}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {education.extra} · {education.period}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
