import { NextResponse } from "next/server";
import { promptToClip } from "@/ai/generateVideo";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });

  const clip = await promptToClip(prompt);
  return NextResponse.json({ clip });
}
