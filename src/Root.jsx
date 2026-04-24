import { useState } from "react";
import App from "./App.jsx";
import InterviewTrack from "./InterviewTrack.jsx";
import AWSTrack from "./AWSTrack.jsx";

const TABS = [
  { id: "30day",  label: "30-Day Interview Track", color: "#10b981" },
  { id: "aws",    label: "AWS 15-Day Track",        color: "#f97316" },
  { id: "90day",  label: "90-Day Full Roadmap",     color: "#06b6d4" },
];

export default function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem("ai-tracker-mode") || "90day");

  const switchMode = (m) => {
    setMode(m);
    localStorage.setItem("ai-tracker-mode", m);
  };

  return (
    <>
      {mode === "30day" && <InterviewTrack />}
      {mode === "aws"   && <AWSTrack />}
      {mode === "90day" && <App />}

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
