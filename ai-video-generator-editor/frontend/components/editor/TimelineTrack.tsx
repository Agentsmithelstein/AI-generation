"use client";

import type { Clip } from "@/lib/types";
import { ClipBlock } from "./ClipBlock";

export function TimelineTrack({ name, clips }: { name: string; clips: Clip[] }) {
  return (
    <div className="relative h-12 border-b border-slate-800">
      <span className="absolute left-2 top-3 text-xs uppercase text-slate-400">{name}</span>
      {clips.map((clip) => (
        <ClipBlock key={clip.id} clip={clip} />
      ))}
    </div>
  );
}
