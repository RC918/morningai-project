from typing import Optional
from datetime import datetime
from pydantic import BaseModel, validator

class TenantBase(BaseModel):
    """租戶基礎模式"""
    name: str
    slug: str
    description: Optional[str] = None
    is_active: bool = True

class TenantCreate(TenantBase):
    """建立租戶請求模式"""
    
    @validator('slug')
    def validate_slug(cls, v):
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('Slug must contain only alphanumeric characters, hyphens, and underscores')
        return v.lower()

class TenantUpdate(BaseModel):
    """更新租戶請求模式"""
    name: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class TenantResponse(TenantBase):
    """租戶回應模式"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

