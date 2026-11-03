# Tabs 标签页

切换不同内容区域的标签页。

## 变体

<ClientOnly>
<Demo>
  <Tabs :items="tabs" variant="line" />
</Demo>
</ClientOnly>

<ClientOnly>
<Demo>
  <Tabs :items="tabs" variant="card" />
</Demo>
</ClientOnly>

<ClientOnly>
<Demo>
  <Tabs :items="tabs" variant="segment" />
</Demo>
</ClientOnly>

<script setup>
const tabs = [
  { label: 'Tab 1', value: 1 },
  { label: 'Tab 2', value: 2 },
  { label: 'Tab 3', value: 3, disabled: true },
  { label: 'Tab 4', value: 4 },
]
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `TabItem[]` | `[]` | 标签项列表 |
| variant | `'line' \| 'card' \| 'segment'` | `'line'` | 标签样式 |
| modelValue | `any` | — | 当前激活值 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| align | `'start' \| 'center' \| 'full'` | `'start'` | 对齐方式 |

```ts
interface TabItem {
  label: string
  value: any
  disabled?: boolean
  icon?: string
}
```

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: any)` | 切换 |
| change | `(val: any)` | 切换 |

## 键盘与语义

- 容器 `role="tablist"`，标签 `role="tab"` 并带 `aria-selected`；选中项为唯一 `tabindex=0`。
- 支持 `←` / `→` / `Home` / `End` 切换，`Enter` / `Space` 激活当前项。
- `line` 变体的指示条会随选中项位置与宽度变化，窗口尺寸变化时自动重算。
