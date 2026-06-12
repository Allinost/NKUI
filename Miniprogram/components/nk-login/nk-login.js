Component({
  properties: {
    title: { type: String, value: '登录' },
    subtitle: { type: String, value: '' },
    size: { type: String, value: 'md' },
    variant: { type: String, value: 'card' },
    loading: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    submitText: { type: String, value: '登 录' },
    submitType: { type: String, value: 'primary' },
    usernameLabel: { type: String, value: '用户名' },
    usernamePlaceholder: { type: String, value: '请输入用户名' },
    passwordLabel: { type: String, value: '密码' },
    passwordPlaceholder: { type: String, value: '请输入密码' },
  },
  data: {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  },
  methods: {
    onUsernameInput(e) {
      this.setData({ username: e.detail.value })
    },
    onPasswordInput(e) {
      this.setData({ password: e.detail.value })
    },
    onSubmit() {
      const { username, password } = this.data
      let valid = true
      let usernameError = ''
      let passwordError = ''
      if (!username) { usernameError = '请输入用户名'; valid = false }
      if (!password) { passwordError = '请输入密码'; valid = false }
      this.setData({ usernameError, passwordError })
      if (!valid) return
      this.triggerEvent('submit', { username, password })
    },
  },
})
