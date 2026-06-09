# Tag 标签

## 概述

用于标记、分类或状态展示。

## 设计规范

| Size | Height | Font Size | Padding |
|------|--------|-----------|---------|
| sm | 20px | 10px | 0 6px |
| md (默认) | 24px | 12px | 0 8px |
| lg | 32px | 14px | 0 12px |

### 变体

| Variant | Style |
|---------|-------|
| `solid` | 实心背景 |
| `outline` | 边框 + 透明背景 |
| `light` | 浅色背景 |

### 类型/颜色

`primary`, `success`, `warning`, `danger`, `info`, `neutral`

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `see Button` | `'primary'` | 颜色类型 |
| variant | `'solid' \| 'outline' \| 'light'` | `'light'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| closable | `boolean` | `false` | 可关闭 |
| round | `boolean` | `false` | 全圆角 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| close | - | 点击关闭按钮 |
