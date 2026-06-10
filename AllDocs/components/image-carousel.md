# ImageCarousel 图片轮播

单图片横向滑动展示组件，支持自动播放、导航按钮、指示器圆点、点击预览放大。

## 基础用法

<ClientOnly>
<Demo>
  <ImageCarousel
    :images="[
      'https://picsum.photos/id/1/800/500',
      'https://picsum.photos/id/10/800/500',
      'https://picsum.photos/id/20/800/500',
      'https://picsum.photos/id/30/800/500',
    ]"
    height="300px"
  />
</Demo>
</ClientOnly>

## 启用预览

设置 `preview` 为 `true`，点击图片即可放大查看，支持左右切换。

<ClientOnly>
<Demo>
  <ImageCarousel
    :images="[
      'https://picsum.photos/id/1/800/500',
      'https://picsum.photos/id/10/800/500',
      'https://picsum.photos/id/20/800/500',
    ]"
    :preview="true"
    height="300px"
  />
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| images | `(string \| { url, alt? })[]` | `[]` | 图片列表 |
| width | `string` | `'100%'` | 容器宽度 |
| height | `string` | `'300px'` | 容器高度 |
| autoPlay | `boolean` | `false` | 是否自动播放 |
| interval | `number` | `3000` | 自动播放间隔(ms) |
| showDots | `boolean` | `true` | 显示指示器圆点 |
| showNav | `boolean` | `true` | 显示导航按钮 |
| preview | `boolean` | `false` | 点击图片放大预览 |

## 事件

| Event | 说明 |
|-------|------|
| change | 切换时触发，参数 `(index: number)` |
