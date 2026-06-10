# ImageUpload 图片上传

## 概述

图片上传组件，支持预览、拖拽排序、多图上传。

## 设计规范

### 尺寸

| Size | 上传格 | 预览格 | 图标字体 |
|------|--------|--------|---------|
| sm | 64px | 64px | 24px |
| md (默认) | 80px | 80px | 28px |
| lg | 104px | 104px | 32px |

### 变体 (ListType)

| Variant | 布局 |
|---------|------|
| `picture-card` (默认) | 网格卡片布局 |
| `picture-list` | 列表布局 |

### 布局 (picture-card)

```
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ 预  │ │ 预  │ │ 预  │ │ +  │
│ 览  │ │ 览  │ │ 览  │ │上  │
│    │ │    │ │    │ │传  │
└────┘ └────┘ └────┘ └────┘
```

### 状态

- Default: 显示上传按钮
- Preview: 图片缩略图 + 删除按钮
- Uploading: 进度蒙层
- Error: 错误图标 + 重试

## 跨平台 API 定义

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string[]` | `[]` | 图片 URL 列表 |
| maxCount | `number` | `9` | 最大上传数量 |
| listType | `'picture-card' \| 'picture-list'` | `'picture-card'` | 展示类型 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| accept | `string` | `'image/*'` | 接受的文件类型 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `string[]` | 图片列表变化 |
| remove | `{ index, url }` | 移除图片 |
| preview | `{ url, index }` | 点击预览 |
