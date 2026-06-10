Component({
  properties: {
    imageList: { type: Array, value: [] },
    maxCount: { type: Number, value: 9 },
    listType: { type: String, value: 'picture-card' },
    disabled: { type: Boolean, value: false },
    size: { type: String, value: 'md' },
  },
  methods: {
    onChooseImage() {
      if (this.data.disabled) return
      const remain = this.data.maxCount - this.data.imageList.length
      if (remain <= 0) return
      wx.chooseImage({
        count: remain,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const newUrls = res.tempFilePaths
          const updated = [...this.data.imageList, ...newUrls].slice(0, this.data.maxCount)
          this.setData({ imageList: updated })
          this.triggerEvent('change', { imageList: updated })
        },
      })
    },
    remove(e) {
      const idx = e.currentTarget.dataset.index
      const url = this.data.imageList[idx]
      const updated = [...this.data.imageList]
      updated.splice(idx, 1)
      this.setData({ imageList: updated })
      this.triggerEvent('remove', { index: idx, url })
      this.triggerEvent('change', { imageList: updated })
    },
    preview(e) {
      const idx = e.currentTarget.dataset.index
      wx.previewImage({ current: this.data.imageList[idx], urls: this.data.imageList })
    },
  },
})
