# 阴影与层级 (Shadows & Elevation)

## 阴影层级

| Token | Value | Usage |
|-------|-------|-------|
| `nkui.shadow.sm` | `0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)` | 卡片悬浮 |
| `nkui.shadow.md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | 下拉菜单 |
| `nkui.shadow.lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | 对话框 |
| `nkui.shadow.xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | 通知/Toast |

## Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `nkui.zIndex.dropdown` | 1000 | 下拉层 |
| `nkui.zIndex.sticky` | 1020 | 粘性定位 |
| `nkui.zIndex.fixed` | 1030 | 固定定位 |
| `nkui.zIndex.modal` | 1040 | 模态框蒙层 |
| `nkui.zIndex.popover` | 1050 | 弹出层 |
| `nkui.zIndex.tooltip` | 1060 | 工具提示 |
| `nkui.zIndex.toast` | 1070 | 轻提示 |

> 遵循 1000+ 的层级系统，预留充足的扩展空间。
