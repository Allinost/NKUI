# Card 卡片

## 概述

信息展示容器。

## 设计规范

| Size | Padding | Usage |
|------|---------|-------|
| sm | 12px | 紧凑信息 |
| md (默认) | 16px | 通用 |
| lg | 24px | 宽松内容 |

### 变体

| Variant | Style |
|---------|-------|
| `outlined` (默认) | 边框 |
| `elevated` | 阴影 |
| `flat` | 无边框无阴影 |

### 组成

```
┌──────────────────────┐
│  封面图 (可选)        │
├──────────────────────┤
│  标题   │  额外操作   │
│  描述文字            │
│  内容区域             │
└──────────────────────┘
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 内边距 |
| padding | `boolean` | `true` | 是否应用内边距 |
| hoverable | `boolean` | `false` | 悬浮阴影效果 |

### Slots

| Slot | Description |
|------|-------------|
| default | 卡片主体内容 |
| cover | 封面图 |
| header | 头部区域 |
| footer | 底部区域 |
