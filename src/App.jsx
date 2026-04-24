import { useState, useCallback, useEffect } from "react";

// ===========================
// ROADMAP DATA — 90-Day Plan
// ===========================
const ROADMAP = [
  {
    phase: 1,
    title: "Python + AI Foundations",
    color: "#f59e0b",
    weeks: [
      {
        week: 1,
        title: "Python Basics for JS Devs",
        days: "Day 1–7",
        hours: 7,
        tasks: [
          { id: "1-1-1", text: "Setup Python 3.12+, VS Code Python ext, uv package manager" },
          { id: "1-1-2", text: "Variables, types, f-strings, lists, dicts, tuples, sets" },
          { id: "1-1-3", text: "Conditionals, loops, list comprehensions" },
          { id: "1-1-4", text: "Functions, *args, **kwargs, imports, pip, virtual envs" },
        ],
      },
      {
        week: 2,
        title: "Python Deep Dive + Practice",
        days: "Day 8–14",
        hours: 7,
        tasks: [
          { id: "1-2-1", text: "File I/O — read/write JSON, CSV files" },
          { id: "1-2-2", text: "Error handling: try/except (same as JS try/catch)" },
          { id: "1-2-3", text: "Classes & OOP basics in Python (similar to JS classes)" },
          { id: "1-2-4", text: "Mini project: Rewrite a Node.js utility in Python" },
        ],
      },
      {
        week: 3,
        title: "FastAPI + Async Python",
        days: "Day 15–21",
        hours: 7,
        tasks: [
          { id: "1-3-1", text: "FastAPI basics: routes, path params, request body, Pydantic" },
          { id: "1-3-2", text: "Async/await in Python (you already know this from JS)" },
          { id: "1-3-3", text: "Build a CRUD REST API with FastAPI" },
          { id: "1-3-4", text: "Add validation, error responses, and explore auto-generated docs" },
        ],
      },
      {
        week: 4,
        title: "LLM APIs + Prompt Engineering",
        days: "Day 22–28",
        hours: 7,
        tasks: [
          { id: "1-4-1", text: "Get OpenAI + Anthropic API keys, make first LLM call" },
          { id: "1-4-2", text: "Understand: system prompts, temperature, streaming, tokens" },
          { id: "1-4-3", text: "Prompt engineering: few-shot, chain-of-thought, JSON mode" },
          { id: "1-4-4", text: "Build: FastAPI endpoint that returns AI-generated content" },
        ],
      },
      {
        week: 5,
        title: "Embeddings + ChromaDB",
        days: "Day 29–35",
        hours: 8,
        tasks: [
          { id: "1-5-1", text: "Understand embeddings: text → vectors → similarity search" },
          { id: "1-5-2", text: "OpenAI Embeddings API: text-embedding-3-small" },
          { id: "1-5-3", text: "Setup ChromaDB locally, store & query embeddings" },
          { id: "1-5-4", text: "Document loading: PDFs, text files with LangChain loaders" },
          { id: "1-5-5", text: "Text chunking strategies & why chunk size matters" },
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
        week: 6,
        title: "RAG Pipeline + LangChain",
        days: "Day 36–42",
        hours: 8,
        tasks: [
          { id: "2-6-1", text: "Build full RAG pipeline: upload → chunk → embed → retrieve → answer" },
          { id: "2-6-2", text: "LangChain core: chains, prompts, output parsers, memory" },
          { id: "2-6-3", text: "Build: Chat with PDF app using LangChain + ChromaDB" },
          { id: "2-6-4", text: "Test & iterate: improve retrieval quality with different chunk sizes" },
        ],
      },
      {
        week: 7,
        title: "\ud83d\ude80 Project #1 — AI Document Assistant",
        days: "Day 43–49",
        hours: 10,
        tasks: [
          { id: "2-7-1", text: "FastAPI backend: file upload + RAG query + streaming endpoint" },
          { id: "2-7-2", text: "Document processing pipeline: upload → chunk → embed → store" },
          { id: "2-7-3", text: "React frontend: chat UI with file upload drag-and-drop" },
          { id: "2-7-4", text: "Streaming response display (ChatGPT-like typing effect)" },
          { id: "2-7-5", text: "Source citations — show which chunk answered the query" },
          { id: "2-7-6", text: "Add JWT auth, error handling, loading states" },
          { id: "2-7-7", text: "Deploy: backend on AWS/Railway, frontend on Vercel" },
          { id: "2-7-8", text: "Write README with architecture diagram + screenshots + demo link" },
        ],
      },
      {
        week: 8,
        title: "AI Agents + Function Calling",
        days: "Day 50–56",
        hours: 8,
        tasks: [
          { id: "2-8-1", text: "OpenAI function calling — let LLMs call your APIs" },
          { id: "2-8-2", text: "Anthropic tool use — same concept, different syntax" },
          { id: "2-8-3", text: "Build an agent: web search + database query + email tool" },
          { id: "2-8-4", text: "ReAct pattern: Reason → Act → Observe → Repeat" },
        ],
      },
      {
        week: 9,
        title: "LangGraph + Agent Workflows",
        days: "Day 57–63",
        hours: 8,
        tasks: [
          { id: "2-9-1", text: "LangGraph fundamentals: graphs, nodes, edges, state" },
          { id: "2-9-2", text: "Build agent graph: planner → executor → reviewer" },
          { id: "2-9-3", text: "Conditional edges + human-in-the-loop patterns" },
          { id: "2-9-4", text: "Practice: Build a multi-step research agent" },
        ],
      },
      {
        week: 10,
        title: "Advanced RAG + Vector DBs + MCP",
        days: "Day 64–70",
        hours: 8,
        tasks: [
          { id: "2-10-1", text: "Move to Pinecone (production vector DB): indexing, namespaces, metadata" },
          { id: "2-10-2", text: "Hybrid search: semantic + keyword (BM25)" },
          { id: "2-10-3", text: "Re-ranking retrieved results for better accuracy" },
          { id: "2-10-4", text: "Learn MCP: the standard for connecting LLMs to external tools" },
          { id: "2-10-5", text: "Build an MCP server in Python exposing custom tools" },
          { id: "2-10-6", text: "Connect AI to real services: Slack, Gmail, databases" },
          { id: "2-10-7", text: "SSE streaming + WebSocket for real-time AI responses" },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Ship Projects & Get Hired",
    color: "#ec4899",
    weeks: [
      {
        week: 11,
        title: "\ud83d\ude80 Project #2 — Multi-Agent Support Bot",
        days: "Day 71–77",
        hours: 10,
        tasks: [
          { id: "3-11-1", text: "Design multi-agent graph: router → FAQ / order / escalation agents" },
          { id: "3-11-2", text: "Each agent with own tools: RAG search, DB query, notifications" },
          { id: "3-11-3", text: "Implement with LangGraph: cross-agent state management" },
          { id: "3-11-4", text: "Chat widget frontend (embeddable component)" },
          { id: "3-11-5", text: "Admin dashboard: conversation logs, agent analytics" },
          { id: "3-11-6", text: "Dockerize the full app (docker-compose)" },
          { id: "3-11-7", text: "Deploy on AWS EC2 + RDS, record 2-min demo video" },
          { id: "3-11-8", text: "Write detailed README with system architecture diagram" },
        ],
      },
      {
        week: 12,
        title: "\ud83d\ude80 Project #3 — Full AI SaaS MVP",
        days: "Day 78–84",
        hours: 10,
        tasks: [
          { id: "3-12-1", text: "Pick idea: AI code reviewer / meeting summarizer / content repurposer" },
          { id: "3-12-2", text: "Architecture design + FastAPI backend AI pipeline" },
          { id: "3-12-3", text: "Next.js frontend with auth + user dashboard" },
          { id: "3-12-4", text: "Stripe integration for paid tier" },
          { id: "3-12-5", text: "LLM observability: LangSmith/LangFuse for monitoring" },
          { id: "3-12-6", text: "Landing page with demo (your React skills shine here)" },
          { id: "3-12-7", text: "Deploy end-to-end, test, record demo video" },
        ],
      },
      {
        week: 13,
        title: "Portfolio, LinkedIn & Job Hunt",
        days: "Day 85–90",
        hours: 6,
        tasks: [
          { id: "3-13-1", text: "All 3 projects: clean READMEs, architecture diagrams, demo GIFs" },
          { id: "3-13-2", text: "Pin AI projects on GitHub profile + portfolio README" },
          { id: "3-13-3", text: "LinkedIn headline → 'AI Application Engineer | Full-Stack + GenAI'" },
          { id: "3-13-4", text: "Post 2–3 LinkedIn posts with project screenshots/demos" },
          { id: "3-13-5", text: "Update resume: lead with AI projects, full-stack as foundation" },
          { id: "3-13-6", text: "Write 1 technical blog post: 'How I Built a Multi-Agent AI System'" },
          { id: "3-13-7", text: "Start applying: AI startups, YC companies, remote roles, freelance gigs" },
          { id: "3-13-8", text: "Interview prep: system design for AI, explain projects, RAG architecture" },
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
  2: ["Python OOP", "File I/O"],
  3: ["FastAPI", "Pydantic", "Async Python"],
  4: ["LLM APIs", "Prompt Engineering"],
  5: ["Embeddings", "ChromaDB", "Text Chunking"],
  6: ["RAG", "LangChain"],
  7: ["AI Product Design", "Streaming UIs", "JWT Auth"],
  8: ["Function Calling", "AI Agents", "ReAct"],
  9: ["LangGraph", "Agent Workflows"],
  10: ["Pinecone", "Hybrid Search", "Re-ranking", "MCP"],
  11: ["Multi-Agent Systems", "State Machines", "Docker Compose"],
  12: ["AI SaaS Architecture", "LLM Ops", "Stripe Integration"],
  13: ["Portfolio Strategy", "Technical Writing", "AI System Design"],
};

const WEEK_RESOURCES = {
  1: [
    { label: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
    { label: "Corey Schafer — Python Basics Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" },
    { label: "uv Package Manager Docs", url: "https://docs.astral.sh/uv/" },
    { label: "Krish Naik — Python for Data Science (Hindi)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB" },
    { label: "Tech With Tim — Python Beginner Tutorial", url: "https://www.youtube.com/playlist?list=PLzMcBGfZo4-mFu00qxl0a67RhjjZj3jXm" },
  ],
  2: [
    { label: "Python Official Tutorial — Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
    { label: "Corey Schafer — Python OOP Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc" },
    { label: "Real Python — File I/O Guide", url: "https://realpython.com/read-write-files-python/" },
    { label: "Tech With Tim — Python Projects for Beginners", url: "https://www.youtube.com/playlist?list=PLzMcBGfZo4-nhWva-6OVh1yKWHBs4o_tv" },
  ],
  3: [
    { label: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
    { label: "Tech With Tim — FastAPI Tutorial", url: "https://www.youtube.com/watch?v=cbASjoZZGIw" },
    { label: "Pydantic Docs", url: "https://docs.pydantic.dev/latest/" },
  ],
  4: [
    { label: "OpenAI API Docs", url: "https://platform.openai.com/docs" },
    { label: "Anthropic Claude Docs", url: "https://docs.anthropic.com" },
    { label: "DeepLearning.AI — Prompt Engineering for Devs", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
    { label: "Krish Naik — Complete GenAI Course", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVORE4VF7WQ_fAl0L1Gljtar" },
  ],
  5: [
    { label: "ChromaDB Docs", url: "https://docs.trychroma.com/" },
    { label: "DeepLearning.AI — Building & Evaluating Advanced RAG", url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/" },
    { label: "James Briggs — RAG from Scratch", url: "https://www.youtube.com/watch?v=sVcwVQRHIc8" },
    { label: "CampusX — RAG Tutorial (Hindi)", url: "https://www.youtube.com/watch?v=wBhY-7B2jdY" },
  ],
  6: [
    { label: "LangChain Docs — Tutorials", url: "https://python.langchain.com/docs/tutorials/" },
    { label: "DeepLearning.AI — LangChain for LLM Apps", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/" },
    { label: "Sam Witteveen — Build a RAG App", url: "https://www.youtube.com/watch?v=tcqEUSNCn8I" },
  ],
  7: [
    { label: "FastAPI — File Upload Docs", url: "https://fastapi.tiangolo.com/tutorial/request-files/" },
    { label: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs" },
    { label: "Railway Deployment Guide", url: "https://docs.railway.app/" },
    { label: "Dave Ebbelaar — Full Stack AI App", url: "https://www.youtube.com/watch?v=kXdbKKpOaas" },
  ],
  8: [
    { label: "OpenAI — Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
    { label: "Anthropic — Tool Use Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
    { label: "DeepLearning.AI — AI Agents in LangGraph", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" },
    { label: "CampusX — AI Agents Explained (Hindi)", url: "https://www.youtube.com/watch?v=dN1a5K9BL1s" },
  ],
  9: [
    { label: "LangGraph Official Docs", url: "https://langchain-ai.github.io/langgraph/" },
    { label: "LangChain Academy — LangGraph Course (Free)", url: "https://academy.langchain.com/" },
    { label: "DeepLearning.AI — Multi AI Agent Systems with CrewAI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/" },
  ],
  10: [
    { label: "Pinecone Docs & Learning Center", url: "https://docs.pinecone.io/" },
    { label: "DeepLearning.AI — Vector Databases", url: "https://www.deeplearning.ai/short-courses/building-applications-vector-databases/" },
    { label: "MCP Official Specification", url: "https://modelcontextprotocol.io/" },
    { label: "Anthropic — MCP Docs", url: "https://docs.anthropic.com/en/docs/agents-and-tools/mcp" },
    { label: "James Briggs — Pinecone + Hybrid Search", url: "https://www.youtube.com/watch?v=lRm0GRgRoF8" },
    { label: "Krish Naik — Advanced RAG Techniques", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M" },
  ],
  11: [
    { label: "LangGraph — Multi-Agent Tutorial", url: "https://langchain-ai.github.io/langgraph/tutorials/multi_agent/" },
    { label: "Docker Compose Docs", url: "https://docs.docker.com/compose/" },
    { label: "Dave Ebbelaar — Multi-Agent AI System", url: "https://www.youtube.com/watch?v=a3MJKgOvZHo" },
  ],
  12: [
    { label: "LangSmith Docs — LLM Observability", url: "https://docs.smith.langchain.com/" },
    { label: "LangFuse Docs (Open Source)", url: "https://langfuse.com/docs" },
    { label: "Stripe + Next.js Guide", url: "https://stripe.com/docs/payments/quickstart" },
    { label: "DeepLearning.AI — LLMOps", url: "https://www.deeplearning.ai/short-courses/llmops/" },
    { label: "Vercel — Next.js Auth Tutorial", url: "https://nextjs.org/learn/dashboard-app" },
  ],
  13: [
    { label: "Awesome GitHub Profile READMEs", url: "https://github.com/abhisheknaiidu/awesome-github-profile-readme" },
    { label: "levels.fyi — AI Engineer Roles", url: "https://www.levels.fyi/" },
    { label: "Hashnode — Start a Dev Blog (Free)", url: "https://hashnode.com/" },
    { label: "AI Engineer Job Board", url: "https://aijobs.net/" },
    { label: "DeepLearning.AI — How to Build Your Career in AI (Free)", url: "https://www.deeplearning.ai/resources/how-to-build-a-career-in-ai/" },
  ],
};

// ===========================
// CAREER LADDER — salary tier unlocked per week
// ===========================
const WEEK_SALARY = {
  1:  { range: "5–7 LPA",      role: "Python Developer (Junior)",               note: "Entry-level Python + your JS experience = day-one productive." },
  2:  { range: "6–8 LPA",      role: "Python Backend Developer",                note: "OOP + file I/O + your Node.js background = real backend chops." },
  3:  { range: "9–12 LPA",     role: "Full-Stack Developer (Python + React)",   note: "FastAPI + React is a rare combo. Mid-level full-stack range." },
  4:  { range: "12–16 LPA",    role: "AI Integration Developer",                note: "You can wire LLMs into real products — already ahead of 90% of devs." },
  5:  { range: "14–18 LPA",    role: "GenAI Developer (Junior)",                note: "Embeddings + vector DBs unlock the RAG world. Premium skill set." },
  6:  { range: "16–22 LPA",    role: "RAG / LangChain Engineer",                note: "Full RAG pipeline mastery — startups pay top dollar for this." },
  7:  { range: "20–28 LPA",    role: "AI Application Engineer",                 note: "One shipped production AI app = interviews start rolling in." },
  8:  { range: "22–32 LPA",    role: "AI Agent Engineer",                       note: "Function calling + tool use — you build agents that act, not just chat." },
  9:  { range: "26–36 LPA",    role: "Senior AI Engineer (Agent Workflows)",    note: "LangGraph puts you in the top 5% of AI builders globally." },
  10: { range: "30–42 LPA",    role: "Senior GenAI Engineer",                   note: "Pinecone + MCP + hybrid search = production-grade engineer." },
  11: { range: "35–50 LPA",    role: "Staff / Lead AI Engineer",                note: "Multi-agent systems deployed = FAANG / top-tier AI startup range." },
  12: { range: "45–65 LPA",    role: "Founding / Principal AI Engineer",        note: "Shipped AI SaaS + monetization = founding engineer territory." },
  13: { range: "60 LPA – 1Cr+ • $100K–$200K remote", role: "AI Engineer @ Top Product Cos / YC Startups / Global Remote", note: "DESTINATION — 3 shipped AI products + portfolio + strategy = world-class offers.", isDestination: true },
};

const TOP_CHANNELS = [
  { name: "Krish Naik", desc: "Python, ML, GenAI (Hindi + English)", url: "https://www.youtube.com/@krishnaik06" },
  { name: "CampusX (Nitish Singh)", desc: "GenAI, RAG, LangChain (Hindi)", url: "https://www.youtube.com/@campusx-official" },
  { name: "DeepLearning.AI", desc: "Free short courses by Andrew Ng", url: "https://www.youtube.com/@Deeplearningai" },
  { name: "Sam Witteveen", desc: "Practical RAG & agent builds", url: "https://www.youtube.com/@samwitteveenai" },
  { name: "Dave Ebbelaar", desc: "AI engineering, multi-agent systems", url: "https://www.youtube.com/@daborated" },
  { name: "Andrej Karpathy", desc: "Deep understanding of LLMs", url: "https://www.youtube.com/@AndrejKarpathy" },
  { name: "James Briggs", desc: "Pinecone, vector DBs, RAG", url: "https://www.youtube.com/@jamesbriggs" },
  { name: "Tech With Tim", desc: "FastAPI + Python projects", url: "https://www.youtube.com/@TechWithTim" },
];

const TOP_COURSES = [
  { name: "DeepLearning.AI Short Courses (Free)", desc: "Pick courses matching each week", url: "https://www.deeplearning.ai/short-courses/" },
  { name: "LangChain Academy (Free)", desc: "Structured LangGraph course", url: "https://academy.langchain.com/" },
  { name: "Hugging Face NLP Course (Free)", desc: "Solid ML/NLP foundation", url: "https://huggingface.co/learn" },
  { name: "Fast.ai Practical Deep Learning (Free)", desc: "Top-down approach to ML", url: "https://course.fast.ai/" },
];

const QUOTES = [
  // Ramayana — Lord Rama
  { text: "A person should not be too honest. Straight trees are cut first and honest people are screwed first.", author: "Ramayana — Chanakya's wisdom on Rama's journey" },
  { text: "There is no greater virtue than self-discipline. Through discipline, anything can be achieved.", author: "Lord Rama — Ramayana" },
  { text: "One should always follow the path of dharma, even when it is the most difficult road to walk.", author: "Lord Rama — Ramayana" },
  { text: "A warrior does not give up what he has set out to do, no matter how difficult it becomes.", author: "Lord Rama — Ramayana" },
  { text: "Even the mightiest ocean is made of tiny drops of water. Every small effort counts.", author: "Lord Rama — Ramayana" },
  { text: "Patience is the greatest weapon of a warrior. Time rewards those who persist.", author: "Lord Rama — Ramayana" },
  { text: "He who controls his mind, controls the world. Master yourself before you master anything else.", author: "Lord Rama — Ramayana" },
  { text: "Do not dwell on the past or worry about the future. Focus your mind on the present task.", author: "Lord Rama — Ramayana" },
  // Ramayana — Hanuman
  { text: "When you don\u2019t know how powerful you are, sometimes you need someone to remind you of your own strength.", author: "Hanuman — Ramayana" },
  { text: "There is no obstacle that cannot be overcome with devotion, courage, and relentless action.", author: "Hanuman — Ramayana" },
  { text: "The one who has conquered fear has conquered everything. Fear is the only enemy.", author: "Hanuman — Ramayana" },
  { text: "Mountains, oceans, demons — nothing can stop the one who moves with purpose and faith.", author: "Hanuman — Ramayana" },
  { text: "Your true strength reveals itself only when the challenge seems impossible.", author: "Hanuman — Ramayana" },
  { text: "I searched the entire world and found that all the power was within me all along.", author: "Hanuman — Ramayana" },
  { text: "Fly. The sky has no limits, and neither do you.", author: "Jambavan to Hanuman — Ramayana" },
  { text: "Courage is not the absence of fear. It is the decision that your mission matters more than your fear.", author: "Hanuman — Ramayana" },
  // Ramayana — Lakshmana
  { text: "Stand beside those you believe in. Loyalty to your mission is the mark of a true warrior.", author: "Lakshmana — Ramayana" },
  { text: "Comfort is the enemy of greatness. Choose the harder path — that is where glory awaits.", author: "Lakshmana — Ramayana" },
  { text: "A brother, a friend, a companion in battle — be the person others can count on in the darkest hour.", author: "Lakshmana — Ramayana" },
  // Ramayana — Sita
  { text: "Strength is not just physical. The strongest person is the one who endures with grace and never loses hope.", author: "Sita — Ramayana" },
  { text: "No fire can burn the one whose heart is pure and whose resolve is unshakeable.", author: "Sita — Ramayana" },
  { text: "True power lies in patience, dignity, and the unwavering belief that justice will prevail.", author: "Sita — Ramayana" },
  // Ramayana — Vibhishana & Wisdom
  { text: "It takes more courage to stand for what is right when everyone around you has chosen wrong.", author: "Vibhishana — Ramayana" },
  { text: "Even in enemy territory, truth finds its warrior. Be that warrior.", author: "Vibhishana — Ramayana" },
  // Ramayana — Valmiki & Universal Wisdom
  { text: "The bridge to Lanka was built one stone at a time. Great achievements are built one task at a time.", author: "Valmiki — Ramayana" },
  { text: "An army of monkeys built a bridge across the ocean. Never underestimate the power of a team with purpose.", author: "Ramayana — Ram Setu" },
  { text: "Fourteen years of exile became the journey that built a legend. Your struggle is building your story.", author: "Ramayana Wisdom" },
  { text: "Ravana had ten heads of knowledge but lost to Rama\u2019s one heart of dharma. Character defeats talent.", author: "Ramayana Wisdom" },
  { text: "The arrow that must fly far is first pulled back. Your setbacks are preparing you for something greater.", author: "Ramayana Wisdom" },
  { text: "Like Rama\u2019s army, build your skills one by one. When the time comes, even the ocean will make way.", author: "Ramayana Wisdom" },
  // Bhagavad Gita (bonus — deeply motivational)
  { text: "You have the right to perform your actions, but you are not entitled to the fruits of the actions.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "Whenever dharma declines, I manifest myself. In every age, I come to restore what is right.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "The mind is restless, but through practice and detachment, it can be controlled.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "No one who does good work will ever come to a bad end, either here or in the world to come.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "Set your heart upon your work, but never on its reward. Work with focus, not anxiety.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "There is nothing in this world as purifying as knowledge. The one who seeks it finds it in time.", author: "Lord Krishna — Bhagavad Gita" },
  { text: "Reshape yourself through the power of your will. Do not let yourself be degraded by self-doubt.", author: "Lord Krishna — Bhagavad Gita" },
  // Chhatrapati Shivaji Maharaj
  { text: "Even if there are obstacles, even if there are problems, you should never stop. Pursue your goal with all your heart.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "Do not think of the enemy as weak. Overconfidence is the greatest enemy of success.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "Self-confidence provides the foundation for bravery. Believe in yourself first.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "Freedom is a boon, which everyone has the right to receive.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "Of all the rights of women, the greatest is to be a mother.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "When you are enthusiastic, the mountain also looks like a small stone.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "Never bend your head. Always hold it high. Look the world straight in the eye.", author: "Chhatrapati Shivaji Maharaj" },
  { text: "A kingdom built by one man\u2019s vision and a handful of loyal warriors — proof that resources don\u2019t matter, resolve does.", author: "Chhatrapati Shivaji Maharaj" },
  // Chola Dynasty — Rajendra Chola & Chola Wisdom
  { text: "The Cholas conquered the seas when the world thought oceans were boundaries. Your limits exist only in your mind.", author: "Chola Empire Wisdom" },
  { text: "Rajendra Chola sent his navy across the Indian Ocean. When everyone says it cannot be done, be the one who does it.", author: "Rajendra Chola I" },
  { text: "Build an empire of knowledge so vast that the world has no choice but to take notice.", author: "Chola Empire Wisdom" },
  { text: "The Cholas didn\u2019t just rule land — they mastered the seas. Go where no one in your field has gone before.", author: "Chola Empire Wisdom" },
  { text: "A thousand temples still stand after a thousand years. Build your skills to last, not just to impress.", author: "Chola Architecture Wisdom" },
  // Chanakya / Kautilya
  { text: "A man is born alone and dies alone. He experiences the good and bad consequences of his karma alone.", author: "Chanakya" },
  { text: "Education is the best friend. An educated person is respected everywhere.", author: "Chanakya" },
  { text: "The world\u2019s biggest power is the youth and beauty of a woman and the knowledge of a learned man.", author: "Chanakya" },
  { text: "Before you start some work, always ask yourself three questions — Why am I doing it, What might the results be, and Will I be successful.", author: "Chanakya" },
  { text: "Once you start working on something, don\u2019t be afraid of failure and don\u2019t abandon it.", author: "Chanakya" },
  { text: "A person should not be too honest. Straight trees are cut first.", author: "Chanakya" },
  { text: "Learn from the mistakes of others. You can\u2019t live long enough to make them all yourselves.", author: "Chanakya" },
  { text: "The fragrance of flowers spreads only in the direction of the wind. But the goodness of a person spreads in all directions.", author: "Chanakya" },
  // Maharana Pratap
  { text: "He who has courage and a clear conscience shall never fear anything.", author: "Maharana Pratap" },
  { text: "I will take back my homeland. The day I die trying is the day I truly win.", author: "Maharana Pratap" },
  { text: "Maharana Pratap ate grass bread in the jungle but never surrendered. Comfort is temporary, legacy is forever.", author: "Maharana Pratap\u2019s Legacy" },
  { text: "Empires may fall, but the spirit of a warrior who never surrenders lives on for centuries.", author: "Maharana Pratap\u2019s Legacy" },
  // Rani Lakshmibai
  { text: "I shall not surrender my Jhansi.", author: "Rani Lakshmibai" },
  { text: "We fight for independence. In the battlefield of life, the brave do not retreat.", author: "Rani Lakshmibai" },
  { text: "If defeated, we shall die fighting. If victorious, we shall live with honor. Either way, we move forward.", author: "Rani Lakshmibai" },
  // Subhas Chandra Bose
  { text: "Give me blood, and I shall give you freedom!", author: "Subhas Chandra Bose" },
  { text: "One individual may die for an idea, but that idea will, after his death, incarnate itself in a thousand lives.", author: "Subhas Chandra Bose" },
  { text: "It is blood alone that can pay the price of freedom. Dare to be free, dare to go as far as your thought leads.", author: "Subhas Chandra Bose" },
  { text: "Reality is, after all, too big for our frail understanding to fully comprehend. But we must try.", author: "Subhas Chandra Bose" },
  // Sardar Vallabhbhai Patel
  { text: "Every Indian should now forget that he is a Rajput, a Sikh, or a Jat. He must remember that he is an Indian.", author: "Sardar Vallabhbhai Patel" },
  { text: "Manpower without unity is not a strength unless it is harmonized and united properly.", author: "Sardar Vallabhbhai Patel" },
  { text: "Faith is of no evil in the absence of strength. Faith and strength, both are essential to accomplish any great work.", author: "Sardar Vallabhbhai Patel" },
  // Bhagat Singh
  { text: "They may kill me, but they cannot kill my ideas. They can crush my body, but they will not be able to crush my spirit.", author: "Bhagat Singh" },
  { text: "Revolution is an inalienable right of mankind. Freedom is an imperishable birthright of all.", author: "Bhagat Singh" },
  { text: "Lovers, lunatics, and poets are made of the same stuff.", author: "Bhagat Singh" },
  // Guru Gobind Singh
  { text: "When all other means have failed, it is righteous to draw the sword.", author: "Guru Gobind Singh" },
  { text: "I shall make sparrows fight hawks and one man fight a legion. Only then shall I be called Gobind Singh.", author: "Guru Gobind Singh" },
  { text: "Recognize the whole human race as one. The same God is the creator and nourisher of all.", author: "Guru Gobind Singh" },
  // Rabindranath Tagore
  { text: "You can\u2019t cross the sea merely by standing and staring at the water.", author: "Rabindranath Tagore" },
  { text: "If you cry because the sun has gone out of your life, your tears will prevent you from seeing the stars.", author: "Rabindranath Tagore" },
  { text: "Where the mind is without fear and the head is held high, where knowledge is free.", author: "Rabindranath Tagore" },
  { text: "The butterfly counts not months but moments, and has time enough.", author: "Rabindranath Tagore" },
  // Thiruvalluvar — Tamil Wisdom (Thirukkural)
  { text: "Learning is the true imperishable wealth. All other things are not wealth.", author: "Thiruvalluvar — Thirukkural" },
  { text: "Whatever may be the obstacles, the wise will find the means to accomplish their purpose.", author: "Thiruvalluvar — Thirukkural" },
  { text: "Think before you act. To act and then think is folly.", author: "Thiruvalluvar — Thirukkural" },
  { text: "The learned are said to have eyes, but the unlearned have only two sores on their face.", author: "Thiruvalluvar — Thirukkural" },
  { text: "Perseverance will accomplish all things. Perseverance alone conquers all difficulties.", author: "Thiruvalluvar — Thirukkural" },
  // Ashoka the Great
  { text: "A man who was the fiercest warrior became the gentlest ruler. Transformation is always possible.", author: "Ashoka the Great" },
  { text: "It is forbidden to decry other sects; the true basis of honor is understanding.", author: "Ashoka the Great" },
  { text: "Conquest by dharma is the greatest conquest. Conquer yourself through knowledge.", author: "Ashoka the Great" },
  // Alluri Sitarama Raju
  { text: "I will fight till my last breath for the freedom of my people. The jungle is my fortress, my will is my weapon.", author: "Alluri Sitarama Raju" },
  { text: "A 24-year-old shook the British Empire from the forests of Andhra. Age is never an excuse.", author: "Alluri Sitarama Raju\u2019s Legacy" },
  // Swami Vivekananda
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.", author: "Swami Vivekananda" },
  { text: "You cannot believe in God until you believe in yourself.", author: "Swami Vivekananda" },
  { text: "Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea.", author: "Swami Vivekananda" },
  { text: "In a conflict between the heart and the brain, follow your heart.", author: "Swami Vivekananda" },
  { text: "The greatest sin is to think yourself weak.", author: "Swami Vivekananda" },
  { text: "Strength is life, weakness is death. Strength is the medicine for the world\u2019s sickness.", author: "Swami Vivekananda" },
  { text: "Talk to yourself once in a day. Otherwise you may miss meeting an excellent person in this world.", author: "Swami Vivekananda" },
  { text: "Be not afraid of anything. You will do marvelous work. It is fearlessness that brings heaven even in a moment.", author: "Swami Vivekananda" },
  // Srinivasa Ramanujan
  { text: "An equation for me has no meaning unless it expresses a thought of God.", author: "Srinivasa Ramanujan" },
  { text: "A man with no formal training rewrote mathematics. Your background does not define your potential.", author: "Srinivasa Ramanujan\u2019s Legacy" },
  { text: "I have not trodden through the conventional regular course. But I have struck out a new path for myself.", author: "Srinivasa Ramanujan" },
  { text: "While asleep, I had an unusual experience. There was a red screen formed by flowing blood. I was observing it. Suddenly a hand began to write on the screen. I became all attention. The hand wrote a number of results in elliptic integrals.", author: "Srinivasa Ramanujan" },
  // C.V. Raman — Nobel Prize in Physics
  { text: "I am the master of my failure. If I never fail, how will I ever learn?", author: "C.V. Raman" },
  { text: "Ask the right questions, and nature will open the doors to her secrets.", author: "C.V. Raman" },
  { text: "Treat me right and you will see the light. Treat me wrong and I will be gone.", author: "C.V. Raman" },
  { text: "You can\u2019t always choose what happens to you, but you can choose how you respond. Success is a choice.", author: "C.V. Raman" },
  { text: "The essence of science is independent thinking, hard work, and not equipment.", author: "C.V. Raman" },
  // Homi J. Bhabha — Father of Indian Nuclear Program
  { text: "There is no large and difficult task that can\u2019t be divided into little easy tasks.", author: "Homi J. Bhabha" },
  { text: "If we are to remain free, we must have our own big science. No nation can afford to be dependent on others.", author: "Homi J. Bhabha" },
  { text: "A country which does not develop its technology is doomed to remain backward forever.", author: "Homi J. Bhabha" },
  // Vikram Sarabhai — Father of Indian Space Program
  { text: "We do not have the fantasy of competing with economically advanced nations. But we are convinced that if we are to play a meaningful role, we must be second to none in the application of advanced technologies.", author: "Vikram Sarabhai" },
  { text: "There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose.", author: "Vikram Sarabhai" },
  { text: "A dream is not that which you see while sleeping. It is something that does not let you sleep.", author: "Vikram Sarabhai" },
  // M. Visvesvaraya — Engineer, Bharat Ratna
  { text: "I can work but I cannot be idle. Idleness is the worst form of waste.", author: "M. Visvesvaraya" },
  { text: "Industrialize or perish. A nation\u2019s strength lies in what it builds, not what it borrows.", author: "M. Visvesvaraya" },
  { text: "Work before you talk. Deliver before you promise. Perform before you preach.", author: "M. Visvesvaraya" },
  // Jagadish Chandra Bose — Physicist, Biologist, Polymath
  { text: "In my investigations I was unconsciously led into the border region of physics and physiology. To my amazement, I found boundary lines vanishing.", author: "Jagadish Chandra Bose" },
  { text: "The true laboratory is the mind, where behind illusions we uncover the laws of truth.", author: "Jagadish Chandra Bose" },
  { text: "He proved plants have feelings before the world was ready to listen. Do the work — the world will catch up.", author: "Jagadish Chandra Bose\u2019s Legacy" },
  // Satyendra Nath Bose — Bose-Einstein Statistics
  { text: "A single paper sent to Einstein changed physics forever. Never underestimate what one focused effort can create.", author: "Satyendra Nath Bose\u2019s Legacy" },
  { text: "I have no quarrel with the establishment. I simply pursue what I find interesting.", author: "Satyendra Nath Bose" },
  // Subrahmanyam Chandrasekhar — Nobel Prize in Astrophysics
  { text: "I should like to feel that there is a certain esthetic quality in the effort itself.", author: "Subrahmanyam Chandrasekhar" },
  { text: "A 19-year-old on a boat voyage calculated the limit of a star\u2019s life. Your next breakthrough could come from anywhere.", author: "Subrahmanyam Chandrasekhar\u2019s Legacy" },
  { text: "The pursuit of science has often been compared to scaling a mountain. The simile is apt — both demand endurance.", author: "Subrahmanyam Chandrasekhar" },
  // Aryabhata — Ancient Mathematician & Astronomer
  { text: "In 499 AD, Aryabhata calculated the Earth\u2019s rotation and the value of pi. India was engineering breakthroughs before the world had universities.", author: "Aryabhata\u2019s Legacy" },
  { text: "Just as a man in a boat moving forward sees the stationary objects on the bank as moving backward, so are the stars.", author: "Aryabhata" },
  // Brahmagupta — The Man Who Gave Us Zero
  { text: "The one who invented zero showed the world that nothing can be everything. Start from zero — it is the most powerful number.", author: "Brahmagupta\u2019s Legacy" },
  { text: "A debt minus zero is a debt. A fortune minus zero is a fortune. Zero minus zero is zero.", author: "Brahmagupta" },
  // Shakuntala Devi — The Human Computer
  { text: "Education is not just about going to school. It is about widening your knowledge and absorbing the truth about life.", author: "Shakuntala Devi" },
  { text: "Nobody challenges me. I challenge myself.", author: "Shakuntala Devi" },
  { text: "She beat a computer in mental math. Your brain is the most powerful machine ever created — train it.", author: "Shakuntala Devi\u2019s Legacy" },
  // Kalpana Chawla — Astronaut
  { text: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it.", author: "Kalpana Chawla" },
  { text: "You are just your intelligence. From a small town in Haryana to NASA — geography is not destiny.", author: "Kalpana Chawla\u2019s Legacy" },
  { text: "Do something you really love and don\u2019t let anyone tell you that you aren\u2019t good enough.", author: "Kalpana Chawla" },
  // Tessy Thomas — Missile Woman of India
  { text: "When you are focused on your work, the world will respect you. Gender becomes irrelevant.", author: "Tessy Thomas" },
  { text: "Technology knows no gender. Passion and persistence are the only requirements.", author: "Tessy Thomas" },
  // Satish Dhawan — ISRO Chairman
  { text: "When a rocket failed, Satish Dhawan took the blame. When it succeeded, he gave the credit to his team. That is leadership.", author: "Satish Dhawan\u2019s Legacy" },
  { text: "Failures are stepping stones. Every failed rocket taught ISRO how to reach Mars.", author: "Satish Dhawan\u2019s Legacy" },
  // Har Gobind Khorana — Nobel Prize in Medicine
  { text: "From a village with no electricity in Punjab to the Nobel Prize. The only limit is the one you accept.", author: "Har Gobind Khorana\u2019s Legacy" },
  // Venkatraman Ramakrishnan — Nobel Prize in Chemistry
  { text: "Good science comes from curiosity and persistence, not from expensive equipment.", author: "Venkatraman Ramakrishnan" },
  // Srinivasa Ramanujan, C.V. Raman & Indian Science Wisdom
  { text: "India gave the world zero, the decimal system, surgery, and steel. You carry the DNA of innovation. Act like it.", author: "Indian Science Legacy" },
  { text: "From Aryabhata\u2019s astronomy to Chandrayaan\u2019s moon landing — India\u2019s journey proves consistency beats resources.", author: "Indian Science Legacy" },
  { text: "ISRO reached Mars in its first attempt, spending less than the budget of a Hollywood movie. Frugality and brilliance are in your blood.", author: "Indian Science Legacy" },
  // A.P.J. Abdul Kalam
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "A.P.J. Abdul Kalam" },
  { text: "You have to dream before your dreams can come true.", author: "A.P.J. Abdul Kalam" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A.P.J. Abdul Kalam" },
  { text: "All of us do not have equal talent. But all of us have an equal opportunity to develop our talents.", author: "A.P.J. Abdul Kalam" },
  { text: "Don\u2019t take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "A.P.J. Abdul Kalam" },
  { text: "If a country is to be corruption-free, I strongly feel there are three key members who can make it happen — the father, the mother, and the teacher.", author: "A.P.J. Abdul Kalam" },
  { text: "Success is when your signature changes to autograph.", author: "A.P.J. Abdul Kalam" },
  { text: "The best brains of the nation may be found on the last benches of the classroom.", author: "A.P.J. Abdul Kalam" },
  { text: "Man needs difficulties in life because they are necessary to enjoy the success.", author: "A.P.J. Abdul Kalam" },
  // Modern Indian leaders
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
const STORAGE_KEY = "ai-roadmap-90day-v1";
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
    for (let w = 1; w <= 13; w++) {
      if (isWeekComplete(w, checked) && WEEK_SKILLS[w]) {
        unlocked.push(...WEEK_SKILLS[w]);
      }
    }
    return unlocked;
  };

  const getAllNewSkills = () => {
    const all = [];
    for (let w = 1; w <= 13; w++) {
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
            background: WEEK_SALARY[celebration.week]?.isDestination
              ? "linear-gradient(135deg, #10b981, #06b6d4, #ec4899)"
              : "linear-gradient(135deg, #f59e0b, #06b6d4)",
            color: "#000",
            padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15,
            animation: "slideDown 0.4s ease-out", textAlign: "center",
            boxShadow: "0 8px 40px rgba(245,158,11,0.4)", maxWidth: "92vw",
          }}>
            <div>
              {WEEK_SALARY[celebration.week]?.isDestination ? "🎯 DESTINATION REACHED!" : `Week ${celebration.week} Complete!`}
            </div>
            {WEEK_SALARY[celebration.week] && (
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, opacity: 0.85 }}>
                You can now crack {WEEK_SALARY[celebration.week].range} • {WEEK_SALARY[celebration.week].role}
              </div>
            )}
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 3, opacity: 0.7 }}>
              +{(WEEK_SKILLS[celebration.week] || []).length} skills unlocked
            </div>
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
          90-Day AI Roadmap
        </div>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 800, lineHeight: 1.15, margin: 0 }}>
          Full-Stack &rarr; <span style={{ color: "#06b6d4" }}>AI Engineer</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 480, margin: "8px auto 0" }}>
          Your React &amp; Node.js foundation is your superpower. Learn slowly, build deeply, become unstoppable.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>

        {/* ===== STATS BAR ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
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
            background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.12), rgba(236,72,153,0.1))",
            border: "1px solid rgba(16,185,129,0.35)", borderRadius: 14, padding: "26px 20px",
            marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{"\ud83c\udfaf"}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>Destination Reached!</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399", marginTop: 6 }}>
              {WEEK_SALARY[13].range}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>
              {WEEK_SALARY[13].role}
            </div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 10, maxWidth: 480, margin: "10px auto 0", lineHeight: 1.55 }}>
              {TOTAL_TASKS} tasks. 13 weeks. 3 shipped AI products. You&apos;re now an AI Engineer ready for top-tier offers.
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

        {/* ===== CAREER LADDER ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.2 }}>
              Career Ladder &mdash; Every Week Unlocks a Higher Salary Tier
            </span>
            {(() => {
              let currentTier = null;
              for (let w = 13; w >= 1; w--) {
                if (isWeekComplete(w, checked) && WEEK_SALARY[w]) { currentTier = { week: w, ...WEEK_SALARY[w] }; break; }
              }
              return currentTier ? (
                <span style={{ fontSize: 11, color: "#34d399", fontWeight: 700, fontFamily: "monospace" }}>
                  Current: {currentTier.range}
                </span>
              ) : (
                <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>
                  Start Week 1 to unlock
                </span>
              );
            })()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Array.from({ length: 13 }, (_, i) => i + 1).map((w) => {
              const tier = WEEK_SALARY[w];
              if (!tier) return null;
              const unlocked = isWeekComplete(w, checked);
              const isDest = tier.isDestination;
              return (
                <div key={w} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: 9,
                  background: unlocked
                    ? (isDest ? "linear-gradient(90deg, rgba(16,185,129,0.1), rgba(6,182,212,0.08), rgba(236,72,153,0.08))" : "rgba(16,185,129,0.06)")
                    : "#0d1017",
                  border: `1px solid ${unlocked ? (isDest ? "rgba(16,185,129,0.4)" : "rgba(16,185,129,0.2)") : "#1a1f2e"}`,
                  opacity: unlocked ? 1 : 0.55,
                  transition: "all 0.3s",
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, fontFamily: "monospace",
                    background: unlocked ? (isDest ? "rgba(16,185,129,0.2)" : "rgba(16,185,129,0.15)") : "#1a1f2e",
                    color: unlocked ? "#10b981" : "#475569",
                  }}>
                    {unlocked ? (isDest ? "🎯" : "✓") : `W${w}`}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontSize: 12.5, fontWeight: 700,
                      color: unlocked ? (isDest ? "#34d399" : "#10b981") : "#64748b",
                    }}>
                      {tier.range}
                      <span style={{ color: unlocked ? "#cbd5e1" : "#475569", fontWeight: 600, marginLeft: 6 }}>
                        &middot; {tier.role}
                      </span>
                    </div>
                    <div style={{ fontSize: 10.5, color: unlocked ? "#64748b" : "#3a4458", marginTop: 2, lineHeight: 1.45 }}>
                      {unlocked ? tier.note : `Complete Week ${w} to unlock`}
                    </div>
                  </div>
                </div>
              );
            })}
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
                        {weekDone && WEEK_SALARY[week.week] && (
                          <span style={{ color: "#10b981", marginLeft: 6, fontWeight: 700 }}>
                            &middot; {WEEK_SALARY[week.week].range}
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

                    {/* Salary tier preview */}
                    {!weekDone && WEEK_SALARY[week.week] && (
                      <div style={{
                        padding: "10px 12px", marginBottom: 8,
                        background: WEEK_SALARY[week.week].isDestination
                          ? "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08), rgba(236,72,153,0.08))"
                          : "rgba(16,185,129,0.06)",
                        border: `1px dashed ${WEEK_SALARY[week.week].isDestination ? "rgba(16,185,129,0.4)" : "rgba(16,185,129,0.2)"}`,
                        borderRadius: 8, fontSize: 11.5,
                      }}>
                        <div style={{ color: "#10b981", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
                          {WEEK_SALARY[week.week].isDestination ? "🎯 Final Destination" : "💼 Unlocks Career Tier"}
                        </div>
                        <div style={{ color: "#cbd5e1", fontWeight: 700 }}>
                          {WEEK_SALARY[week.week].range} &middot; <span style={{ color: "#94a3b8", fontWeight: 600 }}>{WEEK_SALARY[week.week].role}</span>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>
                          {WEEK_SALARY[week.week].note}
                        </div>
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
                        marginTop: 8, padding: "12px 14px", background: `${phase.color}08`,
                        border: `1px solid ${phase.color}20`, borderRadius: 10,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                        {WEEK_SALARY[week.week] && (
                          <div style={{
                            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${phase.color}15`,
                            display: "flex", alignItems: "flex-start", gap: 10,
                          }}>
                            <span style={{ fontSize: 15 }}>{WEEK_SALARY[week.week].isDestination ? "\ud83c\udfaf" : "\ud83d\udcbc"}</span>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>
                                {WEEK_SALARY[week.week].isDestination ? "Destination reached: " : "You can now crack "}
                                <span style={{ color: "#34d399" }}>{WEEK_SALARY[week.week].range}</span>
                                <span style={{ color: "#94a3b8", fontWeight: 600 }}> &middot; {WEEK_SALARY[week.week].role}</span>
                              </div>
                              <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, lineHeight: 1.5 }}>
                                {WEEK_SALARY[week.week].note}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Week resources */}
                    {WEEK_RESOURCES[week.week] && (
                      <div style={{ marginTop: 10, padding: "12px 14px", background: "#0a0c10", border: "1px solid #1a1f2e", borderRadius: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
                          Learning Resources
                        </div>
                        {WEEK_RESOURCES[week.week].map((res) => (
                          <a
                            key={res.url}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex", alignItems: "center", gap: 8,
                              padding: "6px 4px", borderRadius: 6, fontSize: 12.5,
                              color: "#94a3b8", textDecoration: "none", transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff06"; e.currentTarget.style.color = "#c4b5fd"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                          >
                            <span style={{ color: "#8b5cf6", fontSize: 10, flexShrink: 0 }}>&#x2197;</span>
                            {res.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* ===== TOP YOUTUBE CHANNELS ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 20px", marginBottom: 12, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>
            Top YouTube Channels &mdash; Subscribe to All
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {TOP_CHANNELS.map((ch) => (
              <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer" style={{
                display: "block", padding: "10px 14px", background: "#0a0c10",
                border: "1px solid #1a1f2e", borderRadius: 10, textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef444440"; e.currentTarget.style.background = "#ef444408"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a1f2e"; e.currentTarget.style.background = "#0a0c10"; }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{ch.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>{ch.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ===== TOP FREE COURSES ===== */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>
            Top Free Courses &mdash; Do These in Order
          </div>
          {TOP_COURSES.map((course, i) => (
            <a key={course.url} href={course.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
              borderRadius: 8, textDecoration: "none", transition: "background 0.15s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff06")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 7, background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#10b981", flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1" }}>{course.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{course.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {/* ===== FOOTER ===== */}
        <div
          style={{
            textAlign: "center",
            padding: "28px 20px",
            marginBottom: 40,
            background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(6,182,212,0.06), rgba(236,72,153,0.06))",
            border: "1px solid #1e2330",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800 }}>Build. Ship. Get Hired.</div>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6, maxWidth: 460, margin: "6px auto 0" }}>
            90 days. 13 weeks. 3 deployed AI projects. Learn at your own pace — your full-stack foundation + GenAI = the most in-demand skill combination in 2026.
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
