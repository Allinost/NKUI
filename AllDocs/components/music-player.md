# MusicPlayer 音乐控制

音乐播放控制组件，支持多种尺寸规格。

## 基础用法

<ClientOnly>
<Demo>
  <MusicPlayer
    title="晴天"
    artist="周杰伦"
    :duration="120"
  />
</Demo>
</ClientOnly>

## 尺寸规格

<ClientOnly>
<Demo>
  <div style="display:grid;gap:12px">
    <MusicPlayer
      title="简单爱"
      artist="周杰伦"
      size="sm"
      :duration="90"
    />
    <MusicPlayer
      title="七里香"
      artist="周杰伦"
      size="md"
      :duration="180"
    />
    <MusicPlayer
      title="夜曲"
      artist="周杰伦"
      size="lg"
      :duration="240"
    />
  </div>
</Demo>
</ClientOnly>

## 属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | `''` | 音频文件地址 |
| title | `string` | `''` | 歌曲名称 |
| artist | `string` | `''` | 歌手名称 |
| cover | `string` | `''` | 封面图片 URL |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 组件尺寸 |
| autoplay | `boolean` | `false` | 自动播放 |
| loop | `boolean` | `false` | 循环播放 |
| duration | `number` | `0` | 总时长（秒） |
| prevEnabled | `boolean` | `true` | 上一首可用 |
| nextEnabled | `boolean` | `true` | 下一首可用 |

## 事件

| Event | 说明 |
|-------|------|
| play | 开始播放 |
| pause | 暂停 |
| ended | 播放结束 |
| prev | 点击上一首 |
| next | 点击下一首 |
| seek | 拖动进度条，参数 `(time: number)` |
| timeupdate | 播放进度更新，参数 `(time: number)` |
