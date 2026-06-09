# 快速开始

## 项目简介

NKUI 是一套跨平台统一设计系统的 UI 组件库，目前支持 **Vue3** 和 **微信小程序**，后续将扩展至 Flutter、Kotlin Compose Multiplatform、iOS SwiftUI。

### 目录结构

```
NKUI/
├── AllDesign/          # 统一设计规范（可视化语言 + 组件规范）
├── AllDocs/            # 文档站点（VitePress，即本网站）
├── AllPublic/          # 共享公共资源
│   └── tokens/         # 设计 Token 单一事实来源
├── Vue3/               # Vue3 组件库
├── Miniprogram/        # 微信小程序组件库
├── Flutter/            # Flutter 组件库（筹备中）
├── Kotlin/             # Kotlin Compose Multiplatform（筹备中）
└── iOS/                # iOS SwiftUI 组件库（筹备中）
```

---

## Vue3 接入

### 安装

```bash
cd Vue3
npm install
npm run dev
```

### 使用组件

```vue
<script setup lang="ts">
import { NkButton, NkSpace } from './components'
</script>

<template>
  <Space>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </Space>
</template>
```

### 全局注册

```ts
import { createApp } from 'vue'
import { install } from './components'

const app = createApp(App)
install(app)
app.mount('#app')
```

---

## 微信小程序接入

### 使用组件

```json
// app.json
{
  "usingComponents": {
    "nk-button": "/components/nk-button/nk-button"
  }
}
```

```xml
<!-- pages/index/index.wxml -->
<nk-button type="primary">主要按钮</nk-button>
<nk-button type="success">成功按钮</nk-button>
```

所有组件均以 `nk-` 前缀命名，遵循小程序组件规范。

---

## 平台对比

| 特性 | Vue3 | 微信小程序 |
|------|------|-----------|
| 组件数量 | 22 | 15 |
| 样式方案 | SCSS + 变量 | 纯 CSS + tokens.wxss |
| 注册方式 | 按需导入 / 全局安装 | app.json usingComponents |
| 单元测试 | — | — |
| 构建工具 | Vite | 微信开发者工具 |

## 设计 Token

所有设计 Token 统一维护在 `AllPublic/tokens/design-tokens.json`，各平台通过脚本生成对应语言的常量文件：

- **Vue3**: `Vue3/src/styles/_tokens.scss`
- **小程序**: `Miniprogram/styles/tokens.wxss`
- **Flutter**: `Flutter/lib/src/tokens/`
- **Kotlin**: `Kotlin/compose/src/commonMain/kotlin/com/nkui/`
- **iOS**: `iOS/Sources/NKUI/`
