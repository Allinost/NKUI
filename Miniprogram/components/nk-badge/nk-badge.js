Component({
  properties: {
    variant: { type: String, value: 'dot' },
    value: { type: null, value: '' },
    max: { type: Number, value: 99 },
    type: { type: String, value: 'danger' },
    position: { type: String, value: 'top-right' },
  },
  data: {
    displayValue: '',
    visible: true,
  },
  observers: {
    'variant, value, max': function () {
      const { variant, value, max } = this.data
      if (variant === 'dot') {
        this.setData({ visible: true, displayValue: '' })
      } else if (value !== undefined && value !== '' && value !== null) {
        const num = Number(value)
        const display = isNaN(num) ? value : (num > max ? max + '+' : String(num))
        this.setData({ visible: true, displayValue: display })
      } else {
        this.setData({ visible: false })
      }
    }
  }
})
