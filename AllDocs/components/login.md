# Login 登录表单

统一的登录表单组件，支持用户名/密码输入与验证。

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

| Event | 参数 | 说明 |
|-------|------|------|
| submit | `(value)` | 提交表单触发 |
| update:modelValue | `(value)` | 表单数据更新 |

| Slot | 说明 |
|------|------|
| title | 自定义标题 |
| extra | 表单中间附加内容 |
| footer | 底部附加内容 |
