# Checkbox 复选框

## 概述

多选选择框。

## 设计规范

### 尺寸

| Size | Box Size | Font Size |
|------|----------|-----------|
| sm | 14px | 12px |
| md (默认) | 16px | 14px |
| lg | 20px | 16px |

### 状态

| State | Style |
|-------|-------|
| Unchecked | border Neutral 300, bg Neutral 0 |
| Checked | bg Primary 500, white checkmark |
| Indeterminate | bg Primary 500, white minus |
| Disabled | opacity 0.38 |

### 分组

- CheckboxGroup 管理多个 Checkbox
- 支持全选/取消全选

## API

### Checkbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / checked | `boolean` | `false` | 选中状态 |
| indeterminate | `boolean` | `false` | 半选状态 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| value | `any` | - | 对应 CheckboxGroup 的值 |
| label | `string` | - | 标签文字 |

### CheckboxGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / value | `any[]` | `[]` | 选中的值列表 |
| disabled | `boolean` | `false` | 全部禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `boolean \| any[]` | 选中变化 |
