# Weather 天气

天气信息展示卡片，包含温度、天气描述、湿度、风速等信息。

## 基础用法

<ClientOnly>
<Demo>
  <div style="max-width: 320px">
    <Weather
      city="北京"
      temperature="26"
      weather="晴"
      icon="https://openweathermap.org/img/wn/01d@2x.png"
      :humidity="60"
      wind="3级 东南风"
    />
  </div>
</Demo>
</ClientOnly>

## 尺寸

<ClientOnly>
<Demo>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
    <Weather
      city="北京"
      temperature="26"
      weather="晴"
      icon="https://openweathermap.org/img/wn/01d@2x.png"
      size="sm"
    />
    <Weather
      city="北京"
      temperature="26"
      weather="晴"
      icon="https://openweathermap.org/img/wn/01d@2x.png"
      size="md"
    />
    <Weather
      city="北京"
      temperature="26"
      weather="晴"
      icon="https://openweathermap.org/img/wn/01d@2x.png"
      size="lg"
    />
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
| weather | `string` | `''` | 天气描述 |
| icon | `string` | `''` | 天气图标 URL |
| humidity | `number` | — | 湿度百分比 |
| wind | `string` | `''` | 风力描述 |
| unit | `string` | `'C'` | 温度单位 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 卡片尺寸 |
| loading | `boolean` | `false` | 加载中状态 |
