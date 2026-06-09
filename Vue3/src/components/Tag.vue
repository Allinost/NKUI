<template>
  <span
    class="nk-tag"
    :class="[`nk-tag--${type}`, `nk-tag--${variant}`, `nk-tag--${size}`, { 'nk-tag--round': round }]"
  >
    <slot />
    <button v-if="closable" class="nk-tag__close" @click="$emit('close')">
      <nk-icon name="close" size="xs" />
    </button>
  </span>
</template>

<script setup lang="ts">
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkTag' })

withDefaults(defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  variant?: 'solid' | 'outline' | 'light'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  round?: boolean
}>(), {
  type: 'primary',
  variant: 'light',
  size: 'md',
  closable: false,
  round: false,
})

defineEmits<{ close: [] }>()
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (height: 20px, font: $nk-font-size-xs, padding: 0 6px, gap: 2px, radius: 3px),
  'md': (height: 24px, font: $nk-font-size-sm, padding: 0 8px, gap: 4px, radius: 4px),
  'lg': (height: 32px, font: $nk-font-size-base, padding: 0 12px, gap: 4px, radius: 6px),
);

$types: (
  'primary': $nk-color-primary-500,
  'success': $nk-color-success,
  'warning': $nk-color-warning,
  'danger': $nk-color-error,
  'info': $nk-color-info,
  'neutral': $nk-color-neutral-600,
);

.nk-tag {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-weight: $nk-font-weight-medium;
  transition: all $nk-duration-fast;

  &--round { border-radius: $nk-radius-full; }

  @each $size, $map in $sizes {
    &--#{$size} {
      height: map.get($map, height);
      font-size: map.get($map, font);
      padding: map.get($map, padding);
      gap: map.get($map, gap);
      border-radius: map.get($map, radius);
    }
  }

  @each $type, $color in $types {
    &--#{$type} {
      &.nk-tag--solid {
        background: $color;
        color: #fff;
      }
      &.nk-tag--outline {
        background: transparent;
        color: $color;
        border: 1px solid $color;
      }
      &.nk-tag--light {
        background: color-mix(in srgb, $color 12%, white);
        color: $color;
      }
    }
  }

  &__close {
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
    opacity: 0.6;
    transition: opacity $nk-duration-fast;

    &:hover { opacity: 1; }
  }
}
</style>
