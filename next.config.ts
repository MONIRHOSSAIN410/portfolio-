import type { NextConfig } from "next";

import { SHOT_HOSTNAMES } from "./src/lib/covers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /**
     * প্রজেক্ট কার্ডের লাইভ স্ক্রিনশট এই হোস্টগুলো থেকে আসে।
     * Next.js ছবিগুলো নিজের সার্ভারে ক্যাশ করে webp-এ রূপান্তর করে,
     * তাই প্রতিটা ভিজিটর সরাসরি থার্ড-পার্টি সার্ভিসে হিট করে না।
     */
    remotePatterns: SHOT_HOSTNAMES.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
    minimumCacheTTL: 60 * 60 * 24 * 7, // ৭ দিন
  },
};

export default nextConfig;
