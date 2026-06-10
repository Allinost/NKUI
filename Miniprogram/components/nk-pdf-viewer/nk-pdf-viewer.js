Component({
  properties: {
    src: { type: String, value: '' },
    title: { type: String, value: 'PDF' },
    width: { type: String, value: '100%' },
    height: { type: String, value: '600rpx' },
  },
  data: {
    isWebViewSrc: false,
  },
  lifetimes: {
    attached() {
      const s = this.data.src || ''
      this.setData({
        isWebViewSrc: s.startsWith('http://') || s.startsWith('https://'),
      })
    },
  },
})
