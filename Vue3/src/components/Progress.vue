<template>
  <div
    v-if="variant === 'line'"
    class="nk-progress"
    :class="[`nk-progress--${size}`, { 'nk-progress--striped': striped }]"
  >
    <div class="nk-progress__track">
      <div
        class="nk-progress__bar"
        :class="`nk-progress__bar--${status}`"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span v-if="showText" class="nk-progress__text">{{ percent }}%</span>
  </div>
  <div v-else class="nk-progress-circle" :class="[`nk-progress-circle--${size}`, `nk-progress-circle--${status}`]">
    <svg :width="circleSize" :height="circleSize" viewBox="0 0 100 100">
      <circle cx="50" cy="50" :r="46" fill="none" stroke="#eee" :stroke-width="strokeW" />
      <circle
        cx="50" cy="50" :r="46" fill="none"
        stroke="currentColor" :stroke-width="strokeW"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90, 50, 50)"
        style="transition: stroke-dashoffset 0.4s ease"
      />
    </svg>
    <span v-if="showText" class="nk-progress-circle__text">
      <slot>{{ percent }}%</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkProgress' })

const props = withDefaults(defineProps<{
  variant?: 'line' | 'circle'
  percent?: number
  status?: 'active' | 'success' | 'exception' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  strokeWidth?: number
  striped?: boolean
  showText?: boolean
  color?: string
  trackColor?: string
}>(), {
  variant: 'line',
  percent: 0,
  status: 'active',
  size: 'md',
  showText: true,
})

const circleSize = computed(() => {
  const map: Record<string, number> = { sm: 60, md: 80, lg: 120 }
  return map[props.size] || 80
})

const strokeW = computed(() => props.strokeWidth || (props.size === 'sm' ? 4 : props.size === 'lg' ? 6 : 5))

const radius = 46
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => circumference * (1 - Math.max(0, Math.min(100, props.percent)) / 100))
</script>

<style lang="scss" scoped>
.nk-progress {
  display: flex;
  align-items: center;
  gap: $nk-spacing-sm;

  &__track {
    flex: 1;
    background: $nk-color-neutral-200;
    border-radius: 99px;
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    border-radius: 99px;
    transition: width 0.4s ease;
    background: $nk-color-primary-500;
  }

  &__bar--success { background: $nk-color-success; }
  &__bar--exception { background: $nk-color-error; }
  &__bar--warning { background: $nk-color-warning; }

  &__text {
    flex-shrink: 0;
    color: $nk-color-neutral-600;
  }

  &--sm &__track { height: 4px; }
  &--md &__track { height: 6px; }
  &--lg &__track { height: 8px; }

  &--sm &__text { font-size: $nk-font-size-xs; }
  &--md &__text { font-size: $nk-font-size-sm; }
  &--lg &__text { font-size: $nk-font-size-base; }

  &--striped &__bar {
    background-image: linear-gradient(
      45deg,
      rgba(255,255,255,0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255,255,255,0.15) 50%,
      rgba(255,255,255,0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    animation: nk-progress-stripe 1s linear infinite;
  }
}

.nk-progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg { display: block; }
  color: $nk-color-primary-500;

  &--success { color: $nk-color-success; }
  &--exception { color: $nk-color-error; }
  &--warning { color: $nk-color-warning; }

  &__text {
    position: absolute;
    font-weight: $nk-font-weight-bold;
    color: $nk-color-neutral-800;
  }

  &--sm &__text { font-size: $nk-font-size-sm; }
  &--md &__text { font-size: $nk-font-size-lg; }
  &--lg &__text { font-size: $nk-font-size-2xl; }
}

@keyframes nk-progress-stripe {
  to { background-position: 1rem 0; }
}
</style>
