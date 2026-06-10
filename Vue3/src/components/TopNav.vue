<template>
  <div class="nk-top-nav" :class="[`nk-top-nav--${size}`, { 'nk-top-nav--fixed': fixed }]">
    <div class="nk-top-nav__logo">
      <slot name="logo">
        <span v-if="logo" class="nk-top-nav__logo-text">{{ logo }}</span>
      </slot>
    </div>
    <div class="nk-top-nav__menu">
      <div
        v-for="item in items"
        :key="item.value"
        class="nk-top-nav__item"
        :class="{ 'nk-top-nav__item--active': item.value === modelValue, 'nk-top-nav__item--disabled': item.disabled }"
        @click="onSelect(item)"
      >
        <Icon v-if="item.icon" :name="item.icon" size="sm" />
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="nk-top-nav__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

export interface TopNavItem {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}

defineOptions({ name: 'NkTopNav' })

const props = withDefaults(defineProps<{
  items?: TopNavItem[]
  modelValue?: string | number
  logo?: string
  size?: 'sm' | 'md' | 'lg'
  fixed?: boolean
}>(), {
  items: () => [],
  modelValue: '',
  logo: '',
  size: 'md',
  fixed: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: any]; change: [value: any] }>()

function onSelect(item: TopNavItem) {
  if (item.disabled || item.value === props.modelValue) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (h: 40px, pad: 0 12px, fs: $nk-font-size-sm, logo: $nk-font-size-base),
  'md': (h: 48px, pad: 0 16px, fs: $nk-font-size-base, logo: $nk-font-size-lg),
  'lg': (h: 56px, pad: 0 20px, fs: $nk-font-size-lg, logo: $nk-font-size-xl),
);

.nk-top-nav {
  display: flex;
  align-items: center;
  background: $nk-color-neutral-0;
  border-bottom: 1px solid $nk-color-neutral-200;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $nk-z-fixed;
  }

  &__logo {
    flex-shrink: 0;
    font-weight: $nk-font-weight-bold;
    color: $nk-color-neutral-900;
    padding: 0 $nk-spacing-lg;
  }

  &__menu {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: $nk-color-neutral-600;
    white-space: nowrap;
    transition: color $nk-duration-fast;
    border-bottom: 2px solid transparent;

    &:hover { color: $nk-color-neutral-900; }

    &--active {
      color: $nk-color-primary-500;
      font-weight: $nk-font-weight-medium;
      border-bottom-color: $nk-color-primary-500;
    }

    &--disabled {
      opacity: $nk-opacity-disabled;
      cursor: not-allowed;
    }
  }

  @each $size, $map in $sizes {
    &--#{$size} { height: map.get($map, h); }
    &--#{$size} &__item {
      height: map.get($map, h);
      padding: map.get($map, pad);
      font-size: map.get($map, fs);
    }
    &--#{$size} &__logo-text { font-size: map.get($map, logo); }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $nk-spacing-sm;
    padding-right: $nk-spacing-lg;
    margin-left: auto;
  }
}
</style>
