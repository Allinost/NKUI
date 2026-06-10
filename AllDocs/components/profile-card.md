# ProfileCard 名片卡

展示用户或企业名片信息。

<ClientOnly>
<Demo>
  <ProfileCard name="张三" title="高级工程师" description="专注于前端开发与设计系统" />
  <Divider />
  <ProfileCard name="李四" title="产品经理" size="sm" />
  <Divider />
  <ProfileCard name="王五" title="设计师" size="lg" variant="elevated" />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | `''` | 姓名 |
| title | `string` | `''` | 头衔 |
| description | `string` | `''` | 描述 |
| avatar | `string` | `''` | 头像 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| variant | `'outlined' \| 'elevated' \| 'flat'` | `'outlined'` | 卡片变体 |

| Slot | 说明 |
|------|------|
| actions | 操作按钮区 |
| default | 底部附加内容 |
