# Message 全局提示

## 概述

全局级别操作反馈，与 Toast 区别在于可批量展示、可手动关闭。

## 设计规范

### 变体

| Variant | Usage |
|---------|-------|
| `info` (默认) | 普通信息 |
| `success` | 成功 |
| `warning` | 警告 |
| `error` | 错误 |
| `loading` | 加载中 |

### 位置

- `top` (默认)
- `top-left`
- `top-right`
- `bottom`
- `bottom-left`
- `bottom-right`

### 堆叠

- 同一位置的消息垂直堆叠
- 间距: 8px
- 自动消失时下方消息上移

## API (函数式调用)

```ts
NKMessage.info('这是一条消息')
NKMessage.success('操作成功')
NKMessage.warning('请检查配置')
NKMessage.error('服务器错误')
const hide = NKMessage.loading('加载中...')
hide() // 手动关闭
```

### 配置

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `string` | - | 消息内容 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` | 类型 |
| duration | `number` | `3000` | 持续时间 (0 为不自动关闭) |
| closable | `boolean` | `true` | 显示关闭按钮 |
| onClose | `() => void` | - | 关闭回调 |

### 返回值

- 返回 `() => void` 关闭函数

### 全局配置

```ts
NKMessage.config({
  duration: 4000,
  max: 5,       // 最大同时显示数
  top: 24       // 距顶部距离
})
```
