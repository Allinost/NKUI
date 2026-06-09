<template>
  <div
    v-if="fullscreen"
    class="nk-loading__mask"
    :class="{ 'nk-loading__mask--visible': visible }"
  >
    <div class="nk-loading" :class="[`nk-loading--${size}`, `nk-loading--${variant}`]">
      <span class="nk-loading__spinner" />
      <p v-if="text" class="nk-loading__text">{{ text }}</p>
    </div>
  </div>
  <div v-else class="nk-loading" :class="[`nk-loading--${size}`, `nk-loading--${variant}`]">
    <span class="nk-loading__spinner" />
    <p v-if="text" class="nk-loading__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkLoading' })

withDefaults(defineProps<{
  variant?: 'spinner' | 'dots' | 'bar'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullscreen?: boolean
  visible?: boolean
}>(), {
  variant: 'spinner',
  size: 'md',
  fullscreen: false,
  visible: true,
})
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': 16px,
  'md': 24px,
  'lg': 32px,
);

.nk-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $nk-spacing-sm;
  color: $nk-color-primary-500;

  &__spinner {
    display: block;
    border: 2.5px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: nk-loading-spin 0.7s linear infinite;
  }

  @each $size, $value in $sizes {
    &--#{$size} &__spinner {
      width: $value;
      height: $value;
    }
  }

  $text-sizes: ('sm': $nk-font-size-xs, 'md': $nk-font-size-sm, 'lg': $nk-font-size-base);
  @each $size, $fs in $text-sizes {
    &--#{$size} &__text { font-size: $fs; }
  }

  &--bar &__spinner {
    width: 100%;
    max-width: 200px;
    height: 4px;
    border-radius: 2px;
    border: none;
    background: linear-gradient(90deg, transparent 25%, currentColor 50%, transparent 75%);
    background-size: 200% 100%;
    animation: nk-loading-bar 1.2s ease infinite;
  }

  &__text {
    color: $nk-color-neutral-500;
    margin: 0;
  }

  &__mask {
    position: fixed;
    inset: 0;
    background: rgba(255,255,255,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $nk-z-toast;
    opacity: 0;
    transition: opacity $nk-duration-normal;

    &--visible { opacity: 1; }

    .nk-loading {
      background: $nk-color-neutral-0;
      padding: $nk-spacing-2xl;
      border-radius: $nk-radius-lg;
      box-shadow: $nk-shadow-lg;
    }
  }
}

@keyframes nk-loading-spin {
  to { transform: rotate(360deg); }
}

@keyframes nk-loading-bar {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
