"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, Search, SearchX } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** প্রথমে কয়টা কার্ড দেখাবে; বাকিগুলো "Show more"-এ খুলবে */
const PAGE_SIZE = 6;

/**
 * প্রজেক্ট সেকশন — ফিল্টার বা সার্চ বদলালে /api/projects থেকে নতুন ডেটা
 * আনা হয় (সার্ভারেই ফিল্টার হয়)। প্রথম রেন্ডারটা সার্ভার থেকে আসা
 * initialProjects দিয়েই হয়, তাই SEO আর প্রথম লোড দুটোই ঠিক থাকে।
 */
export function Projects({
  initialProjects,
  filters,
}: {
  initialProjects: Project[];
  filters: string[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const firstRender = useRef(true);

  useEffect(() => {
    // মাউন্টের সময় ফেচ করার দরকার নেই — ডেটা already আছে
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ filter });
        if (query.trim()) params.set("q", query.trim());

        const res = await fetch(`/api/projects?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = (await res.json()) as { projects: Project[] };
        setProjects(data.projects);
        setVisible(PAGE_SIZE);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("[projects] fetch failed:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 250); // debounce — টাইপ করার সময় প্রতি অক্ষরে রিকোয়েস্ট যাবে না

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filter, query]);

  const shown = projects.slice(0, visible);
  const remaining = projects.length - shown.length;
  const empty = !loading && projects.length === 0;

  return (
    <section id="projects" className="scroll-mt-24 bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Projects"
          title="A few things I've shipped"
          description="Live storefronts, dashboards and platforms built and deployed for clients and personal products. Filter by type or search by name."
        />

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex flex-wrap gap-2">
            {filters.map((chip) => {
              const isActive = filter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(chip)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-transparent text-brand-foreground"
                      : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-chip"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-brand"
                    />
                  )}
                  {chip}
                </button>
              );
            })}
          </div>

          <div className="relative shrink-0 lg:ml-auto lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="pl-9"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-brand" />
            )}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Show {Math.min(remaining, PAGE_SIZE)} more
              <span className="text-muted-foreground">({remaining} left)</span>
            </Button>
          </div>
        )}

        <AnimatePresence>
          {empty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-14 text-center"
            >
              <SearchX className="size-7 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No projects match{" "}
                <span className="font-medium text-foreground">
                  {query ? `“${query}”` : filter}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="text-sm font-medium text-brand hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------ product card ------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full" max={5}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors hover:border-brand/50"
      >
        {/* preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
          <ProjectCover project={project} />

          {project.featured && (
            <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-brand backdrop-blur-sm">
              Featured
            </span>
          )}

          {/* হোভার করলে "Visit site" ওভারলে */}
          <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-900">
              Visit site <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-brand">{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          {/* min-height রাখা হয়েছে যাতে এক বা দুই লাইনের টাইটেলেও
              নিচের description/tag একই লেভেলে থাকে */}
          <h3 className="mt-2 line-clamp-2 min-h-[2.75rem] font-display text-base font-semibold leading-snug">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-[11px]">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </a>
    </TiltCard>
  );
}
