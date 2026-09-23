"use client";

import { motion, useReducedMotion } from "framer-motion";

/** পেছনে ধীরে ভেসে বেড়ানো ব্র্যান্ড-কালার ব্লব — Hero-র ব্যাকড্রপ। */
export function Aurora({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  const blobs = [
    {
      className:
        "absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-[130px]",
      animate: { x: [0, -40, 0], y: [0, 30, 0] },
      duration: 18,
    },
    {
      className:
        "absolute -left-44 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand/15 blur-[110px]",
      animate: { x: [0, 50, 0], y: [0, -25, 0] },
      duration: 22,
    },
    {
      className:
        "absolute left-1/3 top-1/4 h-[20rem] w-[20rem] rounded-full bg-brand/10 blur-[120px]",
      animate: { x: [0, 30, 0], y: [0, 40, 0] },
      duration: 26,
    },
  ];

  return (
    <div aria-hidden className={className}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={blob.className}
          animate={reduced ? undefined : blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
