#!/usr/bin/env python3
"""
建立預設管理員用戶的腳本
"""
import sys
import os

# 添加專案根目錄到 Python 路徑
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.base import SessionLocal
from app.models.user import User
from app.models.tenant import Tenant
from app.models.role import Role
from app.crud.user import user_crud

def create_admin_user():
    """建立預設管理員用戶"""
    db = SessionLocal()
    
    try:
        # 檢查是否已存在管理員用戶
        existing_admin = user_crud.get_by_username(db, username="admin")
        if existing_admin:
            print("管理員用戶已存在，跳過建立")
            return existing_admin
        
        # 取得管理員角色
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        role_id = admin_role.id if admin_role else None
        
        # 建立預設租戶 (如果不存在)
        default_tenant = db.query(Tenant).filter(Tenant.slug == "default").first()
        if not default_tenant:
            default_tenant = Tenant(
                name="預設租戶",
                slug="default",
                description="系統預設租戶",
                is_active=True
            )
            db.add(default_tenant)
            db.commit()
            db.refresh(default_tenant)
        
        # 建立管理員用戶
        admin_user = user_crud.create_superuser(
            db,
            username="admin",
            email="admin@morningai.com",
            password="admin123",
            full_name="系統管理員"
        )
        
        # 設置租戶和角色
        admin_user.tenant_id = default_tenant.id
        admin_user.role_id = role_id
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print(f"✅ 管理員用戶建立成功！")
        print(f"   用戶名: admin")
        print(f"   密碼: admin123")
        print(f"   郵箱: admin@morningai.com")
        print(f"   租戶: {default_tenant.name}")
        print(f"   角色: {admin_role.display_name if admin_role else '無'}")
        
        return admin_user
        
    except Exception as e:
        print(f"❌ 建立管理員用戶失敗: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user()

