# Tooltip 文字提示

## 概述

文字提示气泡，用于解释/说明。

## 设计规范

### 尺寸

- 最大宽度: 200px
- 内边距: 6px 10px
- 字号: 12px
- 圆角: 4px

### 视觉

- 背景: Neutral 900 (深色)
- 文字: Neutral 0 (白色)
- Z-index: 1060

### 位置

`top` (默认), `bottom`, `left`, `right`

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `string` | - | 提示文字 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 位置 |
| delay | `number` | `150` | 显示延迟 (ms) |
| disabled | `boolean` | `false` | 禁用 |

### Slots

| Slot | Description |
|------|-------------|
| default | 触发元素 |
