Component({
  options: { addGlobalClass: true },
  externalClasses: ['nk-class'],
  properties: {
    type: { type: String, value: 'primary' },
    variant: { type: String, value: 'solid' },
    size: { type: String, value: 'md' },
    disabled: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    block: { type: Boolean, value: false },
    round: { type: Boolean, value: false },
    icon: { type: String, value: '' },
  },
  methods: {
    onClick(e) {
      if (this.data.disabled || this.data.loading) return
      this.triggerEvent('click', e)
    }
  }
})
