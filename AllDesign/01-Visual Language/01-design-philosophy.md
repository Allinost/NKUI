# NKUI Design Philosophy

## 设计原则

### 1. 一致 (Consistent)
- 所有平台使用相同的视觉 tokens
- 组件布局、间距、色彩在不同平台保持统一
- 交互行为保持一致（点击态、过渡动画等）

### 2. 高效 (Efficient)
- 开箱即用，最小配置
- 组件原子化设计，自由组合
- 按需加载，不引入冗余代码

### 3. 包容 (Inclusive)
- 支持无障碍访问 (WCAG 2.1 AA)
- 深色模式（后续支持）
- 国际化（后续支持）

### 4. 可定制 (Customizable)
- 通过 Design Tokens 全局定制主题
- 组件支持 CSS 变量覆盖
- 支持按需引入

## 设计层级

```
Design Tokens (设计原子)
    ↓
Core Components (基础组件)
    ↓
Composite Components (复合组件)
    ↓
Patterns / Templates (页面模式)
    ↓
Pages (业务页面)
```

## 命名规范

- **Token 命名**: `nkui.{category}.{property}.{variant}`
  - 例: `nkui.color.primary.500`, `nkui.spacing.md`, `nkui.font.size.body`
- **组件 API**: 各平台保持一致的 prop/attribute 命名
  - 例: `type`, `size`, `disabled`, `loading`, `variant`
- **CSS 变量**: `--nk-{category}-{property}-{variant}`
  - 例: `--nk-color-primary`, `--nk-radius-md`
