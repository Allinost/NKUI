# ProductCard 商品卡片

左侧头图、右侧三行信息展示的商品卡片组件，配合 ProductList 使用。

## 基础用法

<ClientOnly>
<Demo>
  <ProductCard
    cover="https://picsum.photos/seed/p1/240/240"
    title="经典款双肩包"
    status="热卖"
    description="大容量防水尼龙材质"
    :stock="128"
    :tags="['通勤','旅行']"
    :price="299"
  />
</Demo>
</ClientOnly>

## 尺寸布局

<ClientOnly>
<Demo>
  <ProductList
    :data="products"
    itemCover="cover"
    itemTitle="title"
    itemStatus="status"
    itemDescription="desc"
    itemStock="stock"
    itemTags="tags"
    itemPrice="price"
  />
</Demo>
</ClientOnly>

## API (ProductCard)

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cover | `string` | `''` | 封面图片 URL |
| title | `string` | `''` | 商品标题 |
| status | `string` | `''` | 状态标签（如"热卖""新品"） |
| description | `string` | `''` | 描述文字 |
| stock | `number \| string` | `undefined` | 库存数量 |
| tags | `string[]` | `[]` | 标签列表 |
| price | `number \| string` | `undefined` | 价格 |
| clickable | `boolean` | `false` | 是否可点击 |
| stockText | `string` | `'库存'` | 库存前缀文字 |
| pricePrefix | `string` | `'¥'` | 价格前缀符号 |

| Event | 参数 | 说明 |
|-------|------|------|
| click | `(e: MouseEvent)` | 点击卡片 |

## API (ProductList)

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `any[]` | `[]` | 数据源 |
| layout | `'list' \| 'grid'` | `'list'` | 布局模式 |
| bordered | `boolean` | `false` | 显示边框 |
| loading | `boolean` | `false` | 加载状态 |
| clickable | `boolean` | `false` | 是否可点击 |
| emptyText | `string` | `'暂无商品'` | 空状态文字 |
| itemCover | `string` | `''` | 封面字段名 |
| itemTitle | `string` | `''` | 标题字段名 |
| itemStatus | `string` | `''` | 状态字段名 |
| itemDescription | `string` | `''` | 描述字段名 |
| itemStock | `string` | `''` | 库存字段名 |
| itemTags | `string` | `''` | 标签字段名 |
| itemPrice | `string` | `''` | 价格字段名 |

| Event | 参数 | 说明 |
|-------|------|------|
| itemClick | `(item, index)` | 点击商品项 |

| Slot | 说明 |
|------|------|
| header | 列表头部 |
| footer | 列表底部 |
| empty | 空状态自定义内容 |
| skeleton | 加载中骨架屏 |

<script setup>
const products = [
  { cover: 'https://picsum.photos/seed/p1/240/240', title: '经典款双肩包', status: '热卖', desc: '大容量防水尼龙材质', stock: 128, tags: ['通勤','旅行'], price: 299 },
  { cover: 'https://picsum.photos/seed/p2/240/240', title: '极简帆布包', status: '新品', desc: '环保棉麻手工制作', stock: 56, tags: ['休闲','环保'], price: 89 },
  { cover: 'https://picsum.photos/seed/p3/240/240', title: '商务公文包', status: '推荐', desc: '头层牛皮经典款', stock: 32, tags: ['商务','高端'], price: 599 },
]
</script>
