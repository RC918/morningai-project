from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class PermissionBase(BaseModel):
    """權限基礎模式"""
    name: str
    display_name: str
    description: Optional[str] = None
    resource: str
    action: str
    is_active: bool = True

class PermissionResponse(PermissionBase):
    """權限回應模式"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class RoleBase(BaseModel):
    """角色基礎模式"""
    name: str
    display_name: str
    description: Optional[str] = None
    permissions: List[str] = []
    is_active: bool = True

class RoleCreate(RoleBase):
    """建立角色請求模式"""
    pass

class RoleUpdate(BaseModel):
    """更新角色請求模式"""
    display_name: Optional[str] = None
    description: Optional[str] = None
    permissions: Optional[List[str]] = None
    is_active: Optional[bool] = None

class RoleResponse(RoleBase):
    """角色回應模式"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

