import GuidedLearningTrack from "./GuidedLearningTrack.jsx";

const make = (prefix, rows) => rows.map((row, index) => ({ id: `${prefix}-${index + 1}`, title: row[0], detail: row[1], time: row[2], tags: row[3] }));
const phases = [
  { id: "mastery-1", label: "Phase 1", title: "LangChain fluency", goal: "Master model interfaces and composable application building blocks.", tasks: make("m1", [
    ["Provider-neutral model layer", "Configure init_chat_model, messages, token usage, streaming, retries, fallbacks, and model selection without leaking provider details.", "2 hrs", ["Models", "Messages"]],
    ["Prompt and structured-output lab", "Build reusable chat prompts and Pydantic schemas; compare provider-native and tool-based structured output with validation recovery.", "2 hrs", ["Prompts", "Pydantic"]],
    ["Tools and agent loop", "Create typed tools, inspect AIMessage tool calls, return ToolMessages, enforce budgets, and implement graceful tool-error recovery.", "3 hrs", ["Tools", "Agents"]],
    ["Runnable composition", "Compose sync/async pipelines, batching, configuration, listeners, and streaming; write tests with deterministic model doubles.", "2 hrs", ["LCEL", "Testing"]],
  ])},
  { id: "mastery-2", label: "Phase 2", title: "Production RAG", goal: "Build measurable retrieval rather than a demo that merely looks convincing.", tasks: make("m2", [
    ["Document ingestion system", "Load PDF/text, normalize metadata, compare recursive and semantic chunking, deduplicate content, and support incremental re-indexing.", "4 hrs", ["Loaders", "Chunking"]],
    ["Vector retrieval", "Persist Chroma locally, tune top-k and metadata filters, add hybrid/multi-query retrieval, and inspect failure cases.", "4 hrs", ["Embeddings", "Retrievers"]],
    ["Grounded generation", "Return verifiable citations, refuse unsupported claims, preserve source artifacts outside model context, and test adversarial documents.", "3 hrs", ["RAG", "Citations"]],
    ["Retrieval evaluation", "Create a golden dataset and measure retrieval relevance, answer correctness, groundedness, latency, and cost before/after changes.", "3 hrs", ["Evaluation", "LangSmith"]],
  ])},
  { id: "mastery-3", label: "Phase 3", title: "LangGraph architecture", goal: "Design explicit state machines for complex agent behavior.", tasks: make("m3", [
    ["State, nodes, and reducers", "Use typed state and message reducers; make nodes small, idempotent, observable, and independently testable.", "3 hrs", ["StateGraph", "Reducers"]],
    ["Routing, loops, and commands", "Implement normal/conditional edges, Command-based routing, bounded reviewer loops, recursion limits, and deterministic terminal conditions.", "4 hrs", ["Edges", "Command"]],
    ["Parallel and subgraph patterns", "Fan out research work, merge state safely, isolate reusable subgraphs, and reason about supersteps and partial failures.", "4 hrs", ["Parallel", "Subgraphs"]],
    ["Five-node research graph", "Ship planner → researcher → tool-executor → reviewer → final-answer with citations and visible workflow status.", "5 hrs", ["Portfolio", "Architecture"]],
  ])},
  { id: "mastery-4", label: "Phase 4", title: "Persistence + human control", goal: "Build agents users can trust, pause, inspect, and resume.", tasks: make("m4", [
    ["Checkpoint lifecycle", "Use thread IDs, inspect state/history, replay failures, and replace in-memory persistence with SQLite/Postgres for deployment.", "4 hrs", ["Persistence", "Threads"]],
    ["Memory design", "Separate checkpointed short-term state from namespaced long-term memories; add retention, summarization, and deletion policies.", "3 hrs", ["Memory", "Store"]],
    ["Interrupt and resume", "Create approve/reject/edit flows, keep pre-interrupt side effects idempotent, and resume with Command on the same thread.", "4 hrs", ["HITL", "Interrupts"]],
    ["Reliability engineering", "Add timeouts, retry policies, fallbacks, circuit breakers, idempotency keys, budgets, and actionable error events.", "3 hrs", ["Retries", "Safety"]],
  ])},
  { id: "mastery-5", label: "Phase 5", title: "Observability + deployment", goal: "Operate the research assistant as a portfolio-grade full-stack system.", tasks: make("m5", [
    ["Streaming product UX", "Stream model tokens and graph updates over SSE, support cancellation/reconnect, and render citations plus node progress accessibly.", "4 hrs", ["SSE", "React"]],
    ["LangSmith operations", "Trace runs with useful metadata, compare experiments, evaluate datasets, inspect regressions, and document cost/latency targets.", "3 hrs", ["Tracing", "Evaluation"]],
    ["API and security hardening", "Validate uploads, cap payloads, restrict CORS, protect secrets, add auth/rate limits, and test failure paths.", "3 hrs", ["FastAPI", "Security"]],
    ["Containerized delivery", "Run frontend/backend with Docker, publish the static UI to Vercel, and deploy Python plus persistent storage to a suitable service.", "3 hrs", ["Docker", "Deployment"]],
    ["Portfolio walkthrough", "Record architecture decisions, demo ingestion/research/HITL/resume, publish evaluation results, and list honest tradeoffs and next steps.", "2 hrs", ["Portfolio", "Documentation"]],
  ])},
];

export default function LangChainMastery() {
  return <GuidedLearningTrack title="LangChain + LangGraph Mastery" subtitle="A production-minded path from model primitives to durable, evaluated agent systems." accent="#a78bfa" storageKey="lc-lg-mastery-progress-v1" phases={phases} />;
}
