Component({
  properties: {
    cover: { type: String, value: '' },
    title: { type: String, value: '' },
    status: { type: String, value: '' },
    description: { type: String, value: '' },
    stock: { type: null, value: undefined },
    tags: { type: Array, value: [] },
    price: { type: null, value: undefined },
    clickable: { type: Boolean, value: false },
    stockText: { type: String, value: '库存' },
    pricePrefix: { type: String, value: '¥' },
  },
  observers: {
    'stock,stockText': function () {
      const s = this.data.stock
      this.setData({
        _hasStock: s !== undefined && s !== null && s !== '',
        _stockLabel: s !== undefined && s !== null && s !== '' ? `${this.data.stockText}: ${s}` : '',
      })
    },
    'price,pricePrefix': function () {
      const p = this.data.price
      this.setData({
        _hasPrice: p !== undefined && p !== null && p !== '',
        _priceLabel: p !== undefined && p !== null && p !== '' ? `${this.data.pricePrefix}${p}` : '',
      })
    },
  },
  methods: {
    onClick(e) {
      this.triggerEvent('click', e)
    },
  },
})
