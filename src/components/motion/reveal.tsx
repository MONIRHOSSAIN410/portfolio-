"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

const OFFSET = 28;

function variantsFor(direction: Direction, distance: number, reduced: boolean): Variants {
  if (reduced || direction === "none") {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  const hidden: Record<string, number | string> = { opacity: 0 };

  if (direction === "up") hidden.y = distance;
  if (direction === "down") hidden.y = -distance;
  if (direction === "left") hidden.x = -distance;
  if (direction === "right") hidden.x = distance;
  if (direction === "scale") hidden.scale = 0.92;
  if (direction === "blur") hidden.filter = "blur(12px)";

  return {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/**
 * স্ক্রলে ঢোকার সময় এলিমেন্ট রিভিল করে। একবারই চলে (once), আর
 * ব্যবহারকারী "reduce motion" অন রাখলে শুধু ফেড হয় — কোনো নড়াচড়া নয়।
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance = OFFSET,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion() ?? false;
  const Comp = motion[as];

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantsFor(direction, distance, reduced)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * চাইল্ডগুলোকে একটার পর একটা রিভিল করার জন্য প্যারেন্ট।
 * ভেতরে <RevealItem> ব্যবহার করুন।
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  distance = OFFSET,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={variantsFor(direction, distance, reduced)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
