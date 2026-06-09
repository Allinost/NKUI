Component({
  properties: {
    direction: { type: String, value: 'horizontal' },
    size: { type: String, value: 'md' },
    wrap: { type: Boolean, value: false },
  },
  data: {
    sizeMap: { xs: '16rpx', sm: '24rpx', md: '32rpx', lg: '48rpx', xl: '64rpx' },
    gap: '32rpx',
  },
  observers: {
    size: function () {
      const gap = this.data.sizeMap[this.data.size] || '32rpx'
      this.setData({ gap })
    }
  }
})
