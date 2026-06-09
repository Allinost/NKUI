<template>
  <div class="nk-tabs" :class="[`nk-tabs--${variant}`, `nk-tabs--${size}`]">
    <div class="nk-tabs__header" :class="[`nk-tabs--${align}`]">
      <div
        v-for="item in items"
        :key="item.value"
        class="nk-tabs__tab"
        :class="{ 'nk-tabs__tab--active': item.value === activeValue, 'nk-tabs__tab--disabled': item.disabled }"
        @click="select(item)"
      >
        <nk-icon v-if="item.icon" :name="item.icon" size="sm" />
        <span>{{ item.label }}</span>
      </div>
      <span v-if="variant === 'line'" class="nk-tabs__ink" :style="inkStyle" />
    </div>
    <div class="nk-tabs__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import NkIcon from './Icon.vue'

export interface TabItem {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}

defineOptions({ name: 'NkTabs' })

const props = withDefaults(defineProps<{
  modelValue?: string | number
  items?: TabItem[]
  variant?: 'line' | 'card' | 'segment'
  size?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'full'
}>(), {
  modelValue: '',
  items: () => [],
  variant: 'line',
  size: 'md',
  align: 'start',
})

const emit = defineEmits<{ 'update:modelValue': [value: any]; change: [value: any] }>()

const activeValue = ref(props.modelValue || props.items[0]?.value)
const inkStyle = ref({})

watch(() => props.modelValue, (v) => { if (v !== undefined) activeValue.value = v })
watch(activeValue, (v) => { emit('update:modelValue', v); emit('change', v) })

function select(item: TabItem) {
  if (item.disabled) return
  activeValue.value = item.value
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (height: 32px, font: $nk-font-size-sm, padding: 0 12px, gap: 0),
  'md': (height: 40px, font: $nk-font-size-base, padding: 0 16px, gap: 0),
  'lg': (height: 48px, font: $nk-font-size-lg, padding: 0 20px, gap: 0),
);

.nk-tabs {
  &__header {
    display: flex;
    position: relative;
    border-bottom: 1px solid $nk-color-neutral-200;
    gap: 0;
  }

  &--center &__header { justify-content: center; }
  &--full &__header { justify-content: stretch; }
  &--full &__tab { flex: 1; text-align: center; justify-content: center; }

  @each $size, $map in $sizes {
    &--#{$size} &__tab {
      height: map.get($map, height);
      font-size: map.get($map, font);
      padding: map.get($map, padding);
    }
  }

  &__tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: $nk-color-neutral-600;
    white-space: nowrap;
    transition: color $nk-duration-fast;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;

    &:hover { color: $nk-color-neutral-900; }
    &--active { color: $nk-color-primary-500; font-weight: $nk-font-weight-medium; }
    &--disabled { opacity: $nk-opacity-disabled; cursor: not-allowed; }
  }

  &--card &__tab {
    border: 1px solid $nk-color-neutral-200;
    border-bottom: none;
    border-radius: $nk-radius-sm $nk-radius-sm 0 0;
    margin-bottom: -1px;
    background: $nk-color-neutral-50;

    &--active {
      background: #fff;
      color: $nk-color-primary-500;
    }
  }

  &--segment {
    .nk-tabs__header {
      border: 1px solid $nk-color-neutral-200;
      border-radius: $nk-radius-md;
      overflow: hidden;
      border-bottom: 1px solid $nk-color-neutral-200;
    }

    .nk-tabs__tab {
      border-bottom: none;
      margin-bottom: 0;
      background: $nk-color-neutral-50;

      &--active {
        background: $nk-color-primary-500;
        color: #fff;
      }
    }
  }

  &__body { padding-top: $nk-spacing-lg; }
}
</style>
