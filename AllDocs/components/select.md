# Select 选择器

下拉选择控件。

## 基础用法

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Select :options="opts" placeholder="Basic select" />
    <Select :options="opts" multiple placeholder="Multiple" />
    <Select :options="opts" filterable placeholder="Searchable" />
  </div>
</Demo>
</ClientOnly>

<script setup>
const opts = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c', disabled: true },
  { label: '选项 D', value: 'd' },
]
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `any \| any[]` | — | 绑定值 |
| options | `SelectOption[]` | `[]` | 选项列表 |
| placeholder | `string` | `''` | 占位文本 |
| multiple | `boolean` | `false` | 多选 |
| filterable | `boolean` | `false` | 可搜索 |
| disabled | `boolean` | `false` | 禁用 |

```ts
interface SelectOption {
  label: string
  value: any
  disabled?: boolean
}
```

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: any)` | 值变化 |
