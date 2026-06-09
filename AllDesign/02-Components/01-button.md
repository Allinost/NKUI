# Button 按钮

## 概述

触发业务逻辑的操作入口。

## 设计规范

### 尺寸

| Size | Height | Padding | Font Size | Radius |
|------|--------|---------|-----------|--------|
| sm | 28px | 0 12px | 12px | 6px |
| md (默认) | 36px | 0 16px | 14px | 8px |
| lg | 44px | 0 24px | 16px | 10px |

### 变体 (Variant)

| Variant | 样式 | 场景 |
|---------|------|------|
| `solid` (默认) | 实心背景 + 白色文字 | 主要操作 |
| `outline` | 白色背景 + 边框 | 次要操作 |
| `ghost` | 无背景无边框 | 弱化操作 |
| `text` | 纯文字 | 最弱操作 |

### 类型 (Type)

| Type | Color | 
|------|-------|
| `primary` (默认) | Primary 500 |
| `success` | Success 500 |
| `warning` | Warning 500 |
| `danger` | Error 500 |
| `neutral` | Neutral 800 |

### 状态

- **Default**: 正常显示
- **Hover**: 亮度 -10%
- **Active/Pressed**: 亮度 -20%
- **Disabled**: opacity 0.38, 无交互
- **Loading**: 显示 Loading 图标，禁用交互

### 交互行为

- 点击反馈: active 态 100ms 微缩放
- Loading 态: 替换图标为 spinner
- 禁用态: `cursor: not-allowed`

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | 颜色类型 |
| variant | `'solid' \| 'outline' \| 'ghost' \| 'text'` | `'solid'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用 |
| loading | `boolean` | `false` | 加载中 |
| block | `boolean` | `false` | 块级（100%宽度） |
| icon | `string` | - | 图标名称 |
| round | `boolean` | `false` | 全圆角 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `MouseEvent` | 点击触发 |

### Slots

| Slot | Description |
|------|-------------|
| default | 按钮文字 |
| icon | 自定义图标 |
