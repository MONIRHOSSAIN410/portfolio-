"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import type { NavLink, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Navbar({ profile, navLinks }: { profile: Profile; navLinks: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => navLinks.map((l) => l.id), [navLinks]);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // মেনু খোলা থাকলে পেছনের পেজ স্ক্রল বন্ধ
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 md:px-10",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="#home" className="font-display text-lg font-bold tracking-tight">
          Monir<span className="text-brand">.</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Magnetic strength={0.25}>
            <Button size="sm" variant="brand" asChild>
              <a href={profile.cvUrl} download>
                <Download className="size-4" /> CV
              </a>
            </Button>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active === l.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2">
                <Button className="w-full" variant="brand" asChild>
                  <a href={profile.cvUrl} download>
                    <Download className="size-4" /> Download CV
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
