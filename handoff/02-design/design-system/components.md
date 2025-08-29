# 元件庫規格 (Component Library Specification)

## 概述

本文件定義 MorningAI Phase 2 的 6 個核心元件，每個元件都包含完整的狀態管理和無障礙支援。

## 元件清單

### 1. Navigation (Nav)

**用途**: 主要導航欄，包含 Logo、選單項目和語言切換器

**狀態**:
- `default`: 預設狀態
- `hover`: 滑鼠懸停
- `active`: 當前頁面
- `mobile`: 移動版本（漢堡選單）

**屬性**:
- `logo`: 品牌標誌
- `items`: 導航項目陣列
- `currentPath`: 當前路徑
- `showMobileMenu`: 移動選單顯示狀態

**行為**:
- Logo 點擊必回首頁 `/[locale]`
- 語言切換器常駐
- 移動版使用 Drawer（overflow: hidden、focus-trap）
- 支援鍵盤導航

### 2. Tabs

**用途**: 分頁切換元件

**狀態**:
- `default`: 預設狀態
- `active`: 選中狀態
- `hover`: 滑鼠懸停
- `disabled`: 禁用狀態

**屬性**:
- `tabs`: 分頁陣列
- `activeTab`: 當前選中分頁
- `orientation`: 方向（horizontal/vertical）

**行為**:
- 支援鍵盤方向鍵切換
- 動畫過渡 200ms
- ARIA 標籤支援

### 3. Form

**用途**: 表單元件集合（Input、Select、Checkbox、Radio）

**狀態**:
- `default`: 預設狀態
- `focus`: 聚焦狀態
- `error`: 錯誤狀態
- `disabled`: 禁用狀態
- `loading`: 載入狀態

**屬性**:
- `label`: 標籤文字
- `placeholder`: 佔位符
- `value`: 值
- `error`: 錯誤訊息
- `required`: 必填標記

**行為**:
- 錯誤訊息走 i18n
- 即時驗證
- 無障礙標籤
- 聚焦環顯示

### 4. Table

**用途**: 資料表格顯示

**狀態**:
- `default`: 預設狀態
- `loading`: 載入狀態
- `empty`: 空狀態
- `error`: 錯誤狀態

**屬性**:
- `columns`: 欄位定義
- `data`: 資料陣列
- `sortable`: 是否可排序
- `pagination`: 分頁設定

**行為**:
- 響應式設計（移動版橫向滾動）
- 排序功能
- 空狀態必備
- 載入骨架屏

### 5. Modal

**用途**: 彈出視窗

**狀態**:
- `closed`: 關閉狀態
- `opening`: 開啟動畫
- `open`: 開啟狀態
- `closing`: 關閉動畫

**屬性**:
- `title`: 標題
- `content`: 內容
- `actions`: 操作按鈕
- `size`: 尺寸（sm/md/lg/xl）

**行為**:
- ESC 鍵關閉
- 焦點圈定（focus trap）
- 背景點擊關閉
- 非同步內容 Loading 狀態
- 動畫 250ms

### 6. Toast

**用途**: 通知訊息

**狀態**:
- `info`: 資訊
- `success`: 成功
- `warning`: 警告
- `error`: 錯誤

**屬性**:
- `message`: 訊息內容
- `type`: 類型
- `duration`: 顯示時長
- `closable`: 是否可關閉

**行為**:
- 自動消失（預設 4 秒）
- 堆疊顯示
- 滑入/滑出動畫
- 支援手動關閉

## 通用規範

### 動畫時長
- 快速互動: 150ms
- 一般過渡: 200ms
- 複雜動畫: 300ms

### 無障礙支援
- 所有互動元件支援鍵盤操作
- ARIA 標籤完整
- 聚焦環清晰可見
- 色彩對比度符合 WCAG 2.1 AA

### 響應式設計
- Mobile-first 設計
- 斷點: 360px / 768px / 1024px / 1280px
- 觸控友善（最小點擊區域 44px）

### 主題支援
- 支援淺色/深色主題
- CSS 變數動態切換
- 系統偏好自動偵測

## 實作注意事項

1. **禁止文字嵌入圖片**: 可用 SVG icon 或純圖像，不含字
2. **RWD 不得溢出**: 使用 max-w-screen、grid-cols-12、object-contain
3. **動效偵測**: 支援 prefers-reduced-motion: reduce 自動降級
4. **觸發回饋**: 所有按鈕需有 :hover/:active/disabled/loading 狀態

