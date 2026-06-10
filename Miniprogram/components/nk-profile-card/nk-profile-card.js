const avatarSizeMap = { sm: 'md', md: 'lg', lg: 'xl' }

Component({
  properties: {
    name: { type: String, value: '' },
    title: { type: String, value: '' },
    description: { type: String, value: '' },
    avatar: { type: String, value: '' },
    size: { type: String, value: 'md' },
    variant: { type: String, value: 'outlined' },
  },
  data: { avatarSize: 'lg' },
  observers: {
    size: function () { this.setData({ avatarSize: avatarSizeMap[this.data.size] || 'lg' }) },
  },
})
