from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Agentic AI Research Assistant"
    llm_provider: str = "demo"
    llm_model: str = "gpt-4.1-mini"
    openai_api_key: str | None = None
    langsmith_tracing: bool = False
    langsmith_api_key: str | None = None
    cors_origins: str = "http://localhost:5173"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def origins(self) -> list[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]

@lru_cache
def get_settings() -> Settings:
    return Settings()
