# List 列表

统一的列表容器组件，配合 ListItem 使用，支持数据驱动、加载状态、空状态。

<ClientOnly>
<Demo>
  <Row :gutter="16">
    <Col :span="8">
      <h4 style="margin-bottom:8px">基础列表</h4>
      <List :data="listData" size="sm" />
    </Col>
    <Col :span="8">
      <h4 style="margin-bottom:8px">带头像和箭头</h4>
      <List :data="listData" size="md" bordered :item-avatar="'avatar'" :item-arrow="true" />
    </Col>
    <Col :span="8">
      <h4 style="margin-bottom:8px">空状态</h4>
      <List :data="[]" empty-text="暂无数据，请稍后再试" />
    </Col>
  </Row>
</Demo>
</ClientOnly>

## API (List)

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `any[]` | `[]` | 数据源 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bordered | `boolean` | `true` | 是否显示边框 |
| split | `boolean` | `true` | 是否显示分割线 |
| loading | `boolean` | `false` | 加载状态 |
| clickable | `boolean` | `false` | 是否可点击 |
| emptyText | `string` | `'暂无数据'` | 空状态文字 |

| Event | 参数 | 说明 |
|-------|------|------|
| itemClick | `(item, index)` | 点击列表项 |

| Slot | 说明 |
|------|------|
| header | 列表头部 |
| footer | 列表底部 |
| empty | 空状态自定义内容 |
| skeleton | 加载中骨架屏 |

## API (ListItem)

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述 |
| avatar | `string` | `''` | 左侧头像 |
| icon | `string` | `''` | 左侧图标 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| clickable | `boolean` | `false` | 是否可点击 |
| disabled | `boolean` | `false` | 禁用 |
| arrow | `boolean` | `false` | 显示右侧箭头 |

| Slot | 说明 |
|------|------|
| prefix | 前缀区域 |
| title | 自定义标题 |
| description | 自定义描述 |
| extra | 右侧附加内容 |
| default | 标题下方内容 |

<script setup>
const listData = [
  { title: '项目 Alpha', description: '前端重构与设计系统迁移' },
  { title: '项目 Beta', description: '后端 API 性能优化' },
  { title: '项目 Gamma', description: '移动端适配与测试' },
  { title: '项目 Delta', description: '用户反馈收集与分析' },
]
</script>
