import { NextResponse } from "next/server";

import { getGithubSummary } from "@/lib/github";

/** ১ ঘণ্টা পরপর GitHub থেকে নতুন ডেটা আনা হয় */
export const revalidate = 3600;

export async function GET() {
  const summary = await getGithubSummary();

  return NextResponse.json(summary, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
