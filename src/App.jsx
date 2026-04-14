import { useState, useCallback } from "react";

const ROADMAP = [
  {
    phase: 1,
    title: "Python + AI Foundations",
    color: "#f59e0b",
    weeks: [
      {
        week: 1,
        title: "Python Speedrun for JS Devs",
        days: "Day 1\u20137",
        hours: 10,
        tasks: [
          { id: "1-1-1", text: "Setup Python 3.12+, VS Code Python ext, uv package manager" },
          { id: "1-1-2", text: "Variables, types, f-strings, lists, dicts, tuples, sets" },
          { id: "1-1-3", text: "Conditionals, loops, list comprehensions" },
          { id: "1-1-4", text: "Functions, *args, **kwargs, imports, pip, virtual envs" },
          { id: "1-1-5", text: "File I/O \u2014 read/write JSON, CSV files" },
          { id: "1-1-6", text: "Error handling: try/except (same as JS try/catch)" },
          { id: "1-1-7", text: "Mini project: Rewrite a Node.js utility in Python" },
        ],
      },
      {
        week: 2,
        title: "FastAPI + LLM APIs",
        days: "Day 8\u201314",
        hours: 10,
        tasks: [
          { id: "1-2-1", text: "FastAPI basics: routes, path params, request body, Pydantic" },
          { id: "1-2-2", text: "Async/await in Python (you already know this from JS)" },
          { id: "1-2-3", text: "Build a CRUD REST API with FastAPI" },
          { id: "1-2-4", text: "Get OpenAI + Anthropic API keys, make first LLM call" },
          { id: "1-2-5", text: "Understand: system prompts, temperature, streaming, tokens" },
          { id: "1-2-6", text: "Prompt engineering: few-shot, chain-of-thought, JSON mode" },
          { id: "1-2-7", text: "Build: FastAPI endpoint that returns AI-generated content" },
        ],
      },
      {
        week: 3,
        title: "RAG + LangChain Fundamentals",
        days: "Day 15\u201321",
        hours: 12,
        tasks: [
          { id: "1-3-1", text: "Understand embeddings: text \u2192 vectors \u2192 similarity search" },
          { id: "1-3-2", text: "OpenAI Embeddings API: text-embedding-3-small" },
          { id: "1-3-3", text: "Setup ChromaDB locally, store & query embeddings" },
          { id: "1-3-4", text: "Document loading: PDFs, text files with LangChain loaders" },
          { id: "1-3-5", text: "Text chunking strategies & why chunk size matters" },
          { id: "1-3-6", text: "Build full RAG pipeline: upload \u2192 chunk \u2192 embed \u2192 retrieve \u2192 answer" },
          { id: "1-3-7", text: "LangChain core: chains, prompts, output parsers, memory" },
          { id: "1-3-8", text: "Build: Chat with PDF app using LangChain + ChromaDB" },
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Build & Ship AI Products",
    color: "#06b6d4",
    weeks: [
      {
        week: 4,
        title: "\ud83d\ude80 Project #1 \u2014 AI Document Assistant",
        days: "Day 22\u201328",
        hours: 14,
        tasks: [
          { id: "2-4-1", text: "FastAPI backend: file upload + RAG query + streaming endpoint" },
          { id: "2-4-2", text: "Document processing pipeline: upload \u2192 chunk \u2192 embed \u2192 store" },
          { id: "2-4-3", text: "React frontend: chat UI with file upload drag-and-drop" },
          { id: "2-4-4", text: "Streaming response display (ChatGPT-like typing effect)" },
          { id: "2-4-5", text: "Source citations \u2014 show which chunk answered the query" },
          { id: "2-4-6", text: "Add JWT auth, error handling, loading states" },
          { id: "2-4-7", text: "Deploy: backend on AWS/Railway, frontend on Vercel" },
          { id: "2-4-8", text: "Write README with architecture diagram + screenshots + demo link" },
        ],
      },
      {
        week: 5,
        title: "AI Agents + LangGraph",
        days: "Day 29\u201335",
        hours: 10,
        tasks: [
          { id: "2-5-1", text: "OpenAI function calling \u2014 let LLMs call your APIs" },
          { id: "2-5-2", text: "Anthropic tool use \u2014 same concept, different syntax" },
          { id: "2-5-3", text: "Build an agent: web search + database query + email tool" },
          { id: "2-5-4", text: "ReAct pattern: Reason \u2192 Act \u2192 Observe \u2192 Repeat" },
          { id: "2-5-5", text: "LangGraph fundamentals: graphs, nodes, edges, state" },
          { id: "2-5-6", text: "Build agent graph: planner \u2192 executor \u2192 reviewer" },
          { id: "2-5-7", text: "Conditional edges + human-in-the-loop patterns" },
        ],
      },
      {
        week: 6,
        title: "Advanced RAG + Vector DBs + MCP",
        days: "Day 36\u201342",
        hours: 12,
        tasks: [
          { id: "2-6-1", text: "Move to Pinecone (production vector DB): indexing, namespaces, metadata" },
          { id: "2-6-2", text: "Hybrid search: semantic + keyword (BM25)" },
          { id: "2-6-3", text: "Re-ranking retrieved results for better accuracy" },
          { id: "2-6-4", text: "Learn MCP: the standard for connecting LLMs to external tools" },
          { id: "2-6-5", text: "Build an MCP server in Python exposing custom tools" },
          { id: "2-6-6", text: "Connect AI to real services: Slack, Gmail, databases" },
          { id: "2-6-7", text: "SSE streaming + WebSocket for real-time AI responses" },
        ],
      },
      {
        week: 7,
        title: "\ud83d\ude80 Project #2 \u2014 Multi-Agent Support Bot",
        days: "Day 43\u201349",
        hours: 14,
        tasks: [
          { id: "2-7-1", text: "Design multi-agent graph: router \u2192 FAQ / order / escalation agents" },
          { id: "2-7-2", text: "Each agent with own tools: RAG search, DB query, notifications" },
          { id: "2-7-3", text: "Implement with LangGraph: cross-agent state management" },
          { id: "2-7-4", text: "Chat widget frontend (embeddable component)" },
          { id: "2-7-5", text: "Admin dashboard: conversation logs, agent analytics" },
          { id: "2-7-6", text: "Dockerize the full app (docker-compose)" },
          { id: "2-7-7", text: "Deploy on AWS EC2 + RDS, record 2-min demo video" },
          { id: "2-7-8", text: "Write detailed README with system architecture diagram" },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Ship, Polish & Get Hired",
    color: "#ec4899",
    weeks: [
      {
        week: 8,
        title: "\ud83d\ude80 Project #3 \u2014 Full AI SaaS MVP",
        days: "Day 50\u201356",
        hours: 14,
        tasks: [
          { id: "3-8-1", text: "Pick idea: AI code reviewer / meeting summarizer / content repurposer" },
          { id: "3-8-2", text: "Architecture design + FastAPI backend AI pipeline" },
          { id: "3-8-3", text: "Next.js frontend with auth + user dashboard" },
          { id: "3-8-4", text: "Stripe integration for paid tier" },
          { id: "3-8-5", text: "LLM observability: LangSmith/LangFuse for monitoring" },
          { id: "3-8-6", text: "Landing page with demo (your React skills shine here)" },
          { id: "3-8-7", text: "Deploy end-to-end, test, record demo video" },
        ],
      },
      {
        week: 9,
        title: "Portfolio, LinkedIn & Resume",
        days: "Day 57\u201360",
        hours: 8,
        tasks: [
          { id: "3-9-1", text: "All 3 projects: clean READMEs, architecture diagrams, demo GIFs" },
          { id: "3-9-2", text: "Pin AI projects on GitHub profile + portfolio README" },
          { id: "3-9-3", text: "LinkedIn headline \u2192 'AI Application Engineer | Full-Stack + GenAI'" },
          { id: "3-9-4", text: "Post 2\u20133 LinkedIn posts with project screenshots/demos" },
          { id: "3-9-5", text: "Update resume: lead with AI projects, full-stack as foundation" },
          { id: "3-9-6", text: "Write 1 technical blog post: 'How I Built a Multi-Agent AI System'" },
          { id: "3-9-7", text: "Start applying: AI startups, YC companies, remote roles, freelance gigs" },
          { id: "3-9-8", text: "Interview prep: system design for AI, explain projects, RAG architecture" },
        ],
      },
    ],
  },
];

const TOTAL_TASKS = ROADMAP.reduce(
  (sum, phase) =>
    sum + phase.weeks.reduce((ws, w) => ws + w.tasks.length, 0),
  0
);

const STORAGE_KEY = "kamal-ai-roadmap-v2";

export default function App() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [openWeeks, setOpenWeeks] = useState({ 1: true });
  const [activePhase, setActivePhase] = useState(0);
  const [saving, setSaving] = useState(false);

  const saveProgress = useCallback((newChecked) => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked));
    } catch (e) {
      console.error("Save failed:", e);
    }
    setSaving(false);
  }, []);

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveProgress(next);
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((completedCount / TOTAL_TASKS) * 100);

  const phaseStats = (phaseIdx) => {
    const phase = ROADMAP[phaseIdx];
    const total = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
    const done = phase.weeks.reduce(
      (s, w) => s + w.tasks.filter((t) => checked[t.id]).length,
      0
    );
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const weekStats = (week) => {
    const done = week.tasks.filter((t) => checked[t.id]).length;
    return { done, total: week.tasks.length };
  };

  const resetAll = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setChecked({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  const filtered =
    activePhase === 0
      ? ROADMAP
      : ROADMAP.filter((_, i) => i === activePhase - 1);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "40px 20px 20px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#f59e0b", marginBottom: 14 }}>
          60-Day AI Roadmap
        </div>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
          Full-Stack &rarr; <span style={{ color: "#06b6d4" }}>AI Engineer</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 6, maxWidth: 420, margin: "6px auto 0" }}>
          Track your daily progress. Checked items save automatically.
        </p>
      </div>

      {/* Progress Dashboard */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 16, padding: 24, marginBottom: 20 }}>
          {/* Main progress bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
              Overall Progress
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? "#10b981" : "#f59e0b" }}>
              {completedCount}/{TOTAL_TASKS} tasks &middot; {pct}%
              {saving && <span style={{ marginLeft: 8, fontSize: 11, color: "#475569" }}>saving...</span>}
            </span>
          </div>
          <div style={{ height: 10, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: pct === 100 ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #f59e0b, #06b6d4, #ec4899)",
                borderRadius: 99,
                transition: "width 0.5s ease",
              }}
            />
          </div>

          {/* Phase mini-stats */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {ROADMAP.map((phase, i) => {
              const s = phaseStats(i);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: 140,
                    background: s.pct === 100 ? `${phase.color}15` : "#0d1017",
                    border: `1px solid ${s.pct === 100 ? phase.color + "40" : "#1e2330"}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setActivePhase(activePhase === i + 1 ? 0 : i + 1)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: "uppercase", letterSpacing: 1 }}>
                      Phase {phase.phase}
                    </span>
                    <span style={{ fontSize: 11, color: "#64748b" }}>
                      {s.done}/{s.total}
                    </span>
                  </div>
                  <div style={{ height: 4, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: phase.color, borderRadius: 99, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {[{ label: "All Phases", idx: 0 }, ...ROADMAP.map((p, i) => ({ label: `Phase ${p.phase}: ${p.title}`, idx: i + 1, color: p.color }))].map((tab) => (
            <button
              key={tab.idx}
              onClick={() => setActivePhase(tab.idx)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: activePhase === tab.idx ? `1px solid ${tab.color || "#f59e0b"}` : "1px solid #1e2330",
                background: activePhase === tab.idx ? (tab.color || "#f59e0b") + "20" : "#111318",
                color: activePhase === tab.idx ? (tab.color || "#f59e0b") : "#64748b",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={resetAll}
            style={{
              marginLeft: "auto",
              padding: "7px 14px",
              borderRadius: 8,
              border: "1px solid #dc262620",
              background: "#dc262610",
              color: "#f87171",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset All
          </button>
        </div>

        {/* Weeks */}
        {filtered.map((phase) =>
          phase.weeks.map((week) => {
            const ws = weekStats(week);
            const isOpen = openWeeks[week.week];
            const weekDone = ws.done === ws.total && ws.total > 0;
            return (
              <div
                key={week.week}
                style={{
                  background: "#111318",
                  border: `1px solid ${weekDone ? phase.color + "30" : "#1e2330"}`,
                  borderRadius: 14,
                  marginBottom: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Week header */}
                <div
                  onClick={() => setOpenWeeks((p) => ({ ...p, [week.week]: !p[week.week] }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 18px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        background: weekDone ? phase.color + "30" : phase.color + "15",
                        color: phase.color,
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      {weekDone ? "\u2713" : `W${week.week}`}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{week.title}</div>
                      <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>
                        {week.days} &middot; ~{week.hours} hrs &middot; {ws.done}/{ws.total} done
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Mini progress ring */}
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="11" fill="none" stroke="#1a1f2e" strokeWidth="2.5" />
                      <circle
                        cx="14"
                        cy="14"
                        r="11"
                        fill="none"
                        stroke={phase.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(ws.done / ws.total) * 69.1} 69.1`}
                        transform="rotate(-90 14 14)"
                        style={{ transition: "stroke-dasharray 0.4s ease" }}
                      />
                    </svg>
                    <span style={{ color: "#475569", fontSize: 16, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      &#x25BE;
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #1e2330", padding: "8px 18px 16px" }}>
                    {week.tasks.map((task) => {
                      const isDone = !!checked[task.id];
                      return (
                        <label
                          key={task.id}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            padding: "10px 4px",
                            borderRadius: 8,
                            cursor: "pointer",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff06")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {/* Custom checkbox */}
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              toggle(task.id);
                            }}
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              border: isDone ? `2px solid ${phase.color}` : "2px solid #2a3040",
                              background: isDone ? phase.color + "25" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                              transition: "all 0.2s",
                              cursor: "pointer",
                            }}
                          >
                            {isDone && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6.5L4.5 9L10 3" stroke={phase.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 13.5,
                              lineHeight: 1.5,
                              color: isDone ? "#475569" : "#cbd5e1",
                              textDecoration: isDone ? "line-through" : "none",
                              transition: "all 0.2s",
                            }}
                          >
                            {task.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Salary target */}
        <div
          style={{
            textAlign: "center",
            padding: "28px 20px",
            marginTop: 8,
            marginBottom: 40,
            background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(6,182,212,0.06), rgba(236,72,153,0.06))",
            border: "1px solid #1e2330",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800 }}>Full-Stack &rarr; AI Engineer</div>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6, maxWidth: 460, margin: "6px auto 0" }}>
            60 days. 3 deployed AI projects. Your full-stack foundation + GenAI = the most in-demand skill combination in 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
