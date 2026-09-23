"use client";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillGroup } from "@/lib/types";

export function Skills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Skills"
          title="Tools & technologies I work with"
          description="A snapshot of the languages, frameworks and platforms behind the products I build."
        />

        <RevealGroup
          stagger={0.05}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <RevealItem key={group.title} direction="blur">
              <Card className="group h-full transition-colors hover:border-brand/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="h-4 w-1 rounded-full bg-brand transition-all duration-300 group-hover:h-5" />
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="transition-colors hover:bg-brand/15 hover:text-brand"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
