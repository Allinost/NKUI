# Input 输入框

## 概述

文本数据录入。

## 设计规范

### 尺寸

| Size | Height | Font Size | Padding |
|------|--------|-----------|---------|
| sm | 28px | 12px | 0 8px |
| md (默认) | 36px | 14px | 0 12px |
| lg | 44px | 16px | 0 16px |

### 状态

| State | Border | Background | 
|-------|--------|------------|
| Default | Neutral 300 | Neutral 0 |
| Hover | Neutral 400 | Neutral 0 |
| Focus | Primary 500 + box-shadow | Neutral 0 |
| Disabled | Neutral 200 | Neutral 100 |
| Error | Error 500 | Error 50 |
| Readonly | Neutral 300 | Neutral 50 |

### 组成

- 标签 (Label)
- 输入框 (Input Area)
- 前缀/后缀图标 (Prefix/Suffix)
- 清除按钮 (Clear)
- 错误提示 (Error Message)

## 跨平台 API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| placeholder | `string` | - | 占位文字 |
| disabled | `boolean` | `false` | 禁用 |
| readonly | `boolean` | `false` | 只读 |
| clearable | `boolean` | `false` | 可清除 |
| error | `string` | - | 错误提示文字 |
| label | `string` | - | 标签文字 |
| prefixIcon | `string` | - | 前缀图标 |
| suffixIcon | `string` | - | 后缀图标 |
| modelValue (Vue3) / value | `string` | - | 绑定值 |
| maxlength | `number` | - | 最大长度 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue / input | `string` | 值变化 |
| focus | `FocusEvent` | 获得焦点 |
| blur | `FocusEvent` | 失去焦点 |
| clear | - | 点击清除 |
