# ai-video-editor-clone

A production-oriented clone inspired by `gowrav-vishwakarma/ai-video-generator-editor`, rebuilt as a Next.js AI video editor with timeline UX and API-driven generation/rendering.

## Features
- Prompt → AI clip generation (`/api/generate`)
- CapCut-like editor layout (left assets, center preview, bottom timeline, right inspector)
- Timeline tracks: video/audio/text/ai
- Render pipeline via FFmpeg (`/api/render`)
- Upload endpoint (`/api/upload`)
- Project persistence (`/api/projects`, `public/media/project.json`)
- Export flow for MP4 (extendable to 1080p/720p/GIF profiles)

## Tech stack
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Replicate SDK integration
- Node child-process FFmpeg rendering

## Setup
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Environment variables
Create `.env.local`:
```bash
REPLICATE_API_TOKEN=your_token
OPENAI_API_KEY=optional
```

Without Replicate token, generation falls back to mock clip paths so local testing still works.

## Run checks
```bash
npm run build
ffmpeg -version
```

## Example prompts
- `cyberpunk city at night flying through neon streets`
- `cinematic drone over snowy mountain village at sunrise`
- `retro anime street market with rain and glowing signs`

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```
Set `REPLICATE_API_TOKEN` and `OPENAI_API_KEY` in Vercel project settings.

## Notes
- For full production rendering, run FFmpeg in a worker/container if serverless limits are restrictive.
- The rendering pipeline currently produces a base video and manifest; extend with transitions, overlays, and compositing from timeline clips.
