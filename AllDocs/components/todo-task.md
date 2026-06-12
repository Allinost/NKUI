# TodoTask 待办任务

带分类圆点、完成勾选、截止时间、备注、重复和提醒的待办任务项组件，配合 TodoTaskList 使用。

## 小任务项 sm

<ClientOnly>
<Demo>
  <TodoTask title="完成项目报告" category="work" dueDate="今日 18:00" />
</Demo>
</ClientOnly>

## 大任务项 lg

<ClientOnly>
<Demo>
  <TodoTask
    size="lg"
    title="每周团队同步会议"
    category="work"
    dueDate="每周一 10:00"
    notes="准备上周进度总结"
    repeat="每周一"
    reminder="提前15分钟"
  />
</Demo>
</ClientOnly>

## 分类颜色

<ClientOnly>
<Demo>
  <div style="display:flex;flex-direction:column;gap:8px">
    <TodoTask v-for="t in categories" :key="t.key" :title="t.label" :category="t.key" :size="size" />
  </div>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const size = ref('sm')
const categories = [
  { key: 'default', label: '默认 default' },
  { key: 'work', label: '工作 work' },
  { key: 'personal', label: '个人 personal' },
  { key: 'urgent', label: '紧急 urgent' },
  { key: 'study', label: '学习 study' },
  { key: 'health', label: '健康 health' },
  { key: 'finance', label: '财务 finance' },
  { key: 'social', label: '社交 social' },
  { key: 'shopping', label: '购物 shopping' },
  { key: 'travel', label: '旅行 travel' },
]
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| checked | `boolean` | `false` | 是否完成（v-model） |
| title | `string` | `''` | 任务标题 |
| category | `string` | `'default'` | 分类，预设颜色（见上） |
| color | `string` | `''` | 自定义圆点颜色，优先级高于 category |
| dueDate | `string` | `''` | 截止时间 |
| startDate | `string` | `''` | 开始时间 |
| notes | `string` | `''` | 备注 |
| repeat | `string` | `''` | 重复时间（如"每天""每周一"） |
| reminder | `string` | `''` | 提醒（如"提前15分钟"） |
| size | `'sm' \| 'lg'` | `'sm'` | 尺寸 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:checked | `(v: boolean)` | 勾选状态变化 |
| click | `(e: MouseEvent)` | 点击任务项 |
