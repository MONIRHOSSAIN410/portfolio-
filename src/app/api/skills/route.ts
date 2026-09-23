import { NextResponse } from "next/server";

import { getMarqueeStack, getServices, getSkillGroups } from "@/lib/content";

export const revalidate = 3600;

export async function GET() {
  const [skillGroups, services, marqueeStack] = await Promise.all([
    getSkillGroups(),
    getServices(),
    getMarqueeStack(),
  ]);

  return NextResponse.json({ skillGroups, services, marqueeStack });
}
