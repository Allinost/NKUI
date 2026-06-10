# ImageUpload 图片上传

多图片上传组件，支持网格预览、删除、大图预览翻页。

<ClientOnly>
<Demo>
  <ImageUpload :max-count="9" />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string[]` | `[]` | 图片 URL 列表 |
| maxCount | `number` | `9` | 最大张数 |
| listType | `'picture-card' \| 'picture-list'` | `'picture-card'` | 展示类型 |
| disabled | `boolean` | `false` | 禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

| Event | 说明 |
|-------|------|
| change | 图片列表变化 |
| remove | 移除图片 |

### 图片预览

点击图片可打开全屏预览，支持左右切换和删除。
