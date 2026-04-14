import { useState, useCallback, useEffect } from "react";

// ===========================
// ROADMAP DATA
// ===========================
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
  (sum, phase) => sum + phase.weeks.reduce((ws, w) => ws + w.tasks.length, 0),
  0
);

// ===========================
// GAMIFICATION
// ===========================
const XP_PER_TASK = 15;

const LEVELS = [
  { name: "Starter", minXP: 0, badge: "\ud83c\udf31" },
  { name: "Explorer", minXP: 100, badge: "\ud83d\udd0d" },
  { name: "Learner", minXP: 225, badge: "\ud83d\udcda" },
  { name: "Builder", minXP: 375, badge: "\ud83d\udd28" },
  { name: "Shipped It", minXP: 525, badge: "\ud83d\ude80" },
  { name: "Specialist", minXP: 750, badge: "\ud83c\udfaf" },
  { name: "AI Engineer", minXP: TOTAL_TASKS * XP_PER_TASK, badge: "\ud83e\udd16" },
];

const FOUNDATION_SKILLS = [
  "React.js", "Node.js", "Express.js", "JavaScript", "TypeScript",
  "Redux", "REST APIs", "Git", "MongoDB", "MySQL", "Vite", "Docker",
];

const WEEK_SKILLS = {
  1: ["Python 3.12+", "uv", "pip"],
  2: ["FastAPI", "Pydantic", "LLM APIs", "Prompt Engineering"],
  3: ["Embeddings", "ChromaDB", "RAG", "LangChain"],
  4: ["AI Product Design", "Streaming UIs", "JWT Auth"],
  5: ["AI Agents", "Function Calling", "LangGraph", "ReAct"],
  6: ["Pinecone", "Hybrid Search", "Re-ranking", "MCP"],
  7: ["Multi-Agent Systems", "State Machines", "Docker Compose"],
  8: ["AI SaaS Architecture", "LLM Ops", "Stripe Integration"],
  9: ["Portfolio Strategy", "Technical Writing", "AI System Design"],
};

const QUOTES = [
  // Indian legends
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.", author: "Swami Vivekananda" },
  { text: "You cannot believe in God until you believe in yourself.", author: "Swami Vivekananda" },
  { text: "Take up one idea. Make that one idea your life \u2014 think of it, dream of it, live on that idea.", author: "Swami Vivekananda" },
  { text: "An equation for me has no meaning unless it expresses a thought of God.", author: "Srinivasa Ramanujan" },
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "A.P.J. Abdul Kalam" },
  { text: "You have to dream before your dreams can come true.", author: "A.P.J. Abdul Kalam" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A.P.J. Abdul Kalam" },
  { text: "All of us do not have equal talent. But all of us have an equal opportunity to develop our talents.", author: "A.P.J. Abdul Kalam" },
  { text: "Don\u2019t take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "A.P.J. Abdul Kalam" },
  { text: "I dream of a digital India where technology ensures the nation\u2019s growth.", author: "Narendra Modi" },
  { text: "Hard work never brings fatigue. It brings satisfaction.", author: "Narendra Modi" },
  { text: "Once we decide we have to do something, we can go miles ahead.", author: "Narendra Modi" },
  { text: "You can change your present and future by the power of your will.", author: "Atal Bihari Vajpayee" },
  { text: "Our dream is of an India that is strong, self-reliant, and at the forefront of technology.", author: "Atal Bihari Vajpayee" },
  { text: "We may stumble and fall but shall rise again; it should be enough if we did not run away from the battle.", author: "Atal Bihari Vajpayee" },
  { text: "The world respects you only when you have the ability to say no.", author: "Ajit Doval" },
  { text: "A nation that cannot protect itself cannot grow. Strength is the prerequisite for progress.", author: "Ajit Doval" },
  { text: "India is not just rising, India has risen. The world just needs to take note.", author: "S. Jaishankar" },
  { text: "Never let anyone tell you what you can or cannot do. Prove them wrong with results.", author: "S. Jaishankar" },
  { text: "We are not a country that waits for others to define our future. We shape it ourselves.", author: "S. Jaishankar" },
  { text: "An unstoppable force comes from having unshakeable self-belief.", author: "Balasaheb Thackeray" },
  { text: "I am a born fighter. I have fought all my life.", author: "Balasaheb Thackeray" },
  { text: "Either I will come back after hoisting the tricolour, or I will come back wrapped in it. But I will come back for certain.", author: "Captain Vikram Batra" },
  { text: "If a country is to be corruption-free, I strongly feel there are three key members who can make it happen \u2014 the father, the mother, and the teacher.", author: "A.P.J. Abdul Kalam" },
  { text: "Success is when your signature changes to autograph.", author: "A.P.J. Abdul Kalam" },
  { text: "The best brains of the nation may be found on the last benches of the classroom.", author: "A.P.J. Abdul Kalam" },
  // Tech visionaries
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "AI is the new electricity.", author: "Andrew Ng" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Move fast and build things.", author: "Sam Altman" },
  { text: "The future belongs to those who learn more skills and combine them in creative ways.", author: "Robert Greene" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  { text: "It\u2019s not about ideas. It\u2019s about making ideas happen.", author: "Scott Belsky" },
  { text: "Shipping beats perfection.", author: "Reid Hoffman" },
  { text: "In the age of AI, the builder is king.", author: "Andrej Karpathy" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Compound interest applies to knowledge too.", author: "Warren Buffett" },
  { text: "You don\u2019t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
];

// ===========================
// STORAGE
// ===========================
const STORAGE_KEY = "kamal-ai-roadmap-v2";
const STREAK_KEY = "ai-roadmap-streak";
const START_KEY = "ai-roadmap-start";

// ===========================
// HELPERS
// ===========================
function getLevel(xp) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) level = l;
  }
  return level;
}

function getNextLevel(xp) {
  for (const l of LEVELS) {
    if (xp < l.minXP) return l;
  }
  return null;
}

function computeStreak() {
  try {
    const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    if (!data.lastDate) return 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (data.lastDate === today || data.lastDate === yesterday) return data.count || 0;
    return 0;
  } catch {
    return 0;
  }
}

function recordActivity() {
  try {
    const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const today = new Date().toDateString();
    if (data.lastDate === today) return data.count || 1;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newCount = data.lastDate === yesterday ? (data.count || 0) + 1 : 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({ lastDate: today, count: newCount }));
    return newCount;
  } catch {
    return 1;
  }
}

function getDayNumber() {
  try {
    const start = localStorage.getItem(START_KEY);
    if (!start) return 0;
    const diff = Date.now() - new Date(start).getTime();
    return Math.max(1, Math.ceil(diff / 86400000));
  } catch {
    return 0;
  }
}

function recordStart() {
  if (!localStorage.getItem(START_KEY)) {
    localStorage.setItem(START_KEY, new Date().toISOString());
  }
}

function getDailyQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
}

function getEstimatedFinish(completedCount) {
  try {
    const start = localStorage.getItem(START_KEY);
    if (!start || completedCount < 2) return null;
    const daysElapsed = Math.max(1, (Date.now() - new Date(start).getTime()) / 86400000);
    const tasksPerDay = completedCount / daysElapsed;
    const remaining = TOTAL_TASKS - completedCount;
    const daysLeft = Math.ceil(remaining / tasksPerDay);
    const finish = new Date(Date.now() + daysLeft * 86400000);
    return finish.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return null;
  }
}

// ===========================
// APP
// ===========================
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
  const [streak, setStreak] = useState(computeStreak);
  const [dayNum, setDayNum] = useState(getDayNumber);
  const [celebration, setCelebration] = useState(null);
  const quote = getDailyQuote();

  // Inject CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideDown{from{opacity:0;transform:translate(-50%,-20px)}to{opacity:1;transform:translate(-50%,0)}}
      @keyframes fadeOut{from{opacity:1}to{opacity:0}}
      @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(245,158,11,0.2)}50%{box-shadow:0 0 20px rgba(245,158,11,0.5)}}
      @keyframes streakPulse{0%,100%{text-shadow:0 0 4px rgba(249,115,22,0.3)}50%{text-shadow:0 0 16px rgba(249,115,22,0.8)}}
      @keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(120px) rotate(720deg);opacity:0}}
      @keyframes badgeUnlock{0%{transform:scale(0.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const saveProgress = useCallback((newChecked) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked));
    } catch (e) {
      console.error("Save failed:", e);
    }
  }, []);

  const isWeekComplete = useCallback(
    (weekNum, checkedState) => {
      for (const phase of ROADMAP) {
        for (const week of phase.weeks) {
          if (week.week === weekNum) {
            return week.tasks.every((t) => checkedState[t.id]);
          }
        }
      }
      return false;
    },
    []
  );

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveProgress(next);

    if (!checked[id]) {
      recordStart();
      setDayNum(getDayNumber() || 1);
      const newStreak = recordActivity();
      setStreak(newStreak);

      // Check if this completes a week
      for (const phase of ROADMAP) {
        for (const week of phase.weeks) {
          if (week.tasks.some((t) => t.id === id)) {
            if (week.tasks.every((t) => next[t.id])) {
              setCelebration({ week: week.week, title: week.title });
              setTimeout(() => setCelebration(null), 4000);
            }
          }
        }
      }
    }
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const xp = completedCount * XP_PER_TASK;
  const currentLevel = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const pct = Math.round((completedCount / TOTAL_TASKS) * 100);
  const estimatedFinish = getEstimatedFinish(completedCount);

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

  const getNextTask = () => {
    for (const phase of ROADMAP) {
      for (const week of phase.weeks) {
        for (const task of week.tasks) {
          if (!checked[task.id]) return { task, week, phase };
        }
      }
    }
    return null;
  };

  const getUnlockedSkills = () => {
    const unlocked = [];
    for (let w = 1; w <= 9; w++) {
      if (isWeekComplete(w, checked) && WEEK_SKILLS[w]) {
        unlocked.push(...WEEK_SKILLS[w]);
      }
    }
    return unlocked;
  };

  const getAllNewSkills = () => {
    const all = [];
    for (let w = 1; w <= 9; w++) {
      if (WEEK_SKILLS[w]) {
        all.push(
          ...WEEK_SKILLS[w].map((s) => ({
            name: s,
            week: w,
            unlocked: isWeekComplete(w, checked),
          }))
        );
      }
    }
    return all;
  };

  const resetAll = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setChecked({});
      setStreak(0);
      setDayNum(0);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STREAK_KEY);
        localStorage.removeItem(START_KEY);
      } catch {}
    }
  };

  const filtered =
    activePhase === 0 ? ROADMAP : ROADMAP.filter((_, i) => i === activePhase - 1);
  const nextTask = getNextTask();
  const unlockedSkills = getUnlockedSkills();
  const allNewSkills = getAllNewSkills();
  const allDone = completedCount === TOTAL_TASKS;

  // Confetti particles for celebration
  const confettiColors = ["#f59e0b", "#06b6d4", "#ec4899", "#10b981", "#8b5cf6", "#f97316"];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ===== CELEBRATION TOAST ===== */}
      {celebration && (
        <>
          <div style={{
            position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
            background: "linear-gradient(135deg, #f59e0b, #06b6d4)", color: "#000",
            padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15,
            animation: "slideDown 0.4s ease-out",
            boxShadow: "0 8px 40px rgba(245,158,11,0.4)",
          }}>
            Week {celebration.week} Complete! +{(WEEK_SKILLS[celebration.week] || []).length} skills unlocked
          </div>
          {/* Mini confetti */}
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "50vh", pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: -10,
                left: `${4 + (i / 24) * 92}%`,
                width: 6 + (i % 3) * 3,
                height: 6 + (i % 3) * 3,
                borderRadius: i % 2 === 0 ? "50%" : "2px",
                background: confettiColors[i % confettiColors.length],
                animation: `confettiFall ${1.5 + (i % 5) * 0.3}s ease-out ${i * 0.06}s forwards`,
              }} />
            ))}
          </div>
        </>
      )}

      {/* ===== HEADER ===== */}
      <div style={{ padding: "40px 20px 10px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#f59e0b", marginBottom: 14 }}>
          60-Day AI Roadmap
        </div>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
          Full-Stack &rarr; <span style={{ color: "#06b6d4" }}>AI Engineer</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 480, margin: "8px auto 0" }}>
          Your React &amp; Node.js foundation is your superpower. Add AI to become unstoppable.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>

        {/* ===== STATS BAR ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {/* XP */}
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>XP</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace" }}>{xp}</div>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>/ {TOTAL_TASKS * XP_PER_TASK}</div>
          </div>
          {/* Level */}
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Level</div>
            <div style={{ fontSize: 20 }}>{currentLevel.badge}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>{currentLevel.name}</div>
          </div>
          {/* Streak */}
          <div style={{ background: "#111318", border: streak >= 3 ? "1px solid rgba(249,115,22,0.3)" : "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Streak</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: streak > 0 ? "#f97316" : "#334155", fontFamily: "monospace", animation: streak >= 5 ? "streakPulse 2s infinite" : "none" }}>
              {streak > 0 ? streak : "\u2014"}
            </div>
            <div style={{ fontSize: 10, color: "#475569" }}>{streak === 1 ? "day" : "days"}</div>
          </div>
          {/* Journey Day */}
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Day</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#06b6d4", fontFamily: "monospace" }}>{dayNum || "\u2014"}</div>
            <div style={{ fontSize: 10, color: "#475569" }}>/ 60</div>
          </div>
        </div>

        {/* ===== DAILY QUOTE ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontSize: 13.5, fontStyle: "italic", color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>&mdash; {quote.author}</p>
        </div>

        {/* ===== NEXT UP ===== */}
        {nextTask && (
          <div
            onClick={() => {
              setOpenWeeks((p) => ({ ...p, [nextTask.week.week]: true }));
              setActivePhase(0);
            }}
            style={{
              background: `linear-gradient(135deg, ${nextTask.phase.color}08, ${nextTask.phase.color}04)`,
              border: `1px solid ${nextTask.phase.color}25`,
              borderRadius: 12, padding: "14px 18px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = nextTask.phase.color + "50")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = nextTask.phase.color + "25")}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: `${nextTask.phase.color}18`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, color: nextTask.phase.color,
            }}>
              &#x25B6;
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, color: nextTask.phase.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>
                Next Up &middot; Week {nextTask.week.week}
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {nextTask.task.text}
              </div>
            </div>
          </div>
        )}

        {/* ===== ALL DONE ===== */}
        {allDone && (
          <div style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))",
            border: "1px solid rgba(16,185,129,0.3)", borderRadius: 14, padding: "24px 20px",
            marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{"\ud83c\udf89"}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>Mission Complete!</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
              You&apos;ve completed all 67 tasks. You&apos;re now an AI Engineer with 3 shipped projects.
            </p>
          </div>
        )}

        {/* ===== LEVEL PROGRESS ===== */}
        {nextLevel && (
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
                {currentLevel.badge} {currentLevel.name}
              </span>
              <span style={{ fontSize: 11, color: "#64748b" }}>
                {nextLevel.badge} {nextLevel.name} &middot; {nextLevel.minXP - xp} XP to go
              </span>
            </div>
            <div style={{ height: 6, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.min(100, ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)}%`,
                background: "linear-gradient(90deg, #f59e0b, #06b6d4)",
                borderRadius: 99, transition: "width 0.5s ease",
              }} />
            </div>
            {estimatedFinish && (
              <div style={{ fontSize: 11, color: "#475569", marginTop: 8, textAlign: "right" }}>
                At this pace, you finish by <span style={{ color: "#94a3b8", fontWeight: 600 }}>{estimatedFinish}</span>
              </div>
            )}
          </div>
        )}

        {/* ===== OVERALL PROGRESS ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Overall Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? "#10b981" : "#f59e0b" }}>
              {completedCount}/{TOTAL_TASKS} tasks &middot; {pct}%
            </span>
          </div>
          <div style={{ height: 10, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: pct === 100 ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #f59e0b, #06b6d4, #ec4899)",
              borderRadius: 99, transition: "width 0.5s ease",
            }} />
          </div>

          {/* Phase mini-stats */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {ROADMAP.map((phase, i) => {
              const s = phaseStats(i);
              return (
                <div key={i} style={{
                  flex: 1, minWidth: 140,
                  background: s.pct === 100 ? `${phase.color}15` : "#0d1017",
                  border: `1px solid ${s.pct === 100 ? phase.color + "40" : "#1e2330"}`,
                  borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.2s",
                }} onClick={() => setActivePhase(activePhase === i + 1 ? 0 : i + 1)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: "uppercase", letterSpacing: 1 }}>
                      Phase {phase.phase}
                    </span>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{s.done}/{s.total}</span>
                  </div>
                  <div style={{ height: 4, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: phase.color, borderRadius: 99, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== YOUR FOUNDATION ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 20px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
            Your Foundation &mdash; Skills You Already Have
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FOUNDATION_SKILLS.map((skill) => (
              <span key={skill} style={{
                padding: "4px 11px", background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)", borderRadius: 7,
                fontSize: 11.5, fontWeight: 600, color: "#10b981",
              }}>
                {skill}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#475569", marginTop: 10, lineHeight: 1.5 }}>
            Most AI learners start from zero. You already ship production apps &mdash; that&apos;s a massive head start.
          </p>
        </div>

        {/* ===== AI SKILLS UNLOCK ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#06b6d4", textTransform: "uppercase", letterSpacing: 1.2 }}>
              AI Skills &mdash; {unlockedSkills.length}/{allNewSkills.length} Unlocked
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allNewSkills.map((skill) => (
              <span key={skill.name} style={{
                padding: "4px 11px",
                background: skill.unlocked ? "rgba(6,182,212,0.1)" : "#0d1017",
                border: `1px solid ${skill.unlocked ? "rgba(6,182,212,0.3)" : "#1a1f2e"}`,
                borderRadius: 7, fontSize: 11.5, fontWeight: 600,
                color: skill.unlocked ? "#06b6d4" : "#2a3040",
                transition: "all 0.3s",
              }}>
                {!skill.unlocked && <span style={{ marginRight: 4, fontSize: 10 }}>W{skill.week}</span>}
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* ===== FILTER TABS ===== */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {[{ label: "All Phases", idx: 0 }, ...ROADMAP.map((p, i) => ({ label: `Phase ${p.phase}: ${p.title}`, idx: i + 1, color: p.color }))].map((tab) => (
            <button key={tab.idx} onClick={() => setActivePhase(tab.idx)} style={{
              padding: "7px 16px", borderRadius: 8,
              border: activePhase === tab.idx ? `1px solid ${tab.color || "#f59e0b"}` : "1px solid #1e2330",
              background: activePhase === tab.idx ? (tab.color || "#f59e0b") + "20" : "#111318",
              color: activePhase === tab.idx ? (tab.color || "#f59e0b") : "#64748b",
              fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            }}>
              {tab.label}
            </button>
          ))}
          <button onClick={resetAll} style={{
            marginLeft: "auto", padding: "7px 14px", borderRadius: 8,
            border: "1px solid #dc262620", background: "#dc262610",
            color: "#f87171", fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>
            Reset All
          </button>
        </div>

        {/* ===== WEEKS ===== */}
        {filtered.map((phase) =>
          phase.weeks.map((week) => {
            const ws = weekStats(week);
            const isOpen = openWeeks[week.week];
            const weekDone = ws.done === ws.total && ws.total > 0;
            const isNextWeek = nextTask && nextTask.week.week === week.week;
            return (
              <div key={week.week} style={{
                background: "#111318",
                border: `1px solid ${weekDone ? phase.color + "30" : isNextWeek ? phase.color + "18" : "#1e2330"}`,
                borderRadius: 14, marginBottom: 12, overflow: "hidden",
                transition: "border-color 0.3s",
              }}>
                {/* Week header */}
                <div
                  onClick={() => setOpenWeeks((p) => ({ ...p, [week.week]: !p[week.week] }))}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 18px", cursor: "pointer", userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 9,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, fontFamily: "monospace",
                      background: weekDone ? phase.color + "30" : phase.color + "15",
                      color: phase.color, flexShrink: 0, position: "relative",
                      animation: weekDone ? "none" : isNextWeek ? "glow 2s infinite" : "none",
                    }}>
                      {weekDone ? "\u2713" : `W${week.week}`}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>
                        {week.title}
                        {isNextWeek && !weekDone && (
                          <span style={{ marginLeft: 8, fontSize: 10, color: phase.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>
                        {week.days} &middot; ~{week.hours} hrs &middot; {ws.done}/{ws.total} done
                        {weekDone && WEEK_SKILLS[week.week] && (
                          <span style={{ color: "#06b6d4", marginLeft: 6 }}>
                            +{WEEK_SKILLS[week.week].length} skills
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="11" fill="none" stroke="#1a1f2e" strokeWidth="2.5" />
                      <circle cx="14" cy="14" r="11" fill="none" stroke={phase.color} strokeWidth="2.5" strokeLinecap="round"
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
                  <div style={{ borderTop: "1px solid #1e2330", padding: "8px 18px 14px" }}>
                    {/* Skills to unlock hint */}
                    {!weekDone && WEEK_SKILLS[week.week] && (
                      <div style={{ padding: "8px 12px", marginBottom: 6, background: "#0d1017", borderRadius: 8, fontSize: 11, color: "#475569" }}>
                        Complete to unlock: {WEEK_SKILLS[week.week].map((s, i) => (
                          <span key={s} style={{ color: "#64748b", fontWeight: 600 }}>
                            {s}{i < WEEK_SKILLS[week.week].length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    {week.tasks.map((task) => {
                      const isDone = !!checked[task.id];
                      const isNext = nextTask && nextTask.task.id === task.id;
                      return (
                        <label key={task.id} style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          padding: "10px 4px", borderRadius: 8, cursor: "pointer",
                          transition: "background 0.15s",
                          background: isNext ? "#ffffff04" : "transparent",
                        }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff06")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = isNext ? "#ffffff04" : "transparent")}
                        >
                          <div
                            onClick={(e) => { e.preventDefault(); toggle(task.id); }}
                            style={{
                              width: 22, height: 22, borderRadius: 6,
                              border: isDone ? `2px solid ${phase.color}` : "2px solid #2a3040",
                              background: isDone ? phase.color + "25" : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0, marginTop: 1, transition: "all 0.2s", cursor: "pointer",
                            }}
                          >
                            {isDone && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6.5L4.5 9L10 3" stroke={phase.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 }}>
                            <span style={{
                              fontSize: 13.5, lineHeight: 1.5,
                              color: isDone ? "#475569" : "#cbd5e1",
                              textDecoration: isDone ? "line-through" : "none",
                              transition: "all 0.2s",
                            }}>
                              {task.text}
                            </span>
                            {isDone && (
                              <span style={{ fontSize: 10, color: "#475569", fontFamily: "monospace", flexShrink: 0 }}>
                                +{XP_PER_TASK}xp
                              </span>
                            )}
                          </div>
                        </label>
                      );
                    })}

                    {/* Week complete badge */}
                    {weekDone && (
                      <div style={{
                        marginTop: 8, padding: "10px 14px", background: `${phase.color}08`,
                        border: `1px solid ${phase.color}20`, borderRadius: 10,
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        <span style={{ fontSize: 16 }}>{"\u2728"}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: phase.color }}>
                            Week {week.week} Mastered &middot; +{(WEEK_SKILLS[week.week] || []).length * XP_PER_TASK} XP earned
                          </div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                            Unlocked: {(WEEK_SKILLS[week.week] || []).join(", ")}
                          </div>
                        </div>
                      </div>
                    )}
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
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{FOUNDATION_SKILLS.length}</div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>Foundation skills</div>
            </div>
            <div style={{ width: 1, background: "#1e2330" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#06b6d4" }}>{allNewSkills.length}</div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>AI skills to learn</div>
            </div>
            <div style={{ width: 1, background: "#1e2330" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#ec4899" }}>3</div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>Projects to ship</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
