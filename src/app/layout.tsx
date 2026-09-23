import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ToastProvider } from "@/components/ui/toast";
import { getNavLinks, getProfile } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monirhossain.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Monir Hossain | Full Stack & Mobile App Developer",
    template: "%s | Monir Hossain",
  },
  description:
    "Portfolio of Monir Hossain — Full Stack & Mobile Application Developer specializing in React, Next.js, Node.js, React Native and Flutter.",
  keywords: [
    "Monir Hossain",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "React Native",
    "Flutter",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Monir Hossain" }],
  creator: "Monir Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Monir Hossain",
    title: "Monir Hossain | Full Stack & Mobile App Developer",
    description:
      "Full Stack & Mobile Application Developer with 3+ years building scalable web and mobile products.",
    images: [{ url: "/monir-hossain.jpg", width: 1200, height: 630, alt: "Monir Hossain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monir Hossain | Full Stack & Mobile App Developer",
    description:
      "Full Stack & Mobile Application Developer with 3+ years building scalable web and mobile products.",
    images: ["/monir-hossain.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, navLinks] = await Promise.all([getProfile(), getNavLinks()]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <CursorGlow />
              <a
                href="#home"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
              >
                Skip to content
              </a>
              <Navbar profile={profile} navLinks={navLinks} />
              {children}
              <Footer profile={profile} navLinks={navLinks} />
              <BackToTop />
            </SmoothScrollProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
