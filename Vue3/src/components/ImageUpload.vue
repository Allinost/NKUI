<template>
  <div class="nk-image-upload" :class="[`nk-image-upload--${size}`, { 'nk-image-upload--disabled': disabled }]">
    <div class="nk-image-upload__list" :class="`nk-image-upload__list--${listType}`">
      <div
        v-for="(url, idx) in modelValue"
        :key="idx"
        class="nk-image-upload__item"
        @click="$emit('preview', { url, index: idx })"
      >
        <img class="nk-image-upload__img" :src="url" alt="" />
        <div class="nk-image-upload__item-mask">
          <button class="nk-image-upload__item-remove" @click.stop="remove(idx)">✕</button>
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

const emit = defineEmits<{ 'update:modelValue': [value: string[]]; change: [value: string[]]; remove: [value: { index: number; url: string }]; preview: [value: { url: string; index: number }] }>()

const inputRef = ref<HTMLInputElement>()

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
    align-items: flex-start;
    justify-content: flex-end;
    padding: 4px;
    background: rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity $nk-duration-fast;
  }

  &__item-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 12px;
    cursor: pointer;

    &:hover { background: rgba(0,0,0,0.7); }
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
}
</style>
