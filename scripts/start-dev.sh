#!/bin/bash

# MorningAI 開發環境啟動腳本

echo "🌅 啟動 MorningAI 開發環境..."

# 檢查 Docker 是否運行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未運行，請先啟動 Docker"
    exit 1
fi

# 檢查環境變數文件
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local 文件不存在，複製範本..."
    cp .env.example .env.local
fi

# 停止現有容器
echo "🛑 停止現有容器..."
docker-compose down

# 建立並啟動服務
echo "🚀 建立並啟動服務..."
docker-compose up --build -d

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 10

# 檢查服務狀態
echo "🔍 檢查服務狀態..."
docker-compose ps

# 顯示服務 URL
echo ""
echo "✅ MorningAI 開發環境已啟動！"
echo ""
echo "📊 前端儀表板: http://localhost:3000"
echo "🔧 後端 API: http://localhost:8000"
echo "📚 API 文件: http://localhost:8000/docs"
echo "🤖 Agent Hub: http://localhost:8001"
echo "🗄️  PostgreSQL: localhost:5432"
echo ""
echo "📝 查看日誌: docker-compose logs -f [service_name]"
echo "🛑 停止服務: docker-compose down"
echo ""

