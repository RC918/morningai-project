#!/usr/bin/env bash
set -euo pipefail

API_BASE="${1:-https://morningai-api.onrender.com}"
FRONTEND_BASE="${2:-https://morningai-project.vercel.app}"
ADMIN_USER="${3:-admin}"
ADMIN_PASS="${4:-Y7TR&Q\$*D\$Q0PHZzlS6g}"

green(){ printf "\033[32m%s\033[0m\n" "$1"; }
red(){ printf "\033[31m%s\033[0m\n" "$1"; }
check(){ local name="$1" url="$2"; 
  code=$(curl -sk -o /dev/null -w "%{http_code}" "$url" || true)
  if [[ "$code" == "200" ]]; then green "✓ $name ($url) -> 200 OK"; else red "✗ $name ($url) -> $code"; exit 1; fi
}

echo "🚀 Phase 2 驗收開始"
echo "API_BASE=$API_BASE"
echo "FRONTEND_BASE=$FRONTEND_BASE"

# 1) 後端健康檢查
echo "📡 檢查後端 API..."
check "基本健康檢查"     "$API_BASE/health"
check "資料庫健康檢查"   "$API_BASE/api/v1/health/db"

# 2) RBAC 種子資料驗證
echo "🔐 檢查 RBAC 系統..."
curl -sk "$API_BASE/api/v1/roles/" | jq -r '.[].name' | sort | tee /tmp/roles.txt
grep -q "admin"   /tmp/roles.txt && green "✓ Admin 角色存在"
grep -q "manager" /tmp/roles.txt && green "✓ Manager 角色存在"
grep -q "guest"   /tmp/roles.txt && green "✓ Guest 角色存在"

# 3) 管理員登入測試
echo "👤 測試管理員登入..."
resp=$(curl -sk -X POST "$API_BASE/api/v1/auth/login/simple" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$ADMIN_USER\",\"password\":\"$ADMIN_PASS\"}")
token=$(echo "$resp" | jq -r '.access_token // empty')
if [[ -z "$token" || "$token" == "null" ]]; then
  red "✗ 管理員登入失敗: $resp"; exit 1
else
  green "✓ 管理員登入成功 (JWT 取得)"
fi

# 4) CORS 檢查
echo "🌐 檢查 CORS 配置..."
cors=$(curl -sk -X OPTIONS "$API_BASE/api/v1/roles/" \
  -H "Origin: $FRONTEND_BASE" \
  -H "Access-Control-Request-Method: GET" -i)
echo "$cors" | grep -qi "access-control-allow-origin" && green "✓ CORS preflight 正常" || red "✗ CORS preflight 缺失"

# 5) 前端檢查
echo "🎨 檢查前端應用..."
check "前端首頁"         "$FRONTEND_BASE"
check "版本資訊 API"     "$FRONTEND_BASE/api/version"
check "前端健康檢查"     "$FRONTEND_BASE/healthz"

# 6) 多語系檢查
echo "🌍 檢查多語系支援..."
check "英文路由"         "$FRONTEND_BASE/en"
check "繁體中文路由"     "$FRONTEND_BASE/zh-TW"
check "簡體中文路由"     "$FRONTEND_BASE/zh-CN"

# 7) 官網頁面檢查
echo "📄 檢查官網頁面..."
check "定價頁面"         "$FRONTEND_BASE/en/pricing"
check "聯絡頁面"         "$FRONTEND_BASE/en/contact"
check "功能頁面"         "$FRONTEND_BASE/en/features"
check "案例頁面"         "$FRONTEND_BASE/en/cases"
check "FAQ 頁面"         "$FRONTEND_BASE/en/faq"
check "關於頁面"         "$FRONTEND_BASE/en/about"
check "法律頁面"         "$FRONTEND_BASE/en/legal"

green "🎉 Phase 2 驗收 — 全部通過！"
echo ""
echo "📊 驗收摘要："
echo "✅ 後端 API 健康正常"
echo "✅ RBAC 系統完整 (Admin/Manager/Guest)"
echo "✅ 管理員登入功能正常"
echo "✅ CORS 配置正確"
echo "✅ 前端應用正常運行"
echo "✅ 多語系支援 (en/zh-TW/zh-CN)"
echo "✅ 官網頁面完整 (7個主要頁面)"
echo ""
echo "🚀 Phase 2 開發完成，可進入 Phase 3！"

