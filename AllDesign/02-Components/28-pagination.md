# Pagination 分页

## 概述

数据分页导航。

## 设计规范

### 布局

```
◀ 1 2 3 4 5 ... 10 ▶   共 100 条  20条/页 ▼
```

### 尺寸

| Size | Button Size | Font Size |
|------|-------------|-----------|
| sm | 24px | 12px |
| md (默认) | 32px | 14px |
| lg | 40px | 16px |

### 页码按钮数

- 默认展示 7 个按钮 (含省略号)
- 当前页居中
- 省略号在首尾出现

### 总览

- 默认显示总数 `共 100 条`
- 可配置每页条数切换器

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / page | `number` | `1` | 当前页 |
| pageSize | `number` | `20` | 每页条数 |
| total | `number` | `0` | 总条数 |
| pageSizes | `number[]` | `[10, 20, 50, 100]` | 可切换每页条数 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用 |
| showTotal | `boolean` | `true` | 显示总条数 |
| showPageSize | `boolean` | `true` | 显示切换器 |
| showJumper | `boolean` | `false` | 显示快速跳转 |
| maxPageButtons | `number` | `7` | 最大页码按钮数 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `{ page, pageSize }` | 分页变化 |
