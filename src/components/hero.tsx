"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, MessageCircle } from "lucide-react";

import { Aurora } from "@/components/motion/aurora";
import { Magnetic } from "@/components/motion/magnetic";
import { Marquee } from "@/components/motion/marquee";
import { Typing } from "@/components/motion/typing";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

export function Hero({ profile, stack }: { profile: Profile; stack: string[] }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "35%"]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);

  const firstName = profile.name.split(" ")[0];

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28"
    >
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 -z-10">
        <Aurora className="absolute inset-0" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            {profile.available && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
            )}
            {profile.availabilityNote}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {firstName} —
            <span className="mt-2 block min-h-[1.2em] text-gradient">
              <Typing words={profile.roles} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            {profile.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button size="lg" variant="brand" asChild>
                <a href={profile.cvUrl} download>
                  <Download className="size-4" /> Download CV
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" asChild>
                <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp Me
                </a>
              </Button>
            </Magnetic>

            <div className="flex items-center gap-1">
              {[
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <Magnetic key={label} strength={0.4}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto aspect-square w-64 sm:w-80 md:w-full md:max-w-sm"
        >
          <motion.div
            animate={reduced ? undefined : { rotate: [0, 6, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/45 via-brand/10 to-transparent blur-2xl"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border shadow-2xl">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(min-width: 768px) 24rem, 20rem"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 w-full"
      >
        <Marquee items={stack} />
      </motion.div>

      <motion.a
        href="#about"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-brand sm:block"
        aria-label="Scroll down"
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
