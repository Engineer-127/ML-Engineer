from langchain.tools import tool

@tool
def calculate(a: float, b: float, operation: str) -> float:
    """Safely apply add, subtract, multiply, or divide to two numbers."""
    operations = {"add": lambda: a + b, "subtract": lambda: a - b, "multiply": lambda: a * b, "divide": lambda: a / b}
    if operation not in operations:
        raise ValueError("Unsupported operation")
    if operation == "divide" and b == 0:
        raise ValueError("Cannot divide by zero")
    return operations[operation]()

@tool
def search_documents(query: str) -> str:
    """Search indexed documents. Replace this demo body with a Chroma retriever."""
    return f"No uploaded documents are indexed yet for: {query}"
