"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** পেজের একদম উপরে পাতলা প্রগ্রেস বার — কতটুকু স্ক্রল হয়েছে দেখায়। */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-brand/70 to-brand"
    />
  );
}
