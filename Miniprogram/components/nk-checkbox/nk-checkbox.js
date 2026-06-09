Component({
  properties: {
    checked: { type: Boolean, value: false },
    indeterminate: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
    label: { type: String, value: '' },
    value: { type: null, value: '' },
  },
  methods: {
    onTap() {
      if (this.data.disabled) return
      const val = !this.data.checked
      this.setData({ checked: val, indeterminate: false })
      this.triggerEvent('change', { value: val })
    }
  }
})
