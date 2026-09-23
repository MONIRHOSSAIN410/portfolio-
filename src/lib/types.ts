/**
 * Shared content types.
 *
 * এই ফাইলটাই কনটেন্টের "contract"। data.ts, API routes আর component —
 * সবাই এই টাইপগুলোই ব্যবহার করে। ভবিষ্যতে data.ts এর বদলে MongoDB/Supabase
 * বসাতে চাইলে শুধু src/lib/content.ts এর ফাংশনগুলো বদলালেই হবে,
 * UI-এর কোথাও হাত দিতে হবে না।
 */

export type Profile = {
  name: string;
  title: string;
  /** Hero-তে টাইপিং অ্যানিমেশনে ঘুরবে */
  roles: string[];
  location: string;
  email: string;
  phoneDisplay: string;
  whatsappUrl: string;
  linkedin: string;
  github: string;
  githubUser: string;
  cvUrl: string;
  photo: string;
  available: boolean;
  availabilityNote: string;
  shortBio: string;
  longBio: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  extra: string;
  period: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** ফিল্টার চিপে যে ক্যাটাগরিগুলো দেখাবে */
  category: ProjectCategory;
  url: string;
  featured: boolean;
  year: string;
  /**
   * কার্ডের উপরে যে preview ছবি দেখাবে।
   * না দিলে `/projects/<slug>.png` খোঁজা হয়; সেটাও না থাকলে
   * অটোমেটিক একটা ডিজাইন করা preview দেখায় (ProjectCover দেখুন)।
   */
  cover?: string;
};

export type ProjectCategory =
  | "E-commerce"
  | "Dashboard"
  | "Platform"
  | "Product"
  | "Web App"
  | "Client Work";

export type Stat = {
  label: string;
  /** সংখ্যা হলে counter অ্যানিমেট হবে, না হলে স্ট্যাটিক টেক্সট */
  value: number | string;
  suffix?: string;
  prefix?: string;
};

export type NavLink = {
  label: string;
  href: string;
  /** IntersectionObserver যে section id ট্র্যাক করবে */
  id: string;
};

export type Service = {
  title: string;
  description: string;
  /** lucide-react icon name — component map করা আছে services.tsx-এ */
  icon: "layout" | "server" | "smartphone" | "gauge";
};

/* ---------------------------------- GitHub --------------------------------- */

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
};

export type GithubSummary = {
  user: string;
  profileUrl: string;
  avatar: string | null;
  publicRepos: number;
  followers: number;
  totalStars: number;
  languages: { name: string; count: number }[];
  repos: GithubRepo[];
  /** লাইভ ডেটা না পেলে true — UI তখন গ্রেসফুলি fallback দেখায় */
  stale: boolean;
  fetchedAt: string;
};

/* --------------------------------- Contact --------------------------------- */

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** honeypot — bot ছাড়া কেউ ভরবে না */
  website?: string;
};

export type ContactResponse =
  | {
      ok: true;
      message: string;
      /** true হলে মেইল সত্যিই পাঠানো হয়েছে; false হলে শুধু সার্ভার লগে আছে */
      delivered: boolean;
    }
  | {
      ok: false;
      message: string;
      errors?: Partial<Record<keyof ContactPayload, string>>;
    };
