# Badge 徽标

## 概述

用于消息数量、状态红点等提示。

## 设计规范

| Variant | Style | Usage |
|---------|-------|-------|
| `dot` | 小红点 | 有新内容但无需显示数量 |
| `count` | 数字徽标 | 显示具体数量 |
| `text` | 文字徽标 | 显示简短文字 |

### 位置

- `top-right` (默认): 右上角
- `top-left`: 左上角

### 数值溢出

- 超过 99 显示 `99+`
- 超过 999 显示 `999+`

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'dot' \| 'count' \| 'text'` | `'dot'` | 徽标类型 |
| value | `number \| string` | - | 显示数值/文字 |
| max | `number` | `99` | 最大显示值 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` | 颜色类型 |
| position | `'top-right' \| 'top-left'` | `'top-right'` | 位置 |
