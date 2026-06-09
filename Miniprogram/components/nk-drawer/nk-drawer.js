Component({
  properties: {
    visible: { type: Boolean, value: false },
    title: { type: String, value: '' },
    direction: { type: String, value: 'right' },
    size: { type: String, value: 'md' },
    closable: { type: Boolean, value: true },
    maskClosable: { type: Boolean, value: true },
    showMask: { type: Boolean, value: true },
  },
  data: { drawerStyle: '' },
  methods: {
    onMaskTap() { if (this.data.maskClosable) this.close() },
    onClose() { this.close() },
    close() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    },
  },
  observers: {
    'direction, size': function () {
      const sizeMap = {
        left: { sm: '300rpx', md: '400rpx', lg: '600rpx' },
        right: { sm: '300rpx', md: '400rpx', lg: '600rpx' },
        top: { sm: '200rpx', md: '300rpx', lg: '450rpx' },
        bottom: { sm: '200rpx', md: '300rpx', lg: '450rpx' },
      }
      const dir = this.data.direction
      const sz = sizeMap[dir] && sizeMap[dir][this.data.size] ? sizeMap[dir][this.data.size] : '400rpx'
      const prop = dir === 'left' || dir === 'right' ? 'width' : 'height'
      this.setData({ drawerStyle: prop + ':' + sz })
    },
  },
})
