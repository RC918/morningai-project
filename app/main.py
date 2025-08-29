from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import os
import uvicorn
from datetime import datetime
import json

# 環境變數
ENV = os.getenv("ENV", "development")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./morningai.db")
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
CORS_ORIGINS = os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@morningai.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
API_VERSION = os.getenv("API_VERSION", "v1")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# FastAPI 應用程式
app = FastAPI(
    title="MorningAI Backend API",
    description="MorningAI Phase 1 Backend Service",
    version=API_VERSION,
    docs_url=f"/{API_VERSION}/docs" if ENV != "production" else None,
    redoc_url=f"/{API_VERSION}/redoc" if ENV != "production" else None,
)

# CORS 中間件
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 安全性
security = HTTPBearer()

# 資料模型
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    environment: str
    database: str

class VersionResponse(BaseModel):
    version: str
    build_id: str
    timestamp: str
    environment: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    role: str
    created_at: str

# 健康檢查端點
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """API 健康檢查端點"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        version=API_VERSION,
        environment=ENV,
        database="connected" if DATABASE_URL else "not_configured"
    )

# 版本資訊端點
@app.get("/version", response_model=VersionResponse)
@app.get("/version.json", response_model=VersionResponse)
async def get_version():
    """獲取API版本資訊"""
    build_id = f"morningai-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    return VersionResponse(
        version=API_VERSION,
        build_id=build_id,
        timestamp=datetime.now().isoformat(),
        environment=ENV
    )

# API 路由組
@app.get(f"/{API_VERSION}/status")
async def api_status():
    """API 狀態檢查"""
    return {
        "api_version": API_VERSION,
        "status": "operational",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "health": "/health",
            "version": "/version",
            "auth": f"/{API_VERSION}/auth",
            "users": f"/{API_VERSION}/users"
        }
    }

# 認證端點
@app.post(f"/{API_VERSION}/auth/login")
async def login(user_data: UserLogin):
    """用戶登入"""
    # 簡單的管理員認證
    if user_data.email == ADMIN_EMAIL and user_data.password == ADMIN_PASSWORD:
        return {
            "access_token": "mock-jwt-token",
            "token_type": "bearer",
            "user": {
                "id": 1,
                "email": user_data.email,
                "role": "admin"
            }
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

# 用戶管理端點
@app.get(f"/{API_VERSION}/users/me", response_model=UserResponse)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """獲取當前用戶資訊"""
    # 簡單的token驗證
    if credentials.credentials == "mock-jwt-token":
        return UserResponse(
            id=1,
            email=ADMIN_EMAIL,
            role="admin",
            created_at=datetime.now().isoformat()
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

# RBAC 測試端點
@app.get(f"/{API_VERSION}/admin/dashboard")
async def admin_dashboard(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """管理員儀表板 (需要admin權限)"""
    if credentials.credentials == "mock-jwt-token":
        return {
            "message": "Welcome to admin dashboard",
            "user_role": "admin",
            "permissions": ["read", "write", "delete"],
            "timestamp": datetime.now().isoformat()
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

# 國際化測試端點
@app.get(f"/{API_VERSION}/i18n/{{locale}}")
async def get_translations(locale: str):
    """獲取國際化翻譯"""
    translations = {
        "en": {
            "welcome": "Welcome to MorningAI",
            "description": "AI-powered morning assistant"
        },
        "zh-TW": {
            "welcome": "歡迎使用 MorningAI",
            "description": "AI 驅動的晨間助手"
        },
        "zh-CN": {
            "welcome": "欢迎使用 MorningAI",
            "description": "AI 驱动的晨间助手"
        }
    }
    
    if locale not in translations:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Locale '{locale}' not supported"
        )
    
    return {
        "locale": locale,
        "translations": translations[locale],
        "timestamp": datetime.now().isoformat()
    }

# 根路徑
@app.get("/")
async def root():
    """API 根路徑"""
    return {
        "message": "MorningAI Backend API",
        "version": API_VERSION,
        "environment": ENV,
        "docs_url": f"/{API_VERSION}/docs" if ENV != "production" else None,
        "health_check": "/health",
        "timestamp": datetime.now().isoformat()
    }

# 啟動配置
if __name__ == "__main__":
    port = int(os.getenv("PORT", 10000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level=LOG_LEVEL.lower(),
        reload=ENV == "development"
    )

