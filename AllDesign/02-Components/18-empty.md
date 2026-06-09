# Empty 空状态

## 概述

数据为空时的占位提示。

## 设计规范

### 组成

```
    🏜️
  (插画/图标)

  暂无数据
  请稍后重试或添加新数据

  [ 重新加载 ]
```

### 内置插画

- `default`: 默认空数据
- `search`: 搜索结果为空
- `network`: 网络异常
- `message`: 暂无消息
- `cart`: 购物车为空

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | `string` | `'default'` | 插画名称或图片 URL |
| description | `string` | `'暂无数据'` | 描述文字 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### Slots

| Slot | Description |
|------|-------------|
| default | 自定义内容 (操作按钮等) |
| image | 自定义插画 |
| description | 自定义描述 |
