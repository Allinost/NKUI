# Popover 弹出框

点击元素后弹出的气泡卡片。

<ClientOnly>
<Demo>
  <Popover content="这是一段弹出内容">
    <template #reference><Button>点击打开</Button></template>
  </Popover>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string` | `''` | 弹出内容 |
| title | `string` | `''` | 弹出标题 |
| trigger | `'click' \| 'hover'` | `'click'` | 触发方式 |

| Slot | 说明 |
|------|------|
| reference | 触发元素（必须） |
| default | 弹出内容（替代 content prop） |
