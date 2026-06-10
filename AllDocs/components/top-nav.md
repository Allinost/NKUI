# TopNav 顶部菜单栏

页面顶部导航栏，支持 Logo、菜单项选中态、右侧操作区。

<ClientOnly>
<Demo>
  <TopNav :items="[{label:'首页',value:'home'},{label:'组件',value:'components'},{label:'关于',value:'about'}]" logo="NKUI" />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `TopNavItem[]` | `[]` | 菜单项 |
| modelValue | `string \| number` | `''` | 当前选中 |
| logo | `string` | `''` | Logo |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| fixed | `boolean` | `false` | 固定顶部 |

| Event | 说明 |
|-------|------|
| change | 选中项变化 |

| Slot | 说明 |
|------|------|
| logo | 自定义 Logo |
| default | 右侧操作区 |
