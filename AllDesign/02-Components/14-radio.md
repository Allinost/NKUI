# Radio 单选框

## 概述

单选选择项。

## 设计规范

### 尺寸

| Size | Radio Size | Font Size |
|------|------------|-----------|
| sm | 14px | 12px |
| md (默认) | 16px | 14px |
| lg | 20px | 16px |

### 状态

| State | Style |
|-------|-------|
| Unselected | border Neutral 300, bg Neutral 0 |
| Selected | border Primary 500, inner dot Primary 500 |
| Disabled | opacity 0.38 |

### 分组

- RadioGroup 管理多个 Radio
- 横向/纵向布局

## API

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `any` | - | 对应 RadioGroup 的值 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| label | `string` | - | 标签文字 |

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / value | `any` | - | 当前选中值 |
| disabled | `boolean` | `false` | 全部禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `any` | 选中值变化 |
