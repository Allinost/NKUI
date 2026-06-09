# Dialog 对话框

模态对话框，用于确认操作或展示重要信息。

<ClientOnly>
<Demo>
  <div>
    <Button @click="dlgOpen = true">打开对话框</Button>
    <Dialog v-model:visible="dlgOpen" title="确认操作">
      <p>确定要执行此操作吗？</p>
    </Dialog>
  </div>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const dlgOpen = ref(false)
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示状态（v-model） |
| title | `string` | `''` | 标题 |
| width | `string` | `'420px'` | 宽度 |
| closable | `boolean` | `true` | 显示关闭按钮 |
| mask-closable | `boolean` | `true` | 点击遮罩关闭 |

| Slot | 说明 |
|------|------|
| default | 内容区 |
| footer | 底部操作区 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:visible | `(v: boolean)` | 显示状态变化 |
