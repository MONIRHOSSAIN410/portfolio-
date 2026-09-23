"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Phase = "typing" | "holding" | "deleting";
type State = { wordIndex: number; charCount: number; phase: Phase };

const INITIAL: State = { wordIndex: 0, charCount: 0, phase: "typing" };

/**
 * টাইপরাইটার ইফেক্ট — কয়েকটা রোল একটার পর একটা টাইপ হয়ে মুছে যায়।
 * সব state পরিবর্তন টাইমারের ভেতরে হয় (effect-এর বডিতে নয়), তাই
 * অপ্রয়োজনীয় re-render হয় না। reduce-motion অন থাকলে প্রথম লেখাটা স্থির থাকে।
 */
export function Typing({
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  holdTime = 1800,
  className,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const [state, setState] = useState<State>(INITIAL);

  const active = !reduced && words.length > 0;

  useEffect(() => {
    if (!active) return;

    const delay =
      state.phase === "typing" ? typeSpeed : state.phase === "holding" ? holdTime : deleteSpeed;

    const timer = setTimeout(() => {
      setState((prev) => {
        const word = words[prev.wordIndex % words.length];

        if (prev.phase === "typing") {
          return prev.charCount < word.length
            ? { ...prev, charCount: prev.charCount + 1 }
            : { ...prev, phase: "holding" };
        }

        if (prev.phase === "holding") {
          return { ...prev, phase: "deleting" };
        }

        return prev.charCount > 0
          ? { ...prev, charCount: prev.charCount - 1 }
          : { wordIndex: (prev.wordIndex + 1) % words.length, charCount: 0, phase: "typing" };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [active, state, words, typeSpeed, deleteSpeed, holdTime]);

  if (!active) {
    return <span className={className}>{words[0] ?? ""}</span>;
  }

  const word = words[state.wordIndex % words.length];

  return (
    <span className={className}>
      <span aria-live="polite">{word.slice(0, state.charCount)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-caret bg-brand align-middle"
      />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
