# Avatar 头像

## 概述

用户头像展示。

## 设计规范

### 尺寸

| Size | Diameter |
|------|----------|
| xs | 24px |
| sm | 32px |
| md (默认) | 40px |
| lg | 56px |
| xl | 80px |

### 变体

| Variant | Shape |
|---------|-------|
| `circle` (默认) | 圆形 |
| `square` | 圆角方形 (radius md) |

### 内容优先级

1. `src` (图片)
2. `icon` (图标)
3. `text` (文字首字母回退)

### 图片状态

- **Loading**: 显示骨架或 spinner
- **Error**: 回退到 icon 或 text

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | `string` | - | 图片地址 |
| alt | `string` | - | 图片 alt 文字 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| variant | `'circle' \| 'square'` | `'circle'` | 形状 |
| icon | `string` | - | 回退图标 |
| text | `string` | - | 回退文字 |
| srcset | `string` | - | 响应式图片集 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| error | `Event` | 图片加载失败 |
