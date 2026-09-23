"use client";

import { useEffect, useState } from "react";

/**
 * কোন section এখন স্ক্রিনে আছে সেটা ট্র্যাক করে — navbar-এর active
 * ইন্ডিকেটর এটার উপর চলে। IntersectionObserver ব্যবহার করে, তাই
 * scroll ইভেন্টে হিসাব কষার দরকার নেই।
 */
export function useActiveSection(ids: string[], offset = 0.35): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        // যে section সবচেয়ে বেশি দেখা যাচ্ছে সেটাই active
        const [top] = [...visible.entries()].sort((a, b) => b[1] - a[1]);
        setActive(top[0]);
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset) * 100)}% 0px`,
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
