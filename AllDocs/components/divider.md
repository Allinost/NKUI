# Divider 分割线

分隔内容的分割线。

## 基础用法

<ClientOnly>
<Demo>
  <div>
    <p>上面内容</p>
    <Divider />
    <p>下面内容</p>
    <Divider dashed>中间文字</Divider>
    <p>底部内容</p>
  </div>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dashed | `boolean` | `false` | 虚线样式 |
| orientation | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置 |

| Slot | 说明 |
|------|------|
| default | 分割线中间文字 |
