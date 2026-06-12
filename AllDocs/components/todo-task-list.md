# TodoTaskList 待办任务列表

待办任务列表容器，数据驱动渲染 TodoTask。

> 详细 API 请参考 [TodoTask 待办任务](./todo-task) 文档。

## 基础用法

<ClientOnly>
<Demo>
  <TodoTaskList :data="tasks" size="sm" />
</Demo>
</ClientOnly>

## 大任务项列表

<ClientOnly>
<Demo>
  <TodoTaskList :data="tasks" size="lg" />
</Demo>
</ClientOnly>

<script setup>
const tasks = [
  { title: '完成项目报告', category: 'work', dueDate: '今日 18:00', notes: '第三季度数据分析', repeat: '', reminder: '' },
  { title: '购买生日礼物', category: 'shopping', dueDate: '周六前', notes: '预算500以内', repeat: '', reminder: '提前1天' },
  { title: '每周团队同步', category: 'work', dueDate: '每周一 10:00', notes: '准备上周进度总结', repeat: '每周一', reminder: '提前15分钟' },
  { title: '晨跑', category: 'health', dueDate: '07:00', notes: '3公里', repeat: '每天', reminder: '06:45' },
  { title: '牙医预约', category: 'personal', dueDate: '2024-01-20', notes: '市中心诊所', repeat: '', reminder: '提前2小时' },
]
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `any[]` | `[]` | 数据源 |
| size | `'sm' \| 'lg'` | `'sm'` | 任务项尺寸 |
| bordered | `boolean` | `false` | 显示边框 |
| loading | `boolean` | `false` | 加载状态 |
| emptyText | `string` | `'暂无待办任务'` | 空状态文字 |

| Event | 参数 | 说明 |
|-------|------|------|
| itemClick | `(item, index)` | 点击任务项 |
| checkedChange | `(item, index, checked)` | 勾选状态变化 |

| Slot | 说明 |
|------|------|
| header | 列表头部 |
| footer | 列表底部 |
| empty | 空状态自定义内容 |
| skeleton | 加载中骨架屏 |
