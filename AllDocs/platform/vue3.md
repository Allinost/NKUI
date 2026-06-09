# Vue3 平台接入

## 项目结构

```
Vue3/
├── src/
│   ├── components/     # 28 个组件（22 个独立组件 + index.ts + utils）
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Icon.vue
│   │   ├── Tag.vue
│   │   ├── Badge.vue
│   │   ├── Loading.vue
│   │   ├── Switch.vue
│   │   ├── Checkbox.vue
│   │   ├── Radio.vue
│   │   ├── Select.vue
│   │   ├── Avatar.vue
│   │   ├── Card.vue
│   │   ├── Divider.vue
│   │   ├── Space.vue
│   │   ├── Row.vue / Col.vue
│   │   ├── Progress.vue
│   │   ├── Skeleton.vue
│   │   ├── Empty.vue
│   │   ├── Tabs.vue
│   │   ├── Breadcrumb.vue
│   │   ├── Pagination.vue
│   │   ├── Dialog.vue
│   │   ├── Drawer.vue
│   │   ├── Tooltip.vue
│   │   ├── Popover.vue
│   │   └── index.ts    # 批量导出 + 安装函数
│   ├── styles/          # SCSS Token 变量 + Reset
│   ├── utils/           # 工具函数（图标注册、Message）
│   ├── App.vue          # 主页面入口
│   └── main.ts          # 应用入口
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 技术栈

- **框架**: Vue 3.5 (Composition API + `<script setup>`)
- **构建**: Vite 6
- **样式**: SCSS（Sass 1.77）
- **类型**: TypeScript 5.5 + vue-tsc 2

## 开发命令

```bash
cd Vue3
npm install      # 首次安装
npm run dev      # 启动开发服务器 (localhost:5173)
npm run build    # 生产构建
npm run preview  # 预览构建产物
npm run lint     # ESLint 检查
npm run typecheck # TypeScript 类型检查
```

## 组件使用

### 按需导入

```vue
<script setup lang="ts">
import { NkButton, NkSpace } from './components'
</script>

<template>
  <Space>
    <Button type="primary">按钮</Button>
  </Space>
</template>
```

### 全局注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { install } from './components'

const app = createApp(App)
install(app)
app.mount('#app')
```

## 设计 Token

所有 SCSS 变量定义在 `src/styles/_tokens.scss`。在 Vue 组件中直接使用：

```scss
.demo {
  color: $nk-color-primary-500;
  padding: $nk-spacing-lg;
  font-size: $nk-font-size-base;
  border-radius: $nk-radius-md;
}
```

Vite 配置已预置 `sass:map`、`sass:color`、`sass:list` 模块和 Token 注入。

## 路径别名

```ts
// vite.config.ts
resolve: {
  alias: { '@': resolve(__dirname, 'src') }
}
```

```vue
<script setup>
import { NkButton } from '@/components'
</script>
```

## 当前状态

- 组件数量：22 个独立组件
- 构建状态：✅ 通过（96 modules，0 errors）
- 类型检查：✅ 通过
