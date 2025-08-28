# MorningAI 部署指南

## 概述

本指南提供 MorningAI Phase 1 基礎環境的完整部署說明，包含本地開發、Docker 容器化和生產環境部署。

## 系統要求

### 開發環境要求
- **Node.js**: >= 18.0.0
- **Python**: >= 3.11
- **Docker**: >= 20.10
- **Docker Compose**: >= 2.0
- **Git**: >= 2.30

### 生產環境要求
- **Vercel**: 前端部署平台
- **Supabase**: PostgreSQL 資料庫
- **GitHub**: 代碼倉庫和 CI/CD

## 本地開發環境部署

### 1. 專案克隆
```bash
git clone <repository-url>
cd morningai-project
```

### 2. 環境變數配置
```bash
# 複製環境變數範本
cp .env.example .env.local

# 編輯環境變數
nano .env.local
```

### 3. 快速啟動 (推薦)
```bash
# 使用提供的啟動腳本
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

### 4. 手動啟動

#### 後端服務
```bash
# 安裝 Python 依賴
cd backend
pip install -r requirements.txt

# 建立資料表
python create_tables.py

# 啟動 FastAPI 服務
PYTHONPATH=/path/to/backend python -m app.main
```

#### 前端服務
```bash
# 安裝 Node.js 依賴
cd frontend
npm install -g pnpm
pnpm install

# 啟動開發服務器
pnpm run dev
```

### 5. 驗證部署
- 前端: http://localhost:3000
- 後端: http://localhost:8000
- API 文件: http://localhost:8000/docs

## Docker 容器化部署

### 1. 使用 Docker Compose
```bash
# 建置並啟動所有服務
docker-compose up --build -d

# 檢查服務狀態
docker-compose ps

# 查看服務日誌
docker-compose logs -f [service_name]
```

### 2. 服務配置

#### PostgreSQL 資料庫
```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_USER: morningai
    POSTGRES_PASSWORD: changeme
    POSTGRES_DB: morningai_dev
  ports:
    - "5432:5432"
```

#### FastAPI 後端
```yaml
backend:
  build: ./backend
  environment:
    - DATABASE_URL=postgresql://morningai:changeme@postgres:5432/morningai_dev
  ports:
    - "8000:8000"
  depends_on:
    - postgres
```

#### React 前端
```yaml
frontend:
  build: ./frontend
  ports:
    - "3000:3000"
  depends_on:
    - backend
```

### 3. 停止服務
```bash
# 停止所有服務
docker-compose down

# 停止並移除資料卷
docker-compose down -v
```

## 生產環境部署

### 1. GitHub Repository 設置

#### 建立 Repository
```bash
# 初始化 Git (如果尚未初始化)
git init
git add .
git commit -m "feat: Phase 1 基礎環境建置完成"

# 添加遠端倉庫
git remote add origin https://github.com/your-username/morningai-project.git
git push -u origin main

# 建立 develop 分支
git checkout -b develop
git push -u origin develop
```

#### 設置 GitHub Secrets
在 GitHub Repository Settings > Secrets and variables > Actions 中添加：

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
```

### 2. Vercel 前端部署

#### 自動部署 (推薦)
1. 連接 GitHub Repository 到 Vercel
2. 設置建置配置：
   ```json
   {
     "buildCommand": "cd frontend && pnpm install && pnpm run build",
     "outputDirectory": "frontend/dist",
     "installCommand": "npm install -g pnpm"
   }
   ```
3. 推送代碼到 develop 分支觸發自動部署

#### 手動部署
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入 Vercel
vercel login

# 部署到 Staging
cd frontend
vercel

# 部署到 Production
vercel --prod
```

### 3. Supabase 資料庫設置

#### 建立 Supabase 專案
1. 訪問 https://supabase.com
2. 建立新專案
3. 取得連接資訊

#### 資料庫初始化
```sql
-- 執行 scripts/init-db.sql 中的 SQL 腳本
-- 或使用 Supabase Dashboard 的 SQL Editor
```

#### 環境變數配置
```bash
# 在 Vercel 中設置環境變數
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. 後端服務部署

#### 使用 Railway (推薦)
```bash
# 安裝 Railway CLI
npm install -g @railway/cli

# 登入 Railway
railway login

# 部署後端
cd backend
railway deploy
```

#### 使用 Heroku
```bash
# 安裝 Heroku CLI
# 建立 Heroku 應用
heroku create morningai-backend

# 設置環境變數
heroku config:set DATABASE_URL=your-supabase-url
heroku config:set JWT_SECRET=your-jwt-secret

# 部署
git subtree push --prefix backend heroku main
```

## CI/CD 流程

### GitHub Actions 工作流程

#### 觸發條件
- **develop 分支**: 自動部署到 Staging
- **main 分支**: 手動部署到 Production
- **Pull Request**: 執行測試和建置檢查

#### 工作流程步驟
1. **程式碼檢查**: ESLint, Black, isort
2. **建置測試**: 前端和後端建置
3. **Docker 測試**: 容器映像建置
4. **部署**: 根據分支部署到對應環境
5. **健康檢查**: 部署後驗證服務狀態

### 手動部署
```bash
# 觸發手動部署
# 在 GitHub Actions 頁面選擇 "Deploy to Vercel" workflow
# 選擇環境 (staging/production) 並執行
```

## 環境配置

### 開發環境變數
```bash
# .env.local
DATABASE_URL=sqlite:///./morningai.db
JWT_SECRET=dev-secret-key
ENVIRONMENT=development
```

### Staging 環境變數
```bash
# Vercel Environment Variables
DATABASE_URL=postgresql://user:pass@supabase-host/db
JWT_SECRET=staging-secret-key
ENVIRONMENT=staging
```

### Production 環境變數
```bash
# Vercel Environment Variables
DATABASE_URL=postgresql://user:pass@supabase-host/db
JWT_SECRET=production-secret-key
ENVIRONMENT=production
```

## 監控與維護

### 健康檢查
```bash
# 檢查服務狀態
curl https://your-domain.vercel.app/api/v1/health/

# 檢查資料庫連接
curl https://your-domain.vercel.app/api/v1/health/db
```

### 日誌查看
```bash
# Vercel 日誌
vercel logs

# Docker 日誌
docker-compose logs -f [service_name]

# 本地日誌
tail -f logs/app.log
```

### 效能監控
- **Vercel Analytics**: 前端效能監控
- **Supabase Dashboard**: 資料庫效能監控
- **API 回應時間**: 內建健康檢查

## 故障排除

### 常見問題

#### 1. 前端建置失敗
```bash
# 清除快取
rm -rf frontend/node_modules frontend/.next
cd frontend && pnpm install

# 檢查 Node.js 版本
node --version  # 需要 >= 18.0.0
```

#### 2. 後端服務無法啟動
```bash
# 檢查 Python 版本
python --version  # 需要 >= 3.11

# 重新安裝依賴
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

#### 3. 資料庫連接問題
```bash
# 檢查連接字串
echo $DATABASE_URL

# 測試資料庫連接
python -c "from app.db.base import engine; print(engine.execute('SELECT 1').scalar())"
```

#### 4. Docker 容器問題
```bash
# 重新建置容器
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 檢查容器日誌
docker-compose logs backend
```

### 回滾策略

#### Vercel 回滾
```bash
# 查看部署歷史
vercel ls

# 回滾到指定版本
vercel rollback [deployment-url]
```

#### 資料庫回滾
```sql
-- 使用 Supabase 的備份功能
-- 或執行預先準備的回滾腳本
```

## 安全性考量

### 生產環境安全檢查
- [ ] 環境變數不包含敏感資訊
- [ ] JWT Secret 使用強密碼
- [ ] 資料庫連接使用 SSL
- [ ] API 端點有適當的認證
- [ ] CORS 設置正確的來源

### 定期維護
- **每週**: 檢查服務健康狀態
- **每月**: 更新依賴套件
- **每季**: 安全性審查和測試

## 效能優化

### 前端優化
- **代碼分割**: 使用 React.lazy 和 Suspense
- **圖片優化**: 使用 WebP 格式和適當尺寸
- **快取策略**: 設置適當的 HTTP 快取標頭

### 後端優化
- **資料庫索引**: 為常用查詢添加索引
- **連接池**: 配置適當的資料庫連接池
- **快取**: 使用 Redis 快取常用資料

### 基礎設施優化
- **CDN**: 使用 Vercel 的全球 CDN
- **壓縮**: 啟用 Gzip 壓縮
- **監控**: 設置效能監控和警報

## 擴展指南

### 水平擴展
- **負載均衡**: 使用多個後端實例
- **資料庫分片**: 根據租戶分割資料
- **微服務**: 將功能拆分為獨立服務

### 垂直擴展
- **資源升級**: 增加 CPU 和記憶體
- **資料庫優化**: 升級資料庫規格
- **快取層**: 添加 Redis 快取層

---

**更新日期**: 2025-08-28  
**版本**: 1.0.0  
**維護團隊**: MorningAI DevOps Team

