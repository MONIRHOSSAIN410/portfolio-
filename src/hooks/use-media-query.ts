"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * CSS মিডিয়া কোয়েরি React state হিসেবে পড়ে।
 * useSyncExternalStore ব্যবহার করায় effect-এর ভেতর setState করতে হয় না,
 * আর সার্ভার রেন্ডারে সবসময় false ধরে নেয় (তাই hydration mismatch হয় না)।
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
