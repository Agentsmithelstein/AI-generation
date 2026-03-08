import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const mediaDir = path.join(process.cwd(), "public", "media");
  await fs.mkdir(mediaDir, { recursive: true });
  const filePath = path.join(mediaDir, `${Date.now()}-${file.name}`);
  await fs.writeFile(filePath, bytes);

  return NextResponse.json({ path: `/media/${path.basename(filePath)}` });
}
