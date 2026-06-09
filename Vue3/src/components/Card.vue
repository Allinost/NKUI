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
  background: #fff;
  border-radius: $nk-radius-md;
  overflow: hidden;
  transition: box-shadow $nk-duration-fast $nk-easing-ease;

  &--outlined {
    border: 1px solid $nk-color-neutral-200;
  }

  &--elevated {
    box-shadow: $nk-shadow-sm;
  }

  &--flat {
    border: none;
    box-shadow: none;
  }

  &--hoverable:hover {
    box-shadow: $nk-shadow-md;
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
