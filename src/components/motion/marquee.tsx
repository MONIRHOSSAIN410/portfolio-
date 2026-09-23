"use client";

import { cn } from "@/lib/utils";

/**
 * থামে না এমন একটা টেক-স্ট্যাক স্ট্রিপ। CSS অ্যানিমেশনে চলে (JS নয়),
 * তাই স্ক্রলের সময়ও একদম মসৃণ। হোভার করলে থেমে যায়।
 */
export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
      aria-hidden
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          className={cn(
            "flex shrink-0 items-center gap-3 pr-3",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            "group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          )}
        >
          {doubled.map((item, i) => (
            <li
              key={`${copy}-${item}-${i}`}
              className="whitespace-nowrap rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
