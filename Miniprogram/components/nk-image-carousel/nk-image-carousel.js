Component({
  properties: {
    images: {
      type: Array,
      value: [],
      observer: 'updateResolved',
    },
    width: { type: String, value: '100%' },
    height: { type: String, value: '300rpx' },
    autoPlay: { type: Boolean, value: false },
    interval: { type: Number, value: 3000 },
    showDots: { type: Boolean, value: true },
    showNav: { type: Boolean, value: true },
    preview: { type: Boolean, value: false },
  },
  data: {
    resolvedImages: [],
    current: 0,
    animating: true,
    touchStartX: 0,
    previewVisible: false,
    previewCurrent: 0,
  },
  lifetimes: {
    attached() {
      this.updateResolved()
      this.startAutoPlay()
    },
    detached() {
      this.stopAutoPlay()
    },
  },
  methods: {
    updateResolved() {
      const imgs = (this.data.images || []).map(img =>
        typeof img === 'string' ? { url: img, alt: '' } : img
      )
      this.setData({ resolvedImages: imgs, current: 0 })
    },
    goTo(e) {
      const idx = typeof e === 'number' ? e : e.currentTarget.dataset.index
      this.setData({ current: idx, animating: true })
      this.triggerEvent('change', { index: idx })
    },
    next() {
      const len = this.data.resolvedImages.length
      this.goTo((this.data.current + 1) % len)
    },
    prev() {
      const len = this.data.resolvedImages.length
      this.goTo((this.data.current - 1 + len) % len)
    },
    onTouchStart(e) {
      this.data.touchStartX = e.touches[0].clientX
      this.stopAutoPlay()
    },
    onTouchEnd(e) {
      const diff = e.changedTouches[0].clientX - this.data.touchStartX
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.prev()
        else this.next()
      }
      this.startAutoPlay()
    },
    onImageTap(e) {
      if (!this.data.preview) return
      const idx = e.currentTarget.dataset.index
      this.setData({ previewCurrent: idx, previewVisible: true })
      this.stopAutoPlay()
    },
    closePreview() {
      this.setData({ previewVisible: false })
      this.startAutoPlay()
    },
    nextPreview() {
      const len = this.data.resolvedImages.length
      this.setData({ previewCurrent: (this.data.previewCurrent + 1) % len })
    },
    prevPreview() {
      const len = this.data.resolvedImages.length
      this.setData({ previewCurrent: (this.data.previewCurrent - 1 + len) % len })
    },
    _timer: null,
    startAutoPlay() {
      this.stopAutoPlay()
      if (!this.data.autoPlay || this.data.resolvedImages.length <= 1) return
      this._timer = setInterval(() => this.next(), this.data.interval)
    },
    stopAutoPlay() {
      if (this._timer) { clearInterval(this._timer); this._timer = null }
    },
  },
})
