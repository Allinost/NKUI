<template>
  <div class="nk-tabs" :class="[`nk-tabs--${variant}`, `nk-tabs--${size}`]">
    <div ref="headerRef" class="nk-tabs__header" :class="[`nk-tabs--${align}`]" role="tablist">
      <div
        v-for="(item, index) in items"
        :key="item.value"
        ref="tabRefs"
        class="nk-tabs__tab"
        :class="{ 'nk-tabs__tab--active': item.value === activeValue, 'nk-tabs__tab--disabled': item.disabled }"
        role="tab"
        :aria-selected="item.value === activeValue"
        :aria-disabled="item.disabled || undefined"
        :tabindex="item.value === activeValue ? 0 : -1"
        @click="select(item)"
        @keydown="onKeydown($event, index)"
      >
        <nk-icon v-if="item.icon" :name="item.icon" size="sm" />
        <span>{{ item.label }}</span>
      </div>
      <span v-if="variant === 'line'" class="nk-tabs__ink" :style="inkStyle" aria-hidden="true" />
    </div>
    <div class="nk-tabs__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
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
const headerRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])
const inkStyle = ref<Record<string, string>>({})

watch(() => props.modelValue, (v) => { if (v !== undefined) activeValue.value = v })
watch(activeValue, (v) => { emit('update:modelValue', v); emit('change', v) })

watch(
  [activeValue, () => props.items.length, () => props.variant],
  () => {
    if (props.variant === 'line') nextTick(updateInk)
    else inkStyle.value = {}
  },
)

onMounted(() => {
  nextTick(updateInk)
  window.addEventListener('resize', updateInk)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateInk)
})

function tabElement(value: string | number): HTMLElement | undefined {
  const index = props.items.findIndex((item) => item.value === value)
  return index >= 0 ? tabRefs.value[index] : undefined
}

function updateInk() {
  if (props.variant !== 'line') return
  const header = headerRef.value
  const tab = tabElement(activeValue.value)
  if (!header || !tab) {
    inkStyle.value = {}
    return
  }
  const headerRect = header.getBoundingClientRect()
  const rect = tab.getBoundingClientRect()
  inkStyle.value = {
    left: `${Math.round(rect.left - headerRect.left)}px`,
    width: `${Math.round(rect.width)}px`,
  }
}

function select(item: TabItem) {
  if (item.disabled) return
  activeValue.value = item.value
}

function onKeydown(event: KeyboardEvent, index: number) {
  const current = props.items[index]
  if (!current) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    select(current)
    return
  }
  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()
  const enabled = props.items
    .map((item, i) => ({ item, i }))
    .filter((entry) => !entry.item.disabled)
  if (!enabled.length) return
  let pos = enabled.findIndex((entry) => entry.i === index)
  if (pos < 0) pos = 0
  let next = pos
  if (event.key === 'ArrowLeft') next = (pos - 1 + enabled.length) % enabled.length
  if (event.key === 'ArrowRight') next = (pos + 1) % enabled.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = enabled.length - 1
  const target = enabled[next]
  select(target.item)
  nextTick(() => tabRefs.value[target.i]?.focus())
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

    &:focus-visible {
      outline: 2px solid $nk-color-primary-400;
      outline-offset: -2px;
      border-radius: $nk-radius-sm $nk-radius-sm 0 0;
    }
  }

  &__ink {
    position: absolute;
    bottom: -1px;
    height: 2px;
    border-radius: 1px;
    background: $nk-color-primary-500;
    pointer-events: none;
    transition: left $nk-duration-normal ease, width $nk-duration-normal ease;
  }

  &--card &__tab {
    border: 1px solid $nk-color-neutral-200;
    border-bottom: none;
    border-radius: $nk-radius-sm $nk-radius-sm 0 0;
    margin-bottom: -1px;
    background: $nk-color-neutral-50;

    &--active {
      background: $nk-color-neutral-0;
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
        color: $nk-color-on-primary;
      }
    }
  }

  &__body { padding-top: $nk-spacing-lg; }
}
</style>
