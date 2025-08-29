FROM python:3.11-slim

WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 複製requirements文件
COPY requirements.txt .

# 安裝Python依賴
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 複製應用程式代碼
COPY app/ ./app/

# 暴露端口
EXPOSE 10000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:10000/health || exit 1

# 啟動命令
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]

