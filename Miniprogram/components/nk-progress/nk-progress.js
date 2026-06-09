Component({
  properties: {
    variant: { type: String, value: 'line' },
    percent: { type: Number, value: 0 },
    status: { type: String, value: 'active' },
    size: { type: String, value: 'md' },
    showText: { type: Boolean, value: true },
    striped: { type: Boolean, value: false },
  },
  data: {
    barColor: '#2196F3',
  },
  observers: {
    status: function () {
      const colors = { active: '#2196F3', success: '#4CAF50', exception: '#F44336', warning: '#FF9800' }
      this.setData({ barColor: colors[this.data.status] || '#2196F3' })
    }
  }
})
