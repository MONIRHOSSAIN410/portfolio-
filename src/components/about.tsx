"use client";

import { Briefcase, GraduationCap, MapPin } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Education, Profile, Stat } from "@/lib/types";

export function About({
  profile,
  stats,
  education,
}: {
  profile: Profile;
  stats: Stat[];
  education: Education;
}) {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="About Me"
        title="Building products end-to-end, from UI to database"
        description={profile.longBio}
      />

      <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.label} direction="scale">
            <Card className="h-full py-5 transition-colors hover:border-brand/40">
              <CardContent className="text-center">
                <div className="font-display text-3xl font-bold text-brand sm:text-4xl">
                  {typeof s.value === "number" ? (
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  ) : (
                    <>
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
              </CardContent>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.15} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: MapPin, text: profile.location },
          { icon: Briefcase, text: "Open to remote & on-site roles" },
          { icon: GraduationCap, text: education.degree.split("—")[0].trim() },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
          >
            <Icon className="size-5 shrink-0 text-brand" />
            <span className="text-sm">{text}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
