Component({
  properties: {
    content: { type: String, value: '' },
    placement: { type: String, value: 'top' },
    delay: { type: Number, value: 150 },
    disabled: { type: Boolean, value: false },
  },
  data: { visible: false, tooltipStyle: '' },
  methods: {
    show() {
      if (this.data.disabled || !this.data.content) return
      this.setData({ visible: true })
    },
    hide() {
      this.setData({ visible: false })
    },
  },
})
