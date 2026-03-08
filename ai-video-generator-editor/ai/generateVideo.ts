import { generateVideo } from "@/services/replicate";
import type { Clip } from "@/lib/types";

export async function promptToClip(prompt: string): Promise<Clip> {
  const result = await generateVideo(prompt);
  const source = Array.isArray(result.output) ? String(result.output[0]) : String(result.output);

  return {
    id: `ai-${Date.now()}`,
    track: "ai",
    start: 0,
    duration: 5,
    prompt,
    src: source
  };
}
