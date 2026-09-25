# Director's Thought 🎬

> **Turn your thought into a film.**  
> The comprehensive AI-powered filmmaking studio designed for directors, screenwriters, and production teams.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌟 Overview

**Director's Thought** bridges creative vision and production logistics. From initial ideation and script breakdowns to camera shot planning, scheduling, and risk forecasting, it serves as an intelligent command center for filmmakers.

Powered by Google's **Gemini AI**, the platform offers dynamic script health checks, scene breakdowns, smart casting insights, and real-time "What If" simulation to help you make confident creative and logistical decisions.

---

## 🚀 Key Features

- **💡 Idea & Concept Landing**: Capture loglines, themes, genres, tone, and visual inspirations with AI-assisted premise refinement.
- **✍️ Screenplay Studio & Breakdown**: Write and analyze screenplays with automated element tagging (characters, props, locations, wardrobe, stunts).
- **📋 Pre-Production Board**:
  - **Camera Shot Lists & Angles**: Plan focal lengths, camera movement, and visual framing.
  - **Location Scouting**: Track scene locations, permits, environmental conditions, and staging.
  - **Art, Props & Wardrobe**: Catalog essential assets tied directly to scene beats.
  - **Lighting & Sound Setup**: Define scene mood, lighting temperatures, and audio recording requirements.
- **🗓️ Scheduling Stripboard & Logistics**: Organize shooting days, manage day/night splits, and balance actor availability.
- **🔮 "What If" Simulator & Risk Radar**: Simulate budget shifts, cast replacements, and weather disruptions with instant contingency plans.
- **📖 Production Bible Export**: Generate full cinematic dossiers for crew and department heads.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Backend / Server**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx)
- **AI Integration**: [@google/genai SDK](https://www.npmjs.com/package/@google/genai) with resilient model fallback cascade (`gemini-3.8-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite`)

---

## ⚡ Quickstart: Running Locally

Follow these steps to set up and run the application on your local machine:

### 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: (bundled with Node.js) or **bun** / **pnpm** / **yarn**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/kit29-25bad095/Director-s-Thought.git
cd Director-s-Thought
```

> *Note:* If you are running this from your downloaded folder directly, open your terminal inside the `director's-thought (1)` directory.

### 3. Install Dependencies

Install all required frontend and backend packages:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root of the project by copying the provided example:

```bash
cp .env.example .env
```

Open `.env` in your text editor and provide your Gemini API key:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
```

### 5. Launch the Development Server

Start the full-stack development server:

```bash
npm run dev
```

### 6. Access the Application

Once the server has booted, open your web browser and navigate to:

👉 **[http://localhost:3000](http://localhost:3000)**

*(The frontend will automatically reload if you edit any source files).*

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the unified Express + Vite development server on `http://localhost:3000` |
| `npm run build` | Builds both the Vite client application and the production server bundle |
| `npm run start` | Runs the compiled production server from `dist/server.cjs` |
| `npm run lint` | Performs TypeScript type checks across the codebase |
| `npm run clean` | Cleans up previous build artifacts in `dist/` |

---

## 📁 Project Structure

```
├── .env.example                     # Sample environment variable template
├── .gitignore                       # Ignored build artifacts and dependencies
├── index.html                       # HTML application entry point
├── package.json                     # Project manifest and dependencies
├── server.ts                        # Express backend server & Gemini API endpoints
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration
└── src/
    ├── components/
    │   ├── navigation/              # Topbar, navbar, AI assistant drawer
    │   ├── preproduction/           # Tabs for shot lists, locations, props, budget
    │   ├── story/                   # Screenplay editor, story structure, beat sheets
    │   └── views/                   # Main views (Command Center, Pre-Prod, Breakdown)
    ├── data/                        # Initial mock data and sample suite datasets
    ├── services/                    # Client Gemini API client and helper functions
    ├── types/                       # TypeScript interfaces & types
    ├── index.css                    # Global styling & Tailwind directives
    └── main.tsx                     # React root bootstrap
```

---

## 🔑 AI Features & Setup

To enable all generative features (script analysis, automated shot suggestions, casting archetypes, production risk analysis):
1. Obtain an API key from **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Add it to your `.env` file as `GEMINI_API_KEY`.
3. If no key is provided, the application runs using rich offline sample data so you can test the UI and workflows immediately.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
