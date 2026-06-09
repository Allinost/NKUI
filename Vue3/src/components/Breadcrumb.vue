<template>
  <nav class="nk-breadcrumb" :class="`nk-breadcrumb--${size}`">
    <template v-for="(item, idx) in items" :key="idx">
      <span
        class="nk-breadcrumb__item"
        :class="{ 'nk-breadcrumb__item--active': idx === items.length - 1 }"
      >
        <a
          v-if="item.to && idx < items.length - 1"
          class="nk-breadcrumb__link"
          :href="item.to"
        >{{ item.label }}</a>
        <span v-else>{{ item.label }}</span>
      </span>
      <span v-if="idx < items.length - 1" class="nk-breadcrumb__separator">
        <slot name="separator">{{ separator }}</slot>
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineOptions({ name: 'NkBreadcrumb' })

withDefaults(defineProps<{
  items?: BreadcrumbItem[]
  separator?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  items: () => [],
  separator: '/',
  size: 'md',
})
</script>

<style lang="scss" scoped>
.nk-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  &__item {
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-sm;

    &--active { color: $nk-color-neutral-800; font-weight: $nk-font-weight-medium; }
  }

  &__link {
    color: inherit;
    text-decoration: none;

    &:hover { color: $nk-color-primary-500; }
  }

  &__separator {
    color: $nk-color-neutral-400;
    font-size: $nk-font-size-sm;
  }

  &--sm &__item,
  &--sm &__separator { font-size: $nk-font-size-xs; }
  &--lg &__item,
  &--lg &__separator { font-size: $nk-font-size-base; }
}
</style>
