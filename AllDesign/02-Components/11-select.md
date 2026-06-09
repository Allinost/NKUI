# Select 选择器

## 概述

下拉选择器，从一组选项中选取值。

## 设计规范

### 尺寸

| Size | Height | Font Size |
|------|--------|-----------|
| sm | 28px | 12px |
| md (默认) | 36px | 14px |
| lg | 44px | 16px |

### 状态

- **Default**: 同 Input
- **Hover**: border-color → Neutral 400
- **Focus**: border-color → Primary 500 + shadow
- **Disabled**: opacity 0.38
- **Error**: border-color → Error 500
- **Open**: 下拉面板展开态

### 下拉面板

- 宽度跟随输入框
- 最大高度 256px，溢出滚动
- Z-index: 1000 (Dropdown)

### 选项类型

- 单选 (默认)
- 多选 (`multiple`)
- 可搜索 (`filterable`)
- 可清空 (`clearable`)

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / value | `any \| any[]` | - | 绑定值 |
| options | `SelectOption[]` | `[]` | 选项列表 |
| multiple | `boolean` | `false` | 多选 |
| filterable | `boolean` | `false` | 可搜索 |
| clearable | `boolean` | `false` | 可清空 |
| placeholder | `string` | `'请选择'` | 占位文字 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| loading | `boolean` | `false` | 加载中 |

### SelectOption

| Prop | Type | Description |
|------|------|-------------|
| label | `string` | 显示文字 |
| value | `any` | 选项值 |
| disabled | `boolean` | 禁用 |
| children? | `SelectOption[]` | 分组子选项 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `value` | 选择值变化 |
| visible-change | `boolean` | 下拉展开/收起 |
| clear | - | 清空值 |
