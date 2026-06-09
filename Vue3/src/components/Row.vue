<template>
  <component :is="tag" class="nk-row" :class="[`nk-row--${justify}`, `nk-row--${align}`]" :style="rowStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkRow' })

const props = withDefaults(defineProps<{
  gutter?: number | [number, number]
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'top' | 'center' | 'bottom' | 'stretch'
  tag?: string
}>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  tag: 'div',
})

const margin = computed(() => {
  const g = Array.isArray(props.gutter) ? props.gutter : [props.gutter, 0]
  return {
    marginLeft: `${-g[0] / 2}px`,
    marginRight: `${-g[0] / 2}px`,
    rowGap: `${g[1]}px`,
  }
})

const rowStyle = computed(() => ({
  ...margin.value,
}))
</script>

<style lang="scss" scoped>
.nk-row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  &--start { justify-content: flex-start; }
  &--center { justify-content: center; }
  &--end { justify-content: flex-end; }
  &--space-between { justify-content: space-between; }
  &--space-around { justify-content: space-around; }
  &--space-evenly { justify-content: space-evenly; }

  &--top { align-items: flex-start; }
  &--center { align-items: center; }
  &--bottom { align-items: flex-end; }
  &--stretch { align-items: stretch; }
}
</style>
