# Medvora

Medvora is a healthcare continuing medical education (CME) and clinical learning platform for physicians, nurses, pharmacists, researchers, and allied health professionals.

The demo experience includes:

- Accredited CME and CPD course catalog with specialty filters
- Interactive course lessons, assessments, progress tracking, and certificates
- Clinical case discussions, faculty profiles, practice updates, and grand rounds
- Personal dashboard with saved courses, notes, notifications, and certificate vault
- Hospital and enterprise learning views with organization analytics
- Clinical Consult Assistant with a server-side Gemini integration and local fallback responses

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Set `GEMINI_API_KEY` in the environment before starting the server if you want live responses from the Clinical Consult Assistant. The app uses built-in demo responses when the key is not set. `.env.example` documents the required variable for local or hosted environments that load dotenv files.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Express and Vite development server |
| `npm run build` | Build the frontend and production server bundle |
| `npm run start` | Start the production server from `dist` |
| `npm run preview` | Preview the Vite production build |
| `npm run lint` | Run the TypeScript compiler without emitting files |

## Project structure

```text
src/
  components/  Reusable platform views, modals, and navigation
  data/        Demo courses, users, events, and clinical content
  App.tsx      Application state and top-level view routing
  index.css    Shared styles and design tokens
server.ts      Express server and Clinical Consult API route
```

## Notes

This repository is a functional product demo. Course, learner, organization, and certificate data are stored in local mock data rather than a production database. Clinical content is for education and demonstration only and is not a substitute for professional medical judgment.
