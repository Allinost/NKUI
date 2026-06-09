# 微信小程序平台接入

## 项目结构

```
Miniprogram/
├── app.json              # 全局配置 + 组件注册
├── app.js / app.wxss     # 应用入口
├── project.config.json   # 项目配置
├── package.json          # 依赖配置
├── components/           # 自定义组件
│   ├── nk-button/        # 5 type × 4 variant × 3 size
│   ├── nk-input/         # 输入框（label/clearable/prefix/error）
│   ├── nk-tag/           # 标签（light/solid/outline + closable/round）
│   ├── nk-badge/         # 徽标（dot/count/text）
│   ├── nk-icon/          # SVG 图标
│   ├── nk-switch/        # 开关
│   ├── nk-checkbox/      # 复选框
│   ├── nk-radio/         # 单选框
│   ├── nk-divider/       # 分割线
│   ├── nk-space/         # 间距
│   ├── nk-avatar/        # 头像
│   ├── nk-card/          # 卡片
│   ├── nk-loading/       # 加载
│   ├── nk-dialog/        # 对话框
│   ├── nk-select/        # 选择器
│   └── nk-progress/      # 进度条
├── styles/
│   └── tokens.wxss       # 设计 Token 工具类
├── images/icons/         # SVG 图标文件
└── pages/
    └── index/            # 组件演示页
```

## 组件规范

每个组件使用 4 文件结构：

| 文件 | 用途 |
|------|------|
| `nk-{name}.json` | 组件配置 |
| `nk-{name}.js` | 逻辑层（CommonJS） |
| `nk-{name}.wxml` | 模板层 |
| `nk-{name}.wxss` | 样式层 |

## 全局注册

```json
// app.json
{
  "usingComponents": {
    "nk-button": "/components/nk-button/nk-button",
    "nk-input": "/components/nk-input/nk-input",
    "nk-tag": "/components/nk-tag/nk-tag",
    // ... 所有组件
  }
}
```

## 使用组件

```xml
<!-- 页面中直接使用 -->
<nk-button type="primary" bind:click="handleClick">按钮</nk-button>
<nk-input placeholder="请输入" bind:input="handleInput" />
<nk-tag type="success" closable>标签</nk-tag>
```

## 注意事项

1. **WXSS 限制**：不支持 SCSS/SASS，使用纯 CSS，单位使用 `rpx`
2. **模块格式**：JS 文件使用 CommonJS（`module.exports`）
3. **图标**：通过 `<image>` 加载 `/images/icons/` 下的 SVG 文件
4. **命名**：所有组件以 `nk-` 前缀，与 Vue3 组件命名约定统一

## 设计 Token

`styles/tokens.wxss` 提供工具类：

```wxss
.nk-color-primary { color: #2196F3; }
.nk-bg-primary { background: #2196F3; }
.nk-spacing-lg { margin: 32rpx; padding: 32rpx; }
```

WXSS 使用 `rpx` 单位适配不同屏幕，Token 值已自动转换。

## 当前已完成组件

| 组件 | 状态 |
|------|------|
| nk-button | ✅ 完成 |
| nk-input | ✅ 完成 |
| nk-tag | ✅ 完成 |
| nk-badge | ✅ 完成 |
| nk-icon | ✅ 完成 |
| nk-switch | ✅ 完成 |
| nk-checkbox | ✅ 完成 |
| nk-radio | ✅ 完成 |
| nk-divider | ✅ 完成 |
| nk-space | ✅ 完成 |
| nk-avatar | ✅ 完成 |
| nk-card | ✅ 完成 |
| nk-loading | ✅ 完成 |
| nk-dialog | ✅ 完成 |
| nk-select | ✅ 完成 |
| nk-progress | ✅ 完成 |

### 待补充

- nk-toast, nk-skeleton, nk-empty, nk-tabs, nk-breadcrumb, nk-pagination, nk-popover, nk-tooltip
