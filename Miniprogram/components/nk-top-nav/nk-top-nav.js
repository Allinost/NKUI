Component({
  properties: {
    items: { type: Array, value: [] },
    modelValue: { type: String, value: '' },
    logo: { type: String, value: '' },
    size: { type: String, value: 'md' },
    fixed: { type: Boolean, value: false },
  },
  methods: {
    onSelect(e) {
      const { value, disabled } = e.currentTarget.dataset
      if (disabled || value === this.data.modelValue) return
      this.setData({ modelValue: value })
      this.triggerEvent('change', { value })
    },
  },
})
