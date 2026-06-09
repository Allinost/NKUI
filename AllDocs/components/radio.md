# Radio 单选框

单选控件。

## 基础用法

<ClientOnly>
<Demo>
  <Space>
    <Radio v-model="rd" :value="1">Radio A</Radio>
    <Radio v-model="rd" :value="2">Radio B</Radio>
    <Radio v-model="rd" :value="3">Radio C</Radio>
  </Space>
</Demo>
</ClientOnly>

## 禁用

<ClientOnly>
<Demo>
  <Space>
    <Radio disabled>Disabled</Radio>
    <Radio disabled checked>Disabled Checked</Radio>
  </Space>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const rd = ref(1)
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `any` | — | 绑定值 |
| value | `any` | — | 单选框对应的值 |
| disabled | `boolean` | `false` | 禁用 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: any)` | 值变化 |
