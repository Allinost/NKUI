# Toast 消息提示

轻量级消息反馈，支持程序化调用。

## 使用方式

```ts
import { NKMessage } from './components'

NKMessage.info('这是一条信息')
NKMessage.success('操作成功')
NKMessage.warning('请确认信息')
NKMessage.error('操作失败')
```

<ClientOnly>
<Demo>
  <Space>
    <Button @click="show('info')">Info</Button>
    <Button type="success" @click="show('success')">Success</Button>
    <Button type="warning" @click="show('warning')">Warning</Button>
    <Button type="danger" @click="show('error')">Error</Button>
  </Space>
</Demo>
</ClientOnly>

<script setup>
import { NKMessage } from '../../Vue3/src/components'
function show(type) {
  const fn = NKMessage[type]
  if (fn) fn(`这是一条 ${type} 消息`)
}
</script>

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `NKMessage.info` | `(msg: string, duration?: number)` | 信息提示 |
| `NKMessage.success` | `(msg: string, duration?: number)` | 成功提示 |
| `NKMessage.warning` | `(msg: string, duration?: number)` | 警告提示 |
| `NKMessage.error` | `(msg: string, duration?: number)` | 错误提示 |

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| message | `string` | — | 提示内容 |
| duration | `number` | `3000` | 展示时长（ms），0 为不自动关闭 |
