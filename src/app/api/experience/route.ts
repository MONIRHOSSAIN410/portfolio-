import { NextResponse } from "next/server";

import { getEducation, getExperience } from "@/lib/content";

export const revalidate = 3600;

export async function GET() {
  const [experience, education] = await Promise.all([getExperience(), getEducation()]);

  return NextResponse.json({ experience, education });
}
