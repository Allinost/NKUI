# Tag 标签

用于标记和分类的标签。

## 变体

<ClientOnly>
<Demo>
  <Space>
    <Tag v-for="t in types" :key="t" :type="t" variant="light">{{ t }}</Tag>
    <Tag v-for="t in types" :key="'s-'+t" :type="t" variant="solid">{{ t }}</Tag>
  </Space>
</Demo>
</ClientOnly>

<ClientOnly>
<Demo>
  <Space>
    <Tag v-for="t in types" :key="'o-'+t" :type="t" variant="outline">{{ t }}</Tag>
  </Space>
</Demo>
</ClientOnly>

## 可关闭与圆角

<ClientOnly>
<Demo>
  <Space>
    <Tag closable>Closable</Tag>
    <Tag round>Round</Tag>
    <Tag type="primary" round closable>Primary Round</Tag>
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | 标签类型 |
| variant | `'light' \| 'solid' \| 'outline'` | `'light'` | 标签变体 |
| closable | `boolean` | `false` | 显示关闭按钮 |
| round | `boolean` | `false` | 圆角标签 |

| Event | 参数 | 说明 |
|-------|------|------|
| close | — | 点击关闭按钮 |

<script setup>
const types = ['primary', 'success', 'warning', 'danger']
</script>
