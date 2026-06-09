# Dropdown 下拉菜单

## 概述

向下弹出的菜单列表。

## 设计规范

### 触发方式

| Trigger | Description |
|---------|-------------|
| `click` (默认) | 点击触发 |
| `hover` | 悬浮触发 |

### 菜单项

- **常规项**: 文本 + 可选图标
- **分隔线**: `---` 分割
- **分组**: 标题 + 子项
- **禁用项**: opacity 0.38
- **带箭头**: 右箭头表示有子菜单

### 级联菜单

- 悬浮/点击展开子菜单
- 最多支持 3 级

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | `'click' \| 'hover'` | `'click'` | 触发方式 |
| placement | `'bottom' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` | 位置 |
| items | `DropdownItem[]` | `[]` | 菜单项 |
| splitButton | `boolean` | `false'` | 分割按钮模式 |

### DropdownItem

| Prop | Type | Description |
|------|------|-------------|
| label | `string` | 显示文字 |
| key | `string \| number` | 唯一标识 |
| icon | `string` | 图标 |
| disabled | `boolean` | 禁用 |
| divided | `boolean` | 上方显示分割线 |
| children | `DropdownItem[]` | 子菜单 |
| danger | `boolean` | 危险操作(红色) |

### Slots

| Slot | Description |
|------|-------------|
| default | 触发元素 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| select | `key` | 选中菜单项 |
| visible-change | `boolean` | 显隐变化 |
