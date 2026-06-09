Component({
  properties: {
    checked: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
    label: { type: String, value: '' },
    color: { type: String, value: '#2196F3' },
  },
  methods: {
    onTap() {
      if (this.data.disabled || this.data.loading) return
      const val = !this.data.checked
      this.setData({ checked: val })
      this.triggerEvent('change', { value: val })
    }
  }
})
