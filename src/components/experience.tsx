"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <div className="relative mt-16 space-y-10 border-l border-border pl-8 sm:pl-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground sm:-left-[3.05rem]">
              <Briefcase className="size-3.5" />
            </span>
            <h3 className="font-display text-lg font-semibold">{job.role}</h3>
            <p className="mt-1 text-sm font-medium text-brand">{job.company}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5" /> {job.location}
            </p>
            <ul className="mt-4 space-y-2">
              {job.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: experience.length * 0.1 }}
          className="relative"
        >
          <span className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full bg-secondary text-foreground sm:-left-[3.05rem]">
            <GraduationCap className="size-3.5" />
          </span>
          <h3 className="font-display text-lg font-semibold">{education.degree}</h3>
          <p className="mt-1 text-sm font-medium text-brand">{education.school}</p>
          <p className="mt-1 text-xs text-muted-foreground">{education.extra}</p>
        </motion.div>
      </div>
    </section>
  );
}
