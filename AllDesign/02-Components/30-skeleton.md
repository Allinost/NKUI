# Skeleton 骨架屏

## 概述

内容加载时的占位骨架。

## 设计规范

### 变体

| Variant | Description |
|---------|-------------|
| `text` (默认) | 文字行骨架 |
| `avatar` | 头像骨架 |
| `image` | 图片骨架 |
| `paragraph` | 段落骨架 (多行) |
| `card` | 卡片骨架 |
| `table` | 表格骨架 |
| `custom` | 自定义骨架 |

### 动画

- 默认: 渐变脉冲 (1500ms)
- 备选: 左右滑动光效 (2000ms)

### 文字行

| Prop | Default |
|------|---------|
| 行数 | 3 |
| 行高 | 14px |
| 行间距 | 12px |
| 最后一行宽度 | 60% |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'text' \| 'avatar' \| 'image' \| 'paragraph' \| 'card' \| 'table' \| 'custom'` | `'text'` | 变体 |
| rows | `number` | `3` | 文字行数 |
| animated | `boolean` | `true` | 动画 |
| width | `string \| number` | - | 宽度 |
| height | `string \| number` | - | 高度 |
| round | `boolean` | `false` | 圆角 |

### Slots

| Slot | Description |
|------|-------------|
| default | 自定义骨架模板 (variant=custom 时) |
| template | 骨架模板 (结合 SkeletonItem) |

### SkeletonItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'text' \| 'avatar' \| 'image' \| 'button' \| 'input'` | `'text'` | 骨架项类型 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
