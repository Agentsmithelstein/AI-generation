"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/frontend/components/editor/Timeline";
import type { ProjectState } from "@/lib/types";

const initialState: ProjectState = {
  clips: [],
  tracks: ["video", "audio", "text", "ai"],
  duration: 120,
  assets: []
};

export default function HomePage() {
  const [prompt, setPrompt] = useState("cyberpunk city at night flying through neon streets");
  const [project, setProject] = useState<ProjectState>(initialState);

  const generateClip = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setProject((prev) => ({ ...prev, clips: [...prev.clips, { ...data.clip, start: prev.clips.length * 5 }] }));
  };

  const renderVideo = async () => {
    await fetch("/api/render", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(project) });
  };

  return (
    <main className="grid h-screen grid-cols-12 gap-3 p-3">
      <section className="col-span-2 rounded bg-slate-900 p-3">Assets / AI prompt / uploads</section>
      <section className="col-span-7 grid grid-rows-[1fr_auto] gap-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded bg-slate-900 p-4">
          <h1 className="mb-3 text-lg font-semibold">AI Video Editor Clone</h1>
          <textarea className="h-24 w-full rounded bg-slate-800 p-2" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <div className="mt-3 flex gap-2">
            <button className="rounded bg-cyan-600 px-3 py-2" onClick={generateClip}>Generate AI Clip</button>
            <button className="rounded bg-emerald-600 px-3 py-2" onClick={renderVideo}>Export Video</button>
          </div>
        </motion.div>
        <Timeline project={project} />
      </section>
      <section className="col-span-3 rounded bg-slate-900 p-3">Clip controls / effects / prompt editing</section>
    </main>
  );
}
