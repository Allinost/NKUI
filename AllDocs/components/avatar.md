# Avatar 头像

用户头像展示。

## 文本头像

<ClientOnly>
<Demo>
  <Space>
    <Avatar text="张" />
    <Avatar text="李" size="lg" />
    <Avatar text="王" size="xl" />
  </Space>
</Demo>
</ClientOnly>

## 图标与形状

<ClientOnly>
<Demo>
  <Space>
    <Avatar icon="user" size="lg" />
    <Avatar variant="square" text="NK" />
    <Avatar variant="square" text="UI" size="lg" />
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | `''` | 文字头像（取前 1-2 字） |
| icon | `string` | `''` | 图标名称 |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| variant | `'circle' \| 'square'` | `'circle'` | 形状变体 |
| color | `string` | — | 背景色（默认取 type 对应色） |
