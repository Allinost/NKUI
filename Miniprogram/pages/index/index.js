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
    profileStats: [
      { label: '项目', value: 12 },
      { label: '团队', value: 3 },
      { label: '动态', value: 48 },
    ],
    listData: [
      { title: '项目 Alpha', description: '前端重构与设计系统迁移' },
      { title: '项目 Beta', description: '后端 API 性能优化' },
      { title: '项目 Gamma', description: '移动端适配与测试' },
      { title: '项目 Delta', description: '用户反馈收集与分析' },
    ],
    emptyData: [],
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
  onLoginSubmit(e) {
    console.log('Login:', e.detail)
  },
  onRegisterSubmit(e) {
    console.log('Register:', e.detail)
  },
  onListItemClick(e) {
    console.log('List item clicked:', e.detail)
  },
})
