Component({
  properties: {
    trigger: { type: String, value: 'click' },
    placement: { type: String, value: 'bottom' },
    content: { type: String, value: '' },
    width: { type: String, value: '400rpx' },
    disabled: { type: Boolean, value: false },
  },
  data: { visible: false },
  methods: {
    onTriggerTap() {
      if (this.data.disabled || this.data.trigger !== 'click') return
      this.setData({ visible: !this.data.visible })
    },
    onTriggerEnter() {
      if (this.data.trigger === 'hover') {
        this.setData({ visible: true })
      }
    },
    onTriggerLeave() {
      if (this.data.trigger === 'hover') {
        this.setData({ visible: false })
      }
    },
    hide() {
      this.setData({ visible: false })
    },
  },
})
