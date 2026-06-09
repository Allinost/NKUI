# Progress 进度条

展示操作进度。

## 线性进度

<ClientOnly>
<Demo>
  <div style="width:100%">
    <Space vertical style="width:100%">
      <Progress :percent="65" />
      <Progress :percent="100" status="success" />
      <Progress :percent="45" status="exception" />
      <Progress :percent="30" striped />
    </Space>
  </div>
</Demo>
</ClientOnly>

## 环形进度

<ClientOnly>
<Demo>
  <Space>
    <Progress :percent="75" variant="circle" size="sm" />
    <Progress :percent="60" variant="circle" />
    <Progress :percent="90" variant="circle" size="lg" status="success" />
  </Space>
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percent | `number` | `0` | 百分比（0-100） |
| variant | `'line' \| 'circle'` | `'line'` | 进度样式 |
| status | `'active' \| 'success' \| 'exception'` | `'active'` | 状态 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅环形） |
| striped | `boolean` | `false` | 条纹动画 |
| show-info | `boolean` | `true` | 显示百分比文字 |
