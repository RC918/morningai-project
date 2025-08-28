from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Float
from sqlalchemy.sql import func
from app.db.base import Base

class AuditLog(Base):
    """審計日誌資料表"""
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    trace_id = Column(String(36), nullable=False, index=True)  # UUID for request tracing
    actor = Column(String(255), nullable=False, index=True)    # 操作者
    action = Column(String(100), nullable=False, index=True)   # 操作動作
    resource = Column(String(100), nullable=False)            # 操作資源
    resource_id = Column(String(100), nullable=True)          # 資源ID
    details = Column(JSON, nullable=True)                     # 操作詳情
    ip_address = Column(String(45), nullable=True)            # IP地址
    user_agent = Column(Text, nullable=True)                  # 用戶代理
    request_method = Column(String(10), nullable=True)        # HTTP方法
    request_path = Column(String(500), nullable=True)         # 請求路徑
    response_status = Column(Integer, nullable=True)          # 回應狀態碼
    latency_ms = Column(Float, nullable=True)                 # 延遲時間(毫秒)
    result = Column(String(20), nullable=False, default="success")  # 結果: success, failure, error
    error_message = Column(Text, nullable=True)               # 錯誤訊息
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    def __repr__(self):
        return f"<AuditLog(id={self.id}, trace_id='{self.trace_id}', actor='{self.actor}', action='{self.action}')>"

