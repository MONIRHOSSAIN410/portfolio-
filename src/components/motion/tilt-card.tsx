"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * 3D টিল্ট কার্ড — মাউস যেদিকে যায় কার্ডটা সেদিকে হেলে, আর কার্সরের
 * জায়গায় একটা নরম স্পটলাইট জ্বলে। reduce-motion অন থাকলে টিল্ট বন্ধ।
 */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, var(--brand), transparent 70%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  if (reduced) {
    return (
      <div className={cn("transition-transform hover:-translate-y-1", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => active.set(1)}
      onPointerLeave={() => {
        active.set(0);
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn("relative", className)}
    >
      <motion.span
        aria-hidden
        style={{ backgroundImage: glow, opacity: active }}
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300"
      />
      {children}
    </motion.div>
  );
}
