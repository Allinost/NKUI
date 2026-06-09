# Popover 弹出框

## 概述

点击/悬浮元素时弹出的气泡卡片。

## 设计规范

### 触发方式

| Trigger | Description |
|---------|-------------|
| `click` (默认) | 点击触发 |
| `hover` | 悬浮触发 (150ms delay) |
| `focus` | 聚焦触发 |

### 位置

`top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`

### 间距

- 箭头与触发元素间距: 8px
- 内容内边距: 12px 16px

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | `'click' \| 'hover' \| 'focus'` | `'click'` | 触发方式 |
| placement | `Placement` | `'bottom'` | 弹出位置 |
| content | `string` | - | 内容文字 |
| width | `string \| number` | `'200px'` | 面板宽度 |
| disabled | `boolean` | `false` | 禁用 |
| visible | `boolean` | `false` | 手动控制显隐 |

### Slots

| Slot | Description |
|------|-------------|
| reference | 触发元素 |
| default | 弹出内容 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| visible-change | `boolean` | 显隐变化 |
