# Divider 分割线

## 概述

内容分隔线。

## 设计规范

### 方向

| Direction | Description |
|-----------|-------------|
| `horizontal` (默认) | 水平分割 |
| `vertical` | 垂直分割 |

### 变体

| Variant | Style |
|---------|-------|
| `solid` (默认) | 实线 |
| `dashed` | 虚线 |

### 带文字分割线

```
──────  文字内容  ──────
```

- 文字字号: 12px
- 文字颜色: Neutral 500
- 线条颜色: Neutral 200
- 虚线间距: 4px

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| variant | `'solid' \| 'dashed'` | `'solid'` | 样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 厚度 (horizontal=高度, vertical=宽度) |

### Slots

| Slot | Description |
|------|-------------|
| default | 分割线中间文字 |
