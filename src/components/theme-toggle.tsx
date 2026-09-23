"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative overflow-hidden"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ y: 14, opacity: 0, rotate: -35 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="size-[1.2rem]" /> : <Sun className="size-[1.2rem]" />}
      </motion.span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
