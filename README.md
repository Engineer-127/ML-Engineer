# AI & Agentic Engineering Learning Tracker

An interactive React + Vite learning tracker with independent local progress, search/filtering, collapsible plans, progress stats, and gamification. Existing GenAI, Agentic AI, AWS, and 90-day tracks are joined by:

- **LangChain + LangGraph 3-Day** — a focused implementation sprint around an Agentic AI Research Assistant.
- **LangChain + LangGraph Mastery** — a phased, production-minded curriculum.

## Run the tracker

```bash
npm install
npm run dev
```

Use `npm run lint` and `npm run build` before publishing. Progress is stored locally in the browser and each track uses a separate versioned storage key.

## Companion portfolio project

See [`projects/agentic-research-assistant`](projects/agentic-research-assistant/README.md) for the functional FastAPI + LangGraph backend starter, React UI, Docker setup, tests, current capabilities, and clearly marked implementation milestones.

## Deployment

The learning tracker is a static Vite app: import this repository into Vercel, keep the repository root as the project root, use `npm run build`, and publish `dist`.

For the companion app, configure a second Vercel project rooted at `projects/agentic-research-assistant/frontend` and set `VITE_API_URL`. Host its Python backend separately on a service intended for long-running containers and persistent storage. Attach Postgres plus durable vector/checkpoint storage, configure secrets and restricted CORS there, and do not rely on ephemeral serverless disk for Chroma or conversation state.

## Original Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
