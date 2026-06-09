Component({
  properties: {
    visible: { type: Boolean, value: false },
    title: { type: String, value: '' },
    closable: { type: Boolean, value: true },
    maskClosable: { type: Boolean, value: true },
    confirmText: { type: String, value: '确认' },
    cancelText: { type: String, value: '取消' },
    loading: { type: Boolean, value: false },
  },
  methods: {
    onMaskTap() { if (this.data.maskClosable) this.close() },
    onConfirm() { this.triggerEvent('confirm') },
    onCancel() { this.close() },
    close() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    }
  }
})
