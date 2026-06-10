# TopNav 顶部菜单栏

## 概述

页面顶部的导航菜单栏，支持 Logo、菜单项、右侧操作区。

## 设计规范

### 尺寸

| Size | Height | 菜单项 Padding | Logo 字号 |
|------|--------|---------------|-----------|
| sm | 40px | 0 12px | 16px |
| md (默认) | 48px | 0 16px | 18px |
| lg | 56px | 0 20px | 20px |

### 布局

```
┌────────────────────────────────┐
│ Logo     菜单1 菜单2 菜单3  ...│
│          菜单4 菜单5           │
└────────────────────────────────┘
```

- Logo 靠左
- 菜单项居中或靠左
- 右侧可放置操作按钮

### 状态

- Active: 选中态，底部指示线或高亮文字
- Hover: 颜色变化
- Disabled: opacity 0.38

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `TopNavItem[]` | `[]` | 菜单项列表 |
| modelValue | `string \| number` | `''` | 当前选中值 |
| logo | `string` | `''` | Logo 文字或图片 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| fixed | `boolean` | `false` | 是否固定在顶部 |

### TopNavItem

| Field | Type | Description |
|-------|------|-------------|
| label | `string` | 显示文字 |
| value | `string \| number` | 选中值 |
| disabled | `boolean` | 禁用 |
| icon | `string` | 图标名称 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `value` | 选中项变化 |

### Slots

| Slot | Description |
|------|-------------|
| logo | 自定义 Logo 区域 |
| default | 右侧操作区 |
