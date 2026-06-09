# Form 表单

## 概述

表单容器，统一管理表单校验、布局、提交。

## 设计规范

### 布局

| Layout | Description |
|--------|-------------|
| `horizontal` (默认) | 标签在左，控件在右 |
| `vertical` | 标签在上，控件在下 |
| `inline` | 行内排列 |

### 校验规则

- 内置：required, email, url, phone, length, pattern
- 自定义：validator 函数
- 触发方式：`change` | `blur` | `submit`

### 标签

- 必填项显示红色 `*`
- 标签宽度可配置

## API

### Form

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| model | `Record<string, any>` | `{}` | 表单数据 |
| rules | `FormRules` | `{}` | 校验规则 |
| layout | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` | 布局 |
| labelWidth | `string` | `'80px'` | 标签宽度 |
| disabled | `boolean` | `false` | 全部禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### FormItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | `string` | - | 字段名，对应 model 的 key |
| label | `string` | - | 标签文字 |
| required | `boolean` | `false` | 必填 |
| rules | `FormRule[]` | - | 独立规则 |
| error | `string` | - | 手动设置错误 |

### FormRule

| Prop | Type | Description |
|------|------|-------------|
| required | `boolean` | 是否必填 |
| message | `string` | 错误提示 |
| type | `'string' \| 'number' \| 'email' \| 'url' \| 'phone'` | 内置类型校验 |
| min | `number` | 最小长度/值 |
| max | `number` | 最大长度/值 |
| pattern | `RegExp` | 正则校验 |
| validator | `(value) => string \| Error` | 自定义校验 |

### Methods

| Method | Params | Description |
|--------|--------|-------------|
| validate | `() => Promise<boolean>` | 校验全部 |
| validateField | `(prop) => Promise<boolean>` | 校验单个字段 |
| resetFields | - | 重置所有字段 |
| clearValidate | - | 清除校验状态 |
