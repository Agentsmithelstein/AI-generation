"use client";

import type { ProjectState } from "@/lib/types";
import { TimelineTrack } from "./TimelineTrack";

export function Timeline({ project }: { project: ProjectState }) {
  return (
    <div className="rounded border border-slate-800 bg-slate-900">
      {project.tracks.map((track) => (
        <TimelineTrack key={track} name={track} clips={project.clips.filter((clip) => clip.track === track)} />
      ))}
    </div>
  );
}
