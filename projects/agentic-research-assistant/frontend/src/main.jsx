import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
export function App() {
  const [message, setMessage] = useState("Explain how checkpointing helps a research agent.");
  const [answer, setAnswer] = useState("");
  const [workflow, setWorkflow] = useState([]);
  const [loading, setLoading] = useState(false);
  async function submit(event) {
    event.preventDefault(); setLoading(true); setWorkflow([]);
    try {
      const response = await fetch(`${API}/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, thread_id: "browser-demo" }) });
      if (!response.ok) throw new Error("The backend returned an error.");
      const data = await response.json(); setAnswer(data.answer); setWorkflow(data.workflow);
    } catch (error) { setAnswer(`${error.message} Is the FastAPI server running?`); }
    finally { setLoading(false); }
  }
  return <main><header><small>PORTFOLIO STARTER</small><h1>Agentic AI Research Assistant</h1><p>Ask a question and follow it through an explicit LangGraph workflow.</p></header><form onSubmit={submit}><textarea value={message} onChange={(event) => setMessage(event.target.value)} /><button disabled={loading}>{loading ? "Researching…" : "Run research"}</button></form><section><h2>Workflow</h2><div className="flow">{["planner","researcher","tool-executor","reviewer","final-answer"].map((node) => <span className={workflow.includes(node) ? "done" : ""} key={node}>{node}</span>)}</div></section><section><h2>Answer</h2><p>{answer || "Your grounded answer and citations will appear here."}</p></section><section><h2>Document ingestion</h2><p className="muted">PDF upload, Chroma indexing, durable checkpoints, approval interrupts, and production LLM calls are deliberately documented next milestones.</p></section></main>;
}
createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
