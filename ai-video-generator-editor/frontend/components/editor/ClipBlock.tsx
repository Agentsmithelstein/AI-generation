"use client";

import type { Clip } from "@/lib/types";

export function ClipBlock({ clip }: { clip: Clip }) {
  return (
    <div className="absolute top-1 h-10 rounded bg-cyan-600/80 px-2 text-xs" style={{ left: `${clip.start * 20}px`, width: `${clip.duration * 20}px` }}>
      {clip.track}: {clip.prompt ?? clip.id}
    </div>
  );
}
