# Profile 个人信息

展示用户个人信息的卡片组件，包含头像、姓名、头衔、邮箱和统计数据。

<ClientOnly>
<Demo>
  <Row :gutter="16">
    <Col :span="8">
      <Profile name="张三" title="高级工程师" email="zhangsan@example.com" size="sm" />
    </Col>
    <Col :span="8">
      <Profile name="李四" title="产品经理" email="lisi@example.com" size="md" variant="elevated"
        :stats="[{label:'项目',value:12},{label:'团队',value:3},{label:'动态',value:48}]" />
    </Col>
    <Col :span="8">
      <Profile name="王五" title="UI 设计师" email="wangwu@example.com" size="lg" variant="flat"
        :stats="[{label:'作品',value:86},{label:'粉丝',value:234},{label:'点赞',value:1024}]" />
    </Col>
  </Row>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | `''` | 姓名 |
| title | `string` | `''` | 头衔 |
| email | `string` | `''` | 邮箱 |
| avatar | `string` | `''` | 头像 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 卡片变体 |
| avatarVariant | `'circle' \| 'square'` | `'circle'` | 头像形状 |
| stats | `{ label, value }[]` | `[]` | 统计数据 |

| Slot | 说明 |
|------|------|
| default | 中间自定义内容 |
| actions | 底部操作按钮 |
