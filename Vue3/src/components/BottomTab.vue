<template>
  <div class="nk-bottom-tab" :class="[`nk-bottom-tab--${size}`, `nk-bottom-tab--${variant}`, { 'nk-bottom-tab--fixed': fixed }]">
    <div
      v-for="item in items"
      :key="item.value"
      class="nk-bottom-tab__item"
      :class="{ 'nk-bottom-tab__item--active': item.value === modelValue }"
      @click="onSelect(item)"
    >
      <div class="nk-bottom-tab__icon-wrap">
        <Badge v-if="item.badge" :value="item.badge" variant="count" size="sm">
          <Icon v-if="item.icon" :name="item.icon" />
        </Badge>
        <Icon v-else-if="item.icon" :name="item.icon" />
      </div>
      <span v-if="variant !== 'icon'" class="nk-bottom-tab__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import Badge from './Badge.vue'

export interface BottomTabItem {
  label: string
  value: string | number
  icon?: string
  badge?: number | string
}

defineOptions({ name: 'NkBottomTab' })

const props = withDefaults(defineProps<{
  items?: BottomTabItem[]
  modelValue?: string | number
  variant?: 'icon-text' | 'icon' | 'text'
  size?: 'sm' | 'md' | 'lg'
  fixed?: boolean
}>(), {
  items: () => [],
  modelValue: '',
  variant: 'icon-text',
  size: 'md',
  fixed: true,
})

const emit = defineEmits<{ 'update:modelValue': [value: any]; change: [value: any] }>()

function onSelect(item: BottomTabItem) {
  if (item.value === props.modelValue) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (h: 44px, icon: 18px, fs: $nk-font-size-xs, gap: 2px),
  'md': (h: 52px, icon: 22px, fs: $nk-font-size-sm, gap: 4px),
  'lg': (h: 60px, icon: 26px, fs: $nk-font-size-base, gap: 6px),
);

.nk-bottom-tab {
  display: flex;
  align-items: stretch;
  background: $nk-color-neutral-0;
  border-top: 1px solid $nk-color-neutral-200;

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: $nk-z-fixed;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $nk-color-neutral-500;
    transition: color $nk-duration-fast;
    gap: 2px;

    &--active {
      color: $nk-color-primary-500;
    }
  }

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  &__label {
    white-space: nowrap;
    line-height: 1;
  }

  @each $size, $map in $sizes {
    &--#{$size} { height: map.get($map, h); }
    &--#{$size} &__item { gap: map.get($map, gap); }
    &--#{$size} &__label { font-size: map.get($map, fs); }
  }

  &--text &__label {
    font-size: $nk-font-size-base !important;
    font-weight: $nk-font-weight-medium;
  }
}
</style>
