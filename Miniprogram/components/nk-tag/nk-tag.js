Component({
  properties: {
    type: { type: String, value: 'primary' },
    variant: { type: String, value: 'light' },
    size: { type: String, value: 'md' },
    closable: { type: Boolean, value: false },
    round: { type: Boolean, value: false },
  },
  methods: {
    onClose() { this.triggerEvent('close') }
  }
})
