Component({
  properties: {
    name: { type: String, value: '' },
    size: { type: String, value: 'md' },
    color: { type: String, value: 'currentColor' },
    spin: { type: Boolean, value: false },
  },
  data: {
    sizes: { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 },
    iconSize: 40,
  },
  observers: {
    'name, size': function () {
      const iconSize = this.data.sizes[this.data.size] || 40
      this.setData({ iconSize })
    }
  }
})
