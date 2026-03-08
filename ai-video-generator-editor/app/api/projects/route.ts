import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "public", "media", "project.json");

export async function GET() {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ clips: [], tracks: ["video", "audio", "text", "ai"], duration: 120, assets: [] });
  }
}

export async function POST(req: Request) {
  const project = await req.json();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(project, null, 2));
  return NextResponse.json({ ok: true, path: "/media/project.json" });
}
