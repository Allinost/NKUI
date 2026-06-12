const CATEGORY_COLORS = {
  default: '#9E9E9E',
  work: '#2196F3',
  personal: '#4CAF50',
  urgent: '#F44336',
  study: '#FF9800',
  health: '#9C27B0',
  finance: '#009688',
  social: '#E91E63',
  shopping: '#FF5722',
  travel: '#00BCD4',
}

Component({
  properties: {
    checked: { type: Boolean, value: false },
    title: { type: String, value: '' },
    category: { type: String, value: 'default' },
    color: { type: String, value: '' },
    dueDate: { type: String, value: '' },
    startDate: { type: String, value: '' },
    notes: { type: String, value: '' },
    repeat: { type: String, value: '' },
    reminder: { type: String, value: '' },
    size: { type: String, value: 'sm' },
  },
  observers: {
    'category,color': function () {
      this.setData({
        _categoryColor: this.data.color || CATEGORY_COLORS[this.data.category] || CATEGORY_COLORS.default,
      })
    },
  },
  methods: {
    toggleCheck() {
      this.setData({ checked: !this.data.checked })
      this.triggerEvent('checkedChange', { checked: this.data.checked })
    },
    onClick(e) {
      this.triggerEvent('click', e)
    },
  },
})
