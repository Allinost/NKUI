# PdfViewer PDF阅读

基于 iframe 的 PDF 文档在线阅读组件。

## 基础用法

<ClientOnly>
<Demo>
  <PdfViewer
    src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    height="500px"
  />
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | — | PDF 文件地址（必填） |
| title | `string` | `'PDF'` | 文档标题 |
| width | `string` | `'100%'` | 容器宽度 |
| height | `string` | `'600px'` | 容器高度 |

## 平台差异

| 平台 | 实现 |
|------|------|
| Vue3 | `<iframe>` 嵌入 |
| 小程序 | `<web-view>` 组件（仅支持 HTTPS 链接） |
