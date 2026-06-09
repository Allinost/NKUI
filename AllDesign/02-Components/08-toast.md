# Toast 轻提示

## 概述

轻量级反馈提示，自动消失。

## 设计规范

### 变体

| Variant | Usage |
|---------|-------|
| `info` (默认) | 普通提示 |
| `success` | 成功 |
| `warning` | 警告 |
| `error` | 错误 |
| `loading` | 加载中 |

### 位置

- `top`
- `center` (默认)
- `bottom`

### 持续时间

- 短文字: 2000ms
- 长文字: 3000ms
- Loading: 不自动关闭

## API (函数式调用)

```ts
NKToast.info('这是一条提示')
NKToast.success('操作成功')
NKToast.error('操作失败')
NKToast.warning('请检查输入')
NKToast.loading('加载中...')
```

### 配置

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | `string` | - | 提示文字 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` | 类型 |
| duration | `number` | `2500` | 持续时间 (ms) |
| position | `'top' \| 'center' \| 'bottom'` | `'center'` | 位置 |
| onClose | `() => void` | - | 关闭回调 |
