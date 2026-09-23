import { profile } from "@/lib/data";
import type { GithubRepo, GithubSummary } from "@/lib/types";

const GITHUB_API = "https://api.github.com";

/**
 * GitHub-এর পাবলিক REST API থেকে লাইভ ডেটা আনে।
 *
 * টোকেন ছাড়াই কাজ করে (ঘণ্টায় ৬০ রিকোয়েস্ট লিমিট)। রেট লিমিট বাড়াতে
 * .env.local-এ GITHUB_TOKEN=ghp_xxx বসালে সেটা অটোমেটিক ব্যবহার হবে।
 * রেসপন্স ১ ঘণ্টা ক্যাশ হয়, আর API ফেল করলে stale:true দিয়ে খালি রেজাল্ট
 * ফেরত যায় — সাইট কখনো ভাঙবে না।
 */
export async function getGithubSummary(): Promise<GithubSummary> {
  const user = profile.githubUser;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "monir-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const empty: GithubSummary = {
    user,
    profileUrl: profile.github,
    avatar: null,
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
    languages: [],
    repos: [],
    stale: true,
    fetchedAt: new Date().toISOString(),
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${user}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/users/${user}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return empty;

    const userJson = (await userRes.json()) as {
      avatar_url?: string;
      public_repos?: number;
      followers?: number;
    };
    const reposJson = (await reposRes.json()) as RawRepo[];

    const visible = reposJson.filter((r) => !r.fork && !r.archived);

    const repos: GithubRepo[] = visible
      .sort(
        (a, b) =>
          (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0) ||
          Date.parse(b.pushed_at ?? b.updated_at ?? "") -
            Date.parse(a.pushed_at ?? a.updated_at ?? "")
      )
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? null,
        url: r.html_url,
        language: r.language ?? null,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        updatedAt: r.pushed_at ?? r.updated_at ?? "",
        topics: r.topics ?? [],
      }));

    const langCount = new Map<string, number>();
    for (const r of visible) {
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }

    return {
      user,
      profileUrl: profile.github,
      avatar: userJson.avatar_url ?? null,
      publicRepos: userJson.public_repos ?? visible.length,
      followers: userJson.followers ?? 0,
      totalStars: visible.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
      languages: [...langCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ name, count })),
      repos,
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return empty;
  }
}

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count?: number;
  forks_count?: number;
  pushed_at?: string;
  updated_at?: string;
  topics?: string[];
  fork?: boolean;
  archived?: boolean;
};
