# Grid 栅格

24 列栅格布局系统。

## 等分栅格

<ClientOnly>
<Demo>
  <div>
    <Row :gutter="16">
      <Col :span="6"><div class="grid-box">6</div></Col>
      <Col :span="6"><div class="grid-box">6</div></Col>
      <Col :span="6"><div class="grid-box">6</div></Col>
      <Col :span="6"><div class="grid-box">6</div></Col>
    </Row>
    <Row :gutter="16" style="margin-top:8px">
      <Col :span="8"><div class="grid-box">8</div></Col>
      <Col :span="8"><div class="grid-box">8</div></Col>
      <Col :span="8"><div class="grid-box">8</div></Col>
    </Row>
    <Row :gutter="16" style="margin-top:8px">
      <Col :span="12"><div class="grid-box">12</div></Col>
      <Col :span="12"><div class="grid-box">12</div></Col>
    </Row>
  </div>
</Demo>
</ClientOnly>

<style>
.grid-box { background: #BBDEFB; color: #1565C0; text-align: center; padding: 16px; border-radius: 4px; font-weight: 500; }
</style>

## Row API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| gutter | `number` | `0` | 列间距（px） |
| justify | `'start' \| 'end' \| 'center' \| 'around' \| 'between'` | `'start'` | 水平对齐 |

## Col API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| span | `number` | `24` | 占列数（1-24） |
| offset | `number` | `0` | 偏移列数 |
