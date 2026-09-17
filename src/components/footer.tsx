import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Separator className="mb-8" />
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
