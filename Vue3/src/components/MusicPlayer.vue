<template>
  <div
    class="nk-music-player"
    :class="[`nk-music-player--${size}`]"
  >
    <div class="nk-music-player__body" @click="togglePlay">
      <div class="nk-music-player__cover" v-if="cover || size !== 'sm'">
        <img v-if="cover" :src="cover" :alt="title" class="nk-music-player__cover-img" />
        <div v-else class="nk-music-player__cover-placeholder">
          <svg viewBox="0 0 16 16" width="24" height="24"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-10v7c0 1.105-1.12 2-2.5 2S10 11.105 10 10c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2V5.372L6 6.8v5.028C6 12.933 4.88 14 3.5 14S1 12.933 1 11.5C1 10.067 2.12 9 3.5 9s2.5 1.067 2.5 2.5V3.799a.5.5 0 0 1 .425-.492l8-1.466A.5.5 0 0 1 15 2.33z" fill="currentColor"/></svg>
        </div>
      </div>
      <div class="nk-music-player__info">
        <div class="nk-music-player__title" v-if="title">{{ title }}</div>
        <div class="nk-music-player__artist" v-if="artist">{{ artist }}</div>
        <div class="nk-music-player__time" v-if="duration">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>
      <div class="nk-music-player__controls">
        <button class="nk-music-player__btn" @click.stop="prevTrack" :disabled="!prevEnabled">
          <svg viewBox="0 0 16 16" width="16" height="16"><path d="M3.5 1a.5.5 0 0 1 .5.5V7l6-5.5v11L4 9v5.5a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 3.5 1zm8 0a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z" fill="currentColor"/></svg>
        </button>
        <button class="nk-music-player__btn nk-music-player__btn--play" @click.stop="togglePlay">
          <svg v-if="playing" viewBox="0 0 16 16" width="20" height="20"><path d="M5 3a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
          <svg v-else viewBox="0 0 16 16" width="20" height="20"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" fill="currentColor"/></svg>
        </button>
        <button class="nk-music-player__btn" @click.stop="nextTrack" :disabled="!nextEnabled">
          <svg viewBox="0 0 16 16" width="16" height="16"><path d="M12.5 1a.5.5 0 0 0-.5.5V7l-6-5.5v11l6-5.5v5.5a.5.5 0 0 0 1 0v-13A.5.5 0 0 0 12.5 1zM3.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13A.5.5 0 0 0 3.5 1z" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
    <div class="nk-music-player__progress" v-if="duration">
      <input
        v-if="size !== 'sm'"
        type="range"
        class="nk-music-player__slider"
        :min="0"
        :max="duration"
        :value="currentTime"
        @input="seek"
        step="0.1"
      />
      <div class="nk-music-player__bar">
        <div class="nk-music-player__bar-fill" :style="{ width: progressPercent + '%' }" />
      </div>
    </div>
    <audio
      ref="audioRef"
      :src="src"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoaded"
      @ended="onEnded"
      @play="onPlay"
      @pause="onPause"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

defineOptions({ name: 'NkMusicPlayer' })

const props = withDefaults(defineProps<{
  src?: string
  title?: string
  artist?: string
  cover?: string
  size?: 'sm' | 'md' | 'lg'
  autoplay?: boolean
  loop?: boolean
  duration?: number
  prevEnabled?: boolean
  nextEnabled?: boolean
}>(), {
  size: 'md',
  autoplay: false,
  loop: false,
  prevEnabled: true,
  nextEnabled: true,
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  timeupdate: [time: number]
  prev: []
  next: []
  seek: [time: number]
}>()

const audioRef = ref<HTMLAudioElement>()
const playing = ref(false)
const currentTime = ref(0)

function formatTime(t: number): string {
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const progressPercent = computed(() => {
  if (!props.duration) return 0
  return (currentTime.value / props.duration) * 100
})

function togglePlay() {
  if (!audioRef.value || !props.src) return
  if (playing.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

function seek(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (audioRef.value) {
    audioRef.value.currentTime = val
    currentTime.value = val
  }
  emit('seek', val)
}

function prevTrack() { emit('prev') }
function nextTrack() { emit('next') }

function onTimeUpdate() {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    emit('timeupdate', currentTime.value)
  }
}

function onLoaded() {
  if (audioRef.value && props.duration) {
    audioRef.value.volume = 0.7
  }
}

function onEnded() {
  playing.value = false
  emit('ended')
}

function onPlay() {
  playing.value = true
  emit('play')
}

function onPause() {
  playing.value = false
  emit('pause')
}

watch(() => props.src, () => {
  playing.value = false
  currentTime.value = 0
})
</script>

<style lang="scss" scoped>
.nk-music-player {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  border: 1px solid $nk-color-neutral-200;
  border-radius: $nk-radius-lg;
  overflow: hidden;
  transition: box-shadow $nk-duration-fast $nk-easing-ease;

  &:hover {
    box-shadow: $nk-shadow-sm;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: $nk-spacing-md;
    padding: $nk-spacing-md;
    cursor: pointer;
  }

  &__cover {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: $nk-radius-sm;
    overflow: hidden;
  }

  &__cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $nk-color-primary-100;
    color: $nk-color-primary-500;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: $nk-font-size-base;
    font-weight: $nk-font-weight-medium;
    color: $nk-color-neutral-900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__artist {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__time {
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-400;
    margin-top: 2px;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: $nk-radius-full;
    background: transparent;
    color: $nk-color-neutral-700;
    cursor: pointer;
    transition: background $nk-duration-fast $nk-easing-ease, color $nk-duration-fast $nk-easing-ease;

    &:hover:not(:disabled) {
      background: $nk-color-neutral-100;
      color: $nk-color-primary-500;
    }

    &:disabled {
      opacity: $nk-opacity-disabled;
      cursor: not-allowed;
    }

    &--play {
      width: 36px;
      height: 36px;
      background: $nk-color-primary-500;
      color: #fff;

      &:hover:not(:disabled) {
        background: $nk-color-primary-600;
        color: #fff;
      }
    }
  }

  &__progress {
    padding: 0 $nk-spacing-md $nk-spacing-sm;
  }

  &__slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: $nk-color-neutral-200;
    border-radius: 2px;
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: $nk-radius-full;
      background: $nk-color-primary-500;
      border: 2px solid #fff;
      box-shadow: $nk-shadow-sm;
    }
  }

  &__bar {
    display: none;
  }

  &--sm &__body {
    padding: $nk-spacing-sm;
    gap: $nk-spacing-sm;
  }

  &--sm &__cover {
    width: 36px;
    height: 36px;
  }

  &--sm &__title {
    font-size: $nk-font-size-sm;
  }

  &--sm &__artist {
    display: none;
  }

  &--sm &__time {
    display: none;
  }

  &--sm &__btn {
    width: 28px;
    height: 28px;

    &--play {
      width: 32px;
      height: 32px;
    }
  }

  &--sm &__progress {
    display: none;
  }

  &--lg &__body {
    padding: $nk-spacing-lg;
    gap: $nk-spacing-lg;
  }

  &--lg &__cover {
    width: 64px;
    height: 64px;
    border-radius: $nk-radius-md;
  }

  &--lg &__title {
    font-size: $nk-font-size-lg;
  }

  &--lg &__artist {
    font-size: $nk-font-size-base;
  }

  &--lg &__controls {
    gap: $nk-spacing-sm;
  }

  &--lg &__btn {
    width: 40px;
    height: 40px;

    &--play {
      width: 48px;
      height: 48px;
    }
  }

  &--lg &__progress {
    padding: 0 $nk-spacing-lg $nk-spacing-md;
  }
}
</style>
