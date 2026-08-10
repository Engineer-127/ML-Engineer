import GuidedLearningTrack from "./GuidedLearningTrack.jsx";

const phases = [
  { id: "sprint-day-1", label: "Day 1", title: "LangChain foundations + RAG", goal: "Create a working full-stack skeleton and grounded document Q&A.", tasks: [
    ["d1-setup", "Bootstrap the research assistant", "Create Python 3.12/FastAPI and React/Vite apps, configuration, CORS, health endpoint, Docker files, and a provider-neutral model factory.", "75 min", ["FastAPI", "Vite", "Docker"]],
    ["d1-messages", "Models, messages, prompts, output", "Invoke a configurable chat model with system/human messages, a prompt template, retry/fallback handling, and a Pydantic structured response.", "90 min", ["LangChain", "Messages", "Structured output"]],
    ["d1-ingest", "Upload, split, embed, index", "Accept PDF/text files, retain source/page metadata, split recursively, create embeddings, and persist chunks in Chroma or another local vector store.", "120 min", ["PDF", "Embeddings", "Chroma"]],
    ["d1-rag", "RAG answers with citations", "Build retrieval and generation endpoints; return citations with source, page, and excerpt. Test grounded and unanswerable questions.", "120 min", ["RAG", "Citations", "Testing"]],
  ].map(([id,title,detail,time,tags]) => ({id,title,detail,time,tags})) },
  { id: "sprint-day-2", label: "Day 2", title: "Tools + a controllable LangGraph", goal: "Turn the RAG pipeline into an observable, stateful research workflow.", tasks: [
    ["d2-tools", "Create safe research tools", "Define typed document-search, calculator, and date tools. Bind them to the model and handle invalid arguments and tool failures.", "90 min", ["Tool calling", "Validation", "Fallbacks"]],
    ["d2-state", "Design typed graph state", "Model messages, plan, findings, citations, review feedback, status, and errors using TypedDict/Annotated reducers with stable node names.", "60 min", ["StateGraph", "Reducers", "Typing"]],
    ["d2-graph", "Implement the five-node workflow", "Connect planner, researcher, tool-executor, reviewer, and final-answer nodes with normal and conditional edges, retry loops, and bounded routing.", "150 min", ["Nodes", "Edges", "Loops"]],
    ["d2-parallel", "Add parallel research branches", "Fan out independent research questions and merge findings deterministically; expose node updates as workflow status events.", "90 min", ["Parallelism", "Routing", "Status"]],
    ["d2-stream", "Stream chat and progress", "Expose SSE for tokens and graph updates; render chat, citations, reconnect/error states, and a visual workflow-progress rail in React.", "120 min", ["SSE", "Streaming", "React"]],
  ].map(([id,title,detail,time,tags]) => ({id,title,detail,time,tags})) },
  { id: "sprint-day-3", label: "Day 3", title: "Persistence, HITL, quality + delivery", goal: "Make the portfolio project resumable, traceable, evaluated, and deployable.", tasks: [
    ["d3-checkpoint", "Persist conversation threads", "Compile with a checkpointer, use thread_id consistently, store conversation metadata in SQLite/Postgres, and prove a thread survives restart.", "105 min", ["Checkpointing", "Threads", "Memory"]],
    ["d3-memory", "Short- and long-term memory", "Keep bounded conversation context and durable user/project facts with explicit namespaces, retention rules, and deletion controls.", "75 min", ["Memory", "Persistence", "Privacy"]],
    ["d3-hitl", "Human approval and resume", "Interrupt before a sensitive or expensive tool, surface the approval payload in the UI, then resume with Command using the original thread.", "105 min", ["Interrupts", "HITL", "Resume"]],
    ["d3-observe", "Trace and evaluate with LangSmith", "Enable environment-driven tracing, label graph runs, create a small citation/groundedness dataset, and run baseline evaluations.", "90 min", ["LangSmith", "Tracing", "Evaluation"]],
    ["d3-ship", "Harden, test, and deploy", "Add API/component tests, timeouts, retries, rate/size limits, Docker compose, docs, and deploy frontend separately from a persistent Python backend.", "120 min", ["Tests", "Deployment", "Production"]],
  ].map(([id,title,detail,time,tags]) => ({id,title,detail,time,tags})) },
];

export default function LangChainSprint() {
  return <GuidedLearningTrack title="LangChain + LangGraph 3-Day" subtitle="Build one portfolio project end to end: an Agentic AI Research Assistant." accent="#22d3ee" storageKey="lc-lg-3day-progress-v1" phases={phases} />;
}
