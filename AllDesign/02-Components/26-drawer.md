# Drawer 抽屉

## 概述

屏幕边缘滑出的面板。

## 设计规范

### 方向

| Direction | Slide From |
|-----------|------------|
| `right` (默认) | 右侧滑出 |
| `left` | 左侧滑出 |
| `top` | 顶部滑出 |
| `bottom` | 底部滑出 |

### 尺寸

| Size | Width (left/right) | Height (top/bottom) |
|------|--------------------|---------------------|
| sm | 300px | 200px |
| md (默认) | 400px | 300px |
| lg | 600px | 450px |

### 组成

```
┌──────────────────────┐
│ 标题           [✕]   │
├──────────────────────┤
│                      │
│  内容区域             │
│                      │
└──────────────────────┘
```

### 动画

- 蒙层: 250ms fade
- 面板: 250ms ease slide

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | - | 标题 |
| direction | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | 方向 |
| size | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | 尺寸 |
| closable | `boolean` | `true` | 显示关闭按钮 |
| maskClosable | `boolean` | `true` | 点击蒙层关闭 |
| showMask | `boolean` | `true` | 显示蒙层 |
| zIndex | `number` | `1040` | 层级 |

### Slots

| Slot | Description |
|------|-------------|
| default | 内容区域 |
| title | 自定义标题 |
| footer | 底部区域 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| open | - | 打开后 |
| close | - | 关闭后 |
