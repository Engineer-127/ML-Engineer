# Agentic AI Research Assistant

A runnable portfolio starter for the learning tracks. It currently provides FastAPI health, calculator-tool, deterministic five-node LangGraph chat, workflow-status, and SSE endpoints plus a React workflow UI. The default `demo` provider needs no API key.

## Run locally

```bash
cp .env.example .env
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Or use `docker compose up --build`. API docs are at `http://localhost:8000/docs` and the UI at `http://localhost:5173`.

## API starter surface

- `GET /health`
- `POST /chat`
- `POST /chat/stream` (SSE workflow and answer events)
- `GET /threads/{thread_id}/status`
- `POST /tools/calculate`

## Honest implementation boundary

The graph is functional but deterministic. `search_documents` is a placeholder. PDF loading, embeddings/Chroma, citation extraction, provider-backed token streaming, Postgres/SQLite checkpointing, long-term memory, approval interrupts/resume, and LangSmith evaluation are explicit guided-track milestones rather than falsely represented as finished. Replace `InMemorySaver` before production because it does not survive process restarts.

Current LangGraph patterns used here follow the official documentation for typed state, explicit nodes and edges, conditional routing, checkpoint thread IDs, and streaming. Interrupt/resume should use a durable checkpointer plus `interrupt()` and `Command(resume=...)` on the same `thread_id`.

## Tests

```bash
cd backend
pytest
```

## Deployment

Deploy `frontend/` to Vercel with `VITE_API_URL` pointing at the public backend. Deploy `backend/` to a container-capable persistent Python host (Render, Railway, Fly.io, AWS, Azure, or GCP), attach Postgres and durable vector storage, restrict CORS, and store secrets in the provider's secret manager. Vercel's static frontend hosting alone is not a substitute for the durable Python runtime and checkpoint/vector data this application needs.
