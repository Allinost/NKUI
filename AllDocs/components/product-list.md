# ProductList 商品列表

商品列表容器，数据驱动渲染 ProductCard，支持列表和网格两种布局。

> 详细 API 请参考 [ProductCard 商品卡片](./product-card) 文档。

## 列表模式

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

## 网格模式

<ClientOnly>
<Demo>
  <ProductList
    :data="products"
    layout="grid"
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

<script setup>
const products = [
  { cover: 'https://picsum.photos/seed/p1/240/240', title: '经典款双肩包', status: '热卖', desc: '大容量防水尼龙材质', stock: 128, tags: ['通勤','旅行'], price: 299 },
  { cover: 'https://picsum.photos/seed/p2/240/240', title: '极简帆布包', status: '新品', desc: '环保棉麻手工制作', stock: 56, tags: ['休闲','环保'], price: 89 },
  { cover: 'https://picsum.photos/seed/p3/240/240', title: '商务公文包', status: '推荐', desc: '头层牛皮经典款', stock: 32, tags: ['商务','高端'], price: 599 },
  { cover: 'https://picsum.photos/seed/p4/240/240', title: '运动斜挎包', status: '', desc: '轻便透气运动款', stock: 200, tags: ['运动','户外'], price: 159 },
]
</script>
