# Card 卡片

通用卡片容器。

## 变体

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Card variant="outlined"><p>Outlined card</p></Card>
    <Card variant="elevated" hoverable><p>Elevated hoverable</p></Card>
    <Card variant="flat" hoverable>
      <template #header>卡片标题</template>
      <p>Content</p>
      <template #footer><Button size="sm">操作</Button></template>
    </Card>
  </div>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 卡片变体 |
| hoverable | `boolean` | `false` | 悬停提升效果 |
| padding | `string` | `'16px'` | 内边距 |

| Slot | 说明 |
|------|------|
| default | 主要内容 |
| header | 头部内容 |
| footer | 底部内容 |
