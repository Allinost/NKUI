# Icon 图标

## 概述

SVG 图标组件，语义化的视觉符号。

## 设计规范

### 尺寸

| Size | Value | Usage |
|------|-------|-------|
| xs | 12px | 内联小图标 |
| sm | 16px | 列表/表格操作 |
| md (默认) | 20px | 按钮内图标 |
| lg | 24px | 空状态/标题 |
| xl | 32px | 大图展示 |

### 颜色

- 默认继承 `currentColor`
- 可通过 color 属性单独指定

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | - | 图标名称 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| color | `string` | `'currentColor'` | 颜色 |
| spin | `boolean` | `false` | 旋转动画 |

### 注册机制

```ts
// Vue3
import { NKIcon } from '@nkui/vue'
import { addIcon } from '@nkui/vue'
addIcon('my-icon', '<svg>...</svg>')

// Miniprogram
<nk-icon name="my-icon" />
```
