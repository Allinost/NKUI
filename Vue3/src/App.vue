<template>
  <div class="app">
    <header class="app-header">
      <h1>NKUI Vue3</h1>
      <p>版本 1.0.0-alpha · 共 22 个组件</p>
    </header>

    <!-- Button -->
    <section class="demo-section">
      <h2>Button <Tag>5 type × 4 variant × 3 size</Tag></h2>
      <Space vertical>
        <Space>
          <Button v-for="t in types" :key="t" :type="t">{{ t }}</Button>
          <Button type="neutral">Neutral</Button>
        </Space>
        <Space>
          <Button v-for="t in types" :key="'o-'+t" :type="t" variant="outline">{{ t }}</Button>
        </Space>
        <Space>
          <Button v-for="t in types" :key="'g-'+t" :type="t" variant="ghost">{{ t }}</Button>
        </Space>
        <Space>
          <Button variant="text">Text</Button>
          <Button type="danger" variant="text">Delete</Button>
        </Space>
        <Space>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Space>
        <Space>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button round>Round</Button>
          <Button block>Block</Button>
        </Space>
      </Space>
    </section>

    <!-- Input -->
    <section class="demo-section">
      <h2>Input</h2>
      <Row :gutter="16">
        <Col :span="8"><Input v-model="v" placeholder="Basic" /></Col>
        <Col :span="8"><Input v-model="v" label="用户名" placeholder="With label" /></Col>
        <Col :span="8"><Input v-model="v" placeholder="Clearable" clearable /></Col>
        <Col :span="8"><Input v-model="v" placeholder="With prefix" prefix-icon="search" /></Col>
        <Col :span="8"><Input v-model="v" placeholder="Error" error="请输入有效内容" /></Col>
        <Col :span="8"><Input v-model="v" placeholder="Disabled" disabled /></Col>
      </Row>
    </section>

    <!-- Tag -->
    <section class="demo-section">
      <h2>Tag</h2>
      <Space>
        <Tag v-for="t in types" :key="t" :type="t" variant="light">{{ t }}</Tag>
        <Tag v-for="t in types" :key="'s-'+t" :type="t" variant="solid">{{ t }}</Tag>
      </Space>
      <Space style="margin-top: 8px">
        <Tag v-for="t in types" :key="'o-'+t" :type="t" variant="outline">{{ t }}</Tag>
        <Tag closable>Closable</Tag>
        <Tag round>Round</Tag>
      </Space>
    </section>

    <!-- Badge -->
    <section class="demo-section">
      <h2>Badge</h2>
      <Space size="xl">
        <Badge variant="dot"><Button size="sm">Dot</Button></Badge>
        <Badge variant="count" :value="5"><Button size="sm">Count</Button></Badge>
        <Badge variant="count" :value="100"><Button size="sm">Overflow</Button></Badge>
        <Badge variant="text" value="new"><Button size="sm">Text</Button></Badge>
        <Badge variant="count" :value="3" type="success"><Button size="sm">Success</Button></Badge>
      </Space>
    </section>

    <!-- Switch -->
    <section class="demo-section">
      <h2>Switch</h2>
      <Space>
        <Switch v-model="sw1" />
        <Switch v-model="sw1" label="With label" />
        <Switch v-model="sw2" size="sm" />
        <Switch v-model="sw2" size="lg" />
        <Switch disabled />
        <Switch loading />
      </Space>
    </section>

    <!-- Checkbox / Radio -->
    <section class="demo-section">
      <h2>Checkbox & Radio</h2>
      <Space>
        <Checkbox v-model="cb">Checkbox</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
      </Space>
      <Space style="margin-top: 8px">
        <Radio v-model="rd" :value="1">Radio A</Radio>
        <Radio v-model="rd" :value="2">Radio B</Radio>
        <Radio disabled>Radio Disabled</Radio>
      </Space>
    </section>

    <!-- Select -->
    <section class="demo-section">
      <h2>Select</h2>
      <Row :gutter="16">
        <Col :span="8">
          <Select v-model="sel" :options="selOpts" placeholder="Basic select" />
        </Col>
        <Col :span="8">
          <Select v-model="selM" :options="selOpts" multiple placeholder="Multiple" />
        </Col>
        <Col :span="8">
          <Select v-model="sel" :options="selOpts" filterable placeholder="Searchable" />
        </Col>
      </Row>
    </section>

    <!-- Avatar -->
    <section class="demo-section">
      <h2>Avatar</h2>
      <Space>
        <Avatar text="张" />
        <Avatar text="李" size="lg" />
        <Avatar icon="user" size="xl" />
        <Avatar variant="square" text="NK" />
      </Space>
    </section>

    <!-- Card -->
    <section class="demo-section">
      <h2>Card</h2>
      <Row :gutter="16">
        <Col :span="8">
          <Card variant="outlined">
            <p>Outlined card with some content</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card variant="elevated" hoverable>
            <p>Elevated hoverable card</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card variant="flat" hoverable>
            <template #header>卡片标题</template>
            <p>Card with header and footer</p>
            <template #footer><Button size="sm">操作</Button></template>
          </Card>
        </Col>
      </Row>
    </section>

    <!-- Divider & Space -->
    <section class="demo-section">
      <h2>Divider & Space</h2>
      <p>上方内容</p>
      <Divider />
      <p>下方内容</p>
      <Divider dashed>中间文字</Divider>
      <Space vertical>
        <span>行一</span>
        <span>行二</span>
      </Space>
    </section>

    <!-- Row/Col -->
    <section class="demo-section">
      <h2>Grid (Row/Col)</h2>
      <Row :gutter="16">
        <Col :span="6"><div class="grid-box">6</div></Col>
        <Col :span="6"><div class="grid-box">6</div></Col>
        <Col :span="6"><div class="grid-box">6</div></Col>
        <Col :span="6"><div class="grid-box">6</div></Col>
      </Row>
      <Row :gutter="16" style="margin-top:8px">
        <Col :span="8"><div class="grid-box">8</div></Col>
        <Col :span="8"><div class="grid-box">8</div></Col>
        <Col :span="8"><div class="grid-box">8</div></Col>
      </Row>
    </section>

    <!-- Progress -->
    <section class="demo-section">
      <h2>Progress</h2>
      <Space vertical style="width:100%">
        <Progress :percent="65" />
        <Progress :percent="100" status="success" />
        <Progress :percent="45" status="exception" />
        <Progress :percent="30" striped />
        <Space>
          <Progress :percent="75" variant="circle" size="sm" />
          <Progress :percent="60" variant="circle" />
          <Progress :percent="90" variant="circle" size="lg" status="success" />
        </Space>
      </Space>
    </section>

    <!-- Skeleton -->
    <section class="demo-section">
      <h2>Skeleton</h2>
      <Row :gutter="16">
        <Col :span="8"><Skeleton variant="paragraph" :rows="4" /></Col>
        <Col :span="4"><Skeleton variant="avatar" size="lg" /></Col>
        <Col :span="8"><Skeleton variant="image" height="120px" /></Col>
      </Row>
    </section>

    <!-- Empty -->
    <section class="demo-section">
      <h2>Empty</h2>
      <Empty description="暂无数据">
        <Button size="sm">重新加载</Button>
      </Empty>
    </section>

    <!-- Breadcrumb -->
    <section class="demo-section">
      <h2>Breadcrumb</h2>
      <Breadcrumb :items="bcItems" />
    </section>

    <!-- Tabs -->
    <section class="demo-section">
      <h2>Tabs</h2>
      <Tabs :items="tabItems" variant="line" />
      <Divider />
      <Tabs :items="tabItems" variant="card" />
      <Divider />
      <Tabs :items="tabItems" variant="segment" />
    </section>

    <!-- Pagination -->
    <section class="demo-section">
      <h2>Pagination</h2>
      <Pagination v-model="page" :total="200" />
      <Pagination v-model="page" :total="200" size="sm" />
    </section>

    <!-- Dialog -->
    <section class="demo-section">
      <h2>Dialog</h2>
      <Button @click="dlgOpen = true">Open Dialog</Button>
      <Dialog v-model:visible="dlgOpen" title="确认操作">
        <p>确定要执行此操作吗？</p>
      </Dialog>
    </section>

    <!-- Drawer -->
    <section class="demo-section">
      <h2>Drawer</h2>
      <Space>
        <Button @click="openDrawer('left')">Left</Button>
        <Button @click="openDrawer('right')">Right</Button>
        <Button @click="openDrawer('top')">Top</Button>
        <Button @click="openDrawer('bottom')">Bottom</Button>
      </Space>
      <Drawer v-model:visible="drVisible" :direction="drDir" title="抽屉标题">
        <p>抽屉内容</p>
      </Drawer>
    </section>

    <!-- Toast / Message -->
    <section class="demo-section">
      <h2>Toast & Message</h2>
      <Space>
        <Button @click="showMsg('info')">Info</Button>
        <Button type="success" @click="showMsg('success')">Success</Button>
        <Button type="warning" @click="showMsg('warning')">Warning</Button>
        <Button type="danger" @click="showMsg('error')">Error</Button>
      </Space>
    </section>

    <!-- Tooltip -->
    <section class="demo-section">
      <h2>Tooltip</h2>
      <Space>
        <Tooltip content="顶部提示"><Button size="sm">Top</Button></Tooltip>
        <Tooltip content="底部提示" placement="bottom"><Button size="sm">Bottom</Button></Tooltip>
      </Space>
    </section>

    <!-- Popover -->
    <section class="demo-section">
      <h2>Popover</h2>
      <Popover content="这是一段弹出内容">
        <template #reference><Button>Click me</Button></template>
      </Popover>
    </section>

    <!-- Loading -->
    <section class="demo-section">
      <h2>Loading</h2>
      <Space>
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
        <Loading variant="bar" />
      </Space>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NkButton as Button,
  NkInput as Input,
  NkTag as Tag,
  NkBadge as Badge,
  NkSwitch as Switch,
  NkCheckbox as Checkbox,
  NkRadio as Radio,
  NkSelect as Select,
  NkAvatar as Avatar,
  NkCard as Card,
  NkDivider as Divider,
  NkSpace as Space,
  NkRow as Row,
  NkCol as Col,
  NkProgress as Progress,
  NkSkeleton as Skeleton,
  NkEmpty as Empty,
  NkBreadcrumb as Breadcrumb,
  NkTabs as Tabs,
  NkPagination as Pagination,
  NkDialog as Dialog,
  NkDrawer as Drawer,
  NkLoading as Loading,
  NkTooltip as Tooltip,
  NkPopover as Popover,
  NKMessage,
} from './components'

const types = ['primary', 'success', 'warning', 'danger'] as const
const v = ref('')
const sw1 = ref(true)
const sw2 = ref(false)
const cb = ref(false)
const rd = ref(1)
const sel = ref()
const selM = ref([])
const selOpts = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c', disabled: true },
  { label: '选项 D', value: 'd' },
]
const bcItems = [
  { label: '首页', to: '/' },
  { label: '文档', to: '/docs' },
  { label: '组件' },
]
const tabItems = [
  { label: 'Tab 1', value: 1 },
  { label: 'Tab 2', value: 2 },
  { label: 'Tab 3', value: 3, disabled: true },
  { label: 'Tab 4', value: 4 },
]
const page = ref(1)
const dlgOpen = ref(false)
const drVisible = ref(false)
const drDir = ref<'left' | 'right' | 'top' | 'bottom'>('right')

function openDrawer(dir: string) {
  drDir.value = dir as any
  drVisible.value = true
}

function showMsg(type: string) {
  const fn = (NKMessage as any)[type]
  if (fn) fn(`这是一条 ${type} 消息`)
}
</script>

<style lang="scss">
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: $nk-spacing-3xl $nk-spacing-lg;
}

.app-header {
  margin-bottom: $nk-spacing-2xl;
  h1 { font-size: $nk-font-size-3xl; }
  p { color: $nk-color-neutral-500; margin-top: $nk-spacing-sm; }
}

.demo-section {
  margin-bottom: $nk-spacing-2xl;
  padding: $nk-spacing-xl;
  border: 1px solid $nk-color-neutral-200;
  border-radius: $nk-radius-md;
  background: #fff;

  h2 {
    font-size: $nk-font-size-xl;
    margin-bottom: $nk-spacing-lg;
    display: flex;
    align-items: center;
    gap: $nk-spacing-sm;
  }
}

.grid-box {
  background: $nk-color-primary-100;
  color: $nk-color-primary-600;
  text-align: center;
  padding: $nk-spacing-lg;
  border-radius: $nk-radius-sm;
  font-weight: $nk-font-weight-medium;
}
</style>
