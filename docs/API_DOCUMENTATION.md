# MorningAI API 文件

## 概述

MorningAI API 是一個基於 FastAPI 的 RESTful API，提供租戶管理、角色權限控制和系統監控功能。

### API 資訊
- **版本**: 1.0.0
- **基礎 URL**: `/api/v1`
- **認證方式**: JWT Bearer Token
- **資料格式**: JSON

### 快速開始
```bash
# 基礎健康檢查
curl http://localhost:8000/health

# API 健康檢查
curl http://localhost:8000/api/v1/health/

# 查看 API 文件
open http://localhost:8000/docs
```

## 認證

### JWT Token 認證
```http
Authorization: Bearer <your-jwt-token>
```

### 取得 Token
```bash
# 登入端點 (待 Phase 3 實現)
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

## API 端點

### 健康檢查

#### 基礎健康檢查
```http
GET /health
```

**回應範例**:
```json
{
  "status": "healthy",
  "service": "morningai-api",
  "version": "1.0.0",
  "environment": "development"
}
```

#### API 健康檢查
```http
GET /api/v1/health/
```

**回應範例**:
```json
{
  "status": "healthy",
  "service": "morningai-api",
  "version": "1.0.0",
  "environment": "development",
  "message": "API is running normally"
}
```

#### 資料庫健康檢查
```http
GET /api/v1/health/db
```

**成功回應**:
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "Database connection is working"
}
```

**失敗回應**:
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "connection error message",
  "message": "Database connection failed"
}
```

### 租戶管理

#### 取得租戶列表
```http
GET /api/v1/tenants/
```

**查詢參數**:
- `skip` (integer): 跳過的記錄數，預設 0
- `limit` (integer): 限制返回的記錄數，預設 100

**回應範例**:
```json
[
  {
    "id": 1,
    "name": "MorningAI 官方",
    "slug": "morningai-official",
    "description": "MorningAI 官方租戶",
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  }
]
```

#### 建立租戶
```http
POST /api/v1/tenants/
Content-Type: application/json
```

**請求體**:
```json
{
  "name": "新租戶",
  "slug": "new-tenant",
  "description": "租戶描述",
  "is_active": true
}
```

**回應範例**:
```json
{
  "id": 2,
  "name": "新租戶",
  "slug": "new-tenant",
  "description": "租戶描述",
  "is_active": true,
  "created_at": "2025-08-28T16:50:00",
  "updated_at": null
}
```

#### 取得特定租戶
```http
GET /api/v1/tenants/{tenant_id}
```

**路徑參數**:
- `tenant_id` (integer): 租戶 ID

**回應範例**:
```json
{
  "id": 1,
  "name": "MorningAI 官方",
  "slug": "morningai-official",
  "description": "MorningAI 官方租戶",
  "is_active": true,
  "created_at": "2025-08-28T16:46:28",
  "updated_at": null
}
```

### 角色權限管理

#### 取得角色列表
```http
GET /api/v1/roles/
```

**查詢參數**:
- `skip` (integer): 跳過的記錄數，預設 0
- `limit` (integer): 限制返回的記錄數，預設 100

**回應範例**:
```json
[
  {
    "id": 1,
    "name": "admin",
    "display_name": "管理員",
    "description": "系統管理員，擁有所有權限",
    "permissions": [
      "tenant.create",
      "tenant.read",
      "tenant.update",
      "tenant.delete",
      "role.manage",
      "health.check"
    ],
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  },
  {
    "id": 2,
    "name": "manager",
    "display_name": "管理者",
    "description": "租戶管理者，可以管理租戶但不能管理角色",
    "permissions": [
      "tenant.read",
      "tenant.update",
      "health.check"
    ],
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  },
  {
    "id": 3,
    "name": "guest",
    "display_name": "訪客",
    "description": "訪客用戶，只能查看基本資訊",
    "permissions": [
      "health.check"
    ],
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  }
]
```

#### 種子化角色
```http
POST /api/v1/roles/seed
```

**回應範例**:
```json
{
  "message": "Roles and permissions seeded successfully",
  "roles_created": 3,
  "permissions_created": 6
}
```

#### 取得權限列表
```http
GET /api/v1/roles/permissions
```

**查詢參數**:
- `skip` (integer): 跳過的記錄數，預設 0
- `limit` (integer): 限制返回的記錄數，預設 100

**回應範例**:
```json
[
  {
    "id": 1,
    "name": "tenant.create",
    "display_name": "建立租戶",
    "description": "可以建立新的租戶",
    "resource": "tenant",
    "action": "create",
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  },
  {
    "id": 2,
    "name": "tenant.read",
    "display_name": "查看租戶",
    "description": "可以查看租戶資訊",
    "resource": "tenant",
    "action": "read",
    "is_active": true,
    "created_at": "2025-08-28T16:46:28",
    "updated_at": null
  }
]
```

## 資料模型

### Tenant (租戶)
```json
{
  "id": "integer",
  "name": "string",
  "slug": "string",
  "description": "string | null",
  "is_active": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime | null"
}
```

### Role (角色)
```json
{
  "id": "integer",
  "name": "string",
  "display_name": "string",
  "description": "string | null",
  "permissions": "array[string]",
  "is_active": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime | null"
}
```

### Permission (權限)
```json
{
  "id": "integer",
  "name": "string",
  "display_name": "string",
  "description": "string | null",
  "resource": "string",
  "action": "string",
  "is_active": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime | null"
}
```

### AuditLog (審計日誌)
```json
{
  "id": "integer",
  "trace_id": "string",
  "actor": "string",
  "action": "string",
  "resource": "string",
  "resource_id": "string | null",
  "details": "object | null",
  "ip_address": "string | null",
  "user_agent": "string | null",
  "request_method": "string | null",
  "request_path": "string | null",
  "response_status": "integer | null",
  "latency_ms": "float | null",
  "result": "string",
  "error_message": "string | null",
  "created_at": "datetime"
}
```

## 錯誤處理

### HTTP 狀態碼
- `200` - 成功
- `201` - 建立成功
- `400` - 請求錯誤
- `401` - 未認證
- `403` - 權限不足
- `404` - 資源不存在
- `422` - 驗證錯誤
- `500` - 伺服器錯誤

### 錯誤回應格式
```json
{
  "detail": "錯誤訊息",
  "type": "error_type",
  "code": "error_code"
}
```

### 驗證錯誤
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## 請求/回應範例

### 建立租戶範例
```bash
curl -X POST "http://localhost:8000/api/v1/tenants/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "測試公司",
    "slug": "test-company",
    "description": "這是一個測試租戶"
  }'
```

### 取得角色列表範例
```bash
curl -X GET "http://localhost:8000/api/v1/roles/" \
  -H "Accept: application/json"
```

### 種子化角色範例
```bash
curl -X POST "http://localhost:8000/api/v1/roles/seed" \
  -H "Content-Type: application/json"
```

## 限制與配額

### 請求限制
- **請求頻率**: 1000 requests/hour (待實現)
- **請求大小**: 最大 10MB
- **回應大小**: 最大 50MB

### 分頁限制
- **預設頁面大小**: 20
- **最大頁面大小**: 100
- **最大偏移量**: 10000

## 版本控制

### API 版本
- **當前版本**: v1
- **版本格式**: `/api/v{version}/`
- **向後相容**: 保證 v1 API 穩定性

### 版本升級
- **棄用通知**: 提前 6 個月通知
- **支援期限**: 每個版本支援 2 年
- **遷移指南**: 提供詳細的遷移文件

## 開發工具

### API 文件
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

### 測試工具
```bash
# 使用 curl 測試
curl -X GET "http://localhost:8000/api/v1/health/"

# 使用 httpie 測試
http GET localhost:8000/api/v1/health/

# 使用 Postman
# 匯入 OpenAPI JSON 文件到 Postman
```

### SDK 和客戶端庫
- **JavaScript/TypeScript**: 待開發
- **Python**: 待開發
- **Go**: 待開發

## 監控與日誌

### 請求追蹤
每個請求都會包含 `X-Trace-ID` 標頭，用於追蹤和除錯。

```http
X-Trace-ID: 12d2397c-6647-4293-9bb1-f03f091ad8bc
```

### 效能監控
- **平均回應時間**: < 100ms
- **99th 百分位**: < 500ms
- **可用性**: 99.9%

### 日誌格式
```json
{
  "timestamp": "2025-08-28T16:46:28Z",
  "level": "INFO",
  "trace_id": "12d2397c-6647-4293-9bb1-f03f091ad8bc",
  "method": "GET",
  "path": "/api/v1/health/",
  "status_code": 200,
  "latency_ms": 45.2,
  "user_agent": "curl/7.81.0"
}
```

## 安全性

### 認證機制
- **JWT Token**: 用於 API 認證
- **Token 過期**: 30 分鐘 (可配置)
- **Refresh Token**: 待實現

### 資料驗證
- **輸入驗證**: Pydantic 模式驗證
- **SQL 注入防護**: SQLAlchemy ORM
- **XSS 防護**: 自動轉義輸出

### CORS 配置
```python
CORS_ORIGINS = [
    "http://localhost:3000",
    "https://morningai.vercel.app"
]
```

## 未來規劃

### Phase 2 新增功能
- **用戶認證**: 完整的登入/註冊系統
- **多語系**: i18n 支援
- **檔案上傳**: 支援檔案上傳和管理

### Phase 3 新增功能
- **聊天 API**: GPT 整合和 RAG 功能
- **推播系統**: Telegram/LINE 推播
- **CMS 功能**: 內容管理系統

### Phase 4 新增功能
- **金流 API**: Stripe/TapPay 整合
- **點數系統**: 點數管理和消費
- **訂閱管理**: 訂閱計劃和計費

---

**更新日期**: 2025-08-28  
**API 版本**: 1.0.0  
**文件版本**: 1.0.0

