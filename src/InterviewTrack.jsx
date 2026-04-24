import { useState, useEffect } from "react";

const STORAGE_KEY = "ai-interview-15day-v2";

const PHASES = [
  {
    phase: 1,
    title: "Core AI Building Blocks",
    color: "#10b981",
    goal: "By Day 5: You understand how LLMs work, what embeddings are, and can explain RAG end-to-end.",
    days: [
      {
        day: 1,
        title: "How LLMs Actually Work",
        time: "50 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand what an LLM is under the hood. Learn: tokens, context window, temperature, top-p, system prompts. Then make your first API call.",
        handson: "Call OpenAI or Anthropic API from JS/Python. Send a message, change temperature from 0 to 1 and see the difference. Add a system prompt and see how it changes the response.",
        concept: "LLM = a neural network trained to predict the next token given all previous tokens. At inference: you give it a prompt → it predicts token by token → that's the response. Temperature controls randomness (0 = deterministic, 1 = creative). Context window = max tokens it can see at once (GPT-4o = 128k tokens). System prompt = persistent instructions that shape all responses.",
        quickAnswer: "An LLM is trained to predict the next token based on patterns learned from massive text data. At runtime, it generates responses one token at a time. Temperature controls creativity — 0 gives consistent output, higher values give more varied responses.",
        interviewQ: "What is an LLM and how does it generate responses?",
        code: `// JS — your first LLM call
const res = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_KEY', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    temperature: 0.7,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain RAG in one sentence.' }
    ]
  })
});
const data = await res.json();
console.log(data.choices[0].message.content);`,
      },
      {
        day: 2,
        title: "Prompt Engineering — Control LLM Output",
        time: "45 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Master the 4 prompting techniques that come up in every interview: few-shot, chain-of-thought, JSON mode, and role prompting.",
        handson: "Write a prompt that extracts structured data from unstructured text using JSON mode. Try the same task with zero-shot vs few-shot and compare quality.",
        concept: "Zero-shot = just ask. Few-shot = give 2-3 examples in the prompt (dramatically improves accuracy). Chain-of-thought = ask it to 'think step by step' before answering (improves reasoning). JSON mode = force structured output (critical for production apps). Role prompting = 'You are a senior software engineer...' sets the persona and quality level. Prompt = system + user messages. Keep system prompt focused. Be explicit about format.",
        quickAnswer: "Prompt engineering is about giving the LLM clear instructions and context. Few-shot examples show it the pattern. Chain-of-thought improves reasoning. JSON mode ensures structured output. The goal is reliable, consistent responses you can build on.",
        interviewQ: "How do you improve LLM output quality and consistency?",
        code: `// Few-shot + JSON mode example
const prompt = {
  model: 'gpt-4o-mini',
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: 'Extract data as JSON. Example: "John, 25, engineer" → {"name":"John","age":25,"role":"engineer"}' },
    { role: 'user', content: 'Sarah, 30, data scientist at Google' }
  ]
};`,
      },
      {
        day: 3,
        title: "Embeddings — Text as Numbers",
        time: "50 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand what embeddings are, why similar text produces similar vectors, and how cosine similarity works. Then generate real embeddings and compare them.",
        handson: "Use OpenAI embeddings API: embed 'dog', 'puppy', and 'finance'. Calculate cosine similarity between each pair. See that dog-puppy similarity is ~0.93 and dog-finance is ~0.6. That moment is when it clicks.",
        concept: "Embedding = converting text into a list of ~1500 numbers (a vector) that captures semantic meaning. Key property: similar meaning = similar vector = small distance in vector space. Cosine similarity measures angle between vectors (1.0 = identical, 0 = unrelated). This is the foundation of ALL semantic search and RAG. Models: text-embedding-3-small (OpenAI, fast, cheap), sentence-transformers (open source, self-hosted).",
        quickAnswer: "Embeddings convert text into high-dimensional numerical vectors where semantic similarity is preserved as geometric proximity. Words or sentences with similar meaning cluster together in vector space. This enables similarity search — find documents relevant to a query by finding the closest vectors.",
        interviewQ: "What are embeddings and how do they enable semantic search?",
        code: `// Generate and compare embeddings
import openai, numpy as np

client = openai.OpenAI()

def embed(text):
    res = client.embeddings.create(model="text-embedding-3-small", input=text)
    return res.data[0].embedding

def cosine_sim(a, b):
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

dog = embed("dog")
puppy = embed("puppy")
finance = embed("finance")

print(cosine_sim(dog, puppy))    # ~0.93 — very similar
print(cosine_sim(dog, finance))  # ~0.6  — not related`,
      },
      {
        day: 4,
        title: "Vector Databases — Storing & Searching Embeddings",
        time: "45 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand what a vector DB does, how ANN (approximate nearest neighbour) search works, and the difference between ChromaDB and Pinecone. Set up ChromaDB and run a similarity query.",
        handson: "Create a ChromaDB collection. Add 10 sentences about different topics. Query it with a natural language question. See which sentences it retrieves and why.",
        concept: "Vector DB = a database optimised for storing and querying embeddings. Normal DB: WHERE name = 'John' (exact). Vector DB: find the 5 most similar vectors to this query vector (semantic). ANN = Approximate Nearest Neighbour — fast similarity search using HNSW index. ChromaDB = local, free, great for dev/demo. Pinecone = managed cloud, production scale, namespaces, metadata filtering. Metadata = attach extra data to each vector (source file, page number, date) for filtering.",
        quickAnswer: "A vector database stores embeddings and enables fast similarity search using approximate nearest neighbour algorithms. Unlike traditional DBs that do exact matches, vector DBs find semantically similar content. You embed a query and retrieve the closest stored vectors.",
        interviewQ: "What is a vector database and when would you use one?",
        code: `import chromadb

client = chromadb.Client()
col = client.create_collection("docs")

col.add(
    documents=["Python is a programming language", "LLMs generate text token by token", "AWS S3 stores objects"],
    ids=["d1", "d2", "d3"]
)

results = col.query(query_texts=["how do language models work?"], n_results=2)
print(results["documents"])  # Returns the 2 most semantically similar docs`,
      },
      {
        day: 5,
        title: "RAG — Build It End-to-End",
        time: "60 min",
        tag: "Must Build",
        tagColor: "#f59e0b",
        what: "Build a complete RAG pipeline from scratch. Upload a document → chunk it → embed each chunk → store in ChromaDB → embed a question → retrieve top 3 chunks → send to LLM with context → get a grounded answer.",
        handson: "Take any PDF or text file. Build the full RAG pipeline in Python. Ask it a question that isn't in the LLM's training data. See it answer correctly from your document. This is the moment everything connects.",
        concept: "RAG = Retrieval Augmented Generation. Problem it solves: LLMs don't know YOUR data. Solution: at query time, retrieve relevant context from your documents and inject it into the prompt. Pipeline: (1) Ingestion: load doc → chunk (500 chars, 50 overlap) → embed each chunk → store in vector DB. (2) Retrieval: embed query → find top-k similar chunks → (3) Generation: prompt = system + retrieved chunks + user question → LLM answers from context. Why RAG over fine-tuning: cheaper, updatable, no retraining, provides citations.",
        quickAnswer: "RAG solves the problem of LLMs not knowing your specific data. You split documents into chunks, embed them, and store in a vector DB. At query time, embed the question, retrieve the most relevant chunks, inject them into the prompt, and the LLM answers from that context. Key advantages: no retraining, works with fresh data, can cite sources.",
        interviewQ: "What is RAG, how does it work end-to-end, and why use it over fine-tuning?",
        code: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma

# 1. INGESTION
with open("document.txt") as f:
    text = f.read()

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_text(text)

vectordb = Chroma.from_texts(chunks, OpenAIEmbeddings())

# 2. RETRIEVAL + GENERATION
def ask(question):
    docs = vectordb.similarity_search(question, k=3)
    context = "\n\n".join([d.page_content for d in docs])
    llm = ChatOpenAI(model="gpt-4o-mini")
    return llm.invoke(f"Answer using ONLY this context:\n{context}\n\nQuestion: {question}")

print(ask("What does the document say about X?"))`,
      },
    ],
  },
  {
    phase: 2,
    title: "Agents, Tools & Frameworks",
    color: "#06b6d4",
    goal: "By Day 10: You can build agents with tools, explain LangChain, and describe LangGraph to any interviewer.",
    days: [
      {
        day: 6,
        title: "Chunking Strategies — Why They Make or Break RAG",
        time: "40 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand why chunk size and overlap are critical to RAG quality. Learn the 4 main strategies. Know which one to recommend in an interview.",
        handson: "Take the same document. Chunk it at size 200, 500, and 1500. Run the same RAG query each time. Observe how retrieval quality changes. This is the most overlooked RAG concept.",
        concept: "Chunking = how you split documents before embedding. Strategies: (1) Fixed-size: split every N characters — simple but cuts mid-sentence. (2) Recursive character: split by paragraph → sentence → word — respects natural boundaries (recommended). (3) Semantic: split when topic changes — best quality, slowest. (4) Sliding window: chunks with overlap so context isn't lost at boundaries. Chunk size tradeoff: small = precise retrieval, loses context. Large = more context, noisier retrieval. Overlap = 10-15% of chunk size. Rule of thumb: 500-1000 chars, 50-100 overlap for most use cases.",
        quickAnswer: "Chunking strategy directly affects RAG quality. Recursive character splitting is the default recommendation — it respects sentence and paragraph boundaries. Chunk size trades off between precision (small) and context (large). Overlap prevents losing information at chunk boundaries. I typically start with 500-1000 characters and 10% overlap, then tune based on retrieval quality.",
        interviewQ: "How do you decide on chunking strategy for a RAG pipeline?",
      },
      {
        day: 7,
        title: "Function Calling & Tool Use — The Agent Foundation",
        time: "50 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand how function/tool calling works at the API level. The LLM doesn't run code — it decides what to call and you run it. Build a 2-tool agent (calculator + weather).",
        handson: "Define two functions: get_weather(city) and calculate(expression). Describe them to the LLM. Ask 'What's 20% of 850 and is it raining in Mumbai?' — watch the LLM call both tools and combine the results.",
        concept: "Tool calling flow: (1) You describe available functions in the API call. (2) LLM reads the user message and decides: do I need a tool? (3) If yes: LLM returns JSON with {function: 'get_weather', args: {city: 'Mumbai'}} — it does NOT run the code. (4) You execute the function. (5) You send the result back to the LLM. (6) LLM generates the final answer. Key insight: the LLM is the decision-maker, your code is the executor. This is the core mechanic of every AI agent.",
        quickAnswer: "Tool calling lets you give the LLM access to external functions. You describe the functions, the LLM decides which to call and with what arguments — but it doesn't execute anything. Your code runs the function and returns the result. The LLM uses the result to generate the final answer. This decouples reasoning from execution.",
        interviewQ: "How does function/tool calling work in LLMs?",
        code: `import openai, json

client = openai.OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}
    }
}]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "What's the weather in Mumbai?"}],
    tools=tools
)

# LLM returns: tool_calls = [{function: {name: "get_weather", arguments: '{"city":"Mumbai"}'}}]
tool_call = response.choices[0].message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
result = get_weather(args["city"])   # YOU run this
print(f"LLM wants to call: {tool_call.function.name} with {args}")`,
      },
      {
        day: 8,
        title: "AI Agents + ReAct Pattern",
        time: "50 min",
        tag: "Core Concept",
        tagColor: "#10b981",
        what: "Understand the full agent loop: Thought → Action → Observation → repeat. Build a multi-step agent that uses RAG search + a calculator tool to answer a complex question.",
        handson: "Build an agent with 3 tools: search_docs (your RAG from Day 5), calculate, and get_current_date. Ask it a question that requires multiple tool calls to answer. Watch the loop in action.",
        concept: "Agent = LLM + tools + a loop. ReAct (Reason + Act) loop: (1) Thought: LLM reasons about what to do next. (2) Action: LLM calls a tool. (3) Observation: your code returns the tool result. (4) Repeat until the LLM decides it has enough to answer. Chatbot vs Agent: chatbot = one response per input. Agent = multiple actions, multiple tools, loops until done. Agent = dynamic. Key concepts: planning (what to do), tool selection (which tool), error handling (what if a tool fails), stopping condition (when is the task done).",
        quickAnswer: "An AI agent is an LLM that can take actions in a loop. Using the ReAct pattern: the model reasons about what step to take, calls a tool (Action), receives the result (Observation), and repeats until it has enough information to give a final answer. Unlike a chatbot that responds once, an agent can take many steps to complete complex tasks.",
        interviewQ: "What is an AI agent and how does the ReAct pattern work?",
      },
      {
        day: 9,
        title: "LangChain — Why It Exists & What It Does",
        time: "45 min",
        tag: "Framework",
        tagColor: "#8b5cf6",
        what: "Understand what LangChain solves and what its core abstractions are. Rebuild your RAG app from Day 5 using LangChain in half the code. Know when NOT to use it.",
        handson: "Rebuild Day 5's RAG pipeline using LangChain's RetrievalQA chain. Then rebuild your Day 8 agent using LangChain's AgentExecutor. Compare the boilerplate saved.",
        concept: "LangChain = a framework that abstracts common LLM patterns. Core pieces: (1) LLMs/Chat Models — unified interface to OpenAI, Anthropic, etc. (2) Prompts — PromptTemplates with variables. (3) Chains — connect LLM + prompt + output parser. (4) Retrievers — abstract over vector DBs. (5) Agents + Tools — ReAct loop in 5 lines. (6) Memory — conversation history management. When to use: prototyping, standard RAG/agent patterns. When NOT to use: when you need full control, complex custom logic, performance-critical paths (adds overhead). LangGraph is preferred for production agents.",
        quickAnswer: "LangChain provides abstractions for common LLM patterns — prompts, chains, retrievers, agents. It saves boilerplate when building RAG pipelines and agents. The tradeoff is less control and added complexity for non-standard use cases. For production agents with complex state, I'd use LangGraph instead.",
        interviewQ: "What is LangChain and when would you use or avoid it?",
        code: `from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Entire RAG pipeline in 5 lines
vectordb = Chroma.from_texts(chunks, OpenAIEmbeddings())
qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    retriever=vectordb.as_retriever(search_kwargs={"k": 3})
)
print(qa.invoke("What does the document say about X?"))`,
      },
      {
        day: 10,
        title: "LangGraph — Stateful Agent Workflows",
        time: "50 min",
        tag: "Framework",
        tagColor: "#8b5cf6",
        what: "Understand why LangGraph exists (stateful, controllable agents). Learn nodes, edges, state, and conditional routing. Build a simple 3-node agent graph.",
        handson: "Build a graph: input_node → decide_node (tool needed? yes/no) → tool_node or answer_node. This is the pattern behind every production agent at companies like Nurix.",
        concept: "LangGraph = build agents as directed graphs with explicit state. Why it's better than vanilla LangChain agents: (1) State is explicit — you control what's remembered between steps. (2) Cycles are explicit — you define exactly when to loop. (3) Human-in-the-loop — pause and wait for human approval at any node. (4) Debugging — trace exactly which node ran and why. Key concepts: State = shared dict passed between nodes. Nodes = functions that read/write state. Edges = connections between nodes. Conditional edges = route to different nodes based on state. END = terminal node. Used in production by: most serious AI startups building multi-step agents.",
        quickAnswer: "LangGraph lets you build agents as directed graphs with explicit state. Each node is a function that reads and writes shared state. Conditional edges let you route between nodes based on state — for example, loop back to a tool node if more information is needed, or go to a final answer node when done. It's the production standard for complex agent workflows.",
        interviewQ: "What is LangGraph and how does it differ from standard LangChain agents?",
        code: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    question: str
    tool_result: str
    answer: str
    needs_tool: bool

def decide(state):
    # LLM decides if tool is needed
    state["needs_tool"] = "weather" in state["question"].lower()
    return state

def use_tool(state):
    state["tool_result"] = get_weather("Mumbai")  # your function
    return state

def answer(state):
    context = state.get("tool_result", "")
    state["answer"] = llm.invoke(f"Context: {context}\nQ: {state['question']}")
    return state

graph = StateGraph(State)
graph.add_node("decide", decide)
graph.add_node("tool", use_tool)
graph.add_node("answer", answer)
graph.set_entry_point("decide")
graph.add_conditional_edges("decide", lambda s: "tool" if s["needs_tool"] else "answer")
graph.add_edge("tool", "answer")
graph.add_edge("answer", END)
app = graph.compile()`,
      },
    ],
  },
  {
    phase: 3,
    title: "Interview Mastery",
    color: "#ec4899",
    goal: "By Day 15: You can answer any Gen AI interview question cold, design systems on a whiteboard, and explain your projects confidently.",
    days: [
      {
        day: 11,
        title: "RAG vs Fine-tuning vs Prompt Engineering",
        time: "40 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        what: "Master the decision framework: when do you use each approach? This is asked in ~70% of senior Gen AI interviews.",
        handson: "Write out 5 hypothetical scenarios (e.g., 'a bank wants its chatbot to answer from internal docs'). For each, decide which approach and justify it. This is exactly what an interviewer will ask.",
        concept: "Three tools, three different problems: Prompt Engineering = improve behaviour with better instructions. No cost, no training, try this first always. Fine-tuning = change how the model responds (tone, format, style). NOT for injecting knowledge — the model forgets fine-tuning over time on new data. Use when: you have 100+ high-quality examples, need consistent format/style, want a smaller cheaper model to do a specific task. RAG = inject knowledge the model doesn't have. Use when: domain-specific data, frequently updated data, need citations, can't afford fine-tuning. Combined: fine-tune for style + RAG for knowledge = best of both worlds.",
        quickAnswer: "Start with prompt engineering — it's free and fast. If the model needs to know YOUR data or the data changes often, use RAG. If you need to change the model's behaviour, style, or make a smaller model do a specialised task reliably, use fine-tuning. They're not mutually exclusive — production systems often combine RAG for knowledge and fine-tuning for format.",
        interviewQ: "When would you choose RAG vs fine-tuning vs prompt engineering?",
      },
      {
        day: 12,
        title: "Hallucinations — What They Are & How to Mitigate",
        time: "45 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        what: "Understand why LLMs hallucinate, the 5 mitigation techniques, and how to evaluate whether your app is hallucinating. This separates junior from senior candidates.",
        handson: "Ask GPT-4o-mini about a made-up topic ('Explain the XYZ theorem from 2023'). See it confidently hallucinate. Then implement grounding with RAG and see it correctly say it doesn't know.",
        concept: "Hallucination = LLM generates confident, plausible-sounding but factually wrong output. Why it happens: LLMs predict tokens based on patterns, not facts. They optimise for fluency, not accuracy. Mitigation strategies: (1) RAG — ground responses in retrieved documents. (2) Temperature 0 — more deterministic for factual tasks. (3) Ask for citations — 'answer based only on this context'. (4) Self-consistency — generate N answers, pick the most common. (5) Output validation — use another LLM call to verify the answer. (6) Constitutional AI — add rules about what the model should/shouldn't claim. Most important: tell the model 'if you don't know, say you don't know' in the system prompt.",
        quickAnswer: "Hallucinations happen because LLMs are trained to produce fluent text, not accurate facts. I mitigate them through: grounding with RAG (answer only from retrieved context), setting temperature to 0 for factual tasks, instructing the model to cite sources and say 'I don't know' when uncertain, and validating outputs with a secondary verification step.",
        interviewQ: "What are LLM hallucinations and how do you prevent them in production?",
      },
      {
        day: 13,
        title: "LLM Evaluation — How Do You Know It's Working?",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        what: "Learn how to evaluate LLM applications systematically. Understand the 4 types of evaluation and which tools to use. This is what separates engineers who ship from those who prototype.",
        handson: "Set up LangSmith (free tier). Run your RAG pipeline with LangSmith tracing enabled. Look at the traces: what was retrieved? What was the full prompt? Where did it go wrong? This is production observability.",
        concept: "LLM eval is hard because there's no single right answer. Approaches: (1) Human eval — most accurate, doesn't scale. (2) LLM-as-judge — use GPT-4 to grade outputs (faithfulness, relevance, completeness). (3) RAG-specific metrics (RAGAS library): Context Recall (did retrieval find the right chunks?), Faithfulness (does the answer come from the context?), Answer Relevancy (does the answer address the question?). (4) Unit tests — write test cases for known answers. Tools: LangSmith (tracing + eval), LangFuse (open source), RAGAS (RAG-specific metrics). Most important metric: user feedback in production.",
        quickAnswer: "I evaluate LLM apps at two levels: retrieval quality (are we getting the right chunks?) and generation quality (is the answer faithful to the context?). For RAG I use RAGAS metrics. For production I use LangSmith for tracing — it shows the full chain trace so I can see exactly what went wrong. I also use LLM-as-judge for automated evaluation at scale.",
        interviewQ: "How do you evaluate and monitor an LLM application in production?",
      },
      {
        day: 14,
        title: "System Design — AI Architecture on a Whiteboard",
        time: "60 min",
        tag: "Interview Prep",
        tagColor: "#ec4899",
        what: "Practice designing 3 complete AI systems end-to-end: (1) Document Q&A for an enterprise, (2) Customer support AI bot, (3) AI code reviewer. For each, draw the architecture and explain every component.",
        handson: "Set a 15-min timer. Design each system on paper. Speak out loud as you draw — explain WHY each component is there. This is exactly what the interview looks like.",
        concept: "Senior AI system design answers always cover: Ingestion pipeline (how does data get in?), Retrieval strategy (RAG? fine-tuning? hybrid?), LLM choice (why GPT-4 vs Claude vs open-source?), Latency (streaming? caching?), Reliability (what if LLM is down?), Cost (token optimisation, caching), Observability (LangSmith/LangFuse), Safety (hallucination mitigation, content filtering). The interviewer wants to see you think about tradeoffs, not memorise components.",
        quickAnswer: "When I design an AI system I think in layers: data ingestion and storage, retrieval strategy, LLM selection and prompt design, streaming and latency, evaluation and monitoring. I justify every choice with a tradeoff. For example: 'I'd use Pinecone over ChromaDB here because this needs to scale to millions of documents, even though ChromaDB is simpler to set up.'",
        interviewQ: "Design a document Q&A system for a 10,000-employee company.",
      },
      {
        day: 15,
        title: "Full Interview Drill — Answer Everything Cold",
        time: "60 min",
        tag: "Final Prep",
        tagColor: "#ec4899",
        what: "Answer all 15 interview questions below back-to-back without pausing or reading notes. Time yourself — each answer should be under 90 seconds. Do this 3 times today.",
        handson: "Record yourself (phone mic is fine) answering all 15 questions. Listen back. The answers that sound unsure or slow = what to review. Ship your best project to a live URL. Update LinkedIn headline to: 'AI Application Engineer | React + Gen AI'.",
        concept: "Confidence in interviews comes from 3 things: (1) You've built it — you can reference real code. (2) You can explain it simply — if you can't explain it simply, you don't understand it. (3) You know the WHY — not just what RAG is, but WHY you'd choose it over fine-tuning in a specific scenario. After 14 days you have all three. The cheat sheet below has every answer. Your job today is to make them your own words.",
        quickAnswer: "You've covered all 15 core Gen AI concepts. You've built RAG, agents, and LangGraph. You can explain embeddings, chunking, hallucination mitigation, and evaluation. You have deployed projects to show. You are ready.",
        interviewQ: "Tell me about yourself and what you've built with Gen AI.",
      },
    ],
  },
];

const ALL_QA = [
  { q: "What is an LLM and how does it generate text?", a: "An LLM is a neural network trained to predict the next token from patterns in massive text data. At inference, it generates responses one token at a time using the input prompt as context. Temperature controls randomness — 0 gives deterministic output, higher values increase creativity. The context window limits how much it can see at once." },
  { q: "What are embeddings and how do they enable semantic search?", a: "Embeddings convert text into high-dimensional vectors where semantic similarity is preserved as geometric proximity. Similar meaning = similar vector = small distance. This enables semantic search: embed a query, find the closest stored vectors, retrieve the matching documents. Unlike keyword search, it understands meaning — 'dog' and 'puppy' match even with different words." },
  { q: "What is RAG and how does it work end-to-end?", a: "RAG = Retrieval Augmented Generation. Solves the problem of LLMs not knowing your data. Ingestion: split docs into chunks → embed each → store in vector DB. At query time: embed the question → retrieve top-k similar chunks → inject into prompt → LLM answers from that context. Result: grounded answers from your data, with citations." },
  { q: "RAG vs Fine-tuning vs Prompt Engineering — when to use each?", a: "Start with prompt engineering — free, instant. Use RAG when the model needs your data (domain docs, frequently updated info, needs citations). Use fine-tuning to change how the model behaves or speaks — not to inject knowledge. They combine well: RAG for knowledge, fine-tuning for style." },
  { q: "How do you decide on chunking strategy for RAG?", a: "Recursive character splitting is the default — it respects sentence and paragraph boundaries. Chunk size trades precision (small) vs context (large). I start at 500-1000 characters with 10% overlap, then tune based on retrieval quality. Small chunks are precise but may lose context. Large chunks reduce precision but preserve more meaning." },
  { q: "What is a vector database?", a: "A database optimised for storing and querying embeddings using ANN (Approximate Nearest Neighbour) algorithms. Unlike exact-match SQL, it finds the N most semantically similar vectors to a query. ChromaDB for local dev, Pinecone for production scale. You attach metadata to each vector for filtering alongside semantic search." },
  { q: "How does function/tool calling work?", a: "You describe available functions to the LLM. It reads the user message and decides which function to call and with what arguments — returning structured JSON. You execute the function and return the result. The LLM uses the result to generate the final answer. The LLM reasons and decides; your code executes." },
  { q: "What is an AI agent and how does ReAct work?", a: "An agent is an LLM in a loop with tools. ReAct = Reason + Act. The model thinks about what to do (Thought), calls a tool (Action), receives the result (Observation), and repeats until it can answer. Unlike a chatbot (one response), an agent takes multiple steps to complete complex tasks." },
  { q: "What is LangChain and when would you NOT use it?", a: "LangChain abstracts common LLM patterns — prompts, chains, retrievers, agents. Good for prototyping and standard RAG/agent patterns. Avoid it when you need full control, complex custom logic, or are building performance-critical paths. For production agents I prefer LangGraph for explicit state control." },
  { q: "What is LangGraph and why is it better for production agents?", a: "LangGraph builds agents as directed graphs with explicit state. Each node is a function that reads/writes shared state. Conditional edges route between nodes. Benefits over vanilla agents: explicit control over state and loops, human-in-the-loop support, better debugging with full traces. Industry standard for production multi-step agents." },
  { q: "What are hallucinations and how do you mitigate them?", a: "LLMs generate fluent but sometimes factually wrong output because they're trained for fluency, not accuracy. Mitigations: ground with RAG (answer only from retrieved context), use temperature 0 for factual tasks, instruct the model to cite sources and say 'I don't know', validate outputs with a secondary LLM check, and always tell the model what NOT to claim." },
  { q: "How do you evaluate an LLM application?", a: "Two levels: retrieval quality (are the right chunks retrieved?) and generation quality (is the answer faithful to context?). For RAG I use RAGAS metrics: faithfulness, context recall, answer relevancy. For observability I use LangSmith to trace full chain runs. LLM-as-judge for automated evaluation at scale. Production: user feedback is the most important signal." },
  { q: "Design a document Q&A system for an enterprise.", a: "Users upload docs → S3 storage → async pipeline: SQS queue → Lambda chunks + embeds → Pinecone. At query: FastAPI endpoint → embed question → Pinecone similarity search → top 5 chunks → GPT-4 prompt with context → streaming response with citations. Monitoring: LangSmith for traces, CloudWatch for infra. Security: docs per-user namespaced in Pinecone, IAM roles, no API keys in code." },
  { q: "What is streaming and how does it work in LLM apps?", a: "Streaming sends tokens as they're generated instead of waiting for the full response. The API returns a stream of server-sent events (SSE). You read chunks as they arrive and push to the frontend. Critical for UX — users see output instantly instead of waiting 10 seconds. In FastAPI: StreamingResponse. In LangChain: chain.stream(). Never block on full LLM response for user-facing apps." },
  { q: "How would you reduce LLM API costs in a production app?", a: "Main levers: (1) Cache identical queries — semantic caching with GPTCache. (2) Use smaller models for simple tasks (gpt-4o-mini instead of gpt-4o). (3) Reduce context — only send relevant chunks, not the whole document. (4) Compress prompts — remove unnecessary words. (5) Batch requests where possible. (6) Monitor token usage per request in LangSmith and optimise outliers." },
];

const TOTAL_DAYS = PHASES.reduce((s, p) => s + p.days.length, 0);

export default function InterviewTrack() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes itCheck{0%{transform:scale(0.6)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
      @keyframes itFade{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((completedCount / TOTAL_DAYS) * 100);

  const phaseProgress = (phase) => {
    const done = phase.days.filter(d => checked[`it-${d.day}`]).length;
    return { done, total: phase.days.length, pct: Math.round((done / phase.days.length) * 100) };
  };

  const nextDay = (() => {
    for (const phase of PHASES) {
      for (const day of phase.days) {
        if (!checked[`it-${day.day}`]) return { day, phase };
      }
    }
    return null;
  })();

  const questionsReady = Math.min(15, completedCount);
  const readinessColor = pct < 34 ? "#f59e0b" : pct < 67 ? "#06b6d4" : "#10b981";
  const readinessLabel = pct < 34 ? "Building foundation" : pct < 67 ? "Getting there" : pct < 100 ? "Nearly ready" : "Interview ready!";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* HEADER */}
      <div style={{ padding: "36px 20px 10px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>
          Gen AI Interview Fast Track
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
          Crack Gen AI Interviews <span style={{ color: "#10b981" }}>in 15 Days</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 500, margin: "8px auto 0", lineHeight: 1.6 }}>
          Every concept interviewers actually test. Every question with a 90-second answer.<br />
          50 min/day. Build while you learn. No fluff.
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 120px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Days Done</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#10b981", fontFamily: "monospace" }}>{completedCount}</div>
            <div style={{ fontSize: 10, color: "#475569" }}>/ {TOTAL_DAYS}</div>
          </div>
          <div style={{ background: "#111318", border: `1px solid ${readinessColor}30`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Readiness</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: readinessColor }}>{readinessLabel}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 6 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < Math.round(pct / 20) ? readinessColor : "#1e2330", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Q&As Ready</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#8b5cf6", fontFamily: "monospace" }}>{questionsReady}</div>
            <div style={{ fontSize: 10, color: "#475569" }}>/ 15</div>
          </div>
        </div>

        {/* PROGRESS */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Overall Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{pct}%</span>
          </div>
          <div style={{ height: 8, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
            {PHASES.map(p => {
              const pp = phaseProgress(p);
              return (
                <div key={p.phase}>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, fontWeight: 600 }}>Phase {p.phase} · {pp.done}/{pp.total}</div>
                  <div style={{ height: 4, background: "#1a1f2e", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${pp.pct}%`, background: p.color, borderRadius: 99, transition: "width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TODAY'S TASK */}
        {nextDay && (
          <div
            style={{ background: `linear-gradient(135deg, ${nextDay.phase.color}08, ${nextDay.phase.color}04)`, border: `1px solid ${nextDay.phase.color}30`, borderRadius: 12, padding: "14px 18px", marginBottom: 16, cursor: "pointer" }}
            onClick={() => setExpandedDay(expandedDay === nextDay.day.day ? null : nextDay.day.day)}
          >
            <div style={{ fontSize: 10, color: nextDay.phase.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Today · Day {nextDay.day.day}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{nextDay.day.title}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{nextDay.day.time} · Prepares you to answer: "{nextDay.day.interviewQ}"</div>
          </div>
        )}

        {/* CHEAT SHEET — 15 Q&As */}
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
          <span>Interview Cheat Sheet — All 15 Questions & Answers</span>
          <span style={{ fontSize: 16 }}>{showCheatSheet ? "▲" : "▼"}</span>
        </button>

        {showCheatSheet && (
          <div style={{ marginBottom: 20, animation: "itFade 0.2s ease-out" }}>
            {ALL_QA.map((qa, i) => (
              <div key={i} style={{
                background: "#111318",
                border: `1px solid ${expandedQ === i ? "#8b5cf640" : "#1e2330"}`,
                borderRadius: 11, marginBottom: 7, overflow: "hidden",
              }}>
                <div onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  style={{ padding: "13px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ display: "flex", gap: 10, flex: 1 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#8b5cf6", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.4 }}>{qa.q}</span>
                  </div>
                  <span style={{ color: "#475569", fontSize: 13, flexShrink: 0 }}>{expandedQ === i ? "▲" : "▼"}</span>
                </div>
                {expandedQ === i && (
                  <div style={{ padding: "0 16px 14px 48px", borderTop: "1px solid #1e2330", animation: "itFade 0.15s ease-out" }}>
                    <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{qa.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PHASES */}
        {PHASES.map(phase => {
          const pp = phaseProgress(phase);
          return (
            <div key={phase.phase} style={{ marginBottom: 24 }}>
              {/* Phase header */}
              <div style={{ background: `linear-gradient(135deg, ${phase.color}10, ${phase.color}05)`, border: `1px solid ${phase.color}25`, borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: phase.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: phase.color }}>
                        {pp.pct === 100 ? "✓" : phase.phase}
                      </div>
                      <span style={{ fontSize: 11, color: phase.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>
                        Phase {phase.phase} · {pp.done}/{pp.total} done
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{phase.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.5 }}>{phase.goal}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: pp.pct === 100 ? phase.color : "#64748b", padding: "5px 12px", borderRadius: 99, background: pp.pct === 100 ? phase.color + "15" : "#0d1017", border: `1px solid ${pp.pct === 100 ? phase.color + "30" : "#1e2330"}`, flexShrink: 0 }}>
                    {pp.pct}% complete
                  </div>
                </div>
              </div>

              {/* Day cards */}
              {phase.days.map(day => {
                const id = `it-${day.day}`;
                const isDone = !!checked[id];
                const isExpanded = expandedDay === day.day;
                const isNext = nextDay?.day.day === day.day;

                return (
                  <div key={day.day} style={{
                    background: isDone ? `${phase.color}05` : "#111318",
                    border: `1px solid ${isDone ? phase.color + "25" : isNext ? phase.color + "20" : "#1e2330"}`,
                    borderRadius: 11, marginBottom: 7, overflow: "hidden", transition: "all 0.2s",
                  }}>
                    {/* Row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 15px", cursor: "pointer" }}
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}>

                      <div onClick={e => { e.stopPropagation(); toggle(id); }} style={{
                        width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                        border: isDone ? `2px solid ${phase.color}` : "2px solid #2a3040",
                        background: isDone ? phase.color + "20" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.2s",
                        animation: isDone ? "itCheck 0.3s ease-out" : "none",
                      }}>
                        {isDone && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 7L5 9.5L10.5 3.5" stroke={phase.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>

                      <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: isNext && !isDone ? phase.color + "20" : "#0d1017", border: `1px solid ${isNext && !isDone ? phase.color + "35" : "#1a1f2e"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isNext && !isDone ? phase.color : "#475569", fontFamily: "monospace" }}>
                        {day.day}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: isDone ? "#475569" : "#e2e8f0", textDecoration: isDone ? "line-through" : "none" }}>
                            {day.title}
                          </span>
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: day.tagColor + "15", color: day.tagColor, fontWeight: 700, flexShrink: 0 }}>
                            {day.tag}
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
                          {day.time} · {isDone ? "Done ✓" : isNext ? "Do this today" : "Upcoming"}
                        </div>
                      </div>
                      <span style={{ color: "#475569", fontSize: 13, flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>

                    {/* Expanded */}
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #1e2330", padding: "14px 15px 16px", animation: "itFade 0.15s ease-out" }}>

                        {/* Interview Q badge */}
                        <div style={{ display: "inline-block", padding: "5px 12px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 8, fontSize: 12, color: "#a78bfa", fontWeight: 600, marginBottom: 14 }}>
                          Prepares you for: "{day.interviewQ}"
                        </div>

                        <Section color={phase.color} label="What to learn today" text={day.what} />
                        <Section color="#f59e0b" label="Hands-on task" text={day.handson} />
                        <Section color="#64748b" label="Core concept" text={day.concept} mono />

                        {/* 30-second answer */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>Your 90-second interview answer</div>
                          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "11px 14px", fontSize: 13, color: "#86efac", lineHeight: 1.7, fontStyle: "italic" }}>
                            "{day.quickAnswer}"
                          </div>
                        </div>

                        {day.code && (
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#06b6d4", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>Code to run today</div>
                            <pre style={{ background: "#0d1017", border: "1px solid #1e2330", borderRadius: 8, padding: "12px 14px", fontSize: 11.5, color: "#7dd3fc", lineHeight: 1.6, overflow: "auto", margin: 0, whiteSpace: "pre-wrap" }}>
                              {day.code}
                            </pre>
                          </div>
                        )}

                        <button onClick={() => toggle(id)} style={{
                          padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                          background: isDone ? "#1a1f2e" : phase.color + "20",
                          border: `1px solid ${isDone ? "#2a3040" : phase.color + "50"}`,
                          color: isDone ? "#64748b" : phase.color,
                          cursor: "pointer", transition: "all 0.2s",
                        }}>
                          {isDone ? "Mark as not done" : `Mark Day ${day.day} complete ✓`}
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
          <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(139,92,246,0.1))", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>You're Interview Ready!</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 8, maxWidth: 420, margin: "8px auto 0", lineHeight: 1.6 }}>
              15 days. 15 core concepts. 15 interview questions with confident answers. You understand how LLMs work, can build RAG and agents, and can design AI systems on a whiteboard. Go get it.
            </p>
          </div>
        ) : (
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 16, padding: "22px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0" }}>50 minutes a day. That's it.</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 5, maxWidth: 400, margin: "5px auto 0", lineHeight: 1.6 }}>
              {TOTAL_DAYS - completedCount} days left. Every day = one concept you can explain confidently in any interview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ color, label, text, mono }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>{label}</div>
      <div style={{ background: mono ? "#0d1017" : "transparent", border: mono ? "1px solid #1e2330" : "none", borderRadius: mono ? 8 : 0, padding: mono ? "10px 14px" : 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
        {text}
      </div>
    </div>
  );
}
