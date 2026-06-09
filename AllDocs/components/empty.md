# Empty 空状态

空数据状态展示。

## 基础用法

<ClientOnly>
<Demo>
  <Empty description="暂无数据">
    <Button size="sm">重新加载</Button>
  </Empty>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| description | `string` | `'暂无数据'` | 空状态描述文字 |

| Slot | 说明 |
|------|------|
| default | 底部操作区域 |
| image | 自定义图片插槽 |
