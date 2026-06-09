<template>
  <span class="nk-badge" :class="`nk-badge--${position}`">
    <slot />
    <sup
      v-if="visible"
      class="nk-badge__content"
      :class="[`nk-badge--${variant}`, `nk-badge--${type}`, { 'nk-badge--dot': variant === 'dot' }]"
    >
      <template v-if="variant === 'count'">{{ displayValue }}</template>
      <template v-else-if="variant === 'text'">{{ value }}</template>
    </sup>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkBadge' })

const props = withDefaults(defineProps<{
  variant?: 'dot' | 'count' | 'text'
  value?: string | number
  max?: number
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  position?: 'top-right' | 'top-left'
}>(), {
  variant: 'dot',
  max: 99,
  type: 'danger',
  position: 'top-right',
})

const visible = computed(() => {
  if (props.variant === 'dot') return true
  return props.value !== undefined && props.value !== '' && props.value !== null
})

const displayValue = computed(() => {
  const num = Number(props.value)
  if (isNaN(num)) return props.value
  return num > props.max ? `${props.max}+` : String(num)
})
</script>

<style lang="scss" scoped>
.nk-badge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  &__content {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-size: $nk-font-size-xs;
    font-weight: $nk-font-weight-bold;
    line-height: 1;
    padding: 2px 5px;
    border-radius: 10px;
    min-width: 18px;
    height: 18px;
    transform: translate(50%, -50%);
    pointer-events: none;
    z-index: 1;

    &--dot {
      min-width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }
  }

  &--top-right &__content {
    top: 0;
    right: 0;
  }

  &--top-left &__content {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  $types: (
    'primary': $nk-color-primary-500,
    'success': $nk-color-success,
    'warning': $nk-color-warning,
    'danger': $nk-color-error,
    'info': $nk-color-info,
  );

  @each $type, $color in $types {
    &--#{$type} {
      background: $color;
      color: #fff;
    }
  }
}
</style>
