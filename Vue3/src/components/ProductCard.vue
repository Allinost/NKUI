<template>
  <div
    class="nk-product-card"
    :class="{ 'nk-product-card--clickable': clickable }"
    @click="onClick"
  >
    <div class="nk-product-card__cover">
      <img v-if="cover" :src="cover" class="nk-product-card__image" />
      <div v-else class="nk-product-card__placeholder">
        <nk-icon name="file" size="xl" />
      </div>
    </div>
    <div class="nk-product-card__info">
      <div class="nk-product-card__row">
        <span class="nk-product-card__title">{{ title }}</span>
        <span v-if="status" class="nk-product-card__status">{{ status }}</span>
      </div>
      <div class="nk-product-card__row">
        <span class="nk-product-card__description">{{ description }}</span>
        <span v-if="stock !== undefined" class="nk-product-card__stock">{{ stockLabel }}</span>
      </div>
      <div class="nk-product-card__row">
        <div v-if="tags && tags.length" class="nk-product-card__tags">
          <nk-tag
            v-for="(tag, idx) in tags"
            :key="idx"
            size="sm"
            type="neutral"
            variant="light"
          >{{ tag }}</nk-tag>
        </div>
        <span v-if="price !== undefined" class="nk-product-card__price">{{ priceLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NkIcon from './Icon.vue'
import NkTag from './Tag.vue'

defineOptions({ name: 'NkProductCard' })

const props = withDefaults(defineProps<{
  cover?: string
  title?: string
  status?: string
  description?: string
  stock?: number | string
  tags?: string[]
  price?: number | string
  clickable?: boolean
  stockText?: string
  pricePrefix?: string
}>(), {
  cover: '',
  title: '',
  status: '',
  description: '',
  stock: undefined,
  tags: () => [],
  price: undefined,
  clickable: false,
  stockText: '库存',
  pricePrefix: '¥',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const stockLabel = computed(() => {
  if (props.stock === undefined) return ''
  return `${props.stockText}: ${props.stock}`
})

const priceLabel = computed(() => {
  if (props.price === undefined) return ''
  return `${props.pricePrefix}${props.price}`
})

function onClick(e: MouseEvent) {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
.nk-product-card {
  display: flex;
  gap: $nk-spacing-md;
  padding: $nk-spacing-md;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-md;
  border: 1px solid $nk-color-neutral-200;
  transition: box-shadow $nk-duration-fast $nk-easing-ease;

  &--clickable {
    cursor: pointer;

    &:hover {
      box-shadow: $nk-shadow-sm;
    }

    &:active {
      background: $nk-color-neutral-50;
    }
  }

  &__cover {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: $nk-radius-sm;
    overflow: hidden;
    background: $nk-color-neutral-100;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $nk-color-neutral-400;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    gap: $nk-spacing-sm;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $nk-spacing-sm;
  }

  &__title {
    font-size: $nk-font-size-base;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  &__status {
    font-size: $nk-font-size-xs;
    color: $nk-color-primary-500;
    background: $nk-color-primary-50;
    padding: 2px 8px;
    border-radius: $nk-radius-full;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__description {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  &__stock {
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-400;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__tags {
    display: flex;
    gap: $nk-spacing-xs;
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  &__price {
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-bold;
    color: $nk-color-error;
    white-space: nowrap;
    flex-shrink: 0;
  }
}
</style>
