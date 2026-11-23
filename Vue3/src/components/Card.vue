<template>
  <div
    class="nk-card"
    :class="[`nk-card--${variant}`, { 'nk-card--hoverable': hoverable, 'nk-card--no-padding': !padding }]"
  >
    <div v-if="$slots.cover" class="nk-card__cover">
      <slot name="cover" />
    </div>
    <div v-if="$slots.header" class="nk-card__header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="nk-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="nk-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkCard' })

withDefaults(defineProps<{
  variant?: 'outlined' | 'elevated' | 'flat'
  padding?: boolean
  hoverable?: boolean
}>(), {
  variant: 'outlined',
  padding: true,
  hoverable: false,
})
</script>

<style lang="scss" scoped>
.nk-card {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-xl;
  overflow: hidden;
  transition: box-shadow $nk-duration-fast $nk-easing-ease, transform $nk-duration-fast $nk-easing-ease, border-color $nk-duration-fast;

  &--outlined {
    border: 1px solid color-mix(in srgb, $nk-color-neutral-300 55%, transparent);
  }

  &--elevated {
    box-shadow: $nk-shadow-sm;
  }

  &--flat {
    border: none;
    box-shadow: none;
  }

  &--hoverable:hover {
    box-shadow: 0 16px 40px color-mix(in srgb, #0f172a 10%, transparent);
    transform: translateY(-1px);
    border-color: color-mix(in srgb, $nk-color-primary-500 22%, transparent);
  }

  &__cover {
    overflow: hidden;
    line-height: 0;

    :deep(img) {
      width: 100%;
      object-fit: cover;
    }
  }

  &__header {
    padding: $nk-spacing-lg $nk-spacing-lg 0;
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-semibold;
  }

  &__body {
    padding: $nk-spacing-lg;
  }

  &__footer {
    padding: 0 $nk-spacing-lg $nk-spacing-lg;
  }

  &--no-padding &__header,
  &--no-padding &__body,
  &--no-padding &__footer {
    padding: 0;
  }
}
</style>
