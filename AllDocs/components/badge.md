# Badge 徽标

出现在图标或文字右上角的标记。

## 变体

<ClientOnly>
<Demo>
  <Space size="xl">
    <Badge variant="dot"><Button size="sm">Dot</Button></Badge>
    <Badge variant="count" :value="5"><Button size="sm">Count</Button></Badge>
    <Badge variant="count" :value="100"><Button size="sm">Overflow</Button></Badge>
    <Badge variant="text" value="new"><Button size="sm">Text</Button></Badge>
  </Space>
</Demo>
</ClientOnly>

## 不同类型

<ClientOnly>
<Demo>
  <Space size="xl">
    <Badge variant="count" :value="3" type="primary"><Button size="sm">Primary</Button></Badge>
    <Badge variant="count" :value="3" type="success"><Button size="sm">Success</Button></Badge>
    <Badge variant="count" :value="3" type="warning"><Button size="sm">Warning</Button></Badge>
    <Badge variant="count" :value="3" type="danger"><Button size="sm">Danger</Button></Badge>
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'dot' \| 'count' \| 'text'` | `'dot'` | 徽标变体 |
| value | `number \| string` | `0` | 显示内容 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'danger'` | 徽标颜色类型 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

支持通过默认插槽包裹子元素。
