Component({
  properties: {
    title: { type: String, value: '' },
    description: { type: String, value: '' },
    avatar: { type: String, value: '' },
    icon: { type: String, value: '' },
    size: { type: String, value: 'md' },
    clickable: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    arrow: { type: Boolean, value: false },
  },
  methods: {
    onClick(e) {
      if (this.data.disabled) return
      this.triggerEvent('click', e)
    },
  },
})
