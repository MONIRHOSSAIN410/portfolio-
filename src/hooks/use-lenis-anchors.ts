"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Lenis smooth-scroll চালু থাকলে সাধারণ `#anchor` লিংক কাজ করে না।
 * এই হুক সব in-page অ্যাংকর ক্লিক ধরে Lenis দিয়ে মসৃণভাবে স্ক্রল করায়,
 * আর URL-এর hash-ও ঠিক রাখে (back বাটন ভাঙে না)।
 */
export function useLenisAnchors(headerOffset = -80) {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: headerOffset });
      else target.scrollIntoView({ behavior: "smooth" });

      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis, headerOffset]);
}
