# Space 间距

## 概述

排列子元素并控制间距。

## 设计规范

### 方向

| Direction | Description |
|-----------|-------------|
| `horizontal` (默认) | 水平排列 |
| `vertical` | 垂直排列 |

### 间距大小

| Size | Gap |
|------|-----|
| xs | 4px |
| sm | 8px |
| md (默认) | 12px |
| lg | 16px |
| xl | 24px |

### 对齐

| Align | Description |
|-------|-------------|
| `start` (默认) | 起始对齐 |
| `center` | 居中对齐 |
| `end` | 末尾对齐 |
| `baseline` | 基线对齐 |
| `stretch` | 拉伸填充 |

### 换行

- `wrap` 属性控制是否允许换行
- 适用于水平方向按钮组

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | 间距 |
| align | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | `'start'` | 对齐 |
| wrap | `boolean` | `false` | 是否换行 |
| inline | `boolean` | `false` | 行内元素模式 |

### Slots

| Slot | Description |
|------|-------------|
| default | Space 子元素 |
