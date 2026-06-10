# FileUpload 文件上传

## 概述

文件选择上传组件，支持点击和拖拽上传。

## 设计规范

### 尺寸

| Size | 上传区域高度 |
|------|-------------|
| sm | 80px |
| md (默认) | 120px |
| lg | 160px |

### 变体

| Variant | 样式 |
|---------|------|
| `button` (默认) | 按钮形式 |
| `drag` | 拖拽区域 |
| `text` | 文字链接 |

### 文件列表

- 文件名 + 大小 + 状态（上传中/成功/失败）
- 可删除
- 进度条（上传中）

### 状态

- Default: 显示上传入口
- Dragover: 拖拽区域高亮
- Disabled: opacity 0.38
- Error: 错误提示文字

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | `string` | `''` | 接受的文件类型 |
| multiple | `boolean` | `false` | 允许多选 |
| maxSize | `number` | `0` | 最大文件大小 (bytes, 0=不限制) |
| disabled | `boolean` | `false` | 禁用 |
| variant | `'button' \| 'drag' \| 'text'` | `'button'` | 上传样式 |
| modelValue | `File[]` | `[]` | 已选文件列表 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `File[]` | 文件列表变化 |
| remove | `{ index, file }` | 移除文件 |
| exceed | `void` | 超出 maxSize |
