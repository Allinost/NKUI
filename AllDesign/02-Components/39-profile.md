# Profile 个人信息

## 概述

展示用户个人信息的卡片组件，包含头像、姓名、头衔、邮箱和统计数据。

## 设计规范

### 尺寸

| Size | 内边距 | 头像尺寸 | 姓名字号 | 头衔字号 |
|------|--------|---------|---------|---------|
| sm | 16px | 56px | 16px | 12px |
| md (默认) | 24px | 80px | 20px | 14px |
| lg | 32px | 80px | 24px | 16px |

### 变体 (Variant)

| Variant | 样式 |
|---------|------|
| `outlined` (默认) | 边框 |
| `elevated` | 阴影 |
| `flat` | 无边框无阴影 |

### 布局

```
┌──────────────────────────┐
│  ┌────┐                  │
│  │    │  姓名             │
│  │ 像 │  头衔             │
│  │    │  email@xxx.com    │
│  └────┘                  │
│                          │
│  项目 12 │ 团队 3 │ 动态 48│
│                          │
│  [自定义内容]             │
│  [操作按钮]              │
└──────────────────────────┘
```

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | `''` | 姓名 |
| title | `string` | `''` | 头衔/职位 |
| email | `string` | `''` | 邮箱 |
| avatar | `string` | `''` | 头像图片 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 卡片变体 |
| avatarVariant | `'circle' \| 'square'` | `'circle'` | 头像形状 |
| stats | `{ label: string, value: string \| number }[]` | `[]` | 统计数据 |

### Slots

| Slot | Description |
|------|-------------|
| default | 中间自定义内容 |
| actions | 底部操作按钮 |
