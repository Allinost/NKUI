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
    navItems: [
      { label: '首页', value: 'home' },
      { label: '组件', value: 'components' },
      { label: '关于', value: 'about' },
    ],
    bottomTabItems: [
      { label: '首页', value: 'home', icon: 'home' },
      { label: '发现', value: 'discover', icon: 'search' },
      { label: '消息', value: 'messages', icon: 'info', badge: 3 },
      { label: '我的', value: 'profile', icon: 'user' },
    ],
    drawerVisible: false,
    toastVisible: false,
    images: [],
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
