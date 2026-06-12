Component({
  properties: {
    data: { type: Array, value: [] },
    size: { type: String, value: 'sm' },
    bordered: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    emptyText: { type: String, value: '暂无待办任务' },
    itemChecked: { type: String, value: '' },
    itemTitle: { type: String, value: '' },
    itemCategory: { type: String, value: '' },
    itemColor: { type: String, value: '' },
    itemDueDate: { type: String, value: '' },
    itemStartDate: { type: String, value: '' },
    itemNotes: { type: String, value: '' },
    itemRepeat: { type: String, value: '' },
    itemReminder: { type: String, value: '' },
  },
  observers: {
    size: function () {
      this.setData({ itemSize: this.data.size })
    },
  },
  methods: {
    _getItemChecked(item) {
      const key = this.data.itemChecked || 'checked'
      return !!item[key]
    },
    _getItemTitle(item) {
      const key = this.data.itemTitle || 'title'
      return item[key] || ''
    },
    _getItemCategory(item) {
      const key = this.data.itemCategory || 'category'
      return item[key] || 'default'
    },
    _getItemColor(item) {
      const key = this.data.itemColor || 'color'
      return item[key] || ''
    },
    _getItemDueDate(item) {
      const key = this.data.itemDueDate || 'dueDate'
      return item[key] || ''
    },
    _getItemStartDate(item) {
      const key = this.data.itemStartDate || 'startDate'
      return item[key] || ''
    },
    _getItemNotes(item) {
      const key = this.data.itemNotes || 'notes'
      return item[key] || ''
    },
    _getItemRepeat(item) {
      const key = this.data.itemRepeat || 'repeat'
      return item[key] || ''
    },
    _getItemReminder(item) {
      const key = this.data.itemReminder || 'reminder'
      return item[key] || ''
    },
    onCheckedChange(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.data[index]
      const { checked } = e.detail
      this.triggerEvent('checkedChange', { item, index, checked })
    },
    onItemClick(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.data[index]
      this.triggerEvent('itemClick', { item, index })
    },
  },
})
