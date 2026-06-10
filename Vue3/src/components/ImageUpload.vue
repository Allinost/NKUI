<template>
  <div class="nk-image-upload" :class="[`nk-image-upload--${size}`, { 'nk-image-upload--disabled': disabled }]">
    <div class="nk-image-upload__list" :class="`nk-image-upload__list--${listType}`">
      <div
        v-for="(url, idx) in modelValue"
        :key="idx"
        class="nk-image-upload__item"
        @click="openPreview(idx)"
      >
        <img class="nk-image-upload__img" :src="url" alt="" />
        <div class="nk-image-upload__item-mask">
          <button class="nk-image-upload__item-btn nk-image-upload__item-btn--preview" @click.stop="openPreview(idx)">预览</button>
          <button class="nk-image-upload__item-btn nk-image-upload__item-btn--remove" @click.stop="remove(idx)">删除</button>
        </div>
      </div>
      <div
        v-if="modelValue.length < maxCount"
        class="nk-image-upload__item nk-image-upload__item--add"
        @click="triggerInput"
      >
        <Icon name="plus" :size="iconSize" />
        <span class="nk-image-upload__add-text">上传</span>
      </div>
    </div>
    <input
      ref="inputRef"
      type="file"
      class="nk-image-upload__input"
      :accept="accept"
      multiple
      @change="onFileChange"
    />
    <Teleport to="body">
      <Transition name="nk-image-preview-fade">
        <div v-if="previewVisible" class="nk-image-upload__preview" @click.self="closePreview">
          <button class="nk-image-upload__preview-close" @click="closePreview">✕</button>
          <button v-if="previewIndex > 0" class="nk-image-upload__preview-nav nk-image-upload__preview-nav--prev" @click="previewPrev">
            <Icon name="arrow-left" size="lg" />
          </button>
          <img class="nk-image-upload__preview-img" :src="previewUrl" alt="" />
          <button v-if="previewIndex < modelValue.length - 1" class="nk-image-upload__preview-nav nk-image-upload__preview-nav--next" @click="previewNext">
            <Icon name="arrow-right" size="lg" />
          </button>
          <div class="nk-image-upload__preview-counter">{{ previewIndex + 1 }} / {{ modelValue.length }}</div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from './Icon.vue'

defineOptions({ name: 'NkImageUpload' })

const props = withDefaults(defineProps<{
  modelValue?: string[]
  maxCount?: number
  listType?: 'picture-card' | 'picture-list'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  accept?: string
}>(), {
  modelValue: () => [],
  maxCount: 9,
  listType: 'picture-card',
  disabled: false,
  size: 'md',
  accept: 'image/*',
})

const emit = defineEmits<{ 'update:modelValue': [value: string[]]; change: [value: string[]]; remove: [value: { index: number; url: string }] }>()

const inputRef = ref<HTMLInputElement>()
const previewVisible = ref(false)
const previewIndex = ref(0)
const previewUrl = computed(() => props.modelValue[previewIndex.value] || '')

const iconSize = computed(() => {
  const map = { sm: 'md' as const, md: 'lg' as const, lg: 'xl' as const }
  return map[props.size]
})

function triggerInput() {
  if (props.disabled) return
  inputRef.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const newUrls = Array.from(input.files).map(f => URL.createObjectURL(f))
  const updated = [...props.modelValue, ...newUrls].slice(0, props.maxCount)
  emit('update:modelValue', updated)
  emit('change', updated)
  input.value = ''
}

function remove(idx: number) {
  const url = props.modelValue[idx]
  const updated = props.modelValue.filter((_, i) => i !== idx)
  emit('remove', { index: idx, url })
  emit('update:modelValue', updated)
  emit('change', updated)
  if (previewVisible.value && previewIndex.value >= updated.length) {
    if (updated.length === 0) closePreview()
    else previewIndex.value = updated.length - 1
  }
}

function openPreview(idx: number) {
  if (!props.modelValue[idx]) return
  previewIndex.value = idx
  previewVisible.value = true
}

function closePreview() { previewVisible.value = false }

function previewPrev() {
  if (previewIndex.value > 0) previewIndex.value--
}

function previewNext() {
  if (previewIndex.value < props.modelValue.length - 1) previewIndex.value++
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (size: 64px, icon: 24px, fs: $nk-font-size-xs),
  'md': (size: 80px, icon: 28px, fs: $nk-font-size-sm),
  'lg': (size: 104px, icon: 32px, fs: $nk-font-size-base),
);

.nk-image-upload {
  &--disabled { opacity: $nk-opacity-disabled; pointer-events: none; }

  &__input { display: none; }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: $nk-spacing-sm;

    &--picture-list {
      flex-direction: column;
    }
  }

  &__item {
    position: relative;
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-sm;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:hover &-mask { opacity: 1; }

    &--add {
      border-style: dashed;
      color: $nk-color-neutral-400;
      background: $nk-color-neutral-50;

      &:hover {
        border-color: $nk-color-primary-500;
        color: $nk-color-primary-500;
      }
    }
  }

  @each $size, $map in $sizes {
    &--#{$size} &__item {
      width: map.get($map, size);
      height: map.get($map, size);
    }
    &--#{$size} &__add-text { font-size: map.get($map, fs); }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__item-mask {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(0,0,0,0.45);
    opacity: 0;
    transition: opacity $nk-duration-fast;
  }

  &__item-btn {
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 4px;
    background: transparent;
    color: #fff;
    font-size: 12px;
    padding: 2px 10px;
    cursor: pointer;
    transition: all $nk-duration-fast;

    &:hover { background: rgba(255,255,255,0.2); }
  }

  &--picture-list &__item {
    flex-direction: row;
    width: 100%;
    height: auto;
    padding: $nk-spacing-sm $nk-spacing-md;
    gap: $nk-spacing-sm;
  }

  &--picture-list &__img {
    width: 48px;
    height: 48px;
    border-radius: $nk-radius-sm;
    flex-shrink: 0;
  }

  &--picture-list &__item-mask {
    flex-direction: row;
    background: none;
    position: relative;
    opacity: 1;
    gap: 8px;
    margin-left: auto;
  }

  &--picture-list &__item-btn {
    border-color: $nk-color-neutral-300;
    color: $nk-color-neutral-600;
    &:hover { background: $nk-color-neutral-100; }
  }

  /* Preview overlay */
  &__preview {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $nk-z-modal + 10;
  }

  &__preview-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }

  &__preview-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    z-index: 1;

    &:hover { background: rgba(255,255,255,0.3); }
  }

  &__preview-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    color: #fff;
    cursor: pointer;
    z-index: 1;

    &:hover { background: rgba(255,255,255,0.3); }

    &--prev { left: 16px; }
    &--next { right: 16px; }
  }

  &__preview-counter {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: $nk-font-size-sm;
    background: rgba(0,0,0,0.5);
    padding: 4px 12px;
    border-radius: 12px;
  }
}

.nk-image-preview-fade-enter-active,
.nk-image-preview-fade-leave-active { transition: opacity 0.2s; }
.nk-image-preview-fade-enter-from,
.nk-image-preview-fade-leave-to { opacity: 0; }
</style>
