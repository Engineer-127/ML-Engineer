import { useState } from "react";
import App from "./App.jsx";
import InterviewTrack from "./InterviewTrack.jsx";

export default function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem("ai-tracker-mode") || "90day");

  const switchMode = (m) => {
    setMode(m);
    localStorage.setItem("ai-tracker-mode", m);
  };

  return (
    <>
      {mode === "30day" ? <InterviewTrack /> : <App />}

      {/* Mode switcher — fixed pill at bottom */}
      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 999, display: "flex", background: "#0d1017",
        border: "1px solid #1e2330", borderRadius: 12, overflow: "hidden",
        boxShadow: "0 4px 32px rgba(0,0,0,0.7)",
      }}>
        <button
          onClick={() => switchMode("30day")}
          style={{
            padding: "10px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: mode === "30day" ? "rgba(16,185,129,0.15)" : "transparent",
            color: mode === "30day" ? "#10b981" : "#475569",
            border: "none", borderRight: "1px solid #1e2330", transition: "all 0.2s",
          }}
        >
          30-Day Interview Track
        </button>
        <button
          onClick={() => switchMode("90day")}
          style={{
            padding: "10px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: mode === "90day" ? "rgba(6,182,212,0.15)" : "transparent",
            color: mode === "90day" ? "#06b6d4" : "#475569",
            border: "none", transition: "all 0.2s",
          }}
        >
          90-Day Full Roadmap
        </button>
      </div>
    </>
  );
}
