# FileUpload 文件上传

文件选择上传组件，支持单文件、多文件、拖拽上传。

<ClientOnly>
<Demo>
  <h4>按钮样式 (多文件)</h4>
  <FileUpload multiple variant="button" />
  <br /><br />
  <h4>拖拽样式</h4>
  <FileUpload multiple variant="drag" />
  <br /><br />
  <h4>文字样式</h4>
  <FileUpload variant="text" />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| accept | `string` | `''` | 接受的文件类型 |
| multiple | `boolean` | `false` | 允许多文件 |
| maxSize | `number` | `0` | 最大大小(bytes, 0=不限) |
| disabled | `boolean` | `false` | 禁用 |
| variant | `'button' \| 'drag' \| 'text'` | `'button'` | 上传样式 |
| modelValue | `File[]` | `[]` | 文件列表 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

| Event | 说明 |
|-------|------|
| change | 文件列表变化 |
| remove | 移除文件 |
| exceed | 超出大小限制 |
