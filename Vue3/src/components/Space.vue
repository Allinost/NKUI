<template>
  <component
    :is="inline ? 'span' : 'div'"
    class="nk-space"
    :class="[`nk-space--${direction}`, `nk-space--${align}`, { 'nk-space--wrap': wrap }]"
    :style="spaceStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkSpace' })

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  wrap?: boolean
  inline?: boolean
}>(), {
  direction: 'horizontal',
  size: 'md',
  align: 'start',
  wrap: false,
  inline: false,
})

const sizeMap: Record<string, string> = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
}

const gap = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  return sizeMap[props.size] || '12px'
})

const spaceStyle = computed(() => ({
  gap: gap.value,
}))
</script>

<style lang="scss" scoped>
.nk-space {
  display: flex;
  box-sizing: border-box;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--wrap { flex-wrap: wrap; }
  &--start { align-items: flex-start; }
  &--center { align-items: center; }
  &--end { align-items: flex-end; }
  &--baseline { align-items: baseline; }
  &--stretch { align-items: stretch; }
}
</style>
