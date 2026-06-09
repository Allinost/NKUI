# Breadcrumb 面包屑

## 概述

显示当前页面在导航层级中的位置。

## 设计规范

### 分隔符

| Type | Character |
|------|-----------|
| `arrow` (默认) | `/` |
| `chevron` | `›` |
| `slash` | `/` |
| `custom` | 自定义 |

### 尺寸

| Size | Font Size |
|------|-----------|
| sm | 12px |
| md (默认) | 14px |
| lg | 16px |

### 间距

- 分隔符左右间距: 6px
- 文字颜色: Neutral 500 (普通) / Neutral 800 (最后一层)

## API

### Breadcrumb

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| separator | `string` | `'/'` | 分隔符 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### BreadcrumbItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| to | `string` | - | 路由链接 |
| href | `string` | - | 外部链接 |

### Slots

| Slot | Description |
|------|-------------|
| default | 面包屑项文字 |
| separator | 自定义分隔符 |
