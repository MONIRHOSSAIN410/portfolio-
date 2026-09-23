"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * মাউসের পেছনে নরম একটা ব্র্যান্ড-কালার গ্লো। শুধু ডেস্কটপে (fine pointer)
 * এবং reduce-motion বন্ধ থাকলে চলে — মোবাইলে কিছুই রেন্ডার হয় না।
 */
export function CursorGlow() {
  const reduced = useReducedMotion() ?? false;
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-0 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[110px] md:block dark:bg-brand/15"
    />
  );
}
