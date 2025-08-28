#!/usr/bin/env python3
"""
Flask 相容的入口文件
用於部署 FastAPI 應用到支援 Flask 的平台
"""

from app.main import app

# Flask 相容性
application = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

