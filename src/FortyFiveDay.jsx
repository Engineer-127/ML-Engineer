import { useState, useCallback, useEffect } from "react";

// ===========================
// ROADMAP DATA — 45-Day Plan
// ===========================
const ROADMAP = [
  {
    phase: 1,
    title: "Python + AI Foundations",
    color: "#f59e0b",
    weeks: [
      {
        week: 1,
        title: "Python Crash Course + FastAPI",
        days: "Day 1–7",
        hours: 8,
        tasks: [
          { id: "1-1-1", text: "Setup Python 3.12+, uv/venv, VS Code. Translate your JS mental model: let/const → variables, arrow fn → def, async/await is identical. Write 10 Python functions." },
          { id: "1-1-2", text: "Python data structures: list comprehensions, dict methods, OOP basics (same as JS classes). File I/O, error handling with try/except. Rewrite a Node.js utility in Python." },
          { id: "1-1-3", text: "FastAPI: routes, path params, request body with Pydantic. Think Express.js with auto-docs at /docs. Build 3 GET + 2 POST endpoints." },
          { id: "1-1-4", text: "Async Python + CRUD REST API: async def, await, add validation + error responses. Explore auto-generated Swagger docs — this is your Python API foundation." },
          { id: "1-1-5", text: "Mini project: Text Processing API — 3 endpoints (word count, text cleaner, JSON transform). Test every endpoint with curl or Postman. Ship it." },
        ],
      },
      {
        week: 2,
        title: "LLM APIs + Embeddings + ChromaDB",
        days: "Day 8–14",
        hours: 8,
        tasks: [
          { id: "1-2-1", text: "OpenAI API: first LLM call from Python. Change temperature (0→1), add system prompts, enable streaming. See how system prompt shapes every response." },
          { id: "1-2-2", text: "Anthropic Claude API: same task, different syntax. Compare Claude vs GPT-4o on the same prompt. Try prompt caching on a long system prompt — notice the latency drop." },
          { id: "1-2-3", text: "Prompt engineering: zero-shot, few-shot, chain-of-thought, JSON mode. Extract structured data from unstructured text. Build a FastAPI endpoint that returns AI-formatted JSON." },
          { id: "1-2-4", text: "Embeddings: call text-embedding-3-small. Embed 'dog', 'puppy', 'finance'. Calculate cosine similarity — see dog≈puppy (0.93) vs dog≈finance (0.6). This is the core intuition for all RAG." },
          { id: "1-2-5", text: "ChromaDB: setup locally, create a collection, add 20 docs + embeddings, run a semantic query. See that semantically similar docs come back. Your first vector database." },
          { id: "1-2-6", text: "Week 2 capstone: Smart FAQ API — embed 30 Q&A pairs, store in ChromaDB, query via FastAPI endpoint. First real semantic search app. Deploy it locally and test 5 different queries." },
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Build Core AI Skills",
    color: "#06b6d4",
    weeks: [
      {
        week: 3,
        title: "RAG Pipeline + LangChain + Streaming",
        days: "Day 15–21",
        hours: 9,
        tasks: [
          { id: "2-3-1", text: "RAG theory: draw the full pipeline on paper — ingestion (load→chunk→embed→store) and query (embed→retrieve→generate). Understand why chunk size makes or breaks RAG quality." },
          { id: "2-3-2", text: "Build RAG from scratch in Python: PDF → RecursiveCharacterTextSplitter (500 chars, 50 overlap) → OpenAI embeddings → ChromaDB → top-3 retrieval → GPT-4o-mini generates answer from context only." },
          { id: "2-3-3", text: "LangChain: rebuild the RAG in 10 lines using RetrievalQA. Learn chains, PromptTemplates, ConversationBufferMemory. Rebuild your Day 2 FAQ app using LangChain." },
          { id: "2-3-4", text: "Add streaming: chain.astream() + FastAPI StreamingResponse + SSE. User sees tokens appear instantly instead of a 10-second wait. This is table stakes for any production AI app." },
          { id: "2-3-5", text: "Tune RAG quality: experiment with chunk sizes (200, 500, 1000), k=3 vs k=5. Test on 3 different PDFs. Learn to identify the 4 failure modes: retrieval fail, generation fail, context overload, chunk boundary split." },
          { id: "2-3-6", text: "Add source citations: return which document chunks answered the question alongside the answer. Multi-turn chat: add memory so users can ask follow-up questions. Production-grade RAG." },
        ],
      },
      {
        week: 4,
        title: "🚀 Project #1 — AI Document Assistant",
        days: "Day 22–28",
        hours: 10,
        tasks: [
          { id: "2-4-1", text: "Plan the architecture: FastAPI backend (upload + RAG + streaming) + React frontend (drag-drop + chat UI). Draw the system diagram — this is your interview whiteboard answer." },
          { id: "2-4-2", text: "Backend Day 1: file upload endpoint, PDF text extraction (pypdf), chunking pipeline, ChromaDB storage with metadata (filename, page number, upload timestamp)." },
          { id: "2-4-3", text: "Backend Day 2: RAG query endpoint with streaming via SSE. Return top source chunks alongside the answer. Error handling: empty PDF, unsupported file type, no relevant chunks found." },
          { id: "2-4-4", text: "Frontend Day 1: React chat UI with message bubbles, streaming token display (append chunks as they arrive — ChatGPT effect). Typing indicator while waiting." },
          { id: "2-4-5", text: "Frontend Day 2: drag-and-drop file upload, loading states, source citation display below each answer, mobile-responsive layout using your React expertise." },
          { id: "2-4-6", text: "Deploy: backend on Railway, frontend on Vercel. Write README with architecture diagram + tech stack badges + demo GIF (screen recording → GIF via ezgif.com)." },
          { id: "2-4-7", text: "Record a 2-min Loom demo: upload a PDF → ask 3 questions → show streaming + source citations. This is your #1 portfolio piece. Share on LinkedIn." },
        ],
      },
      {
        week: 5,
        title: "Agents + LangGraph + Advanced RAG",
        days: "Day 29–35",
        hours: 9,
        tasks: [
          { id: "2-5-1", text: "Function/tool calling: define tools in OpenAI + Anthropic API format. Build a 2-tool agent (calculator + weather mock). Core insight: LLM reasons and decides which tool; your code executes it." },
          { id: "2-5-2", text: "ReAct pattern: Thought→Action→Observation loop. Build an agent with 3 tools: search_docs (your RAG), calculate, get_current_date. Watch the multi-step reasoning in logs." },
          { id: "2-5-3", text: "LangGraph fundamentals: State (shared dict), Nodes (functions), Edges (connections), conditional routing, END. Build a 3-node graph: input→decide→tool_or_answer." },
          { id: "2-5-4", text: "LangGraph production agent: planner→executor→reviewer graph. Add human-in-the-loop (interrupt_before) before any irreversible action (send email, delete record). Safety first." },
          { id: "2-5-5", text: "Advanced RAG: re-ranking with Cohere rerank (retrieve 20, re-rank to top 5). HyDE (generate hypothetical answer, embed it, use for retrieval). Understand when each technique applies." },
          { id: "2-5-6", text: "Pinecone: replace ChromaDB with Pinecone index. Add namespaces for multi-tenancy (User A cannot see User B's docs). Use metadata filters. Production-grade vector DB." },
          { id: "2-5-7", text: "Hybrid search: dense (semantic) + sparse (BM25) combined. Use when technical docs have exact terms the dense model doesn't understand. Upgrade Project #1's RAG to Pinecone + re-ranking." },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Ship & Get Hired",
    color: "#ec4899",
    weeks: [
      {
        week: 6,
        title: "🚀 Project #2 — Multi-Agent Support Bot",
        days: "Day 36–42",
        hours: 10,
        tasks: [
          { id: "3-6-1", text: "Design the multi-agent graph: Router→FAQ Agent / Order Agent / Escalation Agent. Each agent has own tools + context. Draw the architecture diagram — this is what interviewers whiteboard." },
          { id: "3-6-2", text: "Build the router agent: classifies user intent (FAQ / order issue / needs escalation) using LLM with structured JSON output. Confident routing = better UX." },
          { id: "3-6-3", text: "Build FAQ agent: uses RAG on a product knowledge base (30+ Q&A docs in Pinecone). Returns answers with source citations. Falls back to escalation if confidence is low." },
          { id: "3-6-4", text: "Build Order agent: mock order lookup tool, order status tool, refund initiation with human-in-the-loop approval before processing. Shows you understand safety." },
          { id: "3-6-5", text: "Build Escalation agent: generates a support ticket, sends a real Slack webhook notification, logs the full conversation to a DB table." },
          { id: "3-6-6", text: "Add LangSmith tracing: instrument every node in the multi-agent graph. Observe full traces, agent decisions, tool call logs. This is production observability." },
          { id: "3-6-7", text: "Deploy on Railway + Vercel. Record 2-min demo video showing all 3 agent paths. Write README with multi-agent architecture diagram. Your most impressive portfolio piece." },
        ],
      },
      {
        week: 7,
        title: "Portfolio Sprint + Job Hunt Launch",
        days: "Day 43–45",
        hours: 6,
        tasks: [
          { id: "3-7-1", text: "Both project READMEs: architecture diagrams (Excalidraw), demo GIFs (screen recording → GIF), setup instructions, tech stack badges. Pin both projects on GitHub profile." },
          { id: "3-7-2", text: "LinkedIn update: headline → 'AI Application Engineer | FastAPI + LangGraph + RAG'. Post a demo video for each project. Your posts will get recruiter DMs." },
          { id: "3-7-3", text: "Resume update: lead with both AI projects, add Gen AI skills section (Python, FastAPI, RAG, LangGraph, Pinecone, LangSmith). Your React/JS stays as your full-stack foundation." },
          { id: "3-7-4", text: "Interview drill: open the Senior Interview Q&A tab. Answer all 50 questions out loud. Record yourself on 10 key ones. Each answer under 90 seconds. Identify weak spots, review those days." },
          { id: "3-7-5", text: "Start applying: AI startups, YC companies (ycombinator.com/jobs), remote roles on LinkedIn. Personalize each application with a link to your shipped projects." },
          { id: "3-7-6", text: "Write a technical blog post: 'How I Built a Multi-Agent AI Support Bot in 45 Days'. Publish on Hashnode or dev.to. This becomes your 3rd portfolio piece and generates inbound recruiter leads." },
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
  { name: "Starter",     minXP: 0,                      badge: "🌱" },
  { name: "Explorer",    minXP: 75,                     badge: "🔍" },
  { name: "Learner",     minXP: 165,                    badge: "📚" },
  { name: "Builder",     minXP: 285,                    badge: "🔨" },
  { name: "Shipped It",  minXP: 420,                    badge: "🚀" },
  { name: "Specialist",  minXP: 525,                    badge: "🏯" },
  { name: "AI Engineer", minXP: TOTAL_TASKS * XP_PER_TASK, badge: "🤖" },
];

const FOUNDATION_SKILLS = [
  "React.js", "Node.js", "Express.js", "JavaScript", "TypeScript",
  "Redux", "REST APIs", "Git", "MongoDB", "MySQL",
];

const WEEK_SKILLS = {
  1: ["Python 3.12+", "FastAPI", "Pydantic", "Async Python"],
  2: ["LLM APIs", "Prompt Engineering", "Embeddings", "ChromaDB"],
  3: ["RAG", "LangChain", "Text Chunking", "SSE Streaming"],
  4: ["AI Product Design", "Streaming UIs", "PDF Processing", "Railway/Vercel Deploy"],
  5: ["Function Calling", "AI Agents", "LangGraph", "Pinecone", "Re-ranking", "Hybrid Search"],
  6: ["Multi-Agent Systems", "LangSmith", "Agent Workflows", "State Machines"],
  7: ["Portfolio Strategy", "Technical Writing", "AI System Design"],
};

const WEEK_RESOURCES = {
  1: [
    { label: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
    { label: "Corey Schafer — Python Basics Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" },
    { label: "Tech With Tim — FastAPI Tutorial", url: "https://www.youtube.com/watch?v=cbASjoZZGIw" },
    { label: "Krish Naik — Python for AI (Hindi)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB" },
    { label: "uv Package Manager Docs", url: "https://docs.astral.sh/uv/" },
  ],
  2: [
    { label: "OpenAI API Docs", url: "https://platform.openai.com/docs" },
    { label: "Anthropic Claude Docs", url: "https://docs.anthropic.com" },
    { label: "ChromaDB Docs", url: "https://docs.trychroma.com/" },
    { label: "DeepLearning.AI — Prompt Engineering for Devs", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
    { label: "James Briggs — RAG from Scratch", url: "https://www.youtube.com/watch?v=sVcwVQRHIc8" },
  ],
  3: [
    { label: "LangChain Docs — Tutorials", url: "https://python.langchain.com/docs/tutorials/" },
    { label: "DeepLearning.AI — LangChain for LLM Apps", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/" },
    { label: "DeepLearning.AI — Building & Evaluating Advanced RAG", url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/" },
    { label: "CampusX — RAG Tutorial (Hindi)", url: "https://www.youtube.com/watch?v=wBhY-7B2jdY" },
    { label: "Sam Witteveen — Build a RAG App", url: "https://www.youtube.com/watch?v=tcqEUSNCn8I" },
  ],
  4: [
    { label: "FastAPI — File Upload Docs", url: "https://fastapi.tiangolo.com/tutorial/request-files/" },
    { label: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs" },
    { label: "Railway Deployment Guide", url: "https://docs.railway.app/" },
    { label: "Dave Ebbelaar — Full Stack AI App", url: "https://www.youtube.com/watch?v=kXdbKKpOaas" },
  ],
  5: [
    { label: "OpenAI — Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
    { label: "LangGraph Official Docs", url: "https://langchain-ai.github.io/langgraph/" },
    { label: "LangChain Academy — LangGraph Course (Free)", url: "https://academy.langchain.com/" },
    { label: "Pinecone Docs & Learning Center", url: "https://docs.pinecone.io/" },
    { label: "DeepLearning.AI — AI Agents in LangGraph", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" },
    { label: "Krish Naik — Advanced RAG Techniques", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M" },
  ],
  6: [
    { label: "LangGraph — Multi-Agent Tutorial", url: "https://langchain-ai.github.io/langgraph/tutorials/multi_agent/" },
    { label: "LangSmith Docs — LLM Observability", url: "https://docs.smith.langchain.com/" },
    { label: "Dave Ebbelaar — Multi-Agent AI System", url: "https://www.youtube.com/watch?v=a3MJKgOvZHo" },
    { label: "DeepLearning.AI — Multi AI Agent Systems with CrewAI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/" },
  ],
  7: [
    { label: "Awesome GitHub Profile READMEs", url: "https://github.com/abhisheknaiidu/awesome-github-profile-readme" },
    { label: "AI Engineer Job Board", url: "https://aijobs.net/" },
    { label: "YC Jobs — AI Startups", url: "https://www.ycombinator.com/jobs" },
    { label: "Hashnode — Start a Dev Blog (Free)", url: "https://hashnode.com/" },
    { label: "DeepLearning.AI — How to Build Your Career in AI (Free)", url: "https://www.deeplearning.ai/resources/how-to-build-a-career-in-ai/" },
  ],
};

// ===========================
// CAREER LADDER
// ===========================
const WEEK_SALARY = {
  1: { range: "9–12 LPA",    role: "Full-Stack Developer (Python + React)",   note: "FastAPI + React is a rare combo. You can already bill as a mid-level full-stack dev." },
  2: { range: "14–18 LPA",   role: "GenAI Developer (Junior)",                note: "LLM APIs + Embeddings unlocked. You can build basic AI features into any product." },
  3: { range: "16–22 LPA",   role: "RAG / LangChain Engineer",                note: "Full RAG pipeline mastery — the most in-demand skill at Indian AI startups right now." },
  4: { range: "22–30 LPA",   role: "AI Application Engineer",                 note: "One shipped production AI app = interviews start rolling in. This is the momentum week." },
  5: { range: "28–40 LPA",   role: "Senior AI Engineer",                      note: "Agents + LangGraph + Advanced RAG puts you in the top 5% of AI builders in India." },
  6: { range: "35–55 LPA",   role: "Staff / Lead AI Engineer",                note: "Multi-agent system deployed = FAANG / top-tier AI startup territory. You can lead AI teams." },
  7: { range: "50 LPA – 1Cr+ • $100K–$180K remote", role: "AI Engineer @ Top Product Cos / YC Startups / Global Remote", note: "DESTINATION — 2 shipped AI products + portfolio + active job hunt = world-class offers.", isDestination: true },
};

const QUOTES = [
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "The greatest sin is to think yourself weak.", author: "Swami Vivekananda" },
  { text: "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.", author: "Swami Vivekananda" },
  { text: "Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea.", author: "Swami Vivekananda" },
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "A.P.J. Abdul Kalam" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A.P.J. Abdul Kalam" },
  { text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "A.P.J. Abdul Kalam" },
  { text: "You have the right to perform your actions, but you are not entitled to the fruits of the actions.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "Set your heart upon your work, but never on its reward. Work with focus, not anxiety.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "Reshape yourself through the power of your will. Do not let yourself be degraded by self-doubt.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "When you don't know how powerful you are, sometimes you need someone to remind you of your own strength.", author: "Hanuman — Ramayana" },
  { text: "There is no obstacle that cannot be overcome with devotion, courage, and relentless action.", author: "Hanuman — Ramayana" },
  { text: "Mountains, oceans, demons — nothing can stop the one who moves with purpose and faith.", author: "Hanuman — Ramayana" },
  { text: "The bridge to Lanka was built one stone at a time. Great achievements are built one task at a time.", author: "Valmiki — Ramayana" },
  { text: "A warrior does not give up what he has set out to do, no matter how difficult it becomes.", author: "Lord Rama — Ramayana" },
  { text: "Once you start working on something, don't be afraid of failure and don't abandon it.", author: "Chanakya" },
  { text: "Education is the best friend. An educated person is respected everywhere.", author: "Chanakya" },
  { text: "Learning is the true imperishable wealth. All other things are not wealth.", author: "Thiruvalluvar — Thirukkural" },
  { text: "Perseverance will accomplish all things. Perseverance alone conquers all difficulties.", author: "Thiruvalluvar — Thirukkural" },
  { text: "A man with no formal training rewrote mathematics. Your background does not define your potential.", author: "Srinivasa Ramanujan's Legacy" },
  { text: "I have not trodden through the conventional regular course. But I have struck out a new path for myself.", author: "Srinivasa Ramanujan" },
  { text: "There is no large and difficult task that can't be divided into little easy tasks.", author: "Homi J. Bhabha" },
  { text: "ISRO reached Mars in its first attempt, spending less than the budget of a Hollywood movie. Frugality and brilliance are in your blood.", author: "Indian Science Legacy" },
  { text: "A 24-year-old shook the British Empire from the forests of Andhra. Age is never an excuse.", author: "Alluri Sitarama Raju's Legacy" },
  { text: "Even if there are obstacles, even if there are problems, you should never stop. Pursue your goal with all your heart.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "When you are enthusiastic, the mountain also looks like a small stone.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "AI is the new electricity.", author: "Andrew Ng" },
  { text: "Move fast and build things.", author: "Sam Altman" },
  { text: "Shipping beats perfection.", author: "Reid Hoffman" },
  { text: "In the age of AI, the builder is king.", author: "Andrej Karpathy" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Compound interest applies to knowledge too.", author: "Warren Buffett" },
  { text: "The future belongs to those who learn more skills and combine them in creative ways.", author: "Robert Greene" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Work before you talk. Deliver before you promise. Perform before you preach.", author: "M. Visvesvaraya" },
  { text: "Nobody challenges me. I challenge myself.", author: "Shakuntala Devi" },
  { text: "Either I will come back after hoisting the tricolour, or I will come back wrapped in it. But I will come back for certain.", author: "Captain Vikram Batra" },
  { text: "I shall not surrender my Jhansi.", author: "Rani Lakshmibai" },
  { text: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it.", author: "Kalpana Chawla" },
];

// ===========================
// STORAGE
// ===========================
const STORAGE_KEY = "ai-roadmap-45day-v1";
const STREAK_KEY  = "ai-roadmap-45day-streak";
const START_KEY   = "ai-roadmap-45day-start";

// ===========================
// HELPERS
// ===========================
function getLevel(xp) {
  let level = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.minXP) level = l; }
  return level;
}
function getNextLevel(xp) {
  for (const l of LEVELS) { if (xp < l.minXP) return l; }
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
  } catch { return 0; }
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
  } catch { return 1; }
}
function getDayNumber() {
  try {
    const start = localStorage.getItem(START_KEY);
    if (!start) return 0;
    const diff = Date.now() - new Date(start).getTime();
    return Math.max(1, Math.ceil(diff / 86400000));
  } catch { return 0; }
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
  } catch { return null; }
}

// ===========================
// COMPONENT
// ===========================
export default function FortyFiveDay() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [openWeeks, setOpenWeeks] = useState({ 1: true });
  const [activePhase, setActivePhase] = useState(0);
  const [streak, setStreak] = useState(computeStreak);
  const [dayNum, setDayNum] = useState(getDayNumber);
  const [celebration, setCelebration] = useState(null);
  const quote = getDailyQuote();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideDown45{from{opacity:0;transform:translate(-50%,-20px)}to{opacity:1;transform:translate(-50%,0)}}
      @keyframes pulse45{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
      @keyframes shimmer45{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes streakPulse45{0%,100%{text-shadow:0 0 4px rgba(249,115,22,0.3)}50%{text-shadow:0 0 16px rgba(249,115,22,0.8)}}
      @keyframes confettiFall45{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(120px) rotate(720deg);opacity:0}}
      @keyframes fadeIn45{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const saveProgress = useCallback((newChecked) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked)); } catch {}
  }, []);

  const isWeekComplete = useCallback((weekNum, checkedState) => {
    for (const phase of ROADMAP) {
      for (const week of phase.weeks) {
        if (week.week === weekNum) {
          return week.tasks.every((t) => checkedState[t.id]);
        }
      }
    }
    return false;
  }, []);

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveProgress(next);
    if (!checked[id]) {
      recordStart();
      setDayNum(getDayNumber() || 1);
      const newStreak = recordActivity();
      setStreak(newStreak);
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
    const done = phase.weeks.reduce((s, w) => s + w.tasks.filter((t) => checked[t.id]).length, 0);
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
    for (let w = 1; w <= 7; w++) {
      if (isWeekComplete(w, checked) && WEEK_SKILLS[w]) unlocked.push(...WEEK_SKILLS[w]);
    }
    return unlocked;
  };

  const getAllNewSkills = () => {
    const all = [];
    for (let w = 1; w <= 7; w++) {
      if (WEEK_SKILLS[w]) {
        all.push(...WEEK_SKILLS[w].map((s) => ({ name: s, week: w, unlocked: isWeekComplete(w, checked) })));
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

  const filtered = activePhase === 0 ? ROADMAP : ROADMAP.filter((_, i) => i === activePhase - 1);
  const nextTask = getNextTask();
  const unlockedSkills = getUnlockedSkills();
  const allNewSkills = getAllNewSkills();
  const allDone = completedCount === TOTAL_TASKS;
  const confettiColors = ["#f59e0b", "#06b6d4", "#ec4899", "#10b981", "#8b5cf6", "#f97316"];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* CELEBRATION */}
      {celebration && (
        <>
          <div style={{
            position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
            background: WEEK_SALARY[celebration.week]?.isDestination
              ? "linear-gradient(135deg, #10b981, #06b6d4, #ec4899)"
              : "linear-gradient(135deg, #f59e0b, #06b6d4)",
            color: "#000", padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15,
            animation: "slideDown45 0.4s ease-out", textAlign: "center",
            boxShadow: "0 8px 40px rgba(245,158,11,0.4)", maxWidth: "92vw",
          }}>
            <div>{WEEK_SALARY[celebration.week]?.isDestination ? "🎯 DESTINATION REACHED!" : `Week ${celebration.week} Complete!`}</div>
            {WEEK_SALARY[celebration.week] && (
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, opacity: 0.85 }}>
                You can now crack {WEEK_SALARY[celebration.week].range} • {WEEK_SALARY[celebration.week].role}
              </div>
            )}
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 3, opacity: 0.7 }}>
              +{(WEEK_SKILLS[celebration.week] || []).length} skills unlocked
            </div>
          </div>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "50vh", pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{
                position: "absolute", top: -10, left: `${4 + (i / 24) * 92}%`,
                width: 6 + (i % 3) * 3, height: 6 + (i % 3) * 3,
                borderRadius: i % 2 === 0 ? "50%" : "2px",
                background: confettiColors[i % confettiColors.length],
                animation: `confettiFall45 ${1.5 + (i % 5) * 0.3}s ease-out ${i * 0.06}s forwards`,
              }} />
            ))}
          </div>
        </>
      )}

      {/* HEADER */}
      <div style={{ padding: "40px 20px 10px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 400, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#06b6d4", marginBottom: 14 }}>
          45-Day AI Roadmap
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 38px)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
          Full-Stack &rarr; <span style={{ color: "#06b6d4" }}>AI Engineer</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 480, margin: "8px auto 0", lineHeight: 1.6 }}>
          The fast track. 7 weeks, 2 shipped products, interview-ready. <br />
          Your React &amp; JS foundation is the unfair advantage — lean into it.
        </p>
        {dayNum > 0 && (
          <div style={{ marginTop: 10, fontSize: 12, color: "#475569" }}>
            Day <span style={{ color: "#06b6d4", fontWeight: 700 }}>{Math.min(dayNum, 45)}</span> of 45
            {estimatedFinish && <span> · Est. finish: <span style={{ color: "#94a3b8" }}>{estimatedFinish}</span></span>}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16, marginTop: 20 }}>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>XP</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#06b6d4", fontFamily: "monospace" }}>{xp}</div>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>/ {TOTAL_TASKS * XP_PER_TASK}</div>
          </div>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Level</div>
            <div style={{ fontSize: 20 }}>{currentLevel.badge}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>{currentLevel.name}</div>
          </div>
          <div style={{ background: "#111318", border: streak >= 3 ? "1px solid rgba(249,115,22,0.3)" : "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Streak</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: streak > 0 ? "#f97316" : "#334155", fontFamily: "monospace", animation: streak >= 5 ? "streakPulse45 2s infinite" : "none" }}>
              {streak > 0 ? streak : "—"}
            </div>
            <div style={{ fontSize: 10, color: "#475569" }}>{streak === 1 ? "day" : "days"}</div>
          </div>
        </div>

        {/* DAILY QUOTE */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontSize: 13.5, fontStyle: "italic", color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>&mdash; {quote.author}</p>
        </div>

        {/* OVERALL PROGRESS */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Overall Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{completedCount}/{TOTAL_TASKS} tasks · {pct}%</span>
          </div>
          <div style={{ height: 8, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #f59e0b, #06b6d4, #ec4899)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
          {nextLevel && (
            <div style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>
              Next level: <span style={{ color: "#94a3b8" }}>{nextLevel.badge} {nextLevel.name}</span> at {nextLevel.minXP} XP · {nextLevel.minXP - xp} XP to go
            </div>
          )}
        </div>

        {/* NEXT UP */}
        {nextTask && (
          <div
            onClick={() => { setOpenWeeks((p) => ({ ...p, [nextTask.week.week]: true })); setActivePhase(0); }}
            style={{
              background: `linear-gradient(135deg, ${nextTask.phase.color}08, ${nextTask.phase.color}04)`,
              border: `1px solid ${nextTask.phase.color}25`,
              borderRadius: 12, padding: "14px 18px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${nextTask.phase.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, color: nextTask.phase.color }}>
              ▶
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, color: nextTask.phase.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>
                Next Up · Week {nextTask.week.week} · {nextTask.week.days}
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {nextTask.task.text}
              </div>
            </div>
          </div>
        )}

        {/* ALL DONE */}
        {allDone && (
          <div style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.12), rgba(236,72,153,0.1))",
            border: "1px solid rgba(16,185,129,0.35)", borderRadius: 14, padding: "26px 20px",
            marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>Destination Reached!</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399", marginTop: 6 }}>{WEEK_SALARY[7].range}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{WEEK_SALARY[7].role}</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 10, maxWidth: 480, margin: "10px auto 0", lineHeight: 1.55 }}>
              {TOTAL_TASKS} tasks. 7 weeks. 2 shipped AI products. You are now an AI Engineer ready for world-class offers.
            </p>
          </div>
        )}

        {/* SKILLS SNAPSHOT */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
            Skills Snapshot
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {FOUNDATION_SKILLS.map((s) => (
              <span key={s} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", fontWeight: 600 }}>
                {s}
              </span>
            ))}
          </div>
          {allNewSkills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {allNewSkills.map((s) => (
                <span key={s.name} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 600, transition: "all 0.3s",
                  background: s.unlocked ? "rgba(6,182,212,0.12)" : "rgba(30,35,48,0.6)",
                  border: `1px solid ${s.unlocked ? "rgba(6,182,212,0.3)" : "#1e2330"}`,
                  color: s.unlocked ? "#06b6d4" : "#334155",
                  opacity: s.unlocked ? 1 : 0.5,
                }}>
                  {s.unlocked ? "" : "🔒 "}{s.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* PHASE FILTER */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {[{ label: "All Phases", color: "#06b6d4" }, ...ROADMAP.map((p) => ({ label: p.title, color: p.color }))].map((tab, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              style={{
                padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                background: activePhase === i ? tab.color + "18" : "#111318",
                border: `1px solid ${activePhase === i ? tab.color + "50" : "#1e2330"}`,
                color: activePhase === i ? tab.color : "#475569",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
              {i > 0 && (() => { const s = phaseStats(i - 1); return s.done > 0 ? ` ${s.done}/${s.total}` : ""; })()}
            </button>
          ))}
        </div>

        {/* PHASES + WEEKS */}
        {filtered.map((phase, pi) => (
          <div key={phase.phase} style={{ marginBottom: 28 }}>
            {/* Phase header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: `linear-gradient(135deg, ${phase.color}10, ${phase.color}05)`,
              border: `1px solid ${phase.color}25`, borderRadius: 12,
              padding: "14px 18px", marginBottom: 12,
            }}>
              <div>
                <div style={{ fontSize: 10, color: phase.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 3 }}>
                  Phase {phase.phase}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0" }}>{phase.title}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: phase.color, fontFamily: "monospace" }}>
                  {phaseStats(ROADMAP.indexOf(phase)).pct}%
                </div>
                <div style={{ fontSize: 10, color: "#475569" }}>
                  {phaseStats(ROADMAP.indexOf(phase)).done}/{phaseStats(ROADMAP.indexOf(phase)).total}
                </div>
              </div>
            </div>

            {/* Weeks */}
            {phase.weeks.map((week) => {
              const ws = weekStats(week);
              const isOpen = !!openWeeks[week.week];
              const weekComplete = ws.done === ws.total;
              const salary = WEEK_SALARY[week.week];

              return (
                <div key={week.week} style={{ marginBottom: 10 }}>
                  {/* Week header */}
                  <div
                    onClick={() => setOpenWeeks((p) => ({ ...p, [week.week]: !p[week.week] }))}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: weekComplete ? `${phase.color}0a` : "#111318",
                      border: `1px solid ${weekComplete ? phase.color + "35" : "#1e2330"}`,
                      borderRadius: isOpen ? "10px 10px 0 0" : 10,
                      padding: "13px 16px", cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {/* Completion ring */}
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      background: weekComplete ? phase.color : "#1a1f2e",
                      border: `2px solid ${weekComplete ? phase.color : "#2d3447"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 800, color: weekComplete ? "#000" : "#334155",
                      transition: "all 0.3s",
                    }}>
                      {weekComplete ? "✓" : week.week}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: weekComplete ? phase.color : "#e2e8f0" }}>
                          {week.title}
                        </span>
                        {weekComplete && salary?.isDestination && (
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(16,185,129,0.15)", color: "#10b981", fontWeight: 700, border: "1px solid rgba(16,185,129,0.3)" }}>
                            🎯 DESTINATION
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
                        {week.days} · {week.hours}h · {ws.done}/{ws.total} tasks
                      </div>
                    </div>

                    {/* Progress mini-bar */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                      <div style={{ width: 60, height: 4, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(ws.done / ws.total) * 100}%`, background: phase.color, borderRadius: 99, transition: "width 0.3s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: "#475569", transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                  </div>

                  {/* Week body */}
                  {isOpen && (
                    <div style={{
                      border: `1px solid ${weekComplete ? phase.color + "25" : "#1e2330"}`,
                      borderTop: "none", borderRadius: "0 0 10px 10px",
                      background: "#0d1017", padding: "0 0 4px",
                      animation: "fadeIn45 0.15s ease-out",
                    }}>
                      {/* Salary tier */}
                      {salary && (
                        <div style={{
                          margin: "12px 14px 8px",
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: weekComplete
                            ? `linear-gradient(135deg, ${phase.color}12, ${phase.color}06)`
                            : "rgba(16,185,129,0.04)",
                          border: `1px solid ${weekComplete ? phase.color + "30" : "rgba(16,185,129,0.12)"}`,
                        }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: weekComplete ? phase.color : "#10b981" }}>
                              {salary.range}
                            </span>
                            <span style={{ fontSize: 11, color: weekComplete ? phase.color + "cc" : "#475569", fontWeight: 700 }}>
                              {salary.role}
                            </span>
                          </div>
                          <div style={{ fontSize: 11, color: "#475569", marginTop: 3, lineHeight: 1.5 }}>{salary.note}</div>
                        </div>
                      )}

                      {/* Tasks */}
                      <div style={{ padding: "0 14px" }}>
                        {week.tasks.map((task) => (
                          <label
                            key={task.id}
                            style={{
                              display: "flex", alignItems: "flex-start", gap: 10,
                              padding: "9px 0", cursor: "pointer",
                              borderBottom: "1px solid #111318",
                            }}
                          >
                            <div
                              onClick={() => toggle(task.id)}
                              style={{
                                width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                                background: checked[task.id] ? phase.color : "transparent",
                                border: `2px solid ${checked[task.id] ? phase.color : "#2d3447"}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", transition: "all 0.2s",
                              }}
                            >
                              {checked[task.id] && <span style={{ color: "#000", fontSize: 11, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                            </div>
                            <span
                              onClick={() => toggle(task.id)}
                              style={{
                                fontSize: 13, lineHeight: 1.55, color: checked[task.id] ? "#334155" : "#94a3b8",
                                textDecoration: checked[task.id] ? "line-through" : "none",
                                transition: "all 0.2s",
                              }}
                            >
                              {task.text}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Resources */}
                      {WEEK_RESOURCES[week.week] && (
                        <div style={{ margin: "8px 14px 10px" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>
                            Resources
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {WEEK_RESOURCES[week.week].map((r) => (
                              <a
                                key={r.label}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: 11, padding: "4px 10px", borderRadius: 6,
                                  background: "#111318", border: "1px solid #1e2330",
                                  color: "#64748b", textDecoration: "none", fontWeight: 500,
                                  transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = phase.color; e.currentTarget.style.borderColor = phase.color + "40"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "#1e2330"; }}
                              >
                                ↗ {r.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills unlocked */}
                      {WEEK_SKILLS[week.week] && (
                        <div style={{ margin: "0 14px 10px" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>
                            Skills Unlocked on Completion
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {WEEK_SKILLS[week.week].map((s) => (
                              <span key={s} style={{
                                fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 600,
                                background: weekComplete ? `${phase.color}15` : "rgba(30,35,48,0.6)",
                                border: `1px solid ${weekComplete ? phase.color + "30" : "#1e2330"}`,
                                color: weekComplete ? phase.color : "#334155",
                              }}>
                                {weekComplete ? "" : "🔒 "}{s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* RESET */}
        <div style={{ textAlign: "center", paddingBottom: 160 }}>
          <button
            onClick={resetAll}
            style={{
              padding: "8px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: "transparent", border: "1px solid #1e2330", color: "#334155",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef444440"; e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e2330"; e.currentTarget.style.color = "#334155"; }}
          >
            Reset Progress
          </button>
        </div>

      </div>
    </div>
  );
}
