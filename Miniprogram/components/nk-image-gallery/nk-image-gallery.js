Component({
  properties: {
    images: {
      type: Array,
      value: [],
      observer: 'updateResolved',
    },
    columns: { type: Number, value: 4 },
    gap: { type: Number, value: 8 },
    maxCount: { type: Number, value: 0 },
    preview: { type: Boolean, value: true },
  },
  data: {
    resolvedImages: [],
    previewVisible: false,
    previewIndex: 0,
  },
  lifetimes: {
    attached() { this.updateResolved() },
  },
  methods: {
    updateResolved() {
      const imgs = (this.data.images || []).map(img =>
        typeof img === 'string' ? { url: img, alt: '' } : img
      )
      this.setData({ resolvedImages: imgs })
    },
    openPreview(e) {
      if (!this.data.preview) return
      const idx = e.currentTarget.dataset.index
      if (this.data.maxCount && idx >= this.data.maxCount) return
      this.setData({ previewIndex: idx, previewVisible: true })
    },
    closePreview() {
      this.setData({ previewVisible: false })
    },
    prevImage() {
      const len = this.data.resolvedImages.length
      this.setData({ previewIndex: (this.data.previewIndex - 1 + len) % len })
    },
    nextImage() {
      const len = this.data.resolvedImages.length
      this.setData({ previewIndex: (this.data.previewIndex + 1) % len })
    },
  },
})
