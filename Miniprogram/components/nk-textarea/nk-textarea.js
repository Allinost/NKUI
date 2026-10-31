Component({
  properties: {
    value: { type: String, value: '' },
    size: { type: String, value: 'md' },
    placeholder: { type: String, value: '' },
    disabled: { type: Boolean, value: false },
    readonly: { type: Boolean, value: false },
    clearable: { type: Boolean, value: false },
    error: { type: String, value: '' },
    label: { type: String, value: '' },
    maxlength: { type: Number, value: -1 },
    autoHeight: { type: Boolean, value: false },
  },
  data: {
    focused: false,
    inputValue: '',
  },
  methods: {
    onInput(e) {
      const val = e.detail.value
      this.setData({ inputValue: val })
      this.triggerEvent('input', { value: val })
      this.triggerEvent('change', { value: val })
    },
    onFocus(e) {
      this.setData({ focused: true })
      this.triggerEvent('focus', e)
    },
    onBlur(e) {
      this.setData({ focused: false })
      this.triggerEvent('blur', e)
    },
    onClear() {
      this.setData({ inputValue: '' })
      this.triggerEvent('input', { value: '' })
      this.triggerEvent('change', { value: '' })
      this.triggerEvent('clear')
    },
  },
})
