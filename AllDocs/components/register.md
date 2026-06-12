# Register 注册表单

统一的注册表单组件，包含用户名、邮箱、密码、确认密码字段。

<ClientOnly>
<Demo>
  <Row :gutter="16">
    <Col :span="8">
      <Register size="sm" variant="card" />
    </Col>
    <Col :span="8">
      <Register size="md" variant="card" title="创建账号" subtitle="填写信息完成注册" />
    </Col>
    <Col :span="8">
      <Register size="lg" variant="plain" submit-text="Sign Up" submit-type="accent" />
    </Col>
  </Row>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `{ username, email, password, confirmPassword }` | - | 表单数据 |
| title | `string` | `'注册'` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'card' \| 'plain'` | `'card'` | 变体 |
| loading | `boolean` | `false` | 加载状态 |
| disabled | `boolean` | `false` | 禁用 |
| submitText | `string` | `'注 册'` | 提交按钮文字 |
| submitType | `'primary' \| 'success' \| 'accent'` | `'primary'` | 按钮类型 |

| Event | 参数 | 说明 |
|-------|------|------|
| submit | `(value)` | 提交表单触发 |
| update:modelValue | `(value)` | 表单数据更新 |

| Slot | 说明 |
|------|------|
| title | 自定义标题 |
| extra | 表单中间附加内容 |
| footer | 底部附加内容 |
