Component({
  properties: {
    checked: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
    label: { type: String, value: '' },
    value: { type: null, value: '' },
  },
  methods: {
    onTap() {
      if (this.data.disabled) return
      this.setData({ checked: true })
      this.triggerEvent('change', { value: this.data.value })
    }
  }
})
