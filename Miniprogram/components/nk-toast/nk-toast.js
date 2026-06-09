Component({
  properties: {
    visible: { type: Boolean, value: false },
    content: { type: String, value: '' },
    type: { type: String, value: 'info' },
    duration: { type: Number, value: 3000 },
    showIcon: { type: Boolean, value: true },
  },
  methods: {
    show(opts) {
      const data = {
        visible: true,
        content: opts.content || this.data.content,
        type: opts.type || this.data.type,
        duration: opts.duration || this.data.duration,
        showIcon: opts.showIcon !== undefined ? opts.showIcon : this.data.showIcon,
      }
      this.setData(data)
      if (data.duration > 0) {
        setTimeout(() => { this.hide() }, data.duration)
      }
    },
    hide() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    },
  },
})
