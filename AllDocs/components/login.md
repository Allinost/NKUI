# Login 登录表单

统一的登录表单组件，支持用户名/密码输入、记住密码、回车提交及浏览器密码管理器适配。

## 基础用法

<ClientOnly>
<Demo>
  <Row :gutter="16">
    <Col :span="8">
      <Login size="sm" variant="card" />
    </Col>
    <Col :span="8">
      <Login size="md" variant="card" title="欢迎回来" subtitle="请输入您的账号信息" />
    </Col>
    <Col :span="8">
      <Login size="lg" variant="plain" submit-text="Sign In" submit-type="accent" />
    </Col>
  </Row>
</Demo>
</ClientOnly>

## 记住密码

<ClientOnly>
<Demo>
  <Login
    size="md"
    remember-me
    remember-me-label="记住登录状态"
    @submit="onLogin"
  />
</Demo>
</ClientOnly>

## 回车提交

表单内按 `Enter` 键自动触发表单提交，适配浏览器密码管理器自动填充后的自动提交行为。

<script setup>
function onLogin(v) {
  console.log('submit', v)
}
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `{ username, password }` | - | 表单数据 |
| title | `string` | `'登录'` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'card' \| 'plain'` | `'card'` | 变体 |
| loading | `boolean` | `false` | 加载状态 |
| disabled | `boolean` | `false` | 禁用 |
| submitText | `string` | `'登 录'` | 提交按钮文字 |
| submitType | `'primary' \| 'success' \| 'accent'` | `'primary'` | 按钮类型 |
| usernameLabel | `string` | `'用户名'` | 用户名字段标签 |
| passwordLabel | `string` | `'密码'` | 密码字段标签 |
| rememberMe | `boolean` | `false` | 显示记住密码复选框 |
| rememberMeLabel | `string` | `'记住密码'` | 记住密码标签文字 |

| Event | 参数 | 说明 |
|-------|------|------|
| submit | `(value: { username, password, rememberMe })` | 提交表单触发 |
| update:modelValue | `(value)` | 表单数据更新 |
| update:rememberMe | `(checked: boolean)` | 记住密码状态变化 |

| Slot | 说明 |
|------|------|
| title | 自定义标题 |
| extra | 表单中间附加内容（与记住密码同行右侧） |
| footer | 底部附加内容 |

> 输入框已添加 `name="username"` `autocomplete="username"` 和 `name="current-password"` `autocomplete="current-password"` 属性，浏览器密码管理器可自动识别并填充。
