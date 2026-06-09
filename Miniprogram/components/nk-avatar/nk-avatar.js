Component({
  properties: {
    src: { type: String, value: '' },
    size: { type: String, value: 'md' },
    variant: { type: String, value: 'circle' },
    icon: { type: String, value: '' },
    text: { type: String, value: '' },
  },
  data: {
    imgError: false,
    sizeMap: { xs: 48, sm: 64, md: 80, lg: 112, xl: 160 },
    avatarSize: 80,
  },
  observers: {
    size: function () {
      this.setData({ avatarSize: this.data.sizeMap[this.data.size] || 80 })
    }
  },
  methods: {
    onError() { this.setData({ imgError: true }) }
  }
})
