# BottomTab 底部 Tab 栏

## 概述

移动端底部导航栏，用于切换页面主视图。

## 设计规范

### 尺寸

| Size | Bar Height | 图标尺寸 | 字号 |
|------|-----------|---------|------|
| sm | 44px | 18px | 10px |
| md (默认) | 52px | 22px | 12px |
| lg | 60px | 26px | 14px |

### 变体 (Variant)

| Variant | 显示方式 |
|---------|---------|
| `icon-text` (默认) | 图标 + 文字 |
| `icon` | 仅图标 |
| `text` | 仅文字 |

### 布局

```
┌──────────┬──────────┬──────────┬──────────┐
│  图标     │  图标     │  图标     │  图标     │
│  首页     │  发现     │  消息     │  我的     │
└──────────┴──────────┴──────────┴──────────┘
```

### 状态

- Active: 主色调高亮图标和文字
- Inactive: 灰色
- Badge: 可显示角标

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `BottomTabItem[]` | `[]` | Tab 项列表 |
| modelValue | `string \| number` | `''` | 当前选中值 |
| variant | `'icon-text' \| 'icon' \| 'text'` | `'icon-text'` | 显示变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| fixed | `boolean` | `true` | 是否固定底部 |

### BottomTabItem

| Field | Type | Description |
|-------|------|-------------|
| label | `string` | 显示文字 |
| value | `string \| number` | 选中值 |
| icon | `string` | 图标名称 |
| badge | `number \| string` | 角标数值 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `value` | 选中项变化 |
