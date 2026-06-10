# BottomTab 底部 Tab 栏

移动端底部导航栏，支持图标、文字、角标。

<ClientOnly>
<Demo>
  <BottomTab :items="[{label:'首页',value:'home',icon:'home'},{label:'发现',value:'discover',icon:'search'},{label:'消息',value:'messages',icon:'info',badge:3},{label:'我的',value:'profile',icon:'user'}]" />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `BottomTabItem[]` | `[]` | Tab 项 |
| modelValue | `string \| number` | `''` | 当前选中 |
| variant | `'icon-text' \| 'icon' \| 'text'` | `'icon-text'` | 显示变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| fixed | `boolean` | `false` | 固定底部 |

| Event | 说明 |
|-------|------|
| change | 选中项变化 |
