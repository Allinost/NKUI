# Switch 开关

切换单个选项的开关控件。

## 基础用法

<ClientOnly>
<Demo>
  <Space>
    <Switch v-model="sw1" />
    <Switch v-model="sw1" label="With label" />
  </Space>
</Demo>
</ClientOnly>

## 尺寸

<ClientOnly>
<Demo>
  <Space>
    <Switch v-model="sw2" size="sm" />
    <Switch v-model="sw2" size="md" />
    <Switch v-model="sw2" size="lg" />
  </Space>
</Demo>
</ClientOnly>

## 状态

<ClientOnly>
<Demo>
  <Space>
    <Switch disabled />
    <Switch loading />
  </Space>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const sw1 = ref(true)
const sw2 = ref(false)
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 绑定值 |
| label | `string` | `''` | 标签文字 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用 |
| loading | `boolean` | `false` | 加载中 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(val: boolean)` | 值变化 |
