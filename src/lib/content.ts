import fs from "node:fs";
import path from "node:path";

import { screenshotUrl } from "@/lib/covers";
import * as db from "@/lib/data";
import type {
  Education,
  Job,
  NavLink,
  Profile,
  Project,
  Service,
  SkillGroup,
  Stat,
} from "@/lib/types";

/**
 * কনটেন্ট অ্যাক্সেসের একমাত্র দরজা (data access layer)।
 *
 * এখন ডেটা আসছে src/lib/data.ts থেকে। পরে MongoDB / Supabase / Sanity
 * লাগাতে চাইলে শুধু নিচের ফাংশনগুলোর ভেতরটা বদলান — সব ফাংশন already async,
 * তাই API route বা component-এর একটা লাইনও বদলাতে হবে না।
 *
 * উদাহরণ:
 *   export async function getProjects() {
 *     const col = await getMongoCollection("projects");
 *     return col.find({}).toArray();
 *   }
 */

export async function getProfile(): Promise<Profile> {
  return db.profile;
}

export async function getStats(): Promise<Stat[]> {
  return db.stats;
}

export async function getServices(): Promise<Service[]> {
  return db.services;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return db.skillGroups;
}

export async function getMarqueeStack(): Promise<string[]> {
  return db.marqueeStack;
}

export async function getExperience(): Promise<Job[]> {
  return db.experience;
}

export async function getEducation(): Promise<Education> {
  return db.education;
}

export async function getNavLinks(): Promise<NavLink[]> {
  return db.navLinks;
}

export type ProjectQuery = {
  /** category বা tag — দুটোর যেকোনোটার সাথে মিললেই ধরা হবে */
  filter?: string;
  /** title / description / tag-এ ফ্রি টেক্সট সার্চ */
  q?: string;
  featuredOnly?: boolean;
  limit?: number;
};

/* ---------------------------- cover detection ---------------------------- */

const COVER_EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg", ".avif"];

/**
 * `public/projects/<slug>.<ext>` ফাইলটা আছে কিনা সার্ভারে দেখে নেয়।
 *
 * বিল্ডের সময় একবারই হিসাব হয়, তাই প্রতি রিকোয়েস্টে ডিস্ক পড়া হয় না।
 */
let coverCache: Map<string, string> | null = null;

function coverFor(slug: string): string | undefined {
  if (!coverCache) {
    coverCache = new Map();
    const dir = path.join(process.cwd(), "public", "projects");

    try {
      for (const file of fs.readdirSync(dir)) {
        const ext = path.extname(file).toLowerCase();
        if (!COVER_EXTENSIONS.includes(ext)) continue;
        coverCache.set(path.basename(file, ext), `/projects/${file}`);
      }
    } catch {
      // ফোল্ডারটা না থাকলে কিছুই করার নেই — সব কার্ড fallback দেখাবে
    }
  }

  return coverCache.get(slug);
}

/**
 * কার্ডের preview ছবি ঠিক করে, এই ক্রমে:
 *   1. data.ts-এ হাতে লেখা `cover`
 *   2. `public/projects/<slug>.png` — নিজের সার্ভারে রাখা ছবি
 *   3. লাইভ স্ক্রিনশট সার্ভিস (`npm run covers` চালালে ধাপ ২-এ নেমে আসে)
 *
 * তিনটাই না মিললে কার্ড ডিজাইন করা gradient preview দেখায়।
 */
function withCover(project: Project): Project {
  if (project.cover) return project;

  const local = coverFor(project.slug);
  if (local) return { ...project, cover: local };

  const live = screenshotUrl(project.url);
  return live ? { ...project, cover: live } : project;
}

export async function getProjects(query: ProjectQuery = {}): Promise<Project[]> {
  const { filter, q, featuredOnly, limit } = query;

  let list = db.projects.map(withCover);

  if (featuredOnly) {
    list = list.filter((p) => p.featured);
  }

  if (filter && filter.toLowerCase() !== "all") {
    const needle = filter.toLowerCase();
    list = list.filter(
      (p) =>
        p.category.toLowerCase() === needle ||
        p.tags.some((t) => t.toLowerCase() === needle)
    );
  }

  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    list = list.filter((p) =>
      [p.title, p.description, p.category, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }

  // featured আগে, তারপর নতুন বছর আগে
  list.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year.localeCompare(a.year);
  });

  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/**
 * ফিল্টার চিপের তালিকা — "All" + সব category + সবচেয়ে বেশি ব্যবহৃত tag।
 * মোট ৯টার বেশি চিপ দেখানো হয় না, নাহলে ফিল্টার সারিটা ভারী হয়ে যায়।
 */
const MAX_FILTERS = 9;

export async function getProjectFilters(): Promise<string[]> {
  const categories = new Set<string>();
  const tagCount = new Map<string, number>();

  for (const p of db.projects) {
    categories.add(p.category);
    for (const t of p.tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
  }

  const base = ["All", ...[...categories].sort()];

  const topTags = [...tagCount.entries()]
    .filter(([tag, n]) => n > 1 && !categories.has(tag))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t)
    .slice(0, Math.max(0, MAX_FILTERS - base.length));

  return [...base, ...topTags];
}
