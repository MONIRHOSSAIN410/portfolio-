"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * সার্ভারে false, ব্রাউজারে true।
 * theme-এর মতো client-only জিনিস রেন্ডার করার আগে hydration mismatch
 * এড়াতে ব্যবহার হয় — useEffect + setState এর চেয়ে পরিষ্কার।
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
