# Dialog 对话框

## 概述

模态对话框，用于重要操作确认或信息展示。

## 设计规范

### 组成

```
┌──────────────────────┐
│       标题 (可选)     │
│                      │
│     内容区域          │
│                      │
│  [取消]    [确认]     │
└──────────────────────┘
```

### 尺寸

| Size | Width | Usage |
|------|-------|-------|
| sm | 320px | 简单确认 |
| md (默认) | 420px | 通用 |
| lg | 560px | 复杂内容 |

### 动画

- 蒙层: 150ms fade
- 内容: 250ms scale + fade (0.9 → 1.0)

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | - | 标题 |
| width | `string` | `'420px'` | 宽度 |
| closable | `boolean` | `true` | 显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击蒙层关闭 |
| confirmText | `string` | `'确认'` | 确认按钮文字 |
| cancelText | `string` | `'取消'` | 取消按钮文字 |
| loading | `boolean` | `false` | 确认按钮加载态 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| confirm | - | 点击确认 |
| cancel | - | 点击取消/关闭 |
| close | - | 对话框关闭后 |

### Slots

| Slot | Description |
|------|-------------|
| default | 内容区域 |
| title | 自定义标题 |
| footer | 自定义底部按钮 |
