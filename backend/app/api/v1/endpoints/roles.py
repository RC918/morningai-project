from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.role import Role, Permission
from app.schemas.role import RoleResponse, PermissionResponse

router = APIRouter()

@router.get("/", response_model=List[RoleResponse])
async def get_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """取得角色列表"""
    try:
        roles = db.query(Role).offset(skip).limit(limit).all()
        return roles
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch roles: {str(e)}")

@router.post("/seed")
async def seed_roles(db: Session = Depends(get_db)):
    """種子化預設角色和權限"""
    try:
        # 檢查是否已經種子化
        existing_roles = db.query(Role).count()
        if existing_roles > 0:
            return {"message": "Roles already seeded", "count": existing_roles}
        
        # 建立預設權限
        permissions = [
            Permission(
                name="tenant.create",
                display_name="建立租戶",
                description="可以建立新的租戶",
                resource="tenant",
                action="create"
            ),
            Permission(
                name="tenant.read",
                display_name="查看租戶",
                description="可以查看租戶資訊",
                resource="tenant",
                action="read"
            ),
            Permission(
                name="tenant.update",
                display_name="更新租戶",
                description="可以更新租戶資訊",
                resource="tenant",
                action="update"
            ),
            Permission(
                name="tenant.delete",
                display_name="刪除租戶",
                description="可以刪除租戶",
                resource="tenant",
                action="delete"
            ),
            Permission(
                name="role.manage",
                display_name="管理角色",
                description="可以管理角色和權限",
                resource="role",
                action="manage"
            ),
            Permission(
                name="health.check",
                display_name="健康檢查",
                description="可以查看系統健康狀態",
                resource="health",
                action="check"
            )
        ]
        
        for permission in permissions:
            db.add(permission)
        
        # 建立預設角色
        roles = [
            Role(
                name="admin",
                display_name="管理員",
                description="系統管理員，擁有所有權限",
                permissions=[
                    "tenant.create", "tenant.read", "tenant.update", "tenant.delete",
                    "role.manage", "health.check"
                ]
            ),
            Role(
                name="manager",
                display_name="管理者",
                description="租戶管理者，可以管理租戶但不能管理角色",
                permissions=["tenant.read", "tenant.update", "health.check"]
            ),
            Role(
                name="guest",
                display_name="訪客",
                description="訪客用戶，只能查看基本資訊",
                permissions=["health.check"]
            )
        ]
        
        for role in roles:
            db.add(role)
        
        db.commit()
        
        return {
            "message": "Roles and permissions seeded successfully",
            "roles_created": len(roles),
            "permissions_created": len(permissions)
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to seed roles: {str(e)}")

@router.get("/permissions", response_model=List[PermissionResponse])
async def get_permissions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """取得權限列表"""
    try:
        permissions = db.query(Permission).offset(skip).limit(limit).all()
        return permissions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch permissions: {str(e)}")

