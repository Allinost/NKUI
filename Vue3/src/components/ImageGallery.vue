<template>
  <div class="nk-image-gallery" :style="gridStyle">
    <div
      v-for="(img, idx) in resolvedImages"
      :key="idx"
      class="nk-image-gallery__item"
      :class="{ 'nk-image-gallery__item--more': maxCount && idx >= maxCount }"
      @click="openPreview(idx)"
    >
      <img
        :src="getImageUrl(img)"
        :alt="getImageAlt(img)"
        class="nk-image-gallery__img"
        loading="lazy"
      />
      <div v-if="maxCount && idx === maxCount - 1 && resolvedImages.length > maxCount" class="nk-image-gallery__more">
        +{{ resolvedImages.length - maxCount }}
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="previewVisible" class="nk-image-gallery__preview-mask" @click.self="closePreview">
      <button class="nk-image-gallery__preview-close" @click="closePreview">
        <svg viewBox="0 0 16 16" width="20" height="20"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
      </button>
      <button
        v-if="resolvedImages.length > 1"
        class="nk-image-gallery__preview-nav nk-image-gallery__preview-nav--prev"
        @click="previewIndex = (previewIndex - 1 + resolvedImages.length) % resolvedImages.length"
      >
        <svg viewBox="0 0 16 16" width="24" height="24"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
      </button>
      <button
        v-if="resolvedImages.length > 1"
        class="nk-image-gallery__preview-nav nk-image-gallery__preview-nav--next"
        @click="previewIndex = (previewIndex + 1) % resolvedImages.length"
      >
        <svg viewBox="0 0 16 16" width="24" height="24"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
      </button>
      <img
        :src="getImageUrl(resolvedImages[previewIndex])"
        class="nk-image-gallery__preview-img"
        @click="resolvedImages.length > 1 && (previewIndex = (previewIndex + 1) % resolvedImages.length)"
      />
      <div class="nk-image-gallery__preview-counter">
        {{ previewIndex + 1 }} / {{ resolvedImages.length }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'NkImageGallery' })

export interface GalleryImage {
  url: string
  alt?: string
}

const props = withDefaults(defineProps<{
  images: (string | GalleryImage)[]
  columns?: number
  gap?: string
  maxCount?: number
  preview?: boolean
}>(), {
  columns: 4,
  gap: '8px',
  preview: true,
})

const resolvedImages = computed(() =>
  props.images.map(img => typeof img === 'string' ? { url: img, alt: '' } : img)
)

function getImageUrl(img: GalleryImage) { return img.url }
function getImageAlt(img: GalleryImage) { return img.alt ?? '' }

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.min(props.columns, props.images.length)}, 1fr)`,
  gap: props.gap,
}))

const previewVisible = ref(false)
const previewIndex = ref(0)

function openPreview(idx: number) {
  if (!props.preview) return
  if (props.maxCount && idx >= props.maxCount) return
  previewIndex.value = idx
  previewVisible.value = true
}

function closePreview() {
  previewVisible.value = false
}
</script>

<style lang="scss" scoped>
.nk-image-gallery {
  display: grid;
  overflow: hidden;
  border-radius: $nk-radius-md;

  &__item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: $nk-radius-sm;
    cursor: pointer;
    transition: opacity $nk-duration-fast $nk-easing-ease;

    &:hover {
      opacity: 0.85;
    }

    &--more {
      pointer-events: none;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__more {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: $nk-font-size-xl;
    font-weight: $nk-font-weight-bold;
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

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
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

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

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
  }
}
</style>
