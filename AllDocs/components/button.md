# Button 按钮

触发操作或跳转的交互元素。

## 类型

<ClientOnly>
<Demo>
  <Space>
    <Button v-for="t in ['primary','success','warning','danger']" :key="t" :type="t">{{ t }}</Button>
    <Button>neutral</Button>
  </Space>
</Demo>
</ClientOnly>

## 变体

<ClientOnly>
<Demo>
  <Space vertical>
    <Space><Button v-for="t in ['primary','success','warning','danger']" :key="'s-'+t" :type="t">{{ t }}</Button></Space>
    <Space><Button v-for="t in ['primary','success','warning','danger']" :key="'o-'+t" :type="t" variant="outline">{{ t }}</Button></Space>
    <Space><Button v-for="t in ['primary','success','warning','danger']" :key="'g-'+t" :type="t" variant="ghost">{{ t }}</Button></Space>
    <Space><Button variant="text">Text</Button><Button type="danger" variant="text">Delete</Button></Space>
  </Space>
</Demo>
</ClientOnly>

## 尺寸

<ClientOnly>
<Demo>
  <Space>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Space>
</Demo>
</ClientOnly>

## 状态

<ClientOnly>
<Demo>
  <Space>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
    <Button round>Round</Button>
    <Button block>Block</Button>
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | 按钮类型 |
| variant | `'solid' \| 'outline' \| 'ghost' \| 'text'` | `'solid'` | 按钮变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| loading | `boolean` | `false` | 加载中状态 |
| disabled | `boolean` | `false` | 禁用状态 |
| round | `boolean` | `false` | 圆角按钮 |
| block | `boolean` | `false` | 块级按钮（100% 宽度） |

| Event | 参数 | 说明 |
|-------|------|------|
| click | `(e: MouseEvent)` | 点击触发（loading/disabled 时不触发） |
