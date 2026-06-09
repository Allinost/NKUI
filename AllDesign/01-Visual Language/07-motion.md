# 动效规范 (Motion)

## 持续时间

| Token | Duration | Usage |
|-------|----------|-------|
| `nkui.duration.fast` | 150ms | 悬停态、点击反馈 |
| `nkui.duration.normal` | 250ms | 弹出、收起、切换 |
| `nkui.duration.slow` | 400ms | 页面过渡、蒙层渐显 |

## 缓动函数

| Token | Easing | Usage |
|-------|--------|-------|
| `nkui.easing.ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 默认 |
| `nkui.easing.ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | 进入 |
| `nkui.easing.ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | 退出 |
| `nkui.easing.ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1)` | 进出 |

## 交互反馈

- **Hover**: 150ms ease 背景色/阴影过渡
- **Click/Active**: 100ms 无缓动，瞬间缩放 0.97
- **Focus**: outline 偏移 2px 的 focus ring
- **Disabled**: 直接切换
