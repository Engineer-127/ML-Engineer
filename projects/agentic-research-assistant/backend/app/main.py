import asyncio
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from .config import get_settings
from .graph import run_research
from .schemas import CalculateRequest, ChatRequest, ChatResponse
from .tools import calculate

settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.origins, allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"status": "ok", "provider": settings.llm_provider}

@app.post("/tools/calculate")
def tool_calculate(request: CalculateRequest):
    return {"result": calculate.invoke(request.model_dump())}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = run_research(request.message, request.thread_id)
    return ChatResponse(answer=result["answer"], thread_id=request.thread_id, workflow=result["workflow"])

@app.get("/threads/{thread_id}/status")
def workflow_status(thread_id: str):
    snapshot = run_research("Return the current starter status", thread_id)
    return {"thread_id": thread_id, "workflow": snapshot["workflow"], "status": "complete"}

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    async def events():
        result = run_research(request.message, request.thread_id)
        for node in result["workflow"]:
            yield f"event: workflow\ndata: {json.dumps({'node': node})}\n\n"
            await asyncio.sleep(0)
        yield f"event: answer\ndata: {json.dumps({'answer': result['answer'], 'thread_id': request.thread_id})}\n\n"
    return StreamingResponse(events(), media_type="text/event-stream")
