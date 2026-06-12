const avatarSizeMap = { sm: 'lg', md: 'xl', lg: 'xl' }

Component({
  properties: {
    name: { type: String, value: '' },
    title: { type: String, value: '' },
    email: { type: String, value: '' },
    avatar: { type: String, value: '' },
    size: { type: String, value: 'md' },
    variant: { type: String, value: 'outlined' },
    avatarVariant: { type: String, value: 'circle' },
    stats: { type: Array, value: [] },
  },
  data: { avatarSize: 'xl' },
  observers: {
    size: function () { this.setData({ avatarSize: avatarSizeMap[this.data.size] || 'xl' }) },
  },
})
