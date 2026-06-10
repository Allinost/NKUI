# Weather 天气

天气信息展示卡片，内置天气图标，根据天气条件自动切换渐变背景。

## 基础用法

<ClientOnly>
<Demo>
  <div style="max-width: 320px">
    <Weather
      city="北京"
      temperature="26"
      weather="晴"
      :humidity="60"
      wind="3级 东南风"
      :temp-high="28"
      :temp-low="18"
    />
  </div>
</Demo>
</ClientOnly>

## 天气类型

根据 `weather` 字段自动匹配背景渐变和内置图标：

| 天气关键词 | 效果 |
|------------|------|
| 晴 / sun / clear | 暖色渐变 + 太阳图标 |
| 多云 / cloud | 灰蓝渐变 + 云遮阳图标 |
| 阴 / overcast | 灰色渐变 + 阴云图标 |
| 雨 / rain | 蓝色渐变 + 雨滴图标 |
| 雪 / snow | 浅蓝渐变 + 雪花图标 |
| 雾 / fog / mist | 灰白渐变 + 雾条图标 |
| 风 / wind | 蓝灰渐变 + 风纹图标 |
| 霾 / haze | 土黄渐变 + 霾层图标 |

## 尺寸

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Weather city="北京" temperature="26" weather="晴" size="sm" />
    <Weather city="北京" temperature="26" weather="晴" size="md" />
    <Weather city="北京" temperature="26" weather="晴" size="lg" />
  </div>
</Demo>
</ClientOnly>

## 没有 icon 属性时使用内置图标

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;max-width:600px">
    <Weather city="北京" temperature="26" weather="晴" />
    <Weather city="上海" temperature="22" weather="多云" />
    <Weather city="深圳" temperature="30" weather="雷雨" />
  </div>
</Demo>
</ClientOnly>

## 加载中

<ClientOnly>
<Demo>
  <div style="max-width: 320px">
    <Weather loading />
  </div>
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| city | `string` | `''` | 城市名称 |
| temperature | `string \| number` | `''` | 温度值 |
| weather | `string` | `''` | 天气描述（自动匹配图标和背景） |
| icon | `string` | `''` | 天气图标 URL（为空则使用内置 SVG） |
| humidity | `number` | — | 湿度百分比 |
| wind | `string` | `''` | 风力描述 |
| pressure | `number` | — | 气压 hPa |
| tempHigh | `string \| number` | — | 最高温度 |
| tempLow | `string \| number` | — | 最低温度 |
| unit | `string` | `'C'` | 温度单位 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 卡片尺寸 |
| loading | `boolean` | `false` | 加载中状态 |
