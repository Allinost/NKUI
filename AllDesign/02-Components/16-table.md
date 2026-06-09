# Table 表格

## 概述

数据展示表格，支持排序、筛选、分页。

## 设计规范

### 尺寸

| Size | Row Height | Font Size |
|------|------------|-----------|
| sm | 36px | 12px |
| md (默认) | 44px | 14px |
| lg | 52px | 16px |

### 结构

```
┌──────┬──────────┬──────────┬──────┐
│ 选择  │  姓名     │  年龄     │ 操作  │ ← thead (sticky可选)
├──────┼──────────┼──────────┼──────┤
│ ☑    │ 张三     │ 28       │ 编辑  │ ← tbody
│ ☐    │ 李四     │ 32       │ 编辑  │
├──────┴──────────┴──────────┴──────┤
│ 已选 1 项        共 50 条 第1/5页  │ ← 底部栏
└───────────────────────────────────┘
```

### 列类型

| Type | Description |
|------|-------------|
| `text` (默认) | 纯文本 |
| `number` | 数字，右对齐 |
| `date` | 日期格式化 |
| `tag` | 标签展示 |
| `operation` | 操作按钮 |
| `custom` | 自定义渲染 |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | `TableColumn[]` | `[]` | 列定义 |
| data | `any[]` | `[]` | 数据源 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bordered | `boolean` | `false` | 边框线 |
| stripe | `boolean` | `false` | 斑马纹 |
| loading | `boolean` | `false` | 加载中 |
| selectable | `boolean` | `false` | 可选行 |
| modelValue / selectedKeys | `any[]` | `[]` | 选中行 keys |
| pagination | `PaginationConfig \| false` | `false` | 分页配置 |
| maxHeight | `string` | - | 最大高度(溢出滚动) |
| empty | `string` | `'暂无数据'` | 空状态文字 |

### TableColumn

| Prop | Type | Description |
|------|------|-------------|
| key | `string` | 字段名 |
| title | `string` | 列标题 |
| type | `'text' \| 'number' \| 'date' \| 'tag' \| 'operation' \| 'custom'` | 列类型 |
| width | `string \| number` | 列宽 |
| align | `'left' \| 'center' \| 'right'` | 对齐 |
| sortable | `boolean` | 可排序 |
| filterable | `boolean` | 可筛选 |
| fixed | `'left' \| 'right'` | 固定列 |
| formatter | `(value, row) => string` | 格式化函数 |

### PaginationConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| page | `number` | `1` | 当前页 |
| pageSize | `number` | `20` | 每页条数 |
| total | `number` | `0` | 总条数 |
| pageSizes | `number[]` | `[10,20,50,100]` | 可切换每页条数 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| row-click | `row, index` | 行点击 |
| selection-change | `selectedKeys` | 选中变化 |
| sort-change | `{ key, order }` | 排序变化 |
| page-change | `{ page, pageSize }` | 分页变化 |
