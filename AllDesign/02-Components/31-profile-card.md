# ProfileCard 名片卡

## 概述

展示用户或企业名片信息的卡片组件，包含头像、姓名、头衔、描述等基本信息。

## 设计规范

### 尺寸

| Size | 卡片高度 | 头像尺寸 | 字号(姓名) | 字号(头衔) |
|------|---------|---------|-----------|-----------|
| sm | auto | 40px | 14px | 12px |
| md (默认) | auto | 56px | 16px | 14px |
| lg | auto | 72px | 18px | 16px |

### 变体 (Variant)

| Variant | 样式 |
|---------|------|
| `outlined` (默认) | 边框 |
| `elevated` | 阴影 |
| `flat` | 无边框无阴影 |

### 布局

```
┌──────────────────────┐
│ ┌────┐               │
│ │    │  姓名          │
│ │ 像 │  头衔/公司     │
│ │    │  描述文字...   │
│ └────┘               │
│ [操作按钮]            │
└──────────────────────┘
```

### 状态

- Default: 正常显示
- 头像加载失败: 显示文字占位

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | `''` | 姓名 |
| title | `string` | `''` | 头衔/职位 |
| description | `string` | `''` | 描述文字 |
| avatar | `string` | `''` | 头像图片 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 卡片变体 |

### Slots

| Slot | Description |
|------|-------------|
| default | 底部附加内容 |
| actions | 操作按钮区域 |
