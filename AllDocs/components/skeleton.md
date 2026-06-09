# Skeleton 骨架屏

内容加载占位图。

## 变体

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Skeleton variant="paragraph" :rows="4" />
    <Skeleton variant="avatar" size="lg" />
    <Skeleton variant="image" height="120px" />
  </div>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'paragraph' \| 'avatar' \| 'image' \| 'text'` | `'text'` | 骨架变体 |
| rows | `number` | `3` | 段落行数 |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸（仅 avatar） |
| width | `string` | — | 自定义宽度 |
| height | `string` | — | 自定义高度 |
