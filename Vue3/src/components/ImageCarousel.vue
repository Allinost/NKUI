<template>
  <div
    class="nk-image-carousel"
    :style="{ width, height: resolvedHeight }"
    @mouseenter="autoPlayStop"
    @mouseleave="autoPlayStart"
  >
    <div class="nk-image-carousel__track" :style="trackStyle">
      <img
        v-for="(img, idx) in resolvedImages"
        :key="idx"
        :src="getImageUrl(img)"
        :alt="getImageAlt(img)"
        class="nk-image-carousel__img"
        :class="{ 'nk-image-carousel__img--active': idx === current }"
        draggable="false"
        :style="{ cursor: preview ? 'pointer' : undefined }"
        @click="preview && openPreview(idx)"
      />
    </div>

    <button class="nk-image-carousel__nav nk-image-carousel__nav--prev" @click="prev">
      <svg viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="currentColor"/></svg>
    </button>
    <button class="nk-image-carousel__nav nk-image-carousel__nav--next" @click="next">
      <svg viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>
    </button>

    <div class="nk-image-carousel__dots">
      <span
        v-for="(_, idx) in resolvedImages"
        :key="idx"
        class="nk-image-carousel__dot"
        :class="{ 'nk-image-carousel__dot--active': idx === current }"
        @click="goTo(idx)"
      />
    </div>

    <div v-if="$slots.overlay" class="nk-image-carousel__overlay">
      <slot name="overlay" :current="current" :total="resolvedImages.length" />
    </div>

    <Teleport to="body">
      <div v-if="previewVisible" class="nk-image-carousel__preview-mask" @click.self="closePreview">
        <button class="nk-image-carousel__preview-close" @click="closePreview">
          <svg viewBox="0 0 16 16" width="20" height="20"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>
        </button>
        <button class="nk-image-carousel__preview-nav nk-image-carousel__preview-nav--prev" @click="prevPreview">
          <svg viewBox="0 0 16 16" width="24" height="24"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="currentColor"/></svg>
        </button>
        <button class="nk-image-carousel__preview-nav nk-image-carousel__preview-nav--next" @click="nextPreview">
          <svg viewBox="0 0 16 16" width="24" height="24"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>
        </button>
        <img :src="getImageUrl(resolvedImages[previewCurrent])" class="nk-image-carousel__preview-img" />
        <div class="nk-image-carousel__preview-counter">{{ previewCurrent + 1 }} / {{ resolvedImages.length }}</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'NkImageCarousel' })

export interface CarouselImage {
  url: string
  alt?: string
}

const props = withDefaults(defineProps<{
  images: (string | CarouselImage)[]
  width?: string
  height?: string
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showNav?: boolean
  preview?: boolean
}>(), {
  width: '100%',
  height: '300px',
  autoPlay: false,
  interval: 3000,
  showDots: true,
  showNav: true,
  preview: false,
})

const resolvedImages = computed(() =>
  props.images.map(img => typeof img === 'string' ? { url: img, alt: '' } : img)
)

const resolvedHeight = computed(() => {
  if (props.height === 'auto') return undefined
  return props.height
})

function getImageUrl(img: CarouselImage) { return img.url }
function getImageAlt(img: CarouselImage) { return img.alt ?? '' }

const current = ref(0)
const emit = defineEmits<{
  change: [index: number]
}>()

function goTo(idx: number) {
  current.value = idx
  emit('change', idx)
}

function next() {
  goTo((current.value + 1) % resolvedImages.value.length)
}

function prev() {
  goTo((current.value - 1 + resolvedImages.value.length) % resolvedImages.value.length)
}

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
}))

let timer: ReturnType<typeof setInterval> | null = null

function autoPlayStart() {
  if (!props.autoPlay || resolvedImages.value.length <= 1) return
  timer = setInterval(next, props.interval)
}

function autoPlayStop() {
  if (timer) { clearInterval(timer); timer = null }
}

watch(() => props.autoPlay, (val) => {
  if (val) autoPlayStart()
  else autoPlayStop()
})

onMounted(() => { autoPlayStart() })
onUnmounted(() => { autoPlayStop() })

const previewVisible = ref(false)
const previewCurrent = ref(0)

function openPreview(idx: number) {
  previewCurrent.value = idx
  previewVisible.value = true
  autoPlayStop()
}

function closePreview() {
  previewVisible.value = false
}

function nextPreview() {
  previewCurrent.value = (previewCurrent.value + 1) % resolvedImages.value.length
}

function prevPreview() {
  previewCurrent.value = (previewCurrent.value - 1 + resolvedImages.value.length) % resolvedImages.value.length
}

defineExpose({ goTo, next, prev, current })
</script>

<style lang="scss" scoped>
.nk-image-carousel {
  position: relative;
  overflow: hidden;
  border-radius: $nk-radius-md;
  background: $nk-color-neutral-100;
  user-select: none;

  &__track {
    display: flex;
    height: 100%;
    transition: transform $nk-duration-slow $nk-easing-ease;
  }

  &__img {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: $nk-radius-full;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    cursor: pointer;
    opacity: 0;
    transition: opacity $nk-duration-fast $nk-easing-ease, background $nk-duration-fast $nk-easing-ease;
    z-index: 2;

    &:hover { background: rgba(0, 0, 0, 0.55); }

    &--prev { left: $nk-spacing-md; }
    &--next { right: $nk-spacing-md; }
  }

  &:hover &__nav {
    opacity: 1;
  }

  &__dots {
    position: absolute;
    bottom: $nk-spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 2;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $nk-radius-full;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    transition: background $nk-duration-fast $nk-easing-ease, transform $nk-duration-fast $nk-easing-ease;

    &--active {
      background: #fff;
      transform: scale(1.3);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  &__preview-mask {
    position: fixed;
    inset: 0;
    z-index: $nk-z-modal;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    cursor: pointer;
  }

  &__preview-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    cursor: default;
    border-radius: $nk-radius-sm;
    user-select: none;
  }

  &__preview-close {
    position: absolute;
    top: $nk-spacing-lg;
    right: $nk-spacing-lg;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: $nk-radius-full;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    transition: background $nk-duration-fast $nk-easing-ease;
    z-index: 3;

    &:hover { background: rgba(255, 255, 255, 0.3); }
  }

  &__preview-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: $nk-radius-full;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    transition: background $nk-duration-fast $nk-easing-ease;
    z-index: 3;

    &:hover { background: rgba(255, 255, 255, 0.3); }

    &--prev { left: $nk-spacing-lg; }
    &--next { right: $nk-spacing-lg; }
  }

  &__preview-counter {
    position: absolute;
    bottom: $nk-spacing-lg;
    left: 50%;
    transform: translateX(-50%);
    padding: $nk-spacing-xs $nk-spacing-md;
    border-radius: $nk-radius-full;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: $nk-font-size-sm;
    z-index: 3;
  }
}
</style>
