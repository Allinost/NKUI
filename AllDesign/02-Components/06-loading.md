# Loading 加载

## 概述

页面或区块加载状态指示。

## 设计规范

### 变体

| Variant | Description |
|---------|-------------|
| `spinner` | 旋转圆环 (默认) |
| `dots` | 跳动圆点 |
| `bar` | 水平进度条 |

### 尺寸

| Size | Diameter/Height |
|------|-----------------|
| sm | 16px |
| md (默认) | 24px |
| lg | 32px |

### 覆盖类型

- **Local**: 在区块内居中显示，可带半透明蒙层
- **Fullscreen**: 全屏覆盖，阻止交互

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'spinner' \| 'dots' \| 'bar'` | `'spinner'` | 样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| text | `string` | - | 加载提示文字 |
| fullscreen | `boolean` | `false` | 全屏覆盖 |
