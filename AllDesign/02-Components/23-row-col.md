# Row / Col 栅格

## 概述

响应式栅格布局系统，24 列划分。

## 设计规范

### 栅格参数

| Token | Value |
|-------|-------|
| 列数 | 24 |
| 间隔 (gutter) | 8px / 12px / 16px / 24px |
| 默认间隔 | 16px |

### 断点

| Breakpoint | Min Width | Col Span Suffix |
|------------|-----------|-----------------|
| xs | < 640px | (默认) |
| sm | ≥ 640px | `-sm` |
| md | ≥ 768px | `-md` |
| lg | ≥ 1024px | `-lg` |
| xl | ≥ 1280px | `-xl` |
| 2xl | ≥ 1536px | `-2xl` |

### 用法

```html
<Row gutter="16">
  <Col :span="8" :lg="6" :sm="12">A</Col>
  <Col :span="8" :lg="6" :sm="12">B</Col>
  <Col :span="8" :lg="6" :sm="12">C</Col>
  <Col :span="8" :lg="6" :sm="12">D</Col>
</Row>
<!-- xs: 3列 → 每列span=8。lg: 4列 → 每列span=6。sm: 2列 → 每列span=12 -->
```

## API

### Row

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gutter | `number \| [number, number]` | `0` | 列间距 (水平, 垂直) |
| justify | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | 水平对齐 |
| align | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'top'` | 垂直对齐 |

### Col

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| span | `number` | `24` | 列数 (1-24) |
| offset | `number` | `0` | 左侧偏移列数 |
| push | `number` | `0` | 向右推 |
| pull | `number` | `0` | 向左拉 |
| xs / sm / md / lg / xl / xxl | `number \| { span, offset }` | - | 响应式列配置 |
