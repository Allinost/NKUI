<template>
  <span
    class="nk-avatar"
    :class="[`nk-avatar--${variant}`, `nk-avatar--${size}`]"
  >
    <img v-if="src && !imgError" class="nk-avatar__img" :src="src" :alt="alt" @error="onError" />
    <nk-icon v-else-if="icon" :name="icon" class="nk-avatar__icon" />
    <span v-else-if="text" class="nk-avatar__text">{{ text.charAt(0) }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkAvatar' })

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'circle' | 'square'
  icon?: string
  text?: string
}>(), {
  size: 'md',
  variant: 'circle',
})

const emit = defineEmits<{ error: [event: Event] }>()
const imgError = ref(false)

function onError(e: Event) {
  imgError.value = true
  emit('error', e)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'xs': 24px,
  'sm': 32px,
  'md': 40px,
  'lg': 56px,
  'xl': 80px,
);

$iconSizes: (
  'xs': 12px,
  'sm': 16px,
  'md': 20px,
  'lg': 24px,
  'xl': 32px,
);

.nk-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: $nk-color-primary-100;
  color: $nk-color-primary-600;
  flex-shrink: 0;
  vertical-align: middle;

  &--circle { border-radius: 50%; }
  &--square { border-radius: $nk-radius-md; }

  @each $size, $value in $sizes {
    &--#{$size} {
      width: $value;
      height: $value;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__icon {
    color: inherit;
  }

  @each $size, $value in $iconSizes {
    &--#{$size} &__icon {
      font-size: $value;
    }
  }

  &__text {
    font-weight: $nk-font-weight-bold;
    line-height: 1;
  }

  @each $size, $value in $sizes {
    &--#{$size} &__text {
      font-size: calc($value / 2.5);
    }
  }
}
</style>
