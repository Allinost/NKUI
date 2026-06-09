<template>
  <div v-if="total > 0" class="nk-pagination" :class="`nk-pagination--${size}`">
    <button
      class="nk-pagination__btn"
      :disabled="modelValue <= 1"
      @click="go(modelValue - 1)"
    >
      <nk-icon name="arrow-left" size="xs" />
    </button>

    <template v-for="(page, idx) in pageButtons" :key="idx">
      <span v-if="page === '...'" class="nk-pagination__ellipsis">...</span>
      <button
        v-else
        class="nk-pagination__btn"
        :class="{ 'nk-pagination__btn--active': page === modelValue }"
        @click="go(page)"
      >{{ page }}</button>
    </template>

    <button
      class="nk-pagination__btn"
      :disabled="modelValue >= totalPages"
      @click="go(modelValue + 1)"
    >
      <nk-icon name="arrow-right" size="xs" />
    </button>

    <span v-if="showTotal" class="nk-pagination__total">共 {{ total }} 条</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkPagination' })

const props = withDefaults(defineProps<{
  modelValue?: number
  total?: number
  pageSize?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  showTotal?: boolean
  maxPageButtons?: number
}>(), {
  modelValue: 1,
  total: 0,
  pageSize: 20,
  size: 'md',
  disabled: false,
  showTotal: true,
  maxPageButtons: 7,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: { page: number; pageSize: number }]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const pageButtons = computed(() => {
  const total = totalPages.value
  const current = props.modelValue
  const max = props.maxPageButtons
  const half = Math.floor(max / 2)

  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  let start = Math.max(1, current - half)
  let end = Math.min(total, start + max - 1)

  if (end - start + 1 < max) {
    start = Math.max(1, end - max + 1)
  }

  const pages: (number | string)[] = []
  if (start > 1) { pages.push(1); if (start > 2) pages.push('...') }
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total) { if (end < total - 1) pages.push('...'); pages.push(total) }

  return pages
})

function go(page: number) {
  if (page < 1 || page > totalPages.value || page === props.modelValue || props.disabled) return
  emit('update:modelValue', page)
  emit('change', { page, pageSize: props.pageSize })
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (btn: 24px, font: $nk-font-size-xs, gap: 2px),
  'md': (btn: 32px, font: $nk-font-size-sm, gap: 4px),
  'lg': (btn: 40px, font: $nk-font-size-base, gap: 6px),
);

.nk-pagination {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $nk-color-neutral-200;
    background: #fff;
    cursor: pointer;
    border-radius: $nk-radius-sm;
    transition: all $nk-duration-fast;
    font-family: inherit;

    &:hover:not(:disabled):not(&--active) {
      color: $nk-color-primary-500;
      border-color: $nk-color-primary-500;
    }

    &--active {
      background: $nk-color-primary-500;
      color: #fff;
      border-color: $nk-color-primary-500;
    }

    &:disabled { opacity: $nk-opacity-disabled; cursor: not-allowed; }
  }

  @each $size, $map in $sizes {
    &--#{$size} {
      gap: map.get($map, gap);
    }
    &--#{$size} &__btn {
      min-width: map.get($map, btn);
      height: map.get($map, btn);
      font-size: map.get($map, font);
    }
  }

  &__ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    color: $nk-color-neutral-400;
    user-select: none;
  }

  &__total {
    margin-left: $nk-spacing-md;
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-sm;
    white-space: nowrap;
  }
}
</style>
