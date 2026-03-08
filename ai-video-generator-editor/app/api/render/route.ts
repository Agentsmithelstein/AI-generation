import { NextResponse } from "next/server";
import { renderTimeline } from "@/video/renderPipeline";

export async function POST(req: Request) {
  const project = await req.json();
  const result = await renderTimeline(project);
  return NextResponse.json(result);
}
