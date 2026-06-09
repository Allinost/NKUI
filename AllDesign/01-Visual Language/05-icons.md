# 图标体系 (Icon System)

## 规范

- **尺寸**: 16px / 20px / 24px / 32px
- **格式**: SVG（各平台按需转换为对应格式）
- **命名**: `nk-icon-{name}`（如 `nk-icon-arrow-left`）
- **风格**: 线性（stroke-width: 1.5），圆头端点，直角连接

## 图标分类

- **方向性**: arrow-left, arrow-right, arrow-up, arrow-down, chevron-left, chevron-right
- **操作类**: add, remove, edit, delete, search, close, menu, more, refresh
- **提示类**: info, success, warning, error, question
- **文件类**: file, folder, image, download, upload
- **社交类**: user, setting, home, star, heart, share
- **品牌类**: nkui-logo

## 默认颜色

- 图标颜色继承 `currentColor`
- 尺寸通过 `font-size` 控制（便于缩放）
