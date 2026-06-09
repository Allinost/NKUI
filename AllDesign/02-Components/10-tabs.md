# Tabs 标签页

## 概述

选项卡切换组件。

## 设计规范

### 变体

| Variant | Style |
|---------|-------|
| `line` (默认) | 底部横线指示器 |
| `card` | 卡片式 |
| `segment` | 分段选择器 |

### 尺寸

| Size | Height | Font Size |
|------|--------|-----------|
| sm | 32px | 12px |
| md (默认) | 40px | 14px |
| lg | 48px | 16px |

### 对齐

| Align | Description |
|-------|-------------|
| `start` (默认) | 左对齐 |
| `center` | 居中 |
| `full` | 等分宽度 |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'line' \| 'card' \| 'segment'` | `'line'` | 样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| align | `'start' \| 'center' \| 'full'` | `'start'` | 对齐方式 |
| modelValue / value | `string \| number` | `-` | 当前激活值 |
| items | `TabItem[]` | `[]` | 标签项数组 |

### TabItem

| Prop | Type | Description |
|------|------|-------------|
| label | `string` | 标签文字 |
| value | `string \| number` | 唯一值 |
| disabled | `boolean` | 禁用 |
| icon | `string` | 图标名称 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `value` | 切换时触发 |

### Slots

| Slot | Description |
|------|-------------|
| default | 标签页内容 |
| tab-{value} | 指定 tab 的内容 |
