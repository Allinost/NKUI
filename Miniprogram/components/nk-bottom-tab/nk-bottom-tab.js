Component({
  properties: {
    items: { type: Array, value: [] },
    modelValue: { type: String, value: '' },
    variant: { type: String, value: 'icon-text' },
    size: { type: String, value: 'md' },
    fixed: { type: Boolean, value: false },
  },
  methods: {
    onSelect(e) {
      const value = e.currentTarget.dataset.value
      if (value === this.data.modelValue) return
      this.setData({ modelValue: value })
      this.triggerEvent('change', { value })
    },
  },
})
