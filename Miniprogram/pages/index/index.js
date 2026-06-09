Page({
  data: {
    types: ['primary', 'success', 'warning', 'danger'],
    selectOptions: [
      { label: '选项 A', value: 'a' },
      { label: '选项 B', value: 'b' },
      { label: '选项 C', value: 'c' },
      { label: '选项 D', value: 'd' },
    ],
  },
  openDialog() {
    this.selectComponent('#dialog').setData({ visible: true })
  }
})
