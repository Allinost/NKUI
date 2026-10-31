Component({
  properties: {
    value: { type: null, value: '' },
    options: { type: Array, value: [] },
    placeholder: { type: String, value: '请选择' },
    disabled: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
  },
  data: { isOpen: false, displayText: '', openUp: false, dropdownMaxHeight: '' },
  methods: {
    onToggle() {
      if (this.data.disabled) return
      const next = !this.data.isOpen
      this.setData({ isOpen: next })
      if (next) this.updatePlacement()
    },
    updatePlacement() {
      this.createSelectorQuery()
        .select('.nk-select')
        .boundingClientRect(rect => {
          if (!rect) return
          const win = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
          const dropdownHeight = (512 / 750) * win.windowWidth
          const spaceBelow = win.windowHeight - rect.bottom
          const spaceAbove = rect.top
          const openUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
          const space = openUp ? spaceAbove : spaceBelow
          const maxHeight = Math.max(120, Math.min(dropdownHeight, space - 8))
          this.setData({ openUp, dropdownMaxHeight: `${maxHeight}px` })
        })
        .exec()
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
