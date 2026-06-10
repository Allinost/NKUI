# FileUpload 文件上传

文件选择上传组件，支持按钮、拖拽、文字链接三种样式。

<ClientOnly>
<Demo>
  <FileUpload />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| accept | `string` | `''` | 接受的文件类型 |
| multiple | `boolean` | `false` | 允许多选 |
| maxSize | `number` | `0` | 最大文件大小(bytes) |
| disabled | `boolean` | `false` | 禁用 |
| variant | `'button' \| 'drag' \| 'text'` | `'button'` | 上传样式 |
| modelValue | `File[]` | `[]` | 文件列表 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

| Event | 说明 |
|-------|------|
| change | 文件列表变化 |
| remove | 移除文件 |
| exceed | 超出大小限制 |
