# Drawer 抽屉

从屏幕边缘滑入的面板。

<ClientOnly>
<Demo>
  <Space>
    <Button @click="openDr('left')">Left</Button>
    <Button @click="openDr('right')">Right</Button>
    <Button @click="openDr('top')">Top</Button>
    <Button @click="openDr('bottom')">Bottom</Button>
  </Space>
  <Drawer v-model:visible="drVis" :direction="drDir" title="抽屉标题">
    <p>抽屉内容区</p>
  </Drawer>
</Demo>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const drVis = ref(false)
const drDir = ref('right')
function openDr(dir) { drDir.value = dir; drVis.value = true }
</script>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示状态（v-model） |
| title | `string` | `''` | 标题 |
| direction | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | 滑出方向 |
| size | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | 预设尺寸或像素值 |
| closable | `boolean` | `true` | 显示关闭按钮 |
| mask-closable | `boolean` | `true` | 点击遮罩关闭 |
| close-on-esc | `boolean` | `true` | 按 Esc 关闭 |

## 可访问性

- 根节点 `role="dialog"`、`aria-modal="true"`，标题通过 `aria-labelledby` 关联。
- 打开后焦点进入内容区，Tab 在抽屉内循环，Esc 关闭，关闭后恢复原焦点并解除滚动锁定。

| Slot | 说明 |
|------|------|
| default | 内容区 |
| footer | 底部操作区 |
