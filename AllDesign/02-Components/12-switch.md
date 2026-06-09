# Switch 开关

## 概述

二值切换控件。

## 设计规范

### 尺寸

| Size | Width × Height | Thumb Size |
|------|----------------|------------|
| sm | 28px × 16px | 12px |
| md (默认) | 36px × 20px | 16px |
| lg | 44px × 24px | 20px |

### 状态

- **Off**: Neutral 300 背景
- **On**: Primary 500 背景
- **Disabled**: opacity 0.38
- **Loading**: 显示 spinner

### 动画

- Thumb 滑动: 200ms ease
- 背景色过渡: 200ms ease

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / checked | `boolean` | `false` | 开关状态 |
| disabled | `boolean` | `false` | 禁用 |
| loading | `boolean` | `false` | 加载中 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| activeColor | `string` | - | 打开态颜色 |
| inactiveColor | `string` | - | 关闭态颜色 |
| label | `string` | - | 标签文字 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `boolean` | 状态变化 |
