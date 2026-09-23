"use client";

import { useState } from "react";
import Image from "next/image";

import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * প্রজেক্ট কার্ডের উপরের preview অংশ।
 *
 * ডিজাইন করা gradient preview-টা সবসময় নিচে বসে থাকে, আর আসল ছবিটা
 * লোড হলে তার উপরে fade-in করে। ফলে:
 *   - স্ক্রিনশট আসতে দেরি হলে কার্ড ফাঁকা বা ধূসর দেখায় না
 *   - সার্ভিস ফেল করলেও কার্ড ভাঙে না, gradient-টাই থেকে যায়
 *
 * `cover` কোথা থেকে আসে তা ঠিক হয় সার্ভারে — src/lib/covers.ts দেখুন।
 */
export function ProjectCover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showImage = Boolean(project.cover) && !failed;

  return (
    <>
      <FallbackCover project={project} />

      {showImage && (
        <Image
          src={project.cover!}
          alt={`${project.title} preview`}
          fill
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover object-top transition-all duration-700 group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
        />
      )}
    </>
  );
}

/* --------------------------- generated preview --------------------------- */

/** slug থেকে স্থির একটা hue বের করে, যাতে প্রতিবার একই রঙ আসে */
function hueFor(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  // ব্র্যান্ড হিউ (264) এর আশেপাশে রাখা হয়, যাতে সাইটের সাথে মানানসই থাকে
  return 216 + (hash % 5) * 24;
}

function monogram(title: string): string {
  const words = title
    .replace(/[^\p{L}\p{N}\s—-]/gu, "")
    .split(/[\s—-]+/)
    .filter(Boolean);

  if (words.length === 0) return "?";

  // প্রথম শব্দটাই যদি acronym হয় (IHCM, ZENJI, CRM) তাহলে সেটার দুই অক্ষর
  const first = words[0];
  if (first.length >= 3 && first === first.toUpperCase()) {
    return first.slice(0, 2);
  }

  if (words.length === 1) return first.slice(0, 2).toUpperCase();
  return (first[0] + words[1][0]).toUpperCase();
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "preview";
  }
}

function FallbackCover({ project }: { project: Project }) {
  const hue = hueFor(project.slug);

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col"
      style={{
        backgroundImage: `linear-gradient(135deg, oklch(0.42 0.16 ${hue}), oklch(0.26 0.09 ${hue + 28}))`,
      }}
    >
      {/* ছোট একটা ব্রাউজার বার — preview-টা সাইটের মতো দেখায় */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
        </span>
        <span className="ml-1 truncate rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/70">
          {hostOf(project.url)}
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="relative font-display text-5xl font-bold tracking-tight text-white/85">
          {monogram(project.title)}
        </span>
      </div>
    </div>
  );
}
