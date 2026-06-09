Page({
  data: {
    types: ['primary', 'success', 'warning', 'danger'],
    selectOptions: [
      { label: '选项 A', value: 'a' },
      { label: '选项 B', value: 'b' },
      { label: '选项 C', value: 'c' },
      { label: '选项 D', value: 'd' },
    ],
    tabItems: [
      { label: 'Tab 1', value: '1' },
      { label: 'Tab 2', value: '2' },
      { label: 'Tab 3', value: '3' },
    ],
    breadcrumbItems: [
      { label: '首页', to: '' },
      { label: '组件', to: '' },
      { label: '当前页' },
    ],
    drawerVisible: false,
    toastVisible: false,
  },
  openDialog() {
    this.selectComponent('#dialog').setData({ visible: true })
  },
  openDrawer() {
    this.setData({ drawerVisible: true })
  },
  closeDrawer() {
    this.setData({ drawerVisible: false })
  },
  showToast(e) {
    const type = e.currentTarget.dataset.type || 'info'
    this.selectComponent('#toast').show({ content: '这是一条' + type + '消息', type: type })
  },
  onTabChange(e) {
    console.log('Tab changed:', e.detail.value)
  },
  onPageChange(e) {
    console.log('Page changed:', e.detail.page)
  },
})
