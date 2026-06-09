# Checkbox 复选框

多选控件。

## 基础用法

<ClientOnly>
<Demo>
  <Space>
    <Checkbox v-model="cb1">Checkbox</Checkbox>
    <Checkbox v-model="cb2">Checked</Checkbox>
  </Space>
</Demo>
</ClientOnly>

## 状态

<ClientOnly>
<Demo>
  <Space>
    <Checkbox indeterminate>Indeterminate</Checkbox>
    <Checkbox disabled>Disabled</Checkbox>
    <Checkbox disabled checked>Disabled Checked</Checkbox>
  </Space>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const cb1 = ref(false)
const cb2 = ref(true)
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 绑定值 |
| indeterminate | `boolean` | `false` | 半选状态 |
| disabled | `boolean` | `false` | 禁用 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: boolean)` | 值变化 |
