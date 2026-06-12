Component({
  properties: {
    data: { type: Array, value: [] },
    layout: { type: String, value: 'list' },
    bordered: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    clickable: { type: Boolean, value: false },
    emptyText: { type: String, value: '暂无商品' },
    stockText: { type: String, value: '库存' },
    pricePrefix: { type: String, value: '¥' },
    itemCover: { type: String, value: '' },
    itemTitle: { type: String, value: '' },
    itemStatus: { type: String, value: '' },
    itemDescription: { type: String, value: '' },
    itemStock: { type: String, value: '' },
    itemTags: { type: String, value: '' },
    itemPrice: { type: String, value: '' },
  },
  methods: {
    _getItemCover(item) {
      return this.data.itemCover ? item[this.data.itemCover] : item.cover || item.image || ''
    },
    _getItemTitle(item) {
      return this.data.itemTitle ? item[this.data.itemTitle] : item.title || item.name || item.label || ''
    },
    _getItemStatus(item) {
      return this.data.itemStatus ? item[this.data.itemStatus] : item.status || ''
    },
    _getItemDescription(item) {
      return this.data.itemDescription ? item[this.data.itemDescription] : item.description || ''
    },
    _getItemStock(item) {
      const val = this.data.itemStock ? item[this.data.itemStock] : item.stock
      return val !== undefined ? val : undefined
    },
    _getItemTags(item) {
      return this.data.itemTags ? item[this.data.itemTags] : item.tags || []
    },
    _getItemPrice(item) {
      const val = this.data.itemPrice ? item[this.data.itemPrice] : item.price
      return val !== undefined ? val : undefined
    },
    onItemClick(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.data[index]
      this.triggerEvent('itemClick', { item, index })
    },
  },
})
