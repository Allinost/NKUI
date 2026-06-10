Component({
  properties: {
    modelValue: { type: String, value: '' },
    minDate: { type: String, value: '' },
    maxDate: { type: String, value: '' },
    firstDayOfWeek: { type: Number, value: 1 },
    size: { type: String, value: 'md' },
  },
  data: {
    year: 0,
    month: 0,
    days: [],
    weekDays: [],
  },
  methods: {
    init() {
      const now = this.data.modelValue ? new Date(this.data.modelValue) : new Date()
      this.setData({ year: now.getFullYear(), month: now.getMonth() })
      this.buildDays()
    },
    buildDays() {
      const { year, month, firstDayOfWeek } = this.data
      const first = new Date(year, month, 1)
      const last = new Date(year, month + 1, 0)
      let startDay = first.getDay()
      if (firstDayOfWeek === 1) startDay = startDay === 0 ? 6 : startDay - 1

      const weekDays = firstDayOfWeek === 1 ? ['一','二','三','四','五','六','日'] : ['日','一','二','三','四','五','六']

      const days = []
      for (let i = 0; i < startDay; i++) days.push(null)
      for (let d = 1; d <= last.getDate(); d++) {
        days.push({ date: d, full: new Date(year, month, d).getTime() })
      }
      while (days.length % 7 !== 0) days.push(null)
      this.setData({ days, weekDays })
    },
    isToday(ts) {
      const t = new Date()
      const d = new Date(ts)
      return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate()
    },
    isSelected(ts) {
      if (!this.data.modelValue) return false
      const d = new Date(ts); const v = new Date(this.data.modelValue)
      return d.getFullYear() === v.getFullYear() && d.getMonth() === v.getMonth() && d.getDate() === v.getDate()
    },
    isDisabled(ts) {
      const d = new Date(ts)
      if (this.data.minDate && d < new Date(this.data.minDate)) return true
      if (this.data.maxDate && d > new Date(this.data.maxDate)) return true
      return false
    },
    onSelect(e) {
      const ts = parseInt(e.currentTarget.dataset.ts, 10)
      if (this.isDisabled(ts)) return
      const d = new Date(ts)
      this.setData({ modelValue: d.toISOString() })
      this.triggerEvent('change', { value: d.toISOString() })
    },
    prevMonth() {
      let { year, month } = this.data
      if (month === 0) { year--; month = 11 }
      else month--
      this.setData({ year, month })
      this.buildDays()
      this.triggerEvent('month-change', { year, month })
    },
    nextMonth() {
      let { year, month } = this.data
      if (month === 11) { year++; month = 0 }
      else month++
      this.setData({ year, month })
      this.buildDays()
      this.triggerEvent('month-change', { year, month })
    },
  },
  lifetimes: { attached() { this.init() } },
  observers: {
    'modelValue': function () {
      if (this.data.modelValue) this.init()
    },
  },
})
