"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { education, profile } from "@/lib/data";

const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Live Projects Shipped", value: "10+" },
  { label: "Core Stack", value: "MERN + Next.js" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="About Me"
        title="Building products end-to-end, from UI to database"
        description={profile.longBio}
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="text-center">
                <div className="font-display text-3xl font-bold text-brand">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <MapPin className="size-5 text-brand" />
          <span className="text-sm">{profile.location}</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Briefcase className="size-5 text-brand" />
          <span className="text-sm">Open to remote &amp; on-site roles</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <GraduationCap className="size-5 text-brand" />
          <span className="text-sm">{education.degree.split("—")[0].trim()}</span>
        </div>
      </motion.div>
    </section>
  );
}
