# ImageUpload 图片上传

图片上传组件，支持网格预览、删除、多图上传。

<ClientOnly>
<Demo>
  <ImageUpload />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string[]` | `[]` | 图片 URL 列表 |
| maxCount | `number` | `9` | 最大数量 |
| listType | `'picture-card' \| 'picture-list'` | `'picture-card'` | 展示类型 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

| Event | 说明 |
|-------|------|
| change | 图片列表变化 |
| remove | 移除图片 |
| preview | 点击预览 |
