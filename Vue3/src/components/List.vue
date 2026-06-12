<template>
  <div
    class="nk-list"
    :class="[
      `nk-list--${size}`,
      { 'nk-list--bordered': bordered, 'nk-list--split': split, 'nk-list--loading': loading }
    ]"
  >
    <div v-if="$slots.header" class="nk-list__header">
      <slot name="header" />
    </div>

    <div v-if="loading && $slots.skeleton" class="nk-list__skeleton">
      <slot name="skeleton" />
    </div>

    <div v-else-if="data && data.length" class="nk-list__body">
      <template v-for="(item, index) in data" :key="index">
        <ListItem
          v-bind="getItemProps(item)"
          :size="itemSize"
          :clickable="!!$attrs.onItemClick || clickable"
          @click="onItemClick(item, index)"
        >
          <template v-if="$slots['item-prefix']" #prefix>
            <slot name="item-prefix" :item="item" :index="index" />
          </template>
          <template v-if="$slots['item-title']" #title>
            <slot name="item-title" :item="item" :index="index" />
          </template>
          <template v-if="$slots['item-description']" #description>
            <slot name="item-description" :item="item" :index="index" />
          </template>
          <template v-if="$slots['item-extra']" #extra>
            <slot name="item-extra" :item="item" :index="index" />
          </template>
        </ListItem>
      </template>
    </div>

    <Empty v-else-if="!loading" v-bind="emptyProps" :size="emptySize">
      <template v-if="$slots.empty" #default>
        <slot name="empty" />
      </template>
    </Empty>

    <div v-if="$slots.footer" class="nk-list__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ListItem from './ListItem.vue'
import Empty from './Empty.vue'

defineOptions({ name: 'NkList' })

const props = withDefaults(defineProps<{
  data?: any[]
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
  split?: boolean
  loading?: boolean
  clickable?: boolean
  emptyText?: string
  emptyImage?: string
  itemKey?: string
  itemTitle?: string
  itemDescription?: string
  itemAvatar?: string
  itemArrow?: boolean
  itemIcon?: string
}>(), {
  data: () => [],
  size: 'md',
  bordered: true,
  split: true,
  loading: false,
  clickable: false,
  emptyText: '暂无数据',
  itemKey: '',
  itemTitle: '',
  itemDescription: '',
  itemAvatar: '',
  itemArrow: false,
  itemIcon: '',
})

const emit = defineEmits<{
  'itemClick': [item: any, index: number]
}>()

const itemSize = computed(() => props.size)

const emptySize = computed(() => {
  const map = { sm: 'sm' as const, md: 'sm' as const, lg: 'md' as const }
  return map[props.size]
})

const emptyProps = computed(() => ({
  description: props.emptyText,
  image: props.emptyImage || undefined,
}))

function getItemProps(item: any): Record<string, any> {
  return {
    title: props.itemTitle ? item[props.itemTitle] : item.title || item.label || item.name || '',
    description: props.itemDescription ? item[props.itemDescription] : item.description || '',
    avatar: props.itemAvatar ? item[props.itemAvatar] : item.avatar || '',
    arrow: props.itemArrow,
    icon: props.itemIcon,
  }
}

function onItemClick(item: any, index: number) {
  emit('itemClick', item, index)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (font: $nk-font-size-sm, radius: $nk-radius-sm),
  'md': (font: $nk-font-size-base, radius: $nk-radius-sm),
  'lg': (font: $nk-font-size-lg, radius: $nk-radius-md),
);

.nk-list {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  overflow: hidden;

  &--bordered {
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-md;
  }

  @each $size, $map in $sizes {
    &--#{$size} {
      font-size: map.get($map, font);
      border-radius: map.get($map, radius);
    }
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
  }

  &--split &__body > :deep(.nk-list-item) {
    border-bottom: 1px solid $nk-color-neutral-100;
  }
  &--split &__body > :deep(.nk-list-item:last-child) {
    border-bottom: none;
  }

  &__skeleton {
    padding: $nk-spacing-lg;
  }

  &__footer {
    padding: $nk-spacing-md $nk-spacing-lg;
    border-top: 1px solid $nk-color-neutral-200;
    color: $nk-color-neutral-600;
    font-size: $nk-font-size-sm;
  }

  &--loading {
    opacity: 0.7;
    pointer-events: none;
  }
}
</style>
