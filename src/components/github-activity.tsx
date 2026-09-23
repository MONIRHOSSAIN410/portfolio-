"use client";

import { GitFork, Github, Star, Users } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GithubSummary } from "@/lib/types";

/**
 * GitHub থেকে লাইভ আসা রিপো ও স্ট্যাট। ডেটা আসে সার্ভার সাইডে,
 * ঘণ্টায় একবার রিফ্রেশ হয়। API আনরিচেবল হলে (rate limit/নেটওয়ার্ক)
 * পুরো সেকশনটা চুপচাপ একটা প্রোফাইল লিংকে নেমে আসে।
 */
export function GithubActivity({ data }: { data: GithubSummary }) {
  const metrics = [
    { label: "Public Repos", value: data.publicRepos, icon: Github },
    { label: "Total Stars", value: data.totalStars, icon: Star },
    { label: "Followers", value: data.followers, icon: Users },
  ];

  return (
    <section id="github" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Open Source"
          title="Live from my GitHub"
          description={
            data.stale
              ? "Repositories and activity, straight from my GitHub profile."
              : "Pulled straight from the GitHub API and refreshed every hour — not a screenshot."
          }
        />

        {data.stale ? (
          <Reveal
            delay={0.1}
            className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-12 text-center"
          >
            <Github className="size-7 text-muted-foreground" />
            <p className="px-6 text-sm text-muted-foreground">
              Live stats aren&apos;t available right now. You can still browse everything on
              GitHub.
            </p>
            <Button variant="outline" asChild>
              <a href={data.profileUrl} target="_blank" rel="noopener noreferrer">
                <Github className="size-4" /> @{data.user}
              </a>
            </Button>
          </Reveal>
        ) : (
          <>
            <RevealGroup className="mt-12 grid grid-cols-3 gap-4">
              {metrics.map(({ label, value, icon: Icon }) => (
                <RevealItem key={label} direction="scale">
                  <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-6 text-center">
                    <Icon className="size-5 text-brand" />
                    <span className="font-display text-2xl font-bold sm:text-3xl">
                      <Counter value={value} />
                    </span>
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {data.languages.length > 0 && (
              <Reveal delay={0.1} className="mt-6 flex flex-wrap justify-center gap-2">
                {data.languages.map((lang) => (
                  <Badge key={lang.name} variant="secondary">
                    {lang.name}
                    <span className="text-muted-foreground">· {lang.count}</span>
                  </Badge>
                ))}
              </Reveal>
            )}

            <RevealGroup
              stagger={0.06}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.repos.map((repo) => (
                <RevealItem key={repo.name}>
                  <TiltCard className="h-full" max={6}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Github className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                          <h3 className="truncate font-medium">{repo.name}</h3>
                        </div>
                        <p className="mt-2.5 line-clamp-2 text-sm text-muted-foreground">
                          {repo.description ?? "No description provided."}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-brand" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="size-3.5" /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="size-3.5" /> {repo.forks}
                        </span>
                      </div>
                    </a>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10 flex justify-center">
              <Button variant="outline" asChild>
                <a href={data.profileUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" /> View all repositories
                </a>
              </Button>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
