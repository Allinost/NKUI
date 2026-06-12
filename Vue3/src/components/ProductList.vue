<template>
  <div
    class="nk-product-list"
    :class="{ 'nk-product-list--loading': loading, 'nk-product-list--bordered': bordered, 'nk-product-list--grid': layout === 'grid' }"
  >
    <div v-if="$slots.header" class="nk-product-list__header">
      <slot name="header" />
    </div>

    <div v-if="loading && $slots.skeleton" class="nk-product-list__skeleton">
      <slot name="skeleton" />
    </div>

    <div v-else-if="data && data.length" :class="['nk-product-list__body', `nk-product-list__body--${layout}`]">
      <ProductCard
        v-for="(item, index) in data"
        :key="index"
        :cover="getItemCover(item)"
        :title="getItemTitle(item)"
        :status="getItemStatus(item)"
        :description="getItemDescription(item)"
        :stock="getItemStock(item)"
        :tags="getItemTags(item)"
        :price="getItemPrice(item)"
        :clickable="clickable"
        :stock-text="stockText"
        :price-prefix="pricePrefix"
        @click="onItemClick(item, index)"
      />
    </div>

    <Empty v-else-if="!loading" v-bind="emptyProps" :size="emptySize">
      <template v-if="$slots.empty" #default>
        <slot name="empty" />
      </template>
    </Empty>

    <div v-if="$slots.footer" class="nk-product-list__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import Empty from './Empty.vue'

defineOptions({ name: 'NkProductList' })

const props = withDefaults(defineProps<{
  data?: any[]
  layout?: 'list' | 'grid'
  bordered?: boolean
  loading?: boolean
  clickable?: boolean
  emptyText?: string
  emptyImage?: string
  stockText?: string
  pricePrefix?: string
  itemCover?: string
  itemTitle?: string
  itemStatus?: string
  itemDescription?: string
  itemStock?: string
  itemTags?: string
  itemPrice?: string
  columns?: number
}>(), {
  data: () => [],
  layout: 'list',
  bordered: false,
  loading: false,
  clickable: false,
  emptyText: '暂无商品',
  stockText: '库存',
  pricePrefix: '¥',
  itemCover: '',
  itemTitle: '',
  itemStatus: '',
  itemDescription: '',
  itemStock: '',
  itemTags: '',
  itemPrice: '',
  columns: 2,
})

const emit = defineEmits<{
  itemClick: [item: any, index: number]
}>()

const emptySize = computed(() => 'sm' as const)

const emptyProps = computed(() => ({
  description: props.emptyText,
  image: props.emptyImage || undefined,
}))

function getItemCover(item: any): string {
  return props.itemCover ? item[props.itemCover] : item.cover || item.image || ''
}

function getItemTitle(item: any): string {
  return props.itemTitle ? item[props.itemTitle] : item.title || item.name || item.label || ''
}

function getItemStatus(item: any): string {
  return props.itemStatus ? item[props.itemStatus] : item.status || ''
}

function getItemDescription(item: any): string {
  return props.itemDescription ? item[props.itemDescription] : item.description || ''
}

function getItemStock(item: any): number | string | undefined {
  const val = props.itemStock ? item[props.itemStock] : item.stock
  return val !== undefined ? val : undefined
}

function getItemTags(item: any): string[] {
  return props.itemTags ? item[props.itemTags] : item.tags || []
}

function getItemPrice(item: any): number | string | undefined {
  const val = props.itemPrice ? item[props.itemPrice] : item.price
  return val !== undefined ? val : undefined
}

function onItemClick(item: any, index: number) {
  emit('itemClick', item, index)
}
</script>

<style lang="scss" scoped>
.nk-product-list {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-md;
  overflow: hidden;

  &--bordered {
    border: 1px solid $nk-color-neutral-200;
  }

  &--loading {
    opacity: 0.7;
    pointer-events: none;
  }

  &__header {
    padding: $nk-spacing-md $nk-spacing-lg;
    border-bottom: 1px solid $nk-color-neutral-200;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-800;
  }

  &__body {
    display: flex;
    flex-direction: column;

    &--grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $nk-spacing-sm;
      padding: $nk-spacing-sm;
    }
  }

  &__footer {
    padding: $nk-spacing-md $nk-spacing-lg;
    border-top: 1px solid $nk-color-neutral-200;
    color: $nk-color-neutral-600;
    font-size: $nk-font-size-sm;
  }

  &__skeleton {
    padding: $nk-spacing-lg;
  }
}
</style>
