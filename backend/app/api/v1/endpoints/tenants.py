from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.tenant import Tenant
from app.schemas.tenant import TenantCreate, TenantResponse

router = APIRouter()

@router.get("/", response_model=List[TenantResponse])
async def get_tenants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """取得租戶列表"""
    try:
        tenants = db.query(Tenant).offset(skip).limit(limit).all()
        return tenants
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch tenants: {str(e)}")

@router.get("/{tenant_id}", response_model=TenantResponse)
async def get_tenant(tenant_id: int, db: Session = Depends(get_db)):
    """取得特定租戶"""
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant

@router.post("/", response_model=TenantResponse)
async def create_tenant(tenant: TenantCreate, db: Session = Depends(get_db)):
    """建立新租戶"""
    try:
        # 檢查slug是否已存在
        existing_tenant = db.query(Tenant).filter(Tenant.slug == tenant.slug).first()
        if existing_tenant:
            raise HTTPException(status_code=400, detail="Tenant slug already exists")
        
        db_tenant = Tenant(**tenant.dict())
        db.add(db_tenant)
        db.commit()
        db.refresh(db_tenant)
        return db_tenant
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create tenant: {str(e)}")

