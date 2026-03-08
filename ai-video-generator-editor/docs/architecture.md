# Architecture Analysis and Refactor Plan

## Findings from original repository
- **Frontend framework:** Streamlit UI (`app.py`) with state-driven forms and task controls.
- **Backend framework:** Python orchestration modules (`task_executor.py`, `project_manager.py`) and model adapters.
- **Video processing tools:** `moviepy`, FFmpeg runtime, and `video_assembly.py`.
- **AI integrations:** LLM/TTS/T2I/I2V/T2V plug-in modules discovered dynamically.
- **Rendering pipeline:** project state (`project.json`) drives sequential generation and final assembly.
- **Editor architecture:** dashboard-style project executor, not a timeline NLE.

## Refactored production-oriented architecture

```text
app/                  # Next.js App Router pages + API
frontend/             # UI feature components
backend/              # backend-specific adapters and jobs
ai/                   # AI prompt->media generation orchestration
video/                # FFmpeg render pipeline and timeline compiler
services/             # external provider clients (Replicate/OpenAI)
components/           # shared design-system components
lib/                  # types, utils, config
public/media/         # generated artifacts and uploads
scripts/              # automation/dev scripts
```

## Runtime pipeline
1. Prompt submitted in editor UI.
2. `/api/generate` calls `ai/generateVideo.ts`.
3. `services/replicate.ts` resolves model inference or local mock fallback.
4. Generated clip is appended to timeline (`ProjectState`).
5. `/api/render` runs `video/renderPipeline.ts`.
6. FFmpeg creates rendered output and persists manifest in `public/media`.

## Deployment notes (Vercel)
- Frontend/API routes deploy on Vercel.
- AI provider keys via env vars (`REPLICATE_API_TOKEN`, `OPENAI_API_KEY`).
- FFmpeg is required for rendering route; deploy as server runtime with FFmpeg binary available or external render worker.
