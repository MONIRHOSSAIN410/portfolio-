import { NextResponse } from "next/server";

import { getEducation, getProfile, getStats } from "@/lib/content";

export const revalidate = 3600;

export async function GET() {
  const [profile, stats, education] = await Promise.all([
    getProfile(),
    getStats(),
    getEducation(),
  ]);

  return NextResponse.json({ profile, stats, education });
}
