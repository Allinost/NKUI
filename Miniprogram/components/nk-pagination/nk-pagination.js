Component({
  properties: {
    modelValue: { type: Number, value: 1 },
    total: { type: Number, value: 0 },
    pageSize: { type: Number, value: 20 },
    size: { type: String, value: 'md' },
    disabled: { type: Boolean, value: false },
    showTotal: { type: Boolean, value: true },
    maxPageButtons: { type: Number, value: 7 },
  },
  data: {
    pageButtons: [],
    totalPages: 0,
  },
  methods: {
    go(e) {
      const page = parseInt(e.currentTarget.dataset.page, 10)
      if (page < 1 || page > this.data.totalPages || page === this.data.modelValue || this.data.disabled) return
      this.setData({ modelValue: page })
      this.triggerEvent('change', { page, pageSize: this.data.pageSize })
    },
    prev() {
      if (this.data.modelValue > 1) this.go({ currentTarget: { dataset: { page: this.data.modelValue - 1 } } })
    },
    next() {
      if (this.data.modelValue < this.data.totalPages) this.go({ currentTarget: { dataset: { page: this.data.modelValue + 1 } } })
    },
    computePages() {
      const total = Math.max(1, Math.ceil(this.data.total / this.data.pageSize))
      const current = this.data.modelValue
      const max = this.data.maxPageButtons
      const half = Math.floor(max / 2)

      let pages = []
      if (total <= max) {
        for (let i = 1; i <= total; i++) pages.push(i)
      } else {
        let start = Math.max(1, current - half)
        let end = Math.min(total, start + max - 1)
        if (end - start + 1 < max) { start = Math.max(1, end - max + 1) }

        if (start > 1) { pages.push(1); if (start > 2) pages.push('...') }
        for (let i = start; i <= end; i++) pages.push(i)
        if (end < total) { if (end < total - 1) pages.push('...'); pages.push(total) }
      }
      this.setData({ pageButtons: pages, totalPages: total })
    },
  },
  observers: {
    'modelValue, total, pageSize': function () { this.computePages() },
  },
})
