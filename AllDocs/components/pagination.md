# Pagination 分页

数据分页导航。

## 基础用法

<ClientOnly>
<Demo>
  <Space vertical>
    <Pagination v-model="pg" :total="200" />
    <Pagination v-model="pg" :total="200" size="sm" />
  </Space>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const pg = ref(1)
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `number` | `1` | 当前页 |
| total | `number` | `0` | 总条目数 |
| page-size | `number` | `10` | 每页条数 |
| size | `'sm' \| 'md'` | `'md'` | 尺寸 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(page: number)` | 页码变化 |
