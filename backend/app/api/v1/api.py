from fastapi import APIRouter
from app.api.v1.endpoints import health, tenants, roles, auth

api_router = APIRouter()

# 包含各個端點路由
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(tenants.router, prefix="/tenants", tags=["tenants"])
api_router.include_router(roles.router, prefix="/roles", tags=["roles"])

