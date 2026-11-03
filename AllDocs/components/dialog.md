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
| width | `string \| number` | `'420px'` | 宽度，数字按 px 处理 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 未传 width 时使用的预设宽度 |
| closable | `boolean` | `true` | 显示关闭按钮 |
| mask-closable | `boolean` | `true` | 点击遮罩关闭 |
| close-on-esc | `boolean` | `true` | 按 Esc 关闭 |
| confirm-text / cancel-text | `string` | `'确认'` / `'取消'` | 默认底部按钮文案（使用 footer 插槽时不生效） |
| loading | `boolean` | `false` | 确认按钮 loading |

| Slot | 说明 |
|------|------|
| default | 内容区 |
| title | 自定义标题 |
| footer | 底部操作区 |

| Event | 参数 | 说明 |
|-------|------|------|
| update:visible | `(v: boolean)` | 显示状态变化 |
| confirm / cancel | `()` | 默认底部按钮或关闭动作 |
| close | `()` | 关闭（含取消与 Esc） |

## 可访问性

- 根节点带 `role="dialog"`、`aria-modal="true"`，并通过 `aria-labelledby` 关联标题。
- 打开时锁定页面滚动并把焦点移入内容区第一个控件；关闭后恢复原焦点。
- Tab / Shift+Tab 在弹窗内循环，Esc 触发关闭（可用 `close-on-esc` 关闭该行为）。
- 关闭按钮带 `aria-label="关闭"`，按钮默认 `type="button"`。
