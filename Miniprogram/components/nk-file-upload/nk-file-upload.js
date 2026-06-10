Component({
  properties: {
    accept: { type: String, value: '' },
    multiple: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    variant: { type: String, value: 'button' },
    size: { type: String, value: 'md' },
  },
  data: { files: [], error: '' },
  methods: {
    onChooseFile() {
      if (this.data.disabled) return
      wx.chooseMessageFile({
        count: this.data.multiple ? 9 : 1,
        type: 'all',
        success: (res) => {
          const newFiles = res.tempFiles.map(f => ({ name: f.name, size: f.size, path: f.path }))
          const updated = [...this.data.files, ...newFiles]
          this.setData({ files: updated, error: '' })
          this.triggerEvent('change', { files: updated })
        },
      })
    },
    remove(e) {
      const idx = e.currentTarget.dataset.index
      const file = this.data.files[idx]
      const updated = [...this.data.files]
      updated.splice(idx, 1)
      this.setData({ files: updated })
      this.triggerEvent('remove', { index: idx, file })
      this.triggerEvent('change', { files: updated })
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + 'B'
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + 'KB'
      return (bytes / 1048576).toFixed(1) + 'MB'
    },
  },
})
