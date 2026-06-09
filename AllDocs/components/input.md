# Input 输入框

文本输入控件。

## 基础用法

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Input placeholder="Basic" />
    <Input placeholder="With label" label="用户名" />
    <Input placeholder="Clearable" clearable />
    <Input placeholder="With prefix" prefix-icon="search" />
    <Input placeholder="Error" error="请输入有效内容" />
    <Input placeholder="Disabled" disabled />
  </div>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | 绑定值 |
| placeholder | `string` | `''` | 占位文本 |
| label | `string` | `''` | 标签文字 |
| clearable | `boolean` | `false` | 可清除 |
| prefix-icon | `string` | `''` | 前缀图标名 |
| error | `string` | `''` | 错误提示信息 |
| disabled | `boolean` | `false` | 禁用 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: string)` | 值变化 |
| clear | — | 点击清除 |
