# Progress 进度条

## 概述

展示操作或任务进度。

## 设计规范

### 变体

| Variant | Description |
|---------|-------------|
| `line` (默认) | 水平进度条 |
| `circle` | 环形进度条 |

### 尺寸

| Variant | Size | Diameter / Height |
|---------|------|-------------------|
| line | sm | 4px (thickness) |
| line | md (默认) | 6px |
| line | lg | 8px |
| circle | sm | 60px (diameter) |
| circle | md (默认) | 80px |
| circle | lg | 120px |

### 颜色

| Status | Color |
|--------|-------|
| `active` (默认) | Primary 500 |
| `success` | Success 500 |
| `exception` | Error 500 |
| `warning` | Warning 500 |

### 动画

- 进度条过渡: 400ms ease
- 条纹 (striped): 45deg 斜线 + 2s 滑动

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'line' \| 'circle'` | `'line'` | 样式 |
| percent | `number` | `0` | 百分比 (0-100) |
| status | `'active' \| 'success' \| 'exception' \| 'warning'` | `'active'` | 状态 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| strokeWidth | `number` | - | 线宽 |
| striped | `boolean` | `false` | 条纹动画 |
| showText | `boolean` | `true` | 显示百分比文字 |
| color | `string` | - | 自定义进度条颜色 |
| trackColor | `string` | `Neutral 200` | 轨道颜色 |

### Slots

| Slot | Description |
|------|-------------|
| default | 自定义百分比文字 (仅 circle) |
