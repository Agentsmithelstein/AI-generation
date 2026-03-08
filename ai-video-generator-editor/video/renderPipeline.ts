import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { ProjectState } from "@/lib/types";

export async function renderTimeline(project: ProjectState) {
  const mediaDir = path.join(process.cwd(), "public", "media");
  await fs.mkdir(mediaDir, { recursive: true });

  const manifestPath = path.join(mediaDir, "timeline.json");
  await fs.writeFile(manifestPath, JSON.stringify(project, null, 2));

  const outPath = path.join(mediaDir, `render-${Date.now()}.mp4`);
  const colorInput = `color=black:s=1280x720:d=${Math.max(project.duration, 1)}`;

  await runFfmpeg(["-y", "-f", "lavfi", "-i", colorInput, "-pix_fmt", "yuv420p", outPath]);
  return { output: `/media/${path.basename(outPath)}`, manifest: "/media/timeline.json" };
}

function runFfmpeg(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn("ffmpeg", args, { stdio: "ignore" });
    proc.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
    proc.on("error", reject);
  });
}
