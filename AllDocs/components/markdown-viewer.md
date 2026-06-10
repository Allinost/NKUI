# MarkdownViewer Markdown阅读

Markdown 文档渲染组件，支持内容直接传入或从 URL 获取渲染。

## 基础用法

<ClientOnly>
<Demo>
  <div style="max-width:600px">
    <MarkdownViewer
      :content="'# Hello NKUI\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3\n\n> A blockquote example.\n\n`inline code` and a [link](https://example.com).'"
    />
  </div>
</Demo>
</ClientOnly>

## 从 URL 加载

<ClientOnly>
<Demo>
  <MarkdownViewer
    src="https://raw.githubusercontent.com/anomalyco/opendeed/main/README.md"
  />
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string` | `''` | Markdown 原文内容 |
| src | `string` | `''` | Markdown 文件 URL（远程加载，优先级低于 content） |

## 平台差异

| 平台 | 实现 |
|------|------|
| Vue3 | `marked` 解析渲染 |
| 小程序 | 内置简易解析器 + rich-text 渲染 |
