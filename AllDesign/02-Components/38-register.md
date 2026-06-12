# Register 注册表单

## 概述

统一的注册表单组件，包含用户名、邮箱、密码、确认密码字段，支持表单验证和加载状态。

## 设计规范

### 尺寸

| Size | 宽度 | 内边距 | 标题字号 | 正文字号 |
|------|------|--------|---------|---------|
| sm | 340px | 20px | 16px | 12px |
| md (默认) | 400px | 28px | 20px | 14px |
| lg | 460px | 36px | 24px | 16px |

### 变体 (Variant)

| Variant | 样式 |
|---------|------|
| `card` (默认) | 带边框和阴影的卡片 |
| `plain` | 无边框无阴影 |

### 布局

```
┌──────────────────────┐
│       注册            │
│   填写信息完成注册     │
│                      │
│ 用户名 [____________] │
│ 邮箱   [____________] │
│ 密码   [____________] │
│ 确认   [____________] │
│                      │
│      [注 册]          │
│                      │
│  已有账号？去登录     │
└──────────────────────┘
```

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `{ username, email, password, confirmPassword }` | - | 表单数据 |
| title | `string` | `'注册'` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'card' \| 'plain'` | `'card'` | 变体 |
| loading | `boolean` | `false` | 加载状态 |
| disabled | `boolean` | `false` | 禁用 |
| submitText | `string` | `'注 册'` | 提交按钮文字 |

### Events

| Event | 参数 | 说明 |
|-------|------|------|
| submit | `(value: { username, email, password, confirmPassword })` | 提交表单 |

### Slots

| Slot | Description |
|------|-------------|
| title | 自定义标题区域 |
| extra | 表单中间附加内容 |
| footer | 底部附加内容（如登录链接） |
