/**
 * প্রজেক্ট কার্ডের preview ছবি কোথা থেকে আসবে — তার নিয়ম।
 *
 * অগ্রাধিকারের ক্রম (content.ts-এর `withCover` দেখুন):
 *   1. `public/projects/<slug>.png` — নিজের সার্ভারে রাখা ছবি (সবচেয়ে দ্রুত)
 *   2. লাইভ স্ক্রিনশট সার্ভিস — সাইটের এখনকার চেহারা, অটোমেটিক
 *   3. ডিজাইন করা gradient preview — উপরের দুটোই না পেলে
 *
 * `npm run covers` চালালে সব স্ক্রিনশট একবারে ডাউনলোড হয়ে
 * `public/projects/`-এ চলে আসে, তখন আর কোনো থার্ড-পার্টি সার্ভিস লাগে না।
 */

export const SHOT_WIDTH = 1200;
export const SHOT_HEIGHT = 750;

export type ShotProvider = "thumio" | "mshots" | "microlink" | "off";

/** `.env.local`-এ PROJECT_SHOTS=off দিলে লাইভ স্ক্রিনশট পুরোপুরি বন্ধ */
export function activeProvider(): ShotProvider {
  const raw = process.env.PROJECT_SHOTS?.trim().toLowerCase();
  if (raw === "off" || raw === "mshots" || raw === "microlink" || raw === "thumio") {
    return raw;
  }
  return "thumio";
}

/** স্ক্রিনশট সার্ভিসের URL বানায়। provider "off" হলে null। */
export function screenshotUrl(
  target: string,
  provider: ShotProvider = activeProvider()
): string | null {
  switch (provider) {
    case "thumio":
      // noanimate — অ্যানিমেশন শেষ হওয়ার পর শট নেয়, তাই ছবি পরিষ্কার আসে
      return `https://image.thum.io/get/width/${SHOT_WIDTH}/crop/${SHOT_HEIGHT}/noanimate/${target}`;

    case "mshots":
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(target)}?w=${SHOT_WIDTH}&h=${SHOT_HEIGHT}`;

    case "microlink":
      return `https://api.microlink.io/?url=${encodeURIComponent(
        target
      )}&screenshot=true&meta=false&embed=screenshot.url`;

    case "off":
    default:
      return null;
  }
}

/** next.config.ts-এর remotePatterns এখান থেকেই নেয় — এক জায়গায় রাখা */
export const SHOT_HOSTNAMES = [
  "image.thum.io",
  "s0.wp.com",
  "api.microlink.io",
  "iad.microlink.io",
] as const;
