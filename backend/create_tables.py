#!/usr/bin/env python3
"""
建立資料表的腳本
"""
import sys
import os

# 添加專案根目錄到 Python 路徑
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.base import Base, engine
from app.models.tenant import Tenant
from app.models.role import Role, Permission
from app.models.audit import AuditLog
from app.models.user import User

def create_tables():
    """建立所有資料表"""
    print("建立資料表...")
    Base.metadata.create_all(bind=engine)
    print("資料表建立完成！")

if __name__ == "__main__":
    create_tables()

