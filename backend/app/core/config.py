from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import validator
import os

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "MorningAI"
    
    # Environment
    ENV: str = "development"
    ENVIRONMENT: str = "development"  # 保持向後兼容
    
    @validator("ENVIRONMENT", pre=True)
    def sync_environment(cls, v: Optional[str], values: dict) -> str:
        # 如果設定了 ENV，使用 ENV 的值
        env_value = values.get("ENV") or os.getenv("ENV")
        if env_value:
            return env_value
        return v or "development"
    
    # Database
    DATABASE_URL: Optional[str] = None
    POSTGRES_USER: str = "morningai"
    POSTGRES_PASSWORD: str = "morningai123"
    POSTGRES_DB: str = "morningai"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    
    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: dict) -> str:
        if isinstance(v, str) and v:
            return v
        # 使用PostgreSQL作為預設資料庫
        return f"postgresql://{values.get('POSTGRES_USER', 'morningai')}:{values.get('POSTGRES_PASSWORD', 'morningai123')}@{values.get('POSTGRES_HOST', 'localhost')}:{values.get('POSTGRES_PORT', '5432')}/{values.get('POSTGRES_DB', 'morningai')}"
    
    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-this-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ALLOW_ORIGINS: Optional[str] = None
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://localhost:3000",
        "http://localhost:8000",
        "https://localhost:8000",
    ]
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | List[str], values: dict) -> List[str]:
        # 優先使用 CORS_ALLOW_ORIGINS (Render 環境變數)
        cors_origins = values.get("CORS_ALLOW_ORIGINS") or os.getenv("CORS_ALLOW_ORIGINS")
        if cors_origins:
            if isinstance(cors_origins, str):
                return [i.strip() for i in cors_origins.split(",")]
        
        # 回退到原有邏輯
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Supabase
    SUPABASE_URL: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = None
    
    # External APIs
    OPENAI_API_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

