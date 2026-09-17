"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand/10 blur-[100px]" />
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
            className="mb-4 inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground"
          >
            👋 Available for freelance &amp; full-time roles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {profile.name.split(" ")[0]} —
            <span className="block text-brand">{profile.title}</span>
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
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button size="lg" variant="brand" asChild>
              <a href={profile.cvUrl} download>
                <Download className="size-4" /> Download CV
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> WhatsApp Me
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto aspect-square w-64 sm:w-80 md:w-full md:max-w-sm"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand/40 to-transparent blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border shadow-2xl">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 24rem, 20rem"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        aria-label="Scroll down"
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
