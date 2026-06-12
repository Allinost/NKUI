# List 列表

## 概述

统一的列表容器组件，可配合 ListItem 使用，支持数据驱动、加载状态、空状态等。

## 设计规范

### 尺寸

| Size | 行高 | 内边距 | 标题字号 | 描述字号 |
|------|------|--------|---------|---------|
| sm | 40px | 8px 12px | 12px | 10px |
| md (默认) | 48px | 12px 16px | 14px | 12px |
| lg | 60px | 16px 20px | 16px | 14px |

### 布局

```
┌──────────────────────┐
│  [列表标题]            │
├──────────────────────┤
│  ┌────┐              │
│  │ 像 │  标题         │  >
│  │    │  描述文字...  │
│  └────┘              │
├──────────────────────┤
│  ┌────┐              │
│  │ 像 │  标题         │  >
│  │    │  描述文字...  │
│  └────┘              │
├──────────────────────┤
│  [列表底部信息]       │
└──────────────────────┘
```

### 状态

- Data: 有数据时渲染列表项
- Empty: 无数据时显示空状态
- Loading: 加载中状态
- Bordered: 带边框
- Split: 列表项间有分割线

## 跨平台 API 定义 (List)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `any[]` | `[]` | 数据源 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bordered | `boolean` | `true` | 是否显示边框 |
| split | `boolean` | `true` | 是否显示分割线 |
| loading | `boolean` | `false` | 加载状态 |
| clickable | `boolean` | `false` | 列表项是否可点击 |
| emptyText | `string` | `'暂无数据'` | 空状态文字 |

### Events

| Event | 参数 | 说明 |
|-------|------|------|
| itemClick | `(item, index)` | 点击列表项 |

### Slots

| Slot | Description |
|------|-------------|
| header | 列表头部 |
| footer | 列表底部 |
| empty | 空状态自定义内容 |

## 跨平台 API 定义 (ListItem)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述文字 |
| avatar | `string` | `''` | 左侧头像 |
| icon | `string` | `''` | 左侧图标 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| clickable | `boolean` | `false` | 是否可点击 |
| disabled | `boolean` | `false` | 禁用 |
| arrow | `boolean` | `false` | 是否显示右侧箭头 |

### Slots

| Slot | Description |
|------|-------------|
| prefix | 前缀区域（替代 avatar/icon） |
| title | 自定义标题 |
| description | 自定义描述 |
| extra | 右侧附加内容 |
| default | 标题下方的附加内容 |
