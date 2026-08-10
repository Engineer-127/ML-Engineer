from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    assert client.get("/health").json()["status"] == "ok"

def test_calculator():
    response = client.post("/tools/calculate", json={"a": 6, "b": 7, "operation": "multiply"})
    assert response.status_code == 200
    assert response.json()["result"] == 42

def test_graph_chat():
    response = client.post("/chat", json={"message": "What is LangGraph?", "thread_id": "test-thread"})
    assert response.status_code == 200
    assert response.json()["workflow"] == ["planner", "researcher", "tool-executor", "reviewer", "final-answer"]
