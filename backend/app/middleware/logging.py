import time
import uuid
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.audit import AuditLog

class LoggingMiddleware(BaseHTTPMiddleware):
    """日誌記錄中間件"""
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # 生成追蹤ID
        trace_id = str(uuid.uuid4())
        request.state.trace_id = trace_id
        
        # 記錄請求開始時間
        start_time = time.time()
        
        # 取得客戶端資訊
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "")
        
        try:
            # 執行請求
            response = await call_next(request)
            
            # 計算延遲時間
            latency_ms = (time.time() - start_time) * 1000
            
            # 記錄審計日誌
            await self._log_request(
                trace_id=trace_id,
                method=request.method,
                path=str(request.url.path),
                status_code=response.status_code,
                latency_ms=latency_ms,
                ip_address=client_ip,
                user_agent=user_agent,
                result="success" if response.status_code < 400 else "failure"
            )
            
            # 添加追蹤ID到回應標頭
            response.headers["X-Trace-ID"] = trace_id
            
            return response
            
        except Exception as e:
            # 計算延遲時間
            latency_ms = (time.time() - start_time) * 1000
            
            # 記錄錯誤日誌
            await self._log_request(
                trace_id=trace_id,
                method=request.method,
                path=str(request.url.path),
                status_code=500,
                latency_ms=latency_ms,
                ip_address=client_ip,
                user_agent=user_agent,
                result="error",
                error_message=str(e)
            )
            
            raise e
    
    async def _log_request(
        self,
        trace_id: str,
        method: str,
        path: str,
        status_code: int,
        latency_ms: float,
        ip_address: str,
        user_agent: str,
        result: str,
        error_message: str = None
    ):
        """記錄請求日誌到資料庫"""
        try:
            # 這裡暫時跳過資料庫記錄，因為資料庫可能還未初始化
            # 在實際部署時會啟用
            pass
        except Exception:
            # 如果資料庫記錄失敗，不影響主要請求流程
            pass

