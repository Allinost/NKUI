# Space 间距

控制子元素间距的布局组件。

## 基础用法

<ClientOnly>
<Demo>
  <Space>
    <Button size="sm">按钮 A</Button>
    <Button size="sm">按钮 B</Button>
    <Button size="sm">按钮 C</Button>
  </Space>
</Demo>
</ClientOnly>

## 垂直排列

<ClientOnly>
<Demo>
  <Space vertical>
    <Button size="sm" block>行一</Button>
    <Button size="sm" block>行二</Button>
  </Space>
</Demo>
</ClientOnly>

## 间距尺寸

<ClientOnly>
<Demo>
  <Space size="xl">
    <Button size="sm">左</Button>
    <Button size="sm">右</Button>
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'` | 间距大小 |
| vertical | `boolean` | `false` | 垂直排列 |
| wrap | `boolean` | `false` | 自动换行 |
