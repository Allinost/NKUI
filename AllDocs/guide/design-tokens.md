# 设计语言

## 设计哲学

NKUI 的设计体系遵循"实用、一致、高效"三大原则：

- **实用** — 每个组件解决真实场景问题，不堆砌无意义的样式变化
- **一致** — 跨平台保持相同的外观与交互，降低用户学习成本
- **高效** — Token 驱动开发，减少重复决策，提高团队协作效率

## Design Token

所有 Token 以 JSON 格式维护在 `AllPublic/tokens/design-tokens.json`，作为单一事实来源。

### 色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `$nk-color-primary-500` | `#2196F3` | 主色 |
| `$nk-color-success` | `#4CAF50` | 成功色 |
| `$nk-color-warning` | `#FF9800` | 警告色 |
| `$nk-color-error` | `#F44336` | 错误色 |
| `$nk-color-neutral-0` | `#FFFFFF` | 白色背景 |
| `$nk-color-neutral-900` | `#212121` | 主要文字 |

主色采用 Material Design 的 50–900 色阶体系，中性色同理。

### 字体

| Token | 值 |
|-------|-----|
| `$nk-font-family-sans` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', …` |
| `$nk-font-family-mono` | `'SF Mono', 'Fira Code', …` |
| `$nk-font-size-base` | `14px` |
| `$nk-font-size-lg` | `16px` |
| `$nk-font-size-xl` | `20px` |

### 间距

| Token | 值 |
|-------|-----|
| `$nk-spacing-xs` | `4px` |
| `$nk-spacing-sm` | `8px` |
| `$nk-spacing-md` | `12px` |
| `$nk-spacing-lg` | `16px` |
| `$nk-spacing-xl` | `24px` |
| `$nk-spacing-2xl` | `32px` |
| `$nk-spacing-3xl` | `48px` |

基础单位 `4px`，所有间距均为其倍数。

### 圆角

| Token | 值 |
|-------|-----|
| `$nk-radius-sm` | `4px` |
| `$nk-radius-md` | `8px` |
| `$nk-radius-lg` | `12px` |
| `$nk-radius-xl` | `16px` |
| `$nk-radius-full` | `9999px` |

### 阴影

| Token | 值 |
|-------|-----|
| `$nk-shadow-sm` | `0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)` |
| `$nk-shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` |
| `$nk-shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` |
| `$nk-shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` |

### 完整变量列表

SCSS 变量文件：`Vue3/src/styles/_tokens.scss`

微信小程序 WXSS 文件：`Miniprogram/styles/tokens.wxss`

## 组件规范

详见 [AllDesign/02-Components/](https://github.com/anomalyco/nkui/tree/main/AllDesign/02-Components)，包含 30 个组件的：

- **API 定义** — props、slots、events
- **视觉规范** — 尺寸、颜色、状态
- **行为说明** — 交互逻辑、边界情况
