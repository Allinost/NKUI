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
| width | `string` | `'300px'` | 宽度（左右） |
| height | `string` | `'300px'` | 高度（上下） |

| Slot | 说明 |
|------|------|
| default | 内容区 |
| footer | 底部操作区 |
