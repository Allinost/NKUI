Component({
  properties: {
    data: { type: Array, value: [] },
    size: { type: String, value: 'md' },
    bordered: { type: Boolean, value: true },
    split: { type: Boolean, value: true },
    loading: { type: Boolean, value: false },
    clickable: { type: Boolean, value: false },
    emptyText: { type: String, value: '暂无数据' },
    itemTitle: { type: String, value: '' },
    itemDescription: { type: String, value: '' },
    itemAvatar: { type: String, value: '' },
    itemArrow: { type: Boolean, value: false },
  },
  methods: {
    onItemClick(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.data[index]
      this.triggerEvent('itemClick', { item, index })
    },
  },
})
