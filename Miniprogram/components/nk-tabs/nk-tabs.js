Component({
  properties: {
    items: { type: Array, value: [] },
    modelValue: { type: String, value: '' },
    variant: { type: String, value: 'line' },
    size: { type: String, value: 'md' },
    align: { type: String, value: 'start' },
  },
  data: {
    activeValue: '',
    inkStyle: '',
  },
  methods: {
    onSelect(e) {
      const { value, disabled } = e.currentTarget.dataset
      if (disabled) return
      this.setData({ activeValue: value })
      this.triggerEvent('change', { value })
    },
  },
  observers: {
    'items, modelValue': function () {
      const val = this.data.modelValue || (this.data.items && this.data.items.length > 0 ? this.data.items[0].value : '')
      this.setData({ activeValue: val })
    },
  },
})
