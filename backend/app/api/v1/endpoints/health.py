from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.base import get_db
from app.core.config import settings

router = APIRouter()

@router.get("/")
async def health_check():
    """API健康檢查端點"""
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "service": "morningai-api",
            "version": "1.0.0",
            "environment": settings.ENVIRONMENT,
            "message": "API is running normally"
        }
    )

@router.get("/db")
async def database_health_check(db: Session = Depends(get_db)):
    """資料庫健康檢查端點"""
    try:
        # 嘗試執行簡單的資料庫查詢
        db.execute(text("SELECT 1"))
        return JSONResponse(
            status_code=200,
            content={
                "status": "healthy",
                "database": "connected",
                "message": "Database connection is working"
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "database": "disconnected",
                "error": str(e),
                "message": "Database connection failed"
            }
        )

