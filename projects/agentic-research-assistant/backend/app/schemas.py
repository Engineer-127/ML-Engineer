from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=10_000)
    thread_id: str = Field(default="demo-thread", min_length=1, max_length=120)

class Citation(BaseModel):
    source: str
    excerpt: str

class ChatResponse(BaseModel):
    answer: str
    thread_id: str
    citations: list[Citation] = []
    workflow: list[str]

class CalculateRequest(BaseModel):
    a: float
    b: float
    operation: str = Field(pattern="^(add|subtract|multiply|divide)$")
