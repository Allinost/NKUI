# Icon 图标

SVG 图标渲染组件。

## 基础用法

<ClientOnly>
<Demo>
  <Space>
    <Icon name="close" />
    <Icon name="check" />
    <Icon name="info" />
    <Icon name="warning" />
    <Icon name="error" />
    <Icon name="success" />
    <Icon name="arrow-left" />
    <Icon name="arrow-right" />
  </Space>
</Demo>
</ClientOnly>

## 自定义尺寸

<ClientOnly>
<Demo>
  <Space>
    <Icon name="check" size="16" />
    <Icon name="check" size="24" />
    <Icon name="check" size="32" />
    <Icon name="check" size="48" />
  </Space>
</Demo>
</ClientOnly>

## 自定义颜色

<ClientOnly>
<Demo>
  <Space>
    <Icon name="check" color="#2196F3" />
    <Icon name="check" color="#4CAF50" />
    <Icon name="check" color="#FF9800" />
    <Icon name="check" color="#F44336" />
  </Space>
</Demo>
</ClientOnly>

## 注册自定义图标

```ts
import { addIcon } from './components'
addIcon('custom-name', '<svg>...</svg>')
```

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | — | 图标名称（需提前注册） |
| size | `number \| string` | `16` | 图标尺寸 |
| color | `string` | `'currentColor'` | 图标颜色 |
