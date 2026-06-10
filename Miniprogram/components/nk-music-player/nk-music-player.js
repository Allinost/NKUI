Component({
  properties: {
    src: { type: String, value: '' },
    title: { type: String, value: '' },
    artist: { type: String, value: '' },
    cover: { type: String, value: '' },
    size: { type: String, value: 'md' },
    autoplay: { type: Boolean, value: false },
    loop: { type: Boolean, value: false },
    duration: { type: Number, value: 0 },
    prevEnabled: { type: Boolean, value: true },
    nextEnabled: { type: Boolean, value: true },
    playing: { type: Boolean, value: false },
    currentTime: { type: Number, value: 0 },
  },
  methods: {
    formatTime(t) {
      if (t == null || isNaN(t)) return '0:00'
      const m = Math.floor(t / 60)
      const s = Math.floor(t % 60)
      return m + ':' + (s < 10 ? '0' : '') + s
    },
    togglePlay() {
      if (!this.data.src) return
      const ctx = wx.createAudioContext('nkAudio', this)
      if (this.data.playing) {
        ctx.pause()
      } else {
        ctx.play()
      }
      this.setData({ playing: !this.data.playing })
    },
    prevTrack() {
      if (!this.data.prevEnabled) return
      this.triggerEvent('prev')
    },
    nextTrack() {
      if (!this.data.nextEnabled) return
      this.triggerEvent('next')
    },
    onSliderChange(e) {
      this.triggerEvent('seek', { time: e.detail.value })
    },
    onError() {
      this.setData({ playing: false })
    },
  },
})
