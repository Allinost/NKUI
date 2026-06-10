Component({
  properties: {
    src: { type: String, value: '' },
    poster: { type: String, value: '' },
    controls: { type: Boolean, value: true },
    autoplay: { type: Boolean, value: false },
    loop: { type: Boolean, value: false },
    muted: { type: Boolean, value: false },
    width: { type: String, value: '100%' },
    height: { type: String, value: 'auto' },
    round: { type: Boolean, value: false },
  },
  methods: {
    onPlay(e) { this.triggerEvent('play', e) },
    onPause(e) { this.triggerEvent('pause', e) },
    onEnded(e) { this.triggerEvent('ended', e) },
    onError(e) { this.triggerEvent('error', e) },
  },
})
