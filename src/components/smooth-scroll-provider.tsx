"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

import { useLenisAnchors } from "@/hooks/use-lenis-anchors";

/** ReactLenis-এর ভেতরে থাকতে হয়, তাই আলাদা চাইল্ড কম্পোনেন্ট। */
function Anchors() {
  useLenisAnchors(-80);
  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      <Anchors />
      {children}
    </ReactLenis>
  );
}
