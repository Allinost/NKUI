<template>
  <component
    :is="direction === 'vertical' ? 'span' : 'div'"
    class="nk-divider"
    :class="[`nk-divider--${direction}`, `nk-divider--${variant}`]"
  >
    <span v-if="direction === 'horizontal' && $slots.default" class="nk-divider__text">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkDivider' })

withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed'
}>(), {
  direction: 'horizontal',
  variant: 'solid',
})
</script>

<style lang="scss" scoped>
.nk-divider {
  border: none;
  margin: 0;

  &--horizontal {
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid $nk-color-neutral-200;
    margin: $nk-spacing-lg 0;
  }

  &--horizontal.nk-divider--dashed {
    border-top-style: dashed;
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    vertical-align: middle;
    border-left: 1px solid $nk-color-neutral-200;
    margin: 0 $nk-spacing-sm;
  }

  &--vertical.nk-divider--dashed {
    border-left-style: dashed;
  }

  &__text {
    padding: 0 $nk-spacing-md;
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
    white-space: nowrap;
  }
}
</style>
