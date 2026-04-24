import { useState, useEffect } from "react";

const STORAGE_KEY = "ai-aws-15day-v1";

const WEEKS = [
  {
    week: 1,
    title: "Foundation — IAM, S3, EC2, VPC",
    color: "#f97316",
    goal: "You can deploy a backend server, store files, and explain AWS security basics.",
    days: [
      {
        day: 1,
        title: "IAM — Identity & Access Management",
        time: "45 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        service: "IAM",
        what: "Create an IAM user, attach a policy, create a role. Understand the difference between users, groups, roles, and policies.",
        handson: "Create a role with S3 read-only access. Attach it. Then try to write — it should fail. This is muscle memory for interviews.",
        concept: "IAM is the most important AWS service. Everything runs on IAM. Roles = temporary credentials for services (EC2, Lambda). Policies = JSON rules that say what is allowed. Least privilege = only give the minimum permissions needed. Never use root account for anything.",
        interview: "\"How do you manage permissions in AWS?\" — Answer: IAM roles with least privilege, no hardcoded keys, use instance profiles for EC2, Secrets Manager for app secrets.",
      },
      {
        day: 2,
        title: "S3 — Object Storage",
        time: "45 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        service: "S3",
        what: "Create a bucket. Upload files via console + AWS CLI. Enable versioning. Create a presigned URL. Set a lifecycle policy to delete files after 30 days.",
        handson: "Upload a PDF (your RAG project's test document). Generate a presigned URL. Share it — it expires in 1 hour. This is exactly how production file uploads work.",
        concept: "S3 = unlimited object storage. Buckets are globally unique. Presigned URLs = temporary access URLs (for file uploads from frontend without exposing keys). Versioning = keep all versions of a file. Lifecycle = auto-delete/archive old files. S3 is also used for: static website hosting, Lambda triggers, ML training data.",
        interview: "\"How do you handle file uploads in your AI app?\" — Answer: Frontend gets a presigned URL from your backend → uploads directly to S3 → S3 event triggers Lambda to process the file.",
      },
      {
        day: 3,
        title: "EC2 — Virtual Servers",
        time: "60 min",
        tag: "Hands-on",
        tagColor: "#f97316",
        service: "EC2",
        what: "Launch a t3.micro EC2 instance. SSH into it. Install Node.js or Python. Run your chatbot backend. Expose it via public IP.",
        handson: "Deploy your Week 1 chatbot (from the 30-day track) on EC2. Access it from your browser. This is your first cloud deployment.",
        concept: "EC2 = virtual machine you control. Instance types: t3.micro (free tier, dev), t3.medium (small prod), m5.xlarge (prod). Security Groups = firewall rules (open port 80 for HTTP, 443 for HTTPS, 22 for SSH). Key pairs = SSH access. AMI = machine image (like a Docker image for VMs). For AI apps: use GPU instances (p3, g4dn) for model inference.",
        interview: "\"When would you use EC2 vs Lambda?\" — EC2: long-running processes, ML model servers, WebSocket connections. Lambda: short tasks, event-driven, auto-scaling to zero.",
      },
      {
        day: 4,
        title: "VPC — Virtual Private Cloud",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        service: "VPC",
        what: "Understand the default VPC. Create a custom VPC with public and private subnets. Place your EC2 in the public subnet, your RDS (or a mock) in the private subnet.",
        handson: "Draw your VPC architecture on paper: public subnet (EC2 backend) → private subnet (database). This diagram comes up in system design interviews.",
        concept: "VPC = your isolated network in AWS. Public subnet = has internet gateway, accessible from outside. Private subnet = no direct internet, only accessible internally (for databases, internal services). NAT Gateway = lets private subnet resources call the internet (for package installs etc) without being reachable from outside. Security Groups = per-resource firewall. NACLs = per-subnet firewall (stateless).",
        interview: "\"How would you architect a secure AI application on AWS?\" — Draw: Route53 → ALB (public) → EC2/ECS (public subnet) → RDS + vector DB (private subnet). VPC peering for multi-service architectures.",
      },
      {
        day: 5,
        title: "RDS + DynamoDB — Managed Databases",
        time: "45 min",
        tag: "Hands-on",
        tagColor: "#f97316",
        service: "RDS / DynamoDB",
        what: "Launch an RDS PostgreSQL (Free Tier). Connect from your local machine. Create a table for storing chat history. Also explore DynamoDB — create a table, put an item, get it.",
        handson: "Store your chatbot's conversation history in RDS. This turns your demo app into something production-like.",
        concept: "RDS = managed relational DB (PostgreSQL, MySQL). Multi-AZ = automatic failover. Read Replicas = scale read traffic. DynamoDB = managed NoSQL, serverless, scales to infinite. Use DynamoDB when: high throughput, simple key-value or document access patterns, no joins needed. Use RDS when: complex queries, joins, transactions. For AI apps: RDS for user data / history, DynamoDB for session state, vector DB (Pinecone/ChromaDB) for embeddings.",
        interview: "\"When would you choose DynamoDB over RDS?\" — DynamoDB: 100k+ requests/sec, simple access patterns, serverless. RDS: complex queries, ACID transactions, relational data.",
      },
    ],
  },
  {
    week: 2,
    title: "Serverless, AI Services & Deployment",
    color: "#06b6d4",
    goal: "You can build and deploy serverless AI pipelines and explain AWS AI services confidently.",
    days: [
      {
        day: 6,
        title: "Lambda + API Gateway — Serverless Backend",
        time: "60 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        service: "Lambda + API Gateway",
        what: "Create a Lambda function that calls OpenAI API. Expose it via API Gateway as a REST endpoint. Call it from your frontend.",
        handson: "Move your chatbot API call from EC2 to Lambda. Compare: EC2 costs $0.0116/hr always on. Lambda costs $0.0000002 per request — you pay nothing unless it's called.",
        concept: "Lambda = runs code without managing servers. Max 15 min runtime, 10GB memory. Cold starts = first call takes ~300ms extra (mitigated with Provisioned Concurrency). API Gateway = managed HTTP API layer in front of Lambda. Lambda Layers = shared dependencies (put your pip packages here). For AI: Lambda is great for async processing, webhooks, document upload pipelines. Not for: streaming responses (use ECS), long model inference (use SageMaker endpoints).",
        interview: "\"How do you handle cold starts in Lambda for a user-facing API?\" — Use Provisioned Concurrency for critical paths, keep Lambda warm with scheduled pings, or use ECS for latency-sensitive AI inference.",
      },
      {
        day: 7,
        title: "SQS + SNS — Queues & Notifications",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        service: "SQS / SNS",
        what: "Create an SQS queue. Send a message when a file is uploaded to S3. Trigger a Lambda to process it. This is an event-driven AI pipeline.",
        handson: "Build: S3 upload → SQS message → Lambda trigger → chunk + embed the document → store in ChromaDB. This is the production RAG ingestion pipeline.",
        concept: "SQS = queue. Messages wait until a consumer (Lambda/EC2) processes them. Dead Letter Queue (DLQ) = failed messages go here for debugging. Visibility timeout = message is hidden while being processed. SNS = pub/sub. One message → multiple subscribers. Use SQS for: async task processing, decoupling services, rate limiting AI API calls. Use SNS for: fan-out (notify multiple services at once), email/SMS alerts.",
        interview: "\"How do you handle a spike of document uploads without overwhelming your AI processing pipeline?\" — SQS queue absorbs the spike. Lambda consumers process at a controlled rate. DLQ catches failures for retry.",
      },
      {
        day: 8,
        title: "ECS + ECR — Containers in Production",
        time: "60 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        service: "ECS / ECR / Fargate",
        what: "Dockerize your FastAPI backend. Push the image to ECR. Deploy it as an ECS Fargate service. Expose it via an Application Load Balancer.",
        handson: "This replaces your EC2 deployment from Day 3 with a production-grade container setup. No SSH needed, auto-scales, auto-restarts on crash.",
        concept: "ECR = AWS Docker image registry (like Docker Hub but private). ECS = container orchestration. Fargate = serverless containers (no EC2 to manage). Task Definition = your container config (image, CPU, memory, env vars). Service = keeps N tasks running always. ALB = load balancer that routes traffic to healthy containers. Use ECS Fargate for: AI backends that need streaming, LangGraph agents, WebSocket servers — anything Lambda can't handle.",
        interview: "\"How do you deploy a FastAPI RAG backend at scale?\" — Dockerize → ECR → ECS Fargate service behind ALB. Auto Scaling Group scales tasks on CPU/memory. Use Parameter Store for env vars, not hardcoded.",
      },
      {
        day: 9,
        title: "AWS Bedrock — Managed LLMs",
        time: "45 min",
        tag: "AI/ML",
        tagColor: "#10b981",
        service: "Bedrock",
        what: "Enable Claude and Llama models in Bedrock console. Call them via boto3. Compare cost and latency vs direct API calls. Build a simple chat endpoint using Bedrock.",
        handson: "Swap your OpenAI call for a Bedrock Claude call. Notice: no API key management, billed to AWS, data stays in your VPC. This matters for enterprise clients.",
        concept: "Bedrock = managed access to foundation models (Claude, Llama, Titan, Mistral) via AWS API. No infra to manage. Key benefit: data stays in your AWS account, no third-party API calls (compliance). Bedrock Agents = managed agent framework (simpler than LangChain for basic use cases). Bedrock Knowledge Bases = managed RAG (S3 → auto-embed → OpenSearch Serverless). Use for: enterprise AI apps, regulated industries, when clients require AWS-only stack.",
        interview: "\"What is AWS Bedrock and when would you use it over OpenAI directly?\" — Use Bedrock for: enterprise clients requiring data residency, AWS-consolidated billing, compliance requirements. Use OpenAI/Anthropic direct for: latest models, streaming features, cost optimization.",
      },
      {
        day: 10,
        title: "SageMaker — ML Model Hosting",
        time: "45 min",
        tag: "AI/ML",
        tagColor: "#10b981",
        service: "SageMaker",
        what: "Deploy a HuggingFace embedding model as a SageMaker endpoint. Call it from your RAG pipeline instead of OpenAI embeddings. Calculate the cost difference.",
        handson: "Replace text-embedding-3-small (OpenAI, $0.02/1M tokens) with your own SageMaker endpoint running sentence-transformers (pays per hour, cheaper at scale).",
        concept: "SageMaker = full ML platform. Real-world use of SageMaker for senior AI engineers: Endpoints = serve models as REST APIs (for self-hosted embeddings, fine-tuned models). Pipelines = automate model training + evaluation + deployment. Feature Store = store ML features. JumpStart = one-click deploy popular models (Llama, Falcon). When to use SageMaker vs Bedrock: SageMaker = custom/fine-tuned models you own. Bedrock = foundation models you don't fine-tune.",
        interview: "\"How would you host your own fine-tuned embedding model in production?\" — SageMaker real-time endpoint or async endpoint (for batch processing). Use multi-model endpoints to reduce cost.",
      },
    ],
  },
  {
    week: 3,
    title: "Security, Monitoring & Interview Mastery",
    color: "#ec4899",
    goal: "You can design secure, observable AWS architectures and answer senior-level questions cold.",
    days: [
      {
        day: 11,
        title: "Secrets Manager + Parameter Store",
        time: "30 min",
        tag: "Must Know",
        tagColor: "#ef4444",
        service: "Secrets Manager",
        what: "Move all your API keys (OpenAI, Anthropic, DB passwords) out of .env files and into AWS Secrets Manager. Fetch them in your Lambda/ECS code at runtime.",
        handson: "Update your FastAPI backend to fetch the OpenAI key from Secrets Manager on startup. Deploy. Verify no key is in your codebase or ECR image.",
        concept: "Secrets Manager = store and rotate secrets (DB passwords, API keys). Automatic rotation for RDS passwords. Parameter Store = store config values (non-sensitive use free tier, sensitive use SecureString). Never hardcode credentials. Never put keys in environment variables in plain text in ECS task definitions — reference Secrets Manager instead. This is table stakes for senior roles.",
        interview: "\"How do you manage secrets in your AWS applications?\" — Secrets Manager for credentials with auto-rotation. Parameter Store for config. IAM role grants the Lambda/ECS task permission to read. Zero secrets in code or Docker images.",
      },
      {
        day: 12,
        title: "CloudWatch — Logs, Metrics & Alarms",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        service: "CloudWatch",
        what: "Add structured logging to your FastAPI backend. View logs in CloudWatch. Create a metric filter that counts errors. Create an alarm that triggers when errors > 5/min.",
        handson: "Intentionally break your AI endpoint. Watch the error appear in CloudWatch. See the alarm trigger. This is what on-call looks like at senior level.",
        concept: "CloudWatch Logs = all your app logs (Lambda auto-sends, ECS needs config). Log Groups = one per app. Log Insights = SQL-like queries over logs. Metrics = numerical data over time (CPU, memory, custom metrics like 'AI API latency'). Alarms = trigger SNS/PagerDuty when metric crosses threshold. Dashboard = visual monitoring. For AI apps: track LLM API latency, token usage, RAG retrieval time, error rates as custom metrics.",
        interview: "\"How do you monitor your AI applications in production?\" — CloudWatch for infra metrics + custom app metrics. LangSmith/LangFuse for LLM-specific observability (token usage, chain traces). Alarms to SNS → PagerDuty for on-call.",
      },
      {
        day: 13,
        title: "CloudFront + ALB + Route53 — Production Traffic",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        service: "CloudFront / ALB / Route53",
        what: "Put CloudFront in front of your S3 static frontend. Point Route53 to your ALB (backend). Add an SSL certificate via ACM. Your app now has a custom domain with HTTPS.",
        handson: "Your AI app now has: myapp.com (CloudFront → S3 frontend) and api.myapp.com (Route53 → ALB → ECS backend). This is a production-grade setup.",
        concept: "Route53 = DNS service. A records, CNAME, health checks. ALB = Application Load Balancer. Routes HTTP/HTTPS to ECS/EC2 targets. Supports path-based routing (/api → backend, /static → S3). CloudFront = CDN. Caches static assets globally. WAF = Web Application Firewall (blocks SQL injection, XSS). ACM = free SSL certificates. Full production stack: Route53 → CloudFront (for frontend) / ALB (for API) → ECS tasks → RDS + S3.",
        interview: "\"Walk me through how you'd deploy a full-stack AI app on AWS.\" — This is your answer: Route53 + CloudFront (frontend on S3) + ALB + ECS Fargate (backend) + RDS (private subnet) + S3 (files) + Bedrock/OpenAI (LLM) + CloudWatch (monitoring).",
      },
      {
        day: 14,
        title: "CDK / CloudFormation — Infrastructure as Code",
        time: "45 min",
        tag: "Senior Level",
        tagColor: "#8b5cf6",
        service: "CDK / CloudFormation",
        what: "Write a simple CDK stack in TypeScript that creates: an S3 bucket + a Lambda function + an API Gateway. Deploy it. Then destroy it. All with one command.",
        handson: "cdk deploy → your stack appears in AWS console. cdk destroy → it's all gone. This is how senior engineers work — no clicking in console, everything is code.",
        concept: "CloudFormation = AWS's native IaC (YAML/JSON). CDK = write IaC in TypeScript/Python/Java (compiles to CloudFormation). Terraform = third-party IaC (multi-cloud, industry standard). For interviews: know CDK/Terraform conceptually, know that IaC enables: repeatable deployments, version-controlled infrastructure, disaster recovery. AWS SAM = CDK simplified for serverless apps.",
        interview: "\"How do you manage infrastructure changes in production?\" — IaC (CDK or Terraform) for all resources. GitOps: infra changes go through PRs, reviewed, applied via CI/CD pipeline. Never click in console for production changes.",
      },
      {
        day: 15,
        title: "Full Architecture Review + Interview Drill",
        time: "60 min",
        tag: "Interview Prep",
        tagColor: "#8b5cf6",
        service: "System Design",
        what: "Design the full architecture for your Gen AI app on AWS — on paper or in draw.io. Then answer all 5 interview questions out loud, back to back, without pausing.",
        handson: "Draw: User → Route53 → CloudFront/ALB → ECS Fargate (FastAPI + LangChain) → [RDS, S3, ChromaDB/Pinecone, Secrets Manager, Bedrock/OpenAI] → CloudWatch. This is your interview whiteboard answer.",
        concept: "Senior AWS questions test architecture decisions, not service names. Know WHY: Why Fargate over Lambda? (streaming, long-running). Why Bedrock over OpenAI? (compliance, data residency). Why SQS before Lambda? (rate limiting, decoupling). Why Secrets Manager over env vars? (rotation, audit trail). Why CloudFront? (latency, DDoS protection). The 'why' is what separates senior answers from junior answers.",
        interview: "See all 5 interview Q&As in the cheat sheet below. Practice each until you can answer in under 90 seconds without hesitation.",
      },
    ],
  },
];

const INTERVIEW_QA = [
  {
    q: "How would you architect a production Gen AI application on AWS?",
    a: "Frontend: S3 static hosting + CloudFront CDN. DNS: Route53. Backend: ECS Fargate behind ALB — FastAPI with LangChain/LangGraph. LLM: Bedrock (for enterprise/compliance) or OpenAI/Anthropic direct. Vector DB: Pinecone or OpenSearch Serverless. Storage: S3 for documents. SQL: RDS PostgreSQL in private subnet. Async processing: S3 upload → SQS → Lambda (chunk + embed). Secrets: Secrets Manager. Monitoring: CloudWatch + LangSmith. IaC: CDK or Terraform.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "Lambda vs ECS Fargate — when do you use each?",
    a: "Use Lambda for: short tasks under 15 min, event-driven triggers (S3 upload, SQS message, API calls), scales to zero (no idle cost), simple stateless operations. Use ECS Fargate for: long-running processes (AI agents, WebSocket connections), streaming responses, containers with complex dependencies, services that need consistent latency (no cold starts), ML model servers. For AI specifically: Lambda for document ingestion pipelines, ECS for the main API server that streams LLM responses.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "How do you manage secrets and API keys in AWS?",
    a: "Never hardcode credentials. Use AWS Secrets Manager for sensitive secrets (API keys, DB passwords) — it supports automatic rotation. Use Parameter Store (SecureString) for config values. Grant IAM roles (not users) to your Lambda/ECS tasks to read these secrets — no keys in code. Never put secrets in environment variables in plain text in task definitions — reference Secrets Manager ARN instead. Audit access with CloudTrail. This approach means no secrets ever touch your codebase or Docker images.",
    difficulty: "Must Know",
    color: "#10b981",
  },
  {
    q: "AWS Bedrock vs direct OpenAI/Anthropic API — when to choose which?",
    a: "Choose Bedrock when: enterprise clients require data residency (your prompts/responses never leave AWS), compliance requirements (HIPAA, SOC2), consolidated AWS billing, or need to use multiple models with one SDK. Choose direct API when: you need the absolute latest models (OpenAI o3, Claude 4 latest), specific streaming features, cost optimization (Bedrock adds markup), or simpler setup for startups without compliance requirements. In practice: startups use direct API, enterprises often require Bedrock or Azure OpenAI.",
    difficulty: "Senior Level",
    color: "#f59e0b",
  },
  {
    q: "How do you handle a spike of 10,000 document uploads without crashing your AI pipeline?",
    a: "Decouple the upload from the processing with SQS. Flow: User uploads to S3 (presigned URL, direct upload, no backend involved) → S3 event sends message to SQS queue → Lambda consumers poll SQS at a controlled concurrency (set reserved concurrency to limit parallel Lambda invocations) → each Lambda chunks, embeds, and stores in vector DB → on failure, message goes to Dead Letter Queue for retry. The queue absorbs the spike. Processing happens at a safe, controlled rate. No service gets overwhelmed.",
    difficulty: "Senior Level",
    color: "#f59e0b",
  },
];

const TOTAL_DAYS = WEEKS.reduce((sum, w) => sum + w.days.length, 0);

const SERVICE_COLORS = {
  "IAM": "#ef4444",
  "S3": "#f97316",
  "EC2": "#f59e0b",
  "VPC": "#10b981",
  "RDS / DynamoDB": "#06b6d4",
  "Lambda + API Gateway": "#8b5cf6",
  "SQS / SNS": "#ec4899",
  "ECS / ECR / Fargate": "#06b6d4",
  "Bedrock": "#10b981",
  "SageMaker": "#10b981",
  "Secrets Manager": "#ef4444",
  "CloudWatch": "#f97316",
  "CloudFront / ALB / Route53": "#06b6d4",
  "CDK / CloudFormation": "#8b5cf6",
  "System Design": "#ec4899",
};

export default function AWSTrack() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes awsCheck{0%{transform:scale(0.7)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
      @keyframes awsFade{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
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

  const weekProgress = (week) => {
    const done = week.days.filter(d => checked[`aws-${d.day}`]).length;
    return { done, total: week.days.length, pct: Math.round((done / week.days.length) * 100) };
  };

  const nextDay = (() => {
    for (const week of WEEKS) {
      for (const day of week.days) {
        if (!checked[`aws-${day.day}`]) return { day, week };
      }
    }
    return null;
  })();

  const readiness = Math.min(5, Math.round((completedCount / TOTAL_DAYS) * 5));
  const readinessLabels = ["Not started", "Learning", "Getting there", "Almost ready", "Nearly ready", "AWS Ready!"];
  const readinessColors = ["#475569", "#f59e0b", "#f97316", "#06b6d4", "#10b981", "#10b981"];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c10", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* HEADER */}
      <div style={{ padding: "36px 20px 10px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#f97316", marginBottom: 12 }}>
          AWS 15-Day Senior Track
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
          AWS for <span style={{ color: "#f97316" }}>Senior Gen AI Roles</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 480, margin: "8px auto 0", lineHeight: 1.6 }}>
          Learn by building. Every topic is tied to your actual Gen AI projects.<br />
          45–60 min/day. 15 days. Interview-ready AWS architecture.
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 120px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Days Done</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#f97316", fontFamily: "monospace" }}>{completedCount}</div>
            <div style={{ fontSize: 10, color: "#475569" }}>/ {TOTAL_DAYS}</div>
          </div>
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Progress</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#06b6d4", fontFamily: "monospace" }}>{pct}%</div>
            <div style={{ fontSize: 10, color: "#475569" }}>complete</div>
          </div>
          <div style={{ background: "#111318", border: `1px solid ${readinessColors[readiness]}30`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Readiness</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: readinessColors[readiness] }}>{readinessLabels[readiness]}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 5 }}>
              {[0,1,2,3,4].map(i => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < readiness ? readinessColors[readiness] : "#1e2330", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Overall Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{completedCount}/{TOTAL_DAYS} days</span>
          </div>
          <div style={{ height: 8, background: "#1a1f2e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #f97316, #f59e0b)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
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
            borderRadius: 12, padding: "14px 18px", marginBottom: 16, cursor: "pointer",
          }}
            onClick={() => setExpandedDay(expandedDay === nextDay.day.day ? null : nextDay.day.day)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: nextDay.week.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                ☁
              </div>
              <div>
                <div style={{ fontSize: 10, color: nextDay.week.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>
                  Today's AWS Topic · Day {nextDay.day.day}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{nextDay.day.service} — {nextDay.day.title}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{nextDay.day.time} · Click to expand</div>
              </div>
            </div>
          </div>
        )}

        {/* CHEAT SHEET */}
        <button
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          style={{
            width: "100%", padding: "12px 18px", marginBottom: 16,
            background: showCheatSheet ? "rgba(249,115,22,0.1)" : "#111318",
            border: `1px solid ${showCheatSheet ? "rgba(249,115,22,0.4)" : "#1e2330"}`,
            borderRadius: 12, color: "#f97316", fontSize: 13, fontWeight: 700,
            cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span>AWS Interview Cheat Sheet — 5 Questions Senior Roles Ask</span>
          <span style={{ fontSize: 16 }}>{showCheatSheet ? "▲" : "▼"}</span>
        </button>

        {showCheatSheet && (
          <div style={{ marginBottom: 20, animation: "awsFade 0.2s ease-out" }}>
            {INTERVIEW_QA.map((qa, i) => (
              <div key={i} style={{
                background: "#111318",
                border: `1px solid ${expandedQ === i ? qa.color + "40" : "#1e2330"}`,
                borderRadius: 12, marginBottom: 8, overflow: "hidden",
              }}>
                <div
                  onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: qa.color + "15", color: qa.color, textTransform: "uppercase", letterSpacing: 1, display: "inline-block", marginBottom: 6 }}>{qa.difficulty}</span>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.4 }}>{qa.q}</div>
                  </div>
                  <span style={{ color: "#475569", fontSize: 14, flexShrink: 0, marginTop: 2 }}>{expandedQ === i ? "▲" : "▼"}</span>
                </div>
                {expandedQ === i && (
                  <div style={{ padding: "0 18px 16px", borderTop: "1px solid #1e2330", animation: "awsFade 0.15s ease-out" }}>
                    <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{qa.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* WEEKS */}
        {WEEKS.map(week => {
          const wp = weekProgress(week);
          return (
            <div key={week.week} style={{ marginBottom: 20 }}>
              <div style={{
                background: `linear-gradient(135deg, ${week.color}10, ${week.color}05)`,
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
                        Week {week.week} · {wp.done}/{wp.total} done
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{week.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.5 }}>{week.goal}</div>
                  </div>
                  <div style={{ height: 4, width: 80, background: "#1a1f2e", borderRadius: 99, alignSelf: "center", flexShrink: 0 }}>
                    <div style={{ height: "100%", width: `${wp.pct}%`, background: week.color, borderRadius: 99 }} />
                  </div>
                </div>
              </div>

              {week.days.map(day => {
                const id = `aws-${day.day}`;
                const isDone = !!checked[id];
                const isExpanded = expandedDay === day.day;
                const isNext = nextDay?.day.day === day.day;
                const serviceColor = SERVICE_COLORS[day.service] || week.color;

                return (
                  <div key={day.day} style={{
                    background: isDone ? `${week.color}05` : "#111318",
                    border: `1px solid ${isDone ? week.color + "25" : isNext ? week.color + "18" : "#1e2330"}`,
                    borderRadius: 11, marginBottom: 7, overflow: "hidden", transition: "all 0.2s",
                  }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer" }}
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    >
                      <div
                        onClick={e => { e.stopPropagation(); toggle(id); }}
                        style={{
                          width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                          border: isDone ? `2px solid ${week.color}` : "2px solid #2a3040",
                          background: isDone ? week.color + "25" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s",
                          animation: isDone ? "awsCheck 0.3s ease-out" : "none",
                        }}
                      >
                        {isDone && (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2.5 7L5 9.5L10.5 3.5" stroke={week.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      <div style={{
                        padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800,
                        background: serviceColor + "15", color: serviceColor,
                        border: `1px solid ${serviceColor}25`, flexShrink: 0, fontFamily: "monospace",
                      }}>
                        {day.service.split(" ")[0]}
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
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{day.time} · {isDone ? "Done ✓" : isNext ? "Do this today" : "Upcoming"}</div>
                      </div>

                      <span style={{ color: "#475569", fontSize: 13, flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>

                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #1e2330", padding: "14px 16px 16px", animation: "awsFade 0.15s ease-out" }}>

                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: week.color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>What to do today</div>
                          <p style={{ fontSize: 13.5, color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>{day.what}</p>
                        </div>

                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Hands-on task</div>
                          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                            {day.handson}
                          </div>
                        </div>

                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Key concepts</div>
                          <div style={{ background: "#0d1017", border: "1px solid #1e2330", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7 }}>
                            {day.concept}
                          </div>
                        </div>

                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5 }}>Interview angle</div>
                          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6 }}>
                            {day.interview}
                          </div>
                        </div>

                        <button
                          onClick={() => toggle(id)}
                          style={{
                            padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                            background: isDone ? "#1a1f2e" : week.color + "20",
                            border: `1px solid ${isDone ? "#2a3040" : week.color + "50"}`,
                            color: isDone ? "#64748b" : week.color,
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          {isDone ? "Mark as not done" : `Mark Day ${day.day} as done ✓`}
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
            background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(245,158,11,0.08))",
            border: "1px solid rgba(249,115,22,0.4)", borderRadius: 16, padding: "28px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f97316" }}>AWS Certified — Interview Ready!</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 8, maxWidth: 400, margin: "8px auto 0", lineHeight: 1.6 }}>
              15 days. IAM to Bedrock. You can now design, deploy, and explain a production-grade Gen AI architecture on AWS. Senior level unlocked.
            </p>
          </div>
        ) : (
          <div style={{ background: "#111318", border: "1px solid #1e2330", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0" }}>Build on AWS while building your AI app.</div>
            <p style={{ color: "#64748b", fontSize: 13, marginTop: 6, maxWidth: 400, margin: "6px auto 0", lineHeight: 1.6 }}>
              {TOTAL_DAYS - completedCount} days left. Every service you learn today goes directly into your project architecture.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
