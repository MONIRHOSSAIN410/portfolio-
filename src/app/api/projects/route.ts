import { NextResponse, type NextRequest } from "next/server";

import { getProjectFilters, getProjects } from "@/lib/content";

export const revalidate = 3600;

/**
 * GET /api/projects
 *   ?filter=Web App   → category বা tag দিয়ে ফিল্টার ("All" = সব)
 *   ?q=crm            → টেক্সট সার্চ
 *   ?featured=1       → শুধু featured
 *   ?limit=4          → সর্বোচ্চ কয়টা
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limitParam = searchParams.get("limit");

  const [projects, filters] = await Promise.all([
    getProjects({
      filter: searchParams.get("filter") ?? undefined,
      q: searchParams.get("q") ?? undefined,
      featuredOnly: searchParams.get("featured") === "1",
      limit: limitParam ? Number(limitParam) : undefined,
    }),
    getProjectFilters(),
  ]);

  return NextResponse.json({ projects, filters, count: projects.length });
}
