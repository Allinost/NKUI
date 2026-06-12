Component({
  properties: {
    title: { type: String, value: '注册' },
    subtitle: { type: String, value: '' },
    size: { type: String, value: 'md' },
    variant: { type: String, value: 'card' },
    loading: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    submitText: { type: String, value: '注 册' },
    submitType: { type: String, value: 'primary' },
    usernameLabel: { type: String, value: '用户名' },
    usernamePlaceholder: { type: String, value: '请输入用户名' },
    emailLabel: { type: String, value: '邮箱' },
    emailPlaceholder: { type: String, value: '请输入邮箱' },
    passwordLabel: { type: String, value: '密码' },
    passwordPlaceholder: { type: String, value: '请输入密码' },
    confirmLabel: { type: String, value: '确认密码' },
    confirmPlaceholder: { type: String, value: '请再次输入密码' },
  },
  data: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmError: '',
  },
  methods: {
    onUsernameInput(e) { this.setData({ username: e.detail.value }) },
    onEmailInput(e) { this.setData({ email: e.detail.value }) },
    onPasswordInput(e) { this.setData({ password: e.detail.value }) },
    onConfirmInput(e) { this.setData({ confirmPassword: e.detail.value }) },
    onSubmit() {
      const { username, email, password, confirmPassword } = this.data
      let valid = true
      const err = { usernameError: '', emailError: '', passwordError: '', confirmError: '' }
      if (!username) { err.usernameError = '请输入用户名'; valid = false }
      if (!email) { err.emailError = '请输入邮箱'; valid = false }
      if (!password) { err.passwordError = '请输入密码'; valid = false }
      if (password !== confirmPassword) { err.confirmError = '两次密码不一致'; valid = false }
      this.setData(err)
      if (!valid) return
      this.triggerEvent('submit', { username, email, password, confirmPassword })
    },
  },
})
