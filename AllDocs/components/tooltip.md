# Tooltip 文字提示

鼠标悬停时显示文字提示。

## 位置

<ClientOnly>
<Demo>
  <Space>
    <Tooltip content="顶部提示"><Button size="sm">Top</Button></Tooltip>
    <Tooltip content="底部提示" placement="bottom"><Button size="sm">Bottom</Button></Tooltip>
    <Tooltip content="左侧提示" placement="left"><Button size="sm">Left</Button></Tooltip>
    <Tooltip content="右侧提示" placement="right"><Button size="sm">Right</Button></Tooltip>
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string` | `''` | 提示文字 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 位置 |
