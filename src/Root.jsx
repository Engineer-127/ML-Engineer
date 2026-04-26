import { useState } from "react";
import App from "./App.jsx";
import InterviewTrack from "./InterviewTrack.jsx";
import AWSTrack from "./AWSTrack.jsx";
import FortyFiveDay from "./FortyFiveDay.jsx";
import AgenticInterviewTrack from "./AgenticInterviewTrack.jsx";
import AgenticFortyFiveDay from "./AgenticFortyFiveDay.jsx";

const TABS = [
  { id: "30day",       label: "Gen AI Interview",      color: "#10b981" },
  { id: "45day",       label: "Gen AI 45-Day",         color: "#06b6d4" },
  { id: "ag-interview",label: "Agentic Interview",     color: "#8b5cf6" },
  { id: "ag-45day",    label: "Agentic 45-Day",        color: "#ec4899" },
  { id: "aws",         label: "AWS 15-Day",            color: "#f97316" },
  { id: "90day",       label: "90-Day Full",           color: "#a78bfa" },
];

export default function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem("ai-tracker-mode") || "90day");

  const switchMode = (m) => {
    setMode(m);
    localStorage.setItem("ai-tracker-mode", m);
  };

  return (
    <>
      {mode === "30day"        && <InterviewTrack />}
      {mode === "aws"          && <AWSTrack />}
      {mode === "45day"        && <FortyFiveDay />}
      {mode === "90day"        && <App />}
      {mode === "ag-interview" && <AgenticInterviewTrack />}
      {mode === "ag-45day"     && <AgenticFortyFiveDay />}

      {/* Fixed pill switcher at bottom */}
      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 999, display: "flex", background: "#0d1017",
        border: "1px solid #1e2330", borderRadius: 12, overflow: "hidden",
        boxShadow: "0 4px 32px rgba(0,0,0,0.8)",
      }}>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => switchMode(tab.id)}
            style={{
              padding: "10px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: mode === tab.id ? tab.color + "18" : "transparent",
              color: mode === tab.id ? tab.color : "#475569",
              border: "none",
              borderRight: i < TABS.length - 1 ? "1px solid #1e2330" : "none",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
