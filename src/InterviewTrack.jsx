import { useState, useEffect } from "react";

// ===========================
// 30-DAY INTERVIEW FAST TRACK DATA
// ===========================
const TRACK_STORAGE_KEY = "ai-interview-30day-v1";

const WEEKS = [
  {
    week: 1,
    title: "Quick Wins — Your First AI App",
    color: "#10b981",
    goal: "By Day 7: You have a live chatbot deployed with a URL to show.",
    confidence: "I've built and deployed an AI app",
    days: [
      {
        day: 1,
        title: "Your first LLM call",
        time: "45 min",
        tag: "Hands-on",
        tagColor: "#10b981",
        what: "Get OpenAI API key → call the API in JavaScript (you know JS!) → print response in terminal",
        why: "After this you can say 'I've called the OpenAI API' with full confidence.",
        code: `// You already know fetch(). This is all it is:
const res = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_KEY', 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: 'Hello!' }] })
});
const data = await res.json();
console.log(data.choices[0].message.content);`,
      },
      {
        day: 2,
        title: "System prompts + temperature",
        time: "45 min",
        tag: "Concept",
        tagColor: "#06b6d4",
        what: "Add a system prompt. Try temperature 0 vs 1. Understand tokens.",
        why: "These 3 concepts come up in every Gen AI interview.",
        concept: "System prompt = instructions for the AI. Temperature = how creative/random. Tokens = words split into pieces (1000 words ≈ 750 tokens).",
      },
      {
        day: 3,
        title: "Build a chatbot with memory",
        time: "60 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Build a React chatbot that remembers the conversation (array of messages passed each time)",
        why: "This is your first portfolio piece. It's also how ChatGPT works under the hood.",
        concept: "ChatGPT memory = you send the entire conversation history in every API call. That's it.",
      },
      {
        day: 4,
        title: "Add streaming (typing effect)",
        time: "45 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Add streaming to your chatbot so text appears word-by-word like ChatGPT",
        why: "Every interviewer will ask you to demo something. Streaming looks impressive.",
        concept: "Streaming = the API sends chunks one at a time. You use EventSource or fetch with ReadableStream.",
      },
      {
        day: 5,
        title: "Deploy your chatbot live",
        time: "30 min",
        tag: "Ship it",
        tagColor: "#ec4899",
        what: "Deploy to Vercel. Get a live URL. Share it.",
        why: "A live URL > any amount of explanation. Bring it to every interview.",
        concept: "Use Next.js API routes to hide your API key. Never expose it client-side.",
      },
      {
        day: 6,
        title: "Prompt engineering basics",
        time: "45 min",
        tag: "Concept",
        tagColor: "#06b6d4",
        what: "Learn few-shot prompting, chain-of-thought, and JSON mode with examples",
        why: "Interviewers often ask 'how do you control LLM output quality?'",
        concept: "Few-shot = show examples. Chain-of-thought = ask it to think step by step. JSON mode = force structured output.",
      },
      {
        day: 7,
        title: "Practice explaining LLMs out loud",
        time: "30 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Record yourself (phone mic is fine) answering: 'What is an LLM and how does it work?'",
        why: "Speaking clearly about concepts matters more than perfect code in interviews.",
        concept: "LLM = a model trained on text to predict the next token. At inference time, it generates text one token at a time based on probability.",
      },
    ],
  },
  {
    week: 2,
    title: "RAG — The #1 Interview Topic",
    color: "#06b6d4",
    goal: "By Day 14: You can build a 'Chat with PDF' app AND explain RAG in 2 minutes clearly.",
    confidence: "I understand RAG and can build it",
    days: [
      {
        day: 8,
        title: "Understand embeddings (concept only)",
        time: "30 min",
        tag: "Concept",
        tagColor: "#06b6d4",
        what: "Watch a 20-min YouTube video on embeddings. No coding today.",
        why: "You need the mental model before you touch the code.",
        concept: "Embedding = text converted to a list of numbers (a vector). Similar text → similar vectors. Distance between vectors = similarity. That's how semantic search works.",
      },
      {
        day: 9,
        title: "Generate + compare embeddings",
        time: "45 min",
        tag: "Hands-on",
        tagColor: "#10b981",
        what: "Use OpenAI embeddings API to convert sentences to vectors. Calculate similarity with dot product.",
        why: "Once you see 'dog' and 'puppy' have similar vectors, it clicks permanently.",
        concept: "text-embedding-3-small is the OpenAI model. Returns 1536 numbers per input. Cosine similarity tells you how close two embeddings are.",
      },
      {
        day: 10,
        title: "Setup ChromaDB + store chunks",
        time: "60 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Install ChromaDB locally. Split some text into chunks. Embed and store them. Run a similarity query.",
        why: "ChromaDB is the simplest vector DB to demo in interviews.",
        concept: "Chunk text (500 chars) → embed each chunk → store in ChromaDB → query: embed the question → find top 3 similar chunks → pass to LLM.",
      },
      {
        day: 11,
        title: "Build a simple RAG app",
        time: "60 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Build 'Chat with a text file': load a .txt file → chunk → embed → store → query → answer",
        why: "This is RAG. You've now built it. You own this concept.",
        concept: "RAG = Retrieval Augmented Generation. Retrieve relevant context → Augment the prompt with it → Generate the answer. LLM answers from YOUR data, not its training.",
      },
      {
        day: 12,
        title: "Add PDF support with LangChain",
        time: "45 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Swap text file for PDF using LangChain's PyPDFLoader. Keep everything else the same.",
        why: "PDF RAG is the most common interview demo. 'Chat with your document' is a standard AI product.",
        concept: "LangChain loaders handle messy file parsing. You just need 3 lines to go from PDF to chunks.",
      },
      {
        day: 13,
        title: "Deploy + polish the RAG app",
        time: "60 min",
        tag: "Ship it",
        tagColor: "#ec4899",
        what: "Add a React file-upload UI. Deploy backend on Railway, frontend on Vercel. Write a README.",
        why: "Two deployed projects now. Your confidence should be rising.",
        concept: "Show source citations — which chunk answered the question. Interviewers love this detail.",
      },
      {
        day: 14,
        title: "Practice explaining RAG out loud",
        time: "30 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Answer this out loud until smooth: 'What is RAG and why would you use it over fine-tuning?'",
        why: "This exact question appears in ~80% of Gen AI interviews.",
        concept: "RAG = inject context at query time. Fine-tuning = retrain the model. Use RAG when: your data changes often, you have specific documents, you need citations. Use fine-tuning when: you need a specific behavior/style baked in.",
      },
    ],
  },
  {
    week: 3,
    title: "AI Agents — The Trending Topic",
    color: "#f59e0b",
    goal: "By Day 21: You understand agents, can build one, and can explain the ReAct pattern.",
    confidence: "I can build AI agents with tools",
    days: [
      {
        day: 15,
        title: "Function/tool calling basics",
        time: "45 min",
        tag: "Hands-on",
        tagColor: "#10b981",
        what: "Give the LLM a 'calculator' function. See it decide to call it. See it use the result.",
        why: "Tool calling is the core mechanic of all AI agents. Once you see it work, everything else makes sense.",
        concept: "You describe a function to the LLM. When it decides to use it, it returns a JSON with function name + arguments. You execute the function. You send the result back. LLM generates the final answer.",
      },
      {
        day: 16,
        title: "Build a 2-tool agent",
        time: "60 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Build an agent with: get_weather(city) + get_time(timezone). Let the user ask natural language questions.",
        why: "Now you can say 'I've built an agent that uses multiple tools' in interviews.",
        concept: "The LLM picks which tool to use based on the user's question. You don't hardcode the routing. That's the power of agents.",
      },
      {
        day: 17,
        title: "Understand ReAct pattern",
        time: "30 min",
        tag: "Concept",
        tagColor: "#06b6d4",
        what: "Read about ReAct in 20 min. Draw the loop on paper: Thought → Action → Observation → Thought…",
        why: "ReAct is asked in senior Gen AI interviews. Drawing it shows you understand agent architecture.",
        concept: "ReAct = Reason + Act. Loop: LLM thinks (Thought) → calls a tool (Action) → gets result (Observation) → thinks again → repeats until it has the answer.",
      },
      {
        day: 18,
        title: "RAG as an agent tool",
        time: "45 min",
        tag: "Build",
        tagColor: "#f59e0b",
        what: "Take your Week 2 RAG app. Expose it as a tool. Build an agent that can search documents OR answer from general knowledge.",
        why: "This is a real production pattern. You now have a multi-capability agent.",
        concept: "Agent tools: search_documents(query), answer_general(question). The LLM decides which to call. This is how enterprise AI assistants work.",
      },
      {
        day: 19,
        title: "LangChain agents quickstart",
        time: "45 min",
        tag: "Hands-on",
        tagColor: "#10b981",
        what: "Rebuild your Day 16 agent using LangChain's agent framework in 30 min.",
        why: "LangChain is mentioned in most job descriptions. Now you can say you've used it.",
        concept: "LangChain abstracts the tool-calling loop. You define tools, create an agent, call agent.invoke(). Less boilerplate for the same result.",
      },
      {
        day: 20,
        title: "Learn what you DON'T need yet",
        time: "30 min",
        tag: "Strategy",
        tagColor: "#ec4899",
        what: "Read about LangGraph, CrewAI, AutoGen. Understand what they do. Don't build yet.",
        why: "You need to know these exist and what problem they solve — you don't need to build with them for entry-level interviews.",
        concept: "LangGraph = multi-step agent workflows with state. CrewAI = multiple agents with roles. AutoGen = agent conversations. These are Week 9+ from the 90-day plan — for now, just know the names.",
      },
      {
        day: 21,
        title: "Practice explaining agents out loud",
        time: "30 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Answer these out loud: (1) How do agents work? (2) What's the difference between a chatbot and an agent?",
        why: "These questions separate candidates who built something from those who just read about it.",
        concept: "Chatbot = fixed flow, one response per input. Agent = dynamic, can take multiple actions, use tools, and loop until the task is done.",
      },
    ],
  },
  {
    week: 4,
    title: "Interview Prep — Get Confident, Start Applying",
    color: "#ec4899",
    goal: "By Day 30: Applications sent, projects live, and you can answer the top 5 questions cold.",
    confidence: "I'm ready to interview for Gen AI roles",
    days: [
      {
        day: 22,
        title: "GitHub cleanup day",
        time: "45 min",
        tag: "Portfolio",
        tagColor: "#8b5cf6",
        what: "Pin your 2 AI projects. Add a profile README. Make sure repos are public with description + live link.",
        why: "Recruiters look at your GitHub before the interview. First impressions matter.",
        concept: "Project 1: AI Chatbot with streaming (live URL). Project 2: Chat with PDF / RAG app (live URL). These are your proof.",
      },
      {
        day: 23,
        title: "Write README for chatbot project",
        time: "45 min",
        tag: "Portfolio",
        tagColor: "#8b5cf6",
        what: "Write a README: What it does, how to run it, tech stack, architecture diagram (even a simple text diagram), screenshot.",
        why: "A good README shows engineering maturity. Most candidates don't have one.",
        concept: "Structure: What → Why → How → Demo → Architecture → Tech stack → Setup.",
      },
      {
        day: 24,
        title: "Write README for RAG project",
        time: "45 min",
        tag: "Portfolio",
        tagColor: "#8b5cf6",
        what: "Same README structure for your RAG app. Add: 'How RAG works' explanation with a diagram.",
        why: "Explaining RAG in your README shows depth. Interviewers read READMEs.",
        concept: "Add a section: 'How it works: User uploads PDF → chunks into 500-char pieces → embedded with text-embedding-3-small → stored in ChromaDB → query embedded and matched → top 3 chunks + question sent to GPT-4 → answer returned with source.'",
      },
      {
        day: 25,
        title: "Update LinkedIn",
        time: "30 min",
        tag: "Visibility",
        tagColor: "#06b6d4",
        what: "New headline: 'AI Application Engineer | React + Gen AI'. Add AI projects to experience. Post one project screenshot.",
        why: "Recruiters search LinkedIn daily for 'Gen AI' + 'React'. You need to show up.",
        concept: "In the About section: 'I build AI-powered applications using LLMs, RAG pipelines, and agent frameworks. Background in React/Node.js — I ship end-to-end AI products.'",
      },
      {
        day: 26,
        title: "System design: AI support bot",
        time: "60 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Design out loud (or on paper): 'Build a customer support AI that answers from our docs and escalates complex issues'",
        why: "This system design question is asked at 60%+ of Gen AI interviews. Practice it cold.",
        concept: "Your answer: User message → Agent → tool: search_docs(RAG) → if found: answer with citation → if not found: tool: escalate_to_human → log conversation. Add: rate limiting, feedback loop, monitoring with LangSmith.",
      },
      {
        day: 27,
        title: "The 5 questions drill",
        time: "45 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Answer all 5 interview questions back-to-back without pausing. Time yourself. Under 2 min each.",
        why: "Fluency under pressure comes from repetition. Do this 3 times today.",
        concept: "See the Interview Cheat Sheet section below. These are your must-know answers.",
      },
      {
        day: 28,
        title: "Mock interview with a friend",
        time: "60 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        what: "Ask a friend (or record yourself) doing a 30-min mock interview. Answer questions, then demo your projects.",
        why: "Saying it out loud to someone else reveals gaps that practice alone doesn't.",
        concept: "Ask them to ask: 'Walk me through your RAG app' + 'How do agents work?' + 'Design a document Q&A system'. Debrief together.",
      },
      {
        day: 29,
        title: "Research 10 companies",
        time: "45 min",
        tag: "Job Hunt",
        tagColor: "#10b981",
        what: "Find 10 companies hiring Gen AI engineers. Note what stack they use. Tailor your LinkedIn headline if needed.",
        why: "Focused targeting beats spray-and-pray. 10 good applications > 50 bad ones.",
        concept: "Target: AI startups (Series A-C), YC companies, product companies with AI features. Avoid pure consulting for first role — you want to build product.",
      },
      {
        day: 30,
        title: "Apply + keep the momentum",
        time: "60 min",
        tag: "Ship it",
        tagColor: "#ec4899",
        what: "Send your first 5 applications. Set a target: 3 applications per day going forward. Keep learning while interviewing.",
        why: "The 30 days built your foundation. Now interviews will teach you what to learn next.",
        concept: "You are NOT starting from zero. You have: 2 live AI projects, understand RAG and agents, can explain LLMs clearly, and have a JS/React foundation most AI candidates lack. You are ready.",
      },
    ],
  },
];

const INTERVIEW_QA = [
  {
    q: "What is RAG and why would you use it?",
    a: "RAG stands for Retrieval Augmented Generation. Instead of relying on the LLM's training data, you retrieve relevant context from your own documents and inject it into the prompt. You use RAG when you have domain-specific data that changes often, when you need the LLM to cite sources, or when fine-tuning is too expensive. The flow is: chunk documents → embed → store in vector DB → at query time, embed the question → find similar chunks → pass to LLM with the question.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "What are embeddings?",
    a: "Embeddings are numerical representations of text — specifically, a list of floating point numbers (a vector). The key property is that semantically similar text produces similar vectors. So 'dog' and 'puppy' will have vectors close to each other in vector space, while 'dog' and 'finance' will be far apart. This lets us do semantic search: embed a query, find the closest stored embeddings, and retrieve the matching text.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "How do AI agents work?",
    a: "An AI agent is an LLM that can take actions by calling tools. You describe available tools (functions) to the LLM. When the user asks a question, the LLM decides which tool to call and with what arguments. You execute the function and return the result. The LLM uses the result to either call another tool or generate a final answer. This loop — Reason, Act, Observe — repeats until the task is complete. It's called the ReAct pattern.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "RAG vs Fine-tuning — when to use which?",
    a: "Use RAG when: your knowledge changes frequently, you have specific documents the model doesn't know about, you need citations, or cost is a concern. Use fine-tuning when: you need to change how the model behaves or speaks (tone, format), when you have thousands of high-quality examples, or when you need a specific task done very fast with a smaller model. In practice, most production apps use RAG. Fine-tuning is for style and behavior, not knowledge.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "How would you design a customer support AI system?",
    a: "I'd build an agent-based system. Flow: user message → router agent decides: is this answerable from docs? → if yes: RAG tool searches knowledge base → return answer with source citation. If no: escalation tool creates a ticket or transfers to human. Key components: vector DB with product docs (ChromaDB/Pinecone), LLM with tool calling, conversation memory, confidence threshold for escalation, LangSmith/LangFuse for monitoring, feedback loop to improve the knowledge base over time.",
    difficulty: "Senior Level",
    color: "#f59e0b",
  },
];

const TOTAL_DAYS = WEEKS.reduce((sum, w) => sum + w.days.length, 0);

export default function InterviewTrack() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TRACK_STORAGE_KEY) || "{}");
    } catch { return {}; }
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes checkPop{0%{transform:scale(0.7)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
      @keyframes fadeSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      @keyframes glow30{0%,100%{box-shadow:0 0 0 rgba(16,185,129,0)}50%{box-shadow:0 0 16px rgba(16,185,129,0.3)}}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(TRACK_STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((completedCount / TOTAL_DAYS) * 100);

  const weekProgress = (week) => {
    const done = week.days.filter(d => checked[`day-${d.day}`]).length;
    return { done, total: week.days.length, pct: Math.round((done / week.days.length) * 100) };
  };

  const getReadinessScore = () => {
    const week2Done = WEEKS[1].days.filter(d => checked[`day-${d.day}`]).length;
    const week3Done = WEEKS[2].days.filter(d => checked[`day-${d.day}`]).length;
    const week4Done = WEEKS[3].days.filter(d => checked[`day-${d.day}`]).length;
    let score = 0;
    if (completedCount >= 7) score++;
    if (week2Done >= 5) score++;
    if (week3Done >= 3) score++;
    if (week4Done >= 2) score++;
    if (completedCount >= 25) score++;
    return score;
  };

  const readiness = getReadinessScore();
  const readinessLabel = ["Not yet", "Getting there", "Almost ready", "Nearly ready", "Ready!", "Interview ready!"][readiness];
  const readinessColor = ["#475569", "#f59e0b", "#f59e0b", "#06b6d4", "#10b981", "#10b981"][readiness];

  const nextDay = (() => {
    for (const week of WEEKS) {
      for (const day of week.days) {
        if (!checked[`day-${day.day}`]) return { day, week };
      }
    }
    return null;
  })();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* HEADER */}
      <div style={{ padding: "36px 20px 10px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>
          30-Day Interview Fast Track
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
          Crack Gen AI Interviews <span style={{ color: "#10b981" }}>in 30 Days</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 460, margin: "8px auto 0", lineHeight: 1.6 }}>
          1 hour a day. 2 live projects. 5 interview questions mastered.<br />
          You already know React — you're closer than you think.
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 40px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Days Done</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#10b981", fontFamily: "monospace" }}>{completedCount}</div>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>/ {TOTAL_DAYS}</div>
          </div>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Progress</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#06b6d4", fontFamily: "monospace" }}>{pct}%</div>
            <div style={{ fontSize: 10, color: "#475569" }}>complete</div>
          </div>
          <div style={{ background: "#111318", border: `1px solid ${readinessColor}30`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Readiness</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: readinessColor }}>{readinessLabel}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 5 }}>
              {[0,1,2,3,4].map(i => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < readiness ? readinessColor : "#1e2330", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
        </div>

        {/* OVERALL PROGRESS BAR */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Overall Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? "#10b981" : "#94a3b8" }}>{completedCount}/{TOTAL_DAYS} days</span>
          </div>
          <div style={{ height: 8, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #10b981, #06b6d4)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
          {/* Week mini bars */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
            {WEEKS.map(w => {
              const wp = weekProgress(w);
              return (
                <div key={w.week}>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, fontWeight: 600 }}>Wk {w.week} · {wp.done}/{wp.total}</div>
                  <div style={{ height: 4, background: "#1a1f2e", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${wp.pct}%`, background: w.color, borderRadius: 99, transition: "width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEXT UP */}
        {nextDay && (
          <div style={{
            background: `linear-gradient(135deg, ${nextDay.week.color}08, ${nextDay.week.color}04)`,
            border: `1px solid ${nextDay.week.color}30`,
            borderRadius: 12, padding: "14px 18px", marginBottom: 16,
            cursor: "pointer",
          }}
            onClick={() => setExpandedDay(expandedDay === nextDay.day.day ? null : nextDay.day.day)}
          >
            <div style={{ fontSize: 10, color: nextDay.week.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>
              Today's Task · Day {nextDay.day.day}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{nextDay.day.title}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
              {nextDay.day.time} · {nextDay.day.tag} · Click to expand
            </div>
          </div>
        )}

        {/* INTERVIEW CHEAT SHEET TOGGLE */}
        <button
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          style={{
            width: "100%", padding: "12px 18px", marginBottom: 16,
            background: showCheatSheet ? "rgba(139,92,246,0.1)" : "#111318",
            border: `1px solid ${showCheatSheet ? "rgba(139,92,246,0.4)" : "#1e2330"}`,
            borderRadius: 12, color: "#8b5cf6", fontSize: 13, fontWeight: 700,
            cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span>Interview Cheat Sheet — 5 Questions You WILL Get Asked</span>
          <span style={{ fontSize: 16 }}>{showCheatSheet ? "▲" : "▼"}</span>
        </button>

        {showCheatSheet && (
          <div style={{ marginBottom: 20, animation: "fadeSlide 0.2s ease-out" }}>
            {INTERVIEW_QA.map((qa, i) => (
              <div key={i} style={{
                background: "#111318",
                border: `1px solid ${expandedQ === i ? qa.color + "40" : "#1e2330"}`,
                borderRadius: 12, marginBottom: 8, overflow: "hidden", transition: "border-color 0.2s",
              }}>
                <div
                  onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: qa.color + "15", color: qa.color, textTransform: "uppercase", letterSpacing: 1 }}>{qa.difficulty}</span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.4 }}>{qa.q}</div>
                  </div>
                  <span style={{ color: "#475569", fontSize: 14, flexShrink: 0, marginTop: 2 }}>{expandedQ === i ? "▲" : "▼"}</span>
                </div>
                {expandedQ === i && (
                  <div style={{ padding: "0 18px 16px", borderTop: "1px solid #1e2330", animation: "fadeSlide 0.15s ease-out" }}>
                    <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                      {qa.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* WEEK SECTIONS */}
        {WEEKS.map(week => {
          const wp = weekProgress(week);
          return (
            <div key={week.week} style={{ marginBottom: 20 }}>
              {/* Week header */}
              <div style={{
                background: `linear-gradient(135deg, ${week.color}10, ${week.color}06)`,
                border: `1px solid ${week.color}25`,
                borderRadius: 14, padding: "16px 18px", marginBottom: 10,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: week.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: week.color }}>
                        {wp.pct === 100 ? "✓" : week.week}
                      </div>
                      <span style={{ fontSize: 11, color: week.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>
                        Week {week.week} · {wp.done}/{wp.total} days done
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{week.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.5 }}>{week.goal}</div>
                  </div>
                  <div style={{
                    padding: "6px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                    background: wp.pct === 100 ? week.color + "20" : "#0d1017",
                    border: `1px solid ${wp.pct === 100 ? week.color + "50" : "#1e2330"}`,
                    color: wp.pct === 100 ? week.color : "#64748b",
                    flexShrink: 0,
                  }}>
                    {wp.pct === 100 ? `✓ ${week.confidence}` : `Goal: ${week.confidence}`}
                  </div>
                </div>
              </div>

              {/* Day cards */}
              {week.days.map(day => {
                const id = `day-${day.day}`;
                const isDone = !!checked[id];
                const isExpanded = expandedDay === day.day;
                const isNext = nextDay?.day.day === day.day;

                return (
                  <div key={day.day} style={{
                    background: isDone ? `${week.color}06` : "#111318",
                    border: `1px solid ${isDone ? week.color + "25" : isNext ? week.color + "20" : "#1e2330"}`,
                    borderRadius: 11, marginBottom: 7, overflow: "hidden", transition: "all 0.2s",
                  }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer" }}
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    >
                      {/* Checkbox */}
                      <div
                        onClick={(e) => { e.stopPropagation(); toggle(id); }}
                        style={{
                          width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                          border: isDone ? `2px solid ${week.color}` : "2px solid #2a3040",
                          background: isDone ? week.color + "25" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s",
                          animation: isDone ? "checkPop 0.3s ease-out" : "none",
                        }}
                      >
                        {isDone && (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2.5 7L5 9.5L10.5 3.5" stroke={week.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      {/* Day number */}
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        background: isNext && !isDone ? week.color + "20" : "#0d1017",
                        border: `1px solid ${isNext && !isDone ? week.color + "40" : "#1a1f2e"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, color: isNext && !isDone ? week.color : "#475569",
                        fontFamily: "monospace",
                      }}>
                        {day.day}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: isDone ? "#475569" : "#e2e8f0", textDecoration: isDone ? "line-through" : "none" }}>
                            {day.title}
                          </span>
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: day.tagColor + "15", color: day.tagColor, fontWeight: 700, flexShrink: 0 }}>
                            {day.tag}
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{day.time} · {isDone ? "Done ✓" : isNext ? "Do this today" : "Upcoming"}</div>
                      </div>

                      <span style={{ color: "#475569", fontSize: 13, flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #1e2330", padding: "14px 16px 16px", animation: "fadeSlide 0.15s ease-out" }}>
                        {/* What to do */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: week.color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>What to do</div>
                          <p style={{ fontSize: 13.5, color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>{day.what}</p>
                        </div>

                        {/* Why */}
                        <div style={{ marginBottom: day.concept || day.code ? 12 : 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Why this matters</div>
                          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{day.why}</p>
                        </div>

                        {/* Concept */}
                        {day.concept && (
                          <div style={{ marginBottom: day.code ? 12 : 0 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Key concept to remember</div>
                            <div style={{ background: "#0d1017", border: "1px solid #1e2330", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6 }}>
                              {day.concept}
                            </div>
                          </div>
                        )}

                        {/* Code snippet */}
                        {day.code && (
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#06b6d4", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Starter code</div>
                            <pre style={{
                              background: "#0d1017", border: "1px solid #1e2330", borderRadius: 8,
                              padding: "12px 14px", fontSize: 11.5, color: "#7dd3fc", lineHeight: 1.6,
                              overflow: "auto", margin: 0, whiteSpace: "pre-wrap",
                            }}>
                              {day.code}
                            </pre>
                          </div>
                        )}

                        {/* Mark done button */}
                        <button
                          onClick={() => toggle(id)}
                          style={{
                            marginTop: 14, padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                            background: isDone ? "#1a1f2e" : week.color + "20",
                            border: `1px solid ${isDone ? "#2a3040" : week.color + "50"}`,
                            color: isDone ? "#64748b" : week.color,
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          {isDone ? "Mark as not done" : "Mark Day " + day.day + " as done ✓"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* FOOTER */}
        {completedCount === TOTAL_DAYS ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.1))",
            border: "1px solid rgba(16,185,129,0.4)", borderRadius: 16, padding: "28px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>You're Interview Ready!</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 8, maxWidth: 400, margin: "8px auto 0", lineHeight: 1.6 }}>
              30 days. 2 live projects. 5 interview questions mastered. Your React foundation + Gen AI skills = exactly what companies are hiring for right now. Go get it.
            </p>
          </div>
        ) : (
          <div style={{
            background: "#111318", border: "1px solid #1e2330", borderRadius: 16,
            padding: "24px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0" }}>1 hour a day. That's all.</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 6, maxWidth: 400, margin: "6px auto 0", lineHeight: 1.6 }}>
              {TOTAL_DAYS - completedCount} days left. Every day you complete is a concept you can explain confidently in an interview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
