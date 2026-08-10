from operator import add
from typing import Annotated, TypedDict
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph

class ResearchState(TypedDict):
    question: str
    plan: list[str]
    findings: Annotated[list[str], add]
    review: str
    answer: str
    workflow: Annotated[list[str], add]

def planner(state: ResearchState):
    return {"plan": ["Clarify the question", "Search trusted sources", "Synthesize with citations"], "workflow": ["planner"]}

def researcher(state: ResearchState):
    return {"findings": [f"Starter research result for: {state['question']}"], "workflow": ["researcher"]}

def tool_executor(state: ResearchState):
    return {"findings": ["Document search tool is ready; upload/indexing is the next implementation milestone."], "workflow": ["tool-executor"]}

def reviewer(state: ResearchState):
    return {"review": "approved" if state["findings"] else "revise", "workflow": ["reviewer"]}

def route_review(state: ResearchState):
    return "final-answer" if state["review"] == "approved" else "researcher"

def final_answer(state: ResearchState):
    return {"answer": " ".join(state["findings"]), "workflow": ["final-answer"]}

builder = StateGraph(ResearchState)
for name, node in [("planner", planner), ("researcher", researcher), ("tool-executor", tool_executor), ("reviewer", reviewer), ("final-answer", final_answer)]:
    builder.add_node(name, node)
builder.add_edge(START, "planner")
builder.add_edge("planner", "researcher")
builder.add_edge("researcher", "tool-executor")
builder.add_edge("tool-executor", "reviewer")
builder.add_conditional_edges("reviewer", route_review)
builder.add_edge("final-answer", END)
research_graph = builder.compile(checkpointer=InMemorySaver())

def run_research(question: str, thread_id: str) -> ResearchState:
    initial = {"question": question, "plan": [], "findings": [], "review": "", "answer": "", "workflow": []}
    return research_graph.invoke(initial, {"configurable": {"thread_id": thread_id}})
