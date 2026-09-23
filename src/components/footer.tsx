import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import type { NavLink, Profile } from "@/lib/types";

export function Footer({ profile, navLinks }: { profile: Profile; navLinks: NavLink[] }) {
  const socials = [
    { href: profile.github, icon: Github, label: "GitHub" },
    { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: profile.whatsappUrl, icon: MessageCircle, label: "WhatsApp" },
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <footer className="pb-10 pt-6">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Separator className="mb-8" />

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold">
              Monir<span className="text-brand">.</span>
            </p>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              {profile.title} based in {profile.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
