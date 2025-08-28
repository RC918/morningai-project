#!/bin/bash

# MorningAI GitHub Repository 設置腳本

echo "🌅 設置 MorningAI GitHub Repository..."

# 檢查是否已經是 Git repository
if [ ! -d ".git" ]; then
    echo "❌ 這不是一個 Git repository，請先執行 git init"
    exit 1
fi

# 檢查是否有 GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  請設置 GITHUB_TOKEN 環境變數"
    echo "export GITHUB_TOKEN=your_github_token"
    exit 1
fi

# 設置 Git 配置
echo "🔧 設置 Git 配置..."
git config user.name "MorningAI Dev"
git config user.email "dev@morningai.com"

# 建立 .gitignore (如果不存在)
if [ ! -f ".gitignore" ]; then
    echo "📝 建立 .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.next/

# Python
__pycache__/
*.pyc
venv/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Docker
.dockerignore

# Database
*.db
*.sqlite
EOF
fi

# 添加所有文件
echo "📁 添加文件到 Git..."
git add .

# 提交初始版本
echo "💾 提交初始版本..."
git commit -m "feat: Phase 1 基礎環境建置完成

- 建立 Monorepo 架構 (前端 + 後端 + Agent Hub)
- 實作 FastAPI 後端與 Postgres 資料表
- 建立 React 前端儀表板
- 設置 Docker 容器化環境
- 建立 GitHub Actions CI/CD 流程
- 實作 RBAC 角色權限系統
- 建立 API health check 端點

驗收標準:
✅ API health check 正常
✅ Staging 環境可用 (待部署驗證)
✅ RBAC 種子資料建立成功"

# 建立分支
echo "🌿 建立分支..."
git branch develop
git checkout develop

echo ""
echo "✅ Git repository 設置完成！"
echo ""
echo "📋 下一步："
echo "1. 在 GitHub 建立新的 repository"
echo "2. 添加 remote origin:"
echo "   git remote add origin https://github.com/your-username/morningai-project.git"
echo "3. 推送代碼:"
echo "   git push -u origin main"
echo "   git push -u origin develop"
echo "4. 在 GitHub 設置 Secrets:"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID" 
echo "   - VERCEL_PROJECT_ID"
echo ""

