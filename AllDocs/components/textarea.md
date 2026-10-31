# Textarea 文本域

多行文本输入控件，支持自动增高、清除、设置行数。

## 基础用法

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <Textarea placeholder="请输入内容" />
    <Textarea placeholder="带标签" label="备注" />
    <Textarea placeholder="带清除" clearable />
    <Textarea placeholder="错误状态" error="请输入有效内容" />
    <Textarea placeholder="禁用" disabled />
    <Textarea placeholder="自定义行数" :rows="5" />
  </div>
</Demo>
</ClientOnly>

## 尺寸

<ClientOnly>
<Demo>
  <div style="display:flex;flex-direction:column;gap:12px">
    <Textarea size="sm" placeholder="Small" label="small" />
    <Textarea size="md" placeholder="Medium" label="medium" />
    <Textarea size="lg" placeholder="Large" label="large" />
  </div>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | 绑定值 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| placeholder | `string` | `''` | 占位文本 |
| disabled | `boolean` | `false` | 禁用 |
| readonly | `boolean` | `false` | 只读 |
| clearable | `boolean` | `false` | 可清除 |
| error | `string` | `''` | 错误提示信息 |
| label | `string` | `''` | 标签文字 |
| maxlength | `number` | - | 最大字符数 |
| rows | `number` | `3` | 行数（仅 Vue） |
| autoHeight | `boolean` | `false` | 自动增高（仅小程序） |
| name | `string` | `''` | 原生 name 属性 |
| autocomplete | `string` | `''` | 原生 autocomplete |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: string)` | 值变化 |
| focus | `(e: FocusEvent)` | 获得焦点 |
| blur | `(e: FocusEvent)` | 失去焦点 |
| clear | — | 点击清除 |
