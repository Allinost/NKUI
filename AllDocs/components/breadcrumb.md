# Breadcrumb 面包屑

显示当前页面在导航层级中的位置。

<ClientOnly>
<Demo>
  <Breadcrumb :items="items" />
</Demo>
</ClientOnly>

<script setup>
const items = [
  { label: '首页', to: '/' },
  { label: '文档', to: '/docs' },
  { label: '组件' },
]
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `BreadcrumbItem[]` | `[]` | 面包屑项 |

```ts
interface BreadcrumbItem {
  label: string
  to?: string
}
```
