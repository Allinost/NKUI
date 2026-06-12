# Login 登录表单

## 概述

统一的登录表单组件，支持用户名/密码输入、表单验证、加载状态等。

## 设计规范

### 尺寸

| Size | 宽度 | 内边距 | 标题字号 | 正文字号 |
|------|------|--------|---------|---------|
| sm | 320px | 20px | 16px | 12px |
| md (默认) | 380px | 28px | 20px | 14px |
| lg | 440px | 36px | 24px | 16px |

### 变体 (Variant)

| Variant | 样式 |
|---------|------|
| `card` (默认) | 带边框和阴影的卡片 |
| `plain` | 无边框无阴影 |

### 布局

```
┌──────────────────────┐
│       登录            │
│   请输入您的账号信息    │
│                      │
│ 用户名 [____________] │
│ 密码   [____________] │
│                      │
│      [登 录]          │
│                      │
│  注册账号 忘记密码     │
└──────────────────────┘
```

### 状态

- Default: 正常显示
- Focus: 输入框获得焦点
- Error: 校验失败，显示错误提示
- Loading: 提交中，按钮显示加载状态
- Disabled: 表单禁用

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `{ username, password }` | - | 表单数据 |
| title | `string` | `'登录'` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'card' \| 'plain'` | `'card'` | 变体 |
| loading | `boolean` | `false` | 加载状态 |
| disabled | `boolean` | `false` | 禁用 |
| submitText | `string` | `'登 录'` | 提交按钮文字 |
| submitType | `'primary' \| 'success' \| 'accent'` | `'primary'` | 按钮类型 |

### Events

| Event | 参数 | 说明 |
|-------|------|------|
| submit | `(value: { username, password })` | 提交表单 |

### Slots

| Slot | Description |
|------|-------------|
| title | 自定义标题区域 |
| extra | 表单中间附加内容 |
| footer | 底部附加内容（如注册链接） |
