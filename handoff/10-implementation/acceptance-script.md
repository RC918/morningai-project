# MorningAI Phase 2 驗收腳本

## 一鍵驗收腳本

```bash
#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-https://morningai-phase2.vercel.app}"  # 替換為實際 URL

say() { echo -e "\n\033[1;34m▶ $*\033[0m"; }
ok()  { echo -e "\033[1;32m✓ $*\033[0m"; }
fail(){ echo -e "\033[1;31m✗ $*\033[0m"; exit 1; }

echo "🚀 MorningAI Phase 2 驗收測試開始"
echo "測試目標: $BASE"

# 1) 健康檢查
say "1. 健康檢查"
curl -fsSL "$BASE/healthz" | grep -q '"ok":true' && ok "/healthz OK" || fail "/healthz FAIL"

# 2) 版本驗證
say "2. 版本驗證"
curl -fsSL "$BASE/version.json" | grep -q '"build_id"' && ok "/version.json OK" || fail "/version.json FAIL"

# 3) 多語系路由測試
say "3. 多語系路由測試"
for L in en zh-TW zh-CN; do
  curl -fsSL "$BASE/$L" > /tmp/$L.html
  grep -q "MorningAI" /tmp/$L.html && ok "/$L route renders" || fail "/$L route not rendering"
done

# 4) 語言切換器測試
say "4. 語言切換器測試"
curl -fsSL "$BASE/en" | grep -qi 'aria-label="language"' && ok "Language switcher found" || fail "No language switcher"

# 5) 官網頁面測試
say "5. 官網頁面測試"
pages=("pricing" "contact" "features" "cases" "faq" "about" "legal")
for page in "${pages[@]}"; do
  curl -fsSL "$BASE/en/$page" > /tmp/$page.html
  grep -q "MorningAI" /tmp/$page.html && ok "/$page OK" || fail "/$page FAIL"
done

# 6) 設計系統測試
say "6. 設計系統測試"
curl -fsSL "$BASE/en" | grep -q "bg-primary\|text-primary" && ok "Design tokens found" || fail "Design tokens missing"

# 7) 響應式測試 (模擬)
say "7. 響應式測試"
curl -fsSL "$BASE/en" | grep -q "container\|grid\|flex" && ok "Responsive classes found" || fail "Responsive classes missing"

# 8) 版本一致性檢查
say "8. 版本一致性檢查"
VERSION_API=$(curl -fsSL "$BASE/version.json" | grep -o '"build_id":"[^"]*"' | cut -d'"' -f4)
curl -fsSL "$BASE/en" | grep -q "$VERSION_API" && ok "Version consistency OK" || fail "Version mismatch"

echo ""
echo "🎉 Phase 2 驗收測試完成！"
echo "所有核心功能正常運作"
```

## 手動驗收清單

### ✅ 基礎功能驗收

#### 1. 多語系功能
- [ ] 語言切換器顯示正常
- [ ] en/zh-TW/zh-CN 路由正常
- [ ] 語言切換保留當前頁面
- [ ] 瀏覽器語言自動偵測
- [ ] fallback 到英文正常

#### 2. 頁面結構
- [ ] 首頁 (Dashboard) 載入正常
- [ ] Pricing 頁面顯示三個方案
- [ ] Contact 頁面表單完整
- [ ] Features 頁面功能展示
- [ ] Cases 頁面案例研究
- [ ] FAQ 頁面問答完整
- [ ] About 頁面公司介紹
- [ ] Legal 頁面法律條款

#### 3. 版本驗證
- [ ] /version.json 回傳正確格式
- [ ] /healthz 回傳 ok: true
- [ ] 頁腳顯示 Build ID
- [ ] 版本資訊一致

### ✅ 設計系統驗收

#### 1. 色彩系統
- [ ] Primary 色彩正確 (#3b82f6)
- [ ] Secondary 色彩正確 (#64748b)
- [ ] Success/Warning/Error 色彩正確
- [ ] 深/淺色主題變數定義

#### 2. 字體系統
- [ ] Inter 字體載入正常
- [ ] 標題字體大小正確
- [ ] 內文字體可讀性良好
- [ ] 行高設定適當

#### 3. 元件系統
- [ ] Button 元件狀態正常
- [ ] Card 元件樣式一致
- [ ] Form 元件互動正常
- [ ] Badge 元件顯示正確

### ✅ 響應式設計驗收

#### 1. 375px (Mobile)
- [ ] 無水平捲軸
- [ ] 文字不溢出
- [ ] 按鈕可點擊
- [ ] 導航正常

#### 2. 768px (Tablet)
- [ ] 版面適應良好
- [ ] 圖片自適應
- [ ] 表格響應式
- [ ] 觸控友好

#### 3. 1280px (Desktop)
- [ ] 最大寬度限制
- [ ] 內容居中對齊
- [ ] 間距適當
- [ ] 視覺層次清晰

### ✅ 無障礙驗收

#### 1. 鍵盤導航
- [ ] Tab 順序正確
- [ ] 焦點可見
- [ ] Enter/Space 觸發
- [ ] Esc 關閉彈窗

#### 2. 螢幕閱讀器
- [ ] alt 文字完整
- [ ] aria-label 正確
- [ ] 語義化標籤
- [ ] 標題結構清晰

#### 3. 色彩對比
- [ ] 文字對比度 >4.5:1
- [ ] 連結可識別
- [ ] 狀態顏色區分
- [ ] 色盲友好

### ✅ 效能驗收

#### 1. 載入速度
- [ ] 首頁 <3 秒載入
- [ ] 圖片懶載入
- [ ] 程式碼分割
- [ ] 快取策略

#### 2. Core Web Vitals
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Lighthouse >85

### ✅ 部署驗收

#### 1. GitHub 整合
- [ ] main 分支自動部署
- [ ] PR 產生 Preview URL
- [ ] 建置狀態正常
- [ ] 環境變數正確

#### 2. Vercel 設定
- [ ] Production Branch: main
- [ ] Build Command: next build
- [ ] 禁用 Authentication
- [ ] 自訂網域設定

## 驗收報告範本

```markdown
# MorningAI Phase 2 驗收報告

## 驗收結果: ✅ 通過 / ❌ 不通過

### 測試環境
- URL: https://morningai-phase2.vercel.app
- 測試日期: 2025-08-29
- 測試人員: [姓名]
- 瀏覽器: Chrome 127, Firefox 128, Safari 17

### 功能測試結果
- 多語系功能: ✅ 通過
- 頁面結構: ✅ 通過  
- 版本驗證: ✅ 通過
- 設計系統: ✅ 通過
- 響應式設計: ✅ 通過
- 無障礙功能: ✅ 通過
- 效能表現: ✅ 通過

### 發現問題
1. [問題描述]
   - 嚴重程度: 高/中/低
   - 影響範圍: [描述]
   - 建議修復: [建議]

### 總體評價
Phase 2 開發成果符合預期，所有核心功能正常運作，
設計系統完整，多語系支援良好，可進入下一階段開發。

### 簽核
- 技術負責人: [簽名] [日期]
- 專案經理: [簽名] [日期]  
- 客戶代表: [簽名] [日期]
```

## 常見問題排除

### 1. 多語系切換失效
```bash
# 檢查 middleware.ts
# 檢查 i18n 配置
# 檢查路由結構
```

### 2. 版本資訊不一致
```bash
# 檢查 /version.json API
# 檢查 Footer 元件
# 檢查環境變數
```

### 3. 響應式問題
```bash
# 檢查 CSS 媒體查詢
# 檢查 Tailwind 配置
# 檢查容器寬度
```

### 4. 效能問題
```bash
# 檢查圖片優化
# 檢查程式碼分割
# 檢查快取設定
```

