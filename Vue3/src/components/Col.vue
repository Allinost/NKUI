<template>
  <div
    class="nk-col"
    :class="[`nk-col--${span}`, offsetClass, pushClass, pullClass, ...responsiveClasses]"
    :style="colStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkCol' })

interface ResponsiveValue {
  span?: number
  offset?: number
}

const props = withDefaults(defineProps<{
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | ResponsiveValue
  sm?: number | ResponsiveValue
  md?: number | ResponsiveValue
  lg?: number | ResponsiveValue
  xl?: number | ResponsiveValue
  xxl?: number | ResponsiveValue
  gutter?: number
}>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
  gutter: 0,
})

const offsetClass = computed(() => props.offset ? `nk-col--offset-${props.offset}` : '')
const pushClass = computed(() => props.push ? `nk-col--push-${props.push}` : '')
const pullClass = computed(() => props.pull ? `nk-col--pull-${props.pull}` : '')

const responsiveClasses = computed(() => {
  const keys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
  return keys.flatMap(k => {
    const val = (props as any)[k]
    if (!val) return []
    const span = typeof val === 'number' ? val : val.span
    const offset = typeof val === 'object' ? val.offset : undefined
    return [
      span ? `nk-col--${k}-${span}` : '',
      offset ? `nk-col--offset-${k}-${offset}` : '',
    ].filter(Boolean)
  })
})

const colStyle = computed(() => {
  const paddingVal = props.gutter > 0 ? `${props.gutter / 2}px` : undefined
  return paddingVal ? { paddingLeft: paddingVal, paddingRight: paddingVal } : {}
})
</script>

<style lang="scss" scoped>
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  'xxl': 1536px,
);

.nk-col {
  box-sizing: border-box;
  padding-left: calc(var(--nk-row-gutter, 0px) / 2);
  padding-right: calc(var(--nk-row-gutter, 0px) / 2);

  // Default (xs, <640px) row/col behavior
  @for $i from 0 through 24 {
    &--#{$i},
    &--xs-#{$i} {
      flex: 0 0 calc(100% / 24 * #{$i});
      max-width: calc(100% / 24 * #{$i});
    }

    &--offset-#{$i},
    &--offset-xs-#{$i} {
      margin-left: calc(100% / 24 * #{$i});
    }

    &--push-#{$i} {
      position: relative;
      left: calc(100% / 24 * #{$i});
    }

    &--pull-#{$i} {
      position: relative;
      right: calc(100% / 24 * #{$i});
    }
  }

  // Responsive breakpoints: sm ≥640px, md ≥768px, lg ≥1024px, xl ≥1280px, xxl ≥1536px
  @each $bp, $min-width in $breakpoints {
    @media (min-width: #{$min-width}) {
      @for $i from 0 through 24 {
        &--#{$bp}-#{$i} {
          flex: 0 0 calc(100% / 24 * #{$i});
          max-width: calc(100% / 24 * #{$i});
        }

        &--offset-#{$bp}-#{$i} {
          margin-left: calc(100% / 24 * #{$i});
        }
      }
    }
  }
}
</style>
