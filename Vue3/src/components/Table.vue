<template>
  <div
    class="nk-table"
    :class="[
      `nk-table--${size}`,
      {
        'nk-table--striped': striped,
        'nk-table--bordered': bordered,
        'nk-table--loading': loading,
        'nk-table--responsive': responsive,
      },
    ]"
  >
    <div class="nk-table__scroll">
      <table class="nk-table__inner">
        <thead>
          <tr>
            <th v-if="selectable" class="nk-table__cell nk-table__cell--select">
              <input
                type="checkbox"
                aria-label="全选"
                :checked="allSelected"
                :indeterminate.prop="partiallySelected"
                :disabled="!data.length"
                @change="toggleAll"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="nk-table__cell nk-table__cell--head"
              :class="{ 'nk-table__cell--sortable': col.sortable }"
              :style="{ width: toWidth(col.width), textAlign: col.align || 'left' }"
              :aria-sort="col.sortable ? ariaSort(col.key) : undefined"
              @click="col.sortable && toggleSort(col.key)"
            >
              <span class="nk-table__title">{{ col.title }}</span>
              <span v-if="col.sortable" class="nk-table__sort" aria-hidden="true">{{ sortIndicator(col.key) }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading && !displayData.length">
            <tr v-for="n in skeletonRows" :key="`skeleton-${n}`" class="nk-table__skeleton-row" aria-hidden="true">
              <td v-if="selectable" class="nk-table__cell nk-table__cell--select" />
              <td v-for="col in columns" :key="col.key" class="nk-table__cell">
                <NkSkeleton variant="text" :height="12" :animated="true" />
              </td>
            </tr>
          </template>
          <tr
            v-for="(row, index) in displayData"
            :key="keyOf(row, index)"
            class="nk-table__row"
            :class="{ 'nk-table__row--selected': isSelected(row), 'nk-table__row--clickable': rowClickable }"
            @click="emit('row-click', row, index)"
          >
            <td v-if="selectable" class="nk-table__cell nk-table__cell--select" data-label="选择">
              <input
                type="checkbox"
                :aria-label="`选择第 ${index + 1} 行`"
                :checked="isSelected(row)"
                @click.stop
                @change="toggleRow(row)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              class="nk-table__cell"
              :data-label="col.title"
              :style="{ textAlign: col.align || 'left' }"
            >
              <slot :name="`cell-${col.key}`" :row="row" :index="index" :value="getValue(row, col.key)">
                {{ formatCell(row, col) }}
              </slot>
            </td>
          </tr>
          <tr v-if="!displayData.length && !loading" class="nk-table__empty-row">
            <td :colspan="colCount" class="nk-table__cell nk-table__cell--empty">
              <slot name="empty">
                <NkEmpty :description="emptyText" />
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading && displayData.length" class="nk-table__loading">
      <NkLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NkEmpty from './Empty.vue'
import NkLoading from './Loading.vue'
import NkSkeleton from './Skeleton.vue'
import type { NkTableColumn, NkTableSortOrder } from '../utils/table'

defineOptions({ name: 'NkTable' })

type SortOrder = NkTableSortOrder

const props = withDefaults(defineProps<{
  columns: NkTableColumn[]
  data?: any[]
  rowKey?: string
  loading?: boolean
  emptyText?: string
  size?: 'sm' | 'md'
  striped?: boolean
  bordered?: boolean
  selectable?: boolean
  selection?: any[]
  remoteSort?: boolean
  rowClickable?: boolean
  /** 窄屏（≤640px）下每行转为卡片，单元格左侧显示列标题 */
  responsive?: boolean
  skeletonRows?: number
}>(), {
  data: () => [],
  rowKey: 'id',
  loading: false,
  emptyText: '暂无数据',
  size: 'md',
  striped: false,
  bordered: false,
  selectable: false,
  selection: () => [],
  remoteSort: false,
  rowClickable: false,
  responsive: true,
  skeletonRows: 4,
})

const emit = defineEmits<{
  'update:selection': [rows: any[]]
  'sort-change': [payload: { key: string; order: SortOrder | null }]
  'row-click': [row: any, index: number]
}>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<SortOrder>('asc')

const colCount = computed(() => props.columns.length + (props.selectable ? 1 : 0))

function keyOf(row: any, index: number): string | number {
  const value = row?.[props.rowKey]
  return value === undefined || value === null ? `__row_${index}` : value
}

function getValue(row: any, key: string) {
  return row?.[key]
}

function formatCell(row: any, col: NkTableColumn): string {
  if (col.formatter) {
    const out = col.formatter(row)
    return out === undefined || out === null ? '' : String(out)
  }
  const value = getValue(row, col.key)
  return value === undefined || value === null ? '-' : String(value)
}

function toWidth(width?: number | string) {
  if (width === undefined) return undefined
  return typeof width === 'number' ? `${width}px` : width
}

function compareValues(a: any, b: any): number {
  if (a === b) return 0
  if (a === undefined || a === null) return 1
  if (b === undefined || b === null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'zh-CN', { numeric: true })
}

const displayData = computed(() => {
  if (props.remoteSort || !sortKey.value) return props.data
  const key = sortKey.value
  const dir = sortOrder.value === 'asc' ? 1 : -1
  return [...props.data].sort((x, y) => dir * compareValues(getValue(x, key), getValue(y, key)))
})

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort-change', { key, order: sortOrder.value })
}

function sortIndicator(key: string) {
  if (sortKey.value !== key) return '↕'
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

function ariaSort(key: string) {
  if (sortKey.value !== key) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
}

function isSelected(row: any): boolean {
  const k = row?.[props.rowKey]
  return props.selection.some((item) => item?.[props.rowKey] === k)
}

const allSelected = computed(
  () => props.data.length > 0 && props.data.every((row) => isSelected(row)),
)

const partiallySelected = computed(
  () => !allSelected.value && props.data.some((row) => isSelected(row)),
)

function toggleRow(row: any) {
  const selected = isSelected(row)
  const next = selected
    ? props.selection.filter((item) => item?.[props.rowKey] !== row?.[props.rowKey])
    : [...props.selection, row]
  emit('update:selection', next)
}

function toggleAll() {
  emit('update:selection', allSelected.value ? [] : [...props.data])
}

defineExpose({
  clearSelection: () => emit('update:selection', []),
})
</script>

<style lang="scss" scoped>
.nk-table {
  position: relative;
  width: 100%;
  border: 1px solid $nk-color-neutral-200;
  border-radius: $nk-radius-md;
  background: $nk-color-neutral-0;
  overflow: hidden;

  &__scroll {
    overflow-x: auto;
  }

  &__inner {
    width: 100%;
    border-collapse: collapse;
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-700;
  }

  &__cell {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid $nk-color-neutral-200;
    vertical-align: middle;

    &--head {
      font-weight: $nk-font-weight-medium;
      color: $nk-color-neutral-500;
      background: $nk-color-neutral-50;
      font-size: $nk-font-size-xs;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      user-select: none;
    }

    &--sortable {
      cursor: pointer;

      &:hover {
        color: $nk-color-neutral-900;
      }
    }

    &--select {
      width: 40px;
      text-align: center;
    }

    &--empty {
      text-align: center;
      padding: $nk-spacing-3xl $nk-spacing-md;
      border-bottom: none;
    }
  }

  &__sort {
    margin-left: 4px;
    opacity: 0.7;
  }

  &__row {
    transition: background $nk-duration-fast $nk-easing-ease;

    &:hover {
      background: $nk-color-neutral-50;
    }

    &--selected {
      background: color-mix(in srgb, $nk-color-primary-500 8%, $nk-color-neutral-0);
    }

    &--clickable {
      cursor: pointer;
    }

    &:last-child .nk-table__cell {
      border-bottom: none;
    }
  }

  &--sm &__cell {
    padding: 6px 10px;
  }

  &--striped &__row:nth-child(even) {
    background: color-mix(in srgb, $nk-color-neutral-50 60%, transparent);
  }

  &--bordered &__cell {
    border-right: 1px solid $nk-color-neutral-200;

    &:last-child {
      border-right: none;
    }
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, $nk-color-neutral-0 60%, transparent);
  }

  @include respond-to(sm) {
    &--responsive {
      border: none;
      background: transparent;
      overflow: visible;
    }

    &--responsive &__scroll {
      overflow: visible;
    }

    &--responsive &__inner,
    &--responsive &__inner tbody {
      display: block;
      width: 100%;
    }

    &--responsive &__inner thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }

    &--responsive &__row {
      display: block;
      margin-bottom: $nk-spacing-sm;
      padding: $nk-spacing-xs $nk-spacing-md;
      border: 1px solid $nk-color-neutral-200;
      border-radius: $nk-radius-md;
      background: $nk-color-neutral-0;
    }

    &--responsive &__cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $nk-spacing-md;
      padding: $nk-spacing-sm 0;
      border-bottom: 1px dashed $nk-color-neutral-200;
      text-align: right !important;
      word-break: break-all;

      &::before {
        content: attr(data-label);
        flex-shrink: 0;
        color: $nk-color-neutral-500;
        font-size: $nk-font-size-xs;
        text-align: left;
      }

      &--select,
      &--empty {
        display: block;
        text-align: center !important;
        border-bottom: none;
      }

      &--select::before,
      &--empty::before {
        content: none;
      }
    }

    &--responsive &__row:last-child &__cell:last-child {
      border-bottom: none;
    }

    &--responsive &__row--selected {
      border-color: $nk-color-primary-300;
    }

    &--responsive &__loading {
      position: static;
      min-height: 80px;
      background: transparent;
    }

    &--responsive &__empty-row {
      display: block;
    }

    &--responsive &__empty-row &__cell--empty {
      display: block;
    }
  }
}
</style>
