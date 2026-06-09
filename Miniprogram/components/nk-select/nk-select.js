Component({
  properties: {
    value: { type: null, value: '' },
    options: { type: Array, value: [] },
    placeholder: { type: String, value: '请选择' },
    disabled: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
  },
  data: { isOpen: false, displayText: '' },
  methods: {
    onToggle() {
      if (this.data.disabled) return
      this.setData({ isOpen: !this.data.isOpen })
    },
    onSelect(e) {
      const { value, label } = e.currentTarget.dataset
      this.setData({ value, displayText: label, isOpen: false })
      this.triggerEvent('change', { value })
    }
  },
  observers: {
    'value, options': function () {
      if (!this.data.options) return
      const opt = this.data.options.find(o => o.value === this.data.value)
      this.setData({ displayText: opt ? opt.label : '' })
    }
  }
})
