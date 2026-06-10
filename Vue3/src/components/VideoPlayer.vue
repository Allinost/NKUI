<template>
  <div class="nk-video-player" :style="{ width, maxWidth }">
    <video
      ref="videoRef"
      class="nk-video-player__video"
      :src="src"
      :poster="poster"
      :controls="controls"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :style="{ height, borderRadius: round ? 'inherit' : undefined }"
      @play="$emit('play', $event)"
      @pause="$emit('pause', $event)"
      @ended="$emit('ended', $event)"
      @error="$emit('error', $event)"
    />
    <div v-if="$slots.default" class="nk-video-player__overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'NkVideoPlayer' })

const props = withDefaults(defineProps<{
  src: string
  poster?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  width?: string
  maxWidth?: string
  height?: string
  round?: boolean
}>(), {
  controls: true,
  autoplay: false,
  loop: false,
  muted: false,
  width: '100%',
  height: 'auto',
  round: false,
})

defineEmits<{
  play: [event: Event]
  pause: [event: Event]
  ended: [event: Event]
  error: [event: Event]
}>()

const videoRef = ref<HTMLVideoElement>()

function play() { videoRef.value?.play() }
function pause() { videoRef.value?.pause() }
defineExpose({ play, pause, videoRef })
</script>

<style lang="scss" scoped>
.nk-video-player {
  position: relative;
  overflow: hidden;
  border-radius: $nk-radius-md;
  background: $nk-color-neutral-900;
  line-height: 0;

  &__video {
    width: 100%;
    display: block;
    outline: none;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
}
</style>
