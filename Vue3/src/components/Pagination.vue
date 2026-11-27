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
        @click="go(Number(page))"
      >{{ page }}</button>
    </template>

    <button
      class="nk-pagination__btn"
      :disabled="modelValue >= totalPages"
      @click="go(modelValue + 1)"
    >
      <nk-icon name="arrow-right" size="xs" />
    </button>

    <select v-if="pageSizeOptions.length" class="nk-pagination__size" :value="pageSize" :disabled="disabled" aria-label="每页条数" @change="onPageSizeChange">
      <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">{{ opt }} 条/页</option>
    </select>
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
  pageSizeOptions?: number[]
}>(), {
  modelValue: 1,
  total: 0,
  pageSize: 20,
  size: 'md',
  disabled: false,
  showTotal: true,
  maxPageButtons: 7,
  pageSizeOptions: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: { page: number; pageSize: number }]
  'update:pageSize': [value: number]
}>()

function onPageSizeChange(event: Event) {
  const next = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', next)
  emit('update:modelValue', 1)
  emit('change', { page: 1, pageSize: next })
}

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
    border: 1px solid color-mix(in srgb, $nk-color-neutral-300 55%, transparent);
    background: $nk-color-neutral-0;
    color: $nk-color-neutral-800;
    cursor: pointer;
    border-radius: $nk-radius-md;
    transition: all $nk-duration-fast;
    font-family: inherit;

    &:hover:not(:disabled):not(&--active) {
      color: $nk-color-primary-600;
      border-color: color-mix(in srgb, $nk-color-primary-500 55%, transparent);
      background: color-mix(in srgb, $nk-color-primary-500 8%, transparent);
    }

    &--active {
      background: linear-gradient(180deg, $nk-color-primary-500, $nk-color-primary-600);
      color: $nk-color-on-primary;
      border-color: $nk-color-primary-600;
      box-shadow: 0 2px 8px color-mix(in srgb, $nk-color-primary-500 25%, transparent);
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

  .nk-pagination__size {
    height: 30px;
    padding: 0 8px;
    border: 1px solid $nk-color-neutral-300;
    border-radius: $nk-radius-md;
    background: $nk-color-neutral-0;
    color: $nk-color-neutral-700;
    font-size: $nk-font-size-sm;
    cursor: pointer;
  }
</style>
