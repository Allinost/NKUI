# Calendar 日历

日期选择组件，支持月份切换和日期选中。

<ClientOnly>
<Demo>
  <Calendar />
</Demo>
</ClientOnly>

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `Date \| string \| null` | `null` | 选中日期 |
| minDate | `Date \| string \| null` | `null` | 最小可选日期 |
| maxDate | `Date \| string \| null` | `null` | 最大可选日期 |
| firstDayOfWeek | `0 \| 1` | `1` | 每周第一天 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

| Event | 说明 |
|-------|------|
| change | 选中日期变化 |
| month-change | 月份切换 |
