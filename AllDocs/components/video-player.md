# VideoPlayer 视频播放

基于 HTML5 video 的视频播放组件。

## 基础用法

<ClientOnly>
<Demo>
  <VideoPlayer
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    poster="https://www.w3schools.com/html/img_girl.jpg"
    width="400px"
  />
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | — | 视频地址（必填） |
| poster | `string` | `''` | 封面图地址 |
| controls | `boolean` | `true` | 显示播放控件 |
| autoplay | `boolean` | `false` | 自动播放 |
| loop | `boolean` | `false` | 循环播放 |
| muted | `boolean` | `false` | 静音 |
| width | `string` | `'100%'` | 容器宽度 |
| maxWidth | `string` | — | 最大宽度 |
| height | `string` | `'auto'` | 视频高度 |
| round | `boolean` | `false` | 圆角 |

## 事件

| Event | 说明 |
|-------|------|
| play | 开始播放 |
| pause | 暂停 |
| ended | 播放结束 |
| error | 播放出错 |

## 平台差异

| 平台 | 实现 |
|------|------|
| Vue3 | `<video>` 原生元素 |
| 小程序 | `<video>` 原生组件 |
