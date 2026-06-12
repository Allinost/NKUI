<template>
  <button
    class="nk-btn"
    :class="[
      `nk-btn--${type}`,
      `nk-btn--${variant}`,
      `nk-btn--${size}`,
      { 'nk-btn--block': block, 'nk-btn--round': round, 'nk-btn--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="nk-btn__spinner" />
    <nk-icon v-if="icon && !loading" :name="icon" size="sm" class="nk-btn__icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkButton' })

const props = withDefaults(defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent'
  variant?: 'solid' | 'outline' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  round?: boolean
  icon?: string
}>(), {
  type: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  round: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (height: 28px, padding: 0 12px, font: $nk-font-size-sm, radius: 6px, gap: 4px),
  'md': (height: 36px, padding: 0 16px, font: $nk-font-size-base, radius: $nk-radius-md, gap: 6px),
  'lg': (height: 44px, padding: 0 24px, font: $nk-font-size-lg, radius: 10px, gap: 8px),
);

$types: (
  'primary': $nk-color-primary-500,
  'success': $nk-color-success,
  'warning': $nk-color-warning,
  'danger': $nk-color-error,
  'neutral': $nk-color-neutral-800,
  'accent': $nk-color-accent,
);

.nk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: inherit;
  font-weight: $nk-font-weight-medium;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  transition: all $nk-duration-fast $nk-easing-ease;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(var(--nk-color-primary-500-rgb), 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  &--block {
    width: 100%;
  }

  &--round {
    border-radius: $nk-radius-full;
  }

  &--loading {
    pointer-events: none;
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    transform: none;
  }

  @each $size, $map in $sizes {
    &--#{$size} {
      height: map.get($map, height);
      padding: map.get($map, padding);
      font-size: map.get($map, font);
      border-radius: map.get($map, radius);
      gap: map.get($map, gap);
    }
  }

  @each $type, $color in $types {
    &--#{$type} {
      &.nk-btn--solid {
        background: $color;
        color: #fff;
        border-color: $color;

        &:hover:not(:disabled) {
          filter: brightness(0.9);
        }
        &:active:not(:disabled) {
          filter: brightness(0.8);
        }
      }

      &.nk-btn--outline {
        background: transparent;
        color: $color;
        border-color: $color;

        &:hover:not(:disabled) {
          background: color-mix(in srgb, $color 6%, transparent);
        }
        &:active:not(:disabled) {
          background: color-mix(in srgb, $color 12%, transparent);
        }
      }

      &.nk-btn--ghost {
        background: transparent;
        color: $color;
        border-color: transparent;

        &:hover:not(:disabled) {
          background: color-mix(in srgb, $color 6%, transparent);
        }
        &:active:not(:disabled) {
          background: color-mix(in srgb, $color 12%, transparent);
        }
      }

      &.nk-btn--text {
        background: transparent;
        color: $color;
        border-color: transparent;
        padding-inline: 4px;

        &:hover:not(:disabled) {
          color: color-mix(in srgb, $color 80%, black);
        }
      }
    }
  }

  &__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: nk-spin 0.6s linear infinite;
  }

  &__icon {
    flex-shrink: 0;
  }
}

@keyframes nk-spin {
  to { transform: rotate(360deg); }
}
</style>
