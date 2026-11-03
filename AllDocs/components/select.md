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
| placeholder | `string` | `'请选择'` | 占位文本 |
| multiple | `boolean` | `false` | 多选 |
| filterable | `boolean` | `false` | 可搜索 |
| clearable | `boolean` | `false` | 显示清空按钮（单选清空为 `''` 或 `null`，多选清空为 `[]`） |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| error | `string` | — | 错误态提示样式 |

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
| change | `(val: any)` | 选中项变化 |
| visible-change | `(visible: boolean)` | 下拉展开/收起 |

## 交互

- 点击组件外部或按 Esc 收起下拉；再次点击触发器收起。
- 触发器支持键盘：`↑` / `↓` 移动高亮项，`Enter` 选中，`Esc` 收起。
- 触发器带 `role="combobox"`、`aria-expanded`，下拉为 `role="listbox"`，选项为 `role="option"`。
