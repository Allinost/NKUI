<template>
  <i
    class="nk-icon"
    :class="[`nk-icon--${size}`, { 'nk-icon--spin': spin }]"
    :style="{ color }"
    v-html="iconSvg"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '../utils/icon-registry'

defineOptions({ name: 'NkIcon' })

const props = withDefaults(defineProps<{
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  spin?: boolean
}>(), {
  size: 'md',
  color: 'currentColor',
  spin: false,
})

const iconSvg = computed(() => getIcon(props.name) || '')
</script>

<style lang="scss" scoped>
$sizes: (
  'xs': 12px,
  'sm': 16px,
  'md': 20px,
  'lg': 24px,
  'xl': 32px,
);

.nk-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  :deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  @each $size, $value in $sizes {
    &--#{$size} {
      width: $value;
      height: $value;
    }
  }

  &--spin {
    animation: nk-icon-spin 1.5s linear infinite;
  }
}

@keyframes nk-icon-spin {
  to { transform: rotate(360deg); }
}
</style>
