# 🌅 MorningAI - SaaS Platform

MorningAI是一個企業級SaaS平台，提供AI代理人服務和智能對話解決方案。

## 專案架構

這是一個Monorepo專案，包含以下模組：

- **frontend/**: Next.js前端應用
- **backend/**: FastAPI後端服務
- **agent-hub/**: AI代理人核心模組
- **docs/**: 專案文件
- **scripts/**: 部署和工具腳本

## 技術棧

### 前端
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query

### 後端
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT認證

### 基礎設施
- Docker & Docker Compose
- GitHub Actions
- Vercel (前端部署)
- Supabase (資料庫)

## 快速開始

### 環境要求
- Node.js >= 18.0.0
- Python >= 3.9
- Docker & Docker Compose

### 安裝依賴
```bash
npm install
```

### 開發環境
```bash
# 啟動所有服務
npm run dev

# 或分別啟動
npm run dev:frontend  # 前端 (http://localhost:3000)
npm run dev:backend   # 後端 (http://localhost:8000)
```

### Docker開發
```bash
# 啟動所有容器
npm run docker:up

# 停止所有容器
npm run docker:down
```

## 環境配置

### 開發環境
複製環境變數範本：
```bash
cp .env.example .env.local
```

### 環境變數
- `DATABASE_URL`: PostgreSQL連接字串
- `JWT_SECRET`: JWT密鑰
- `SUPABASE_URL`: Supabase專案URL
- `SUPABASE_ANON_KEY`: Supabase匿名密鑰

## 部署

### Staging環境
推送到`develop`分支會自動部署到Staging環境。

### Production環境
推送到`main`分支需要手動審核後部署到Production環境。

## API文件

後端API文件可在以下位置查看：
- 開發環境: http://localhost:8000/docs
- Staging: https://staging-api.morningai.com/docs

## 測試

```bash
# 執行所有測試
npm run test

# 執行前端測試
npm run test:frontend

# 執行後端測試
npm run test:backend
```

## 程式碼品質

```bash
# 執行Linting
npm run lint

# 自動修復
npm run lint:fix
```

## 專案結構

```
morningai-project/
├── frontend/           # Next.js前端
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # FastAPI後端
│   ├── app/
│   ├── tests/
│   └── requirements.txt
├── agent-hub/          # AI代理人模組
│   ├── src/
│   └── tests/
├── docs/               # 專案文件
├── scripts/            # 工具腳本
├── .github/workflows/  # CI/CD配置
├── docker-compose.yml  # Docker配置
└── package.json        # 根目錄配置
```

## 貢獻指南

1. Fork專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟Pull Request

## 授權

此專案採用MIT授權 - 詳見 [LICENSE](LICENSE) 文件。

## 聯絡方式

- 專案維護者: MorningAI Team
- Email: dev@morningai.com
- 官網: https://morningai.com

