# ImageGallery 图片画廊

多图片横向展示组件，统一缩放填充，支持点击放大预览原图。

## 基础用法

<ClientOnly>
<Demo>
  <ImageGallery
    :images="[
      'https://picsum.photos/id/1/400/400',
      'https://picsum.photos/id/10/400/400',
      'https://picsum.photos/id/20/400/400',
      'https://picsum.photos/id/30/400/400',
      'https://picsum.photos/id/40/400/400',
    ]"
  />
</Demo>
</ClientOnly>

## 自定义列数 & 最大显示数

<ClientOnly>
<Demo>
  <ImageGallery
    :images="[
      'https://picsum.photos/id/1/400/400',
      'https://picsum.photos/id/10/400/400',
      'https://picsum.photos/id/20/400/400',
      'https://picsum.photos/id/30/400/400',
      'https://picsum.photos/id/40/400/400',
      'https://picsum.photos/id/50/400/400',
    ]"
    :columns="3"
    :max-count="4"
  />
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| images | `(string \| GalleryImage)[]` | `[]` | 图片列表（string 为 url，或 `{ url, alt }`） |
| columns | `number` | `4` | 列数 |
| gap | `string` | `'8px'` | 间距 |
| maxCount | `number` | — | 最大显示数量（超出显示 +N） |
| preview | `boolean` | `true` | 是否启用点击预览 |

## GalleryImage

```ts
interface GalleryImage {
  url: string
  alt?: string
}
```
