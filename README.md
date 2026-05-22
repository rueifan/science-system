# 生命探索模擬學習系統（拆分版）

這是整理後的版本，保留原本畫面與功能，將原本較長的 `script.js` 拆成多個檔案，方便之後維護。

## 檔案結構

```text
natural_science_learning_system_refactored/
│
├─ index.html
├─ style.css
├─ README.md
│
└─ js/
   ├─ state.js        狀態資料、分組邏輯、流程步驟
   ├─ components.js   共用元件，例如上方流程列、學生資訊彈窗
   ├─ pages.js        各頁畫面內容
   └─ main.js         主要流程控制、登入、事件綁定
```

## 使用方式

1. 用 VS Code 開啟整個資料夾。
2. 開啟 `index.html`。
3. 使用 Live Server 執行，或直接用瀏覽器開啟 `index.html`。

## 測試帳號

- 學生代碼：S001
- 密碼：1234
- 第一階段：互動模擬器

---

- 學生代碼：S002
- 密碼：1234
- 第一階段：文字教學

## 備註

這版沒有改變原本系統內容與流程，只是整理檔案結構，並把完成後的回看頁函式移到正確位置，讓「返回互動模擬器 / 文字教學」按鈕可以正常運作。


## 題目圖片放置方式

請將題目圖片放到 `assets/images/` 資料夾，並使用以下檔名：

- `q1-cell-division.png`
- `q3-option-1.png`
- `q3-option-2.png`
- `q3-option-3.png`
- `q3-option-4.png`

如果檔名不同，請到 `js/data.js` 修改對應的 `image` 路徑。
