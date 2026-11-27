<template>
  <header class="nk-page-header">
    <div class="nk-page-header__main">
      <slot name="breadcrumb" />
      <div class="nk-page-header__title-row">
        <h2 class="nk-page-header__title">{{ title }}</h2>
        <slot name="tags" />
      </div>
      <p v-if="description || $slots.description" class="nk-page-header__desc">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div v-if="$slots.actions" class="nk-page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkPageHeader' })

withDefaults(defineProps<{
  title: string
  description?: string
}>(), {
  description: '',
})
</script>

<style lang="scss" scoped>
.nk-page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: $nk-spacing-md $nk-spacing-lg;
  margin-bottom: $nk-spacing-xl;

  &__main {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-xs;
    min-width: 0;
    flex: 1 1 280px;
  }

  &__title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $nk-spacing-sm;
  }

  &__title {
    font-size: $nk-font-size-xl;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
    line-height: 1.3;
    margin: 0;
  }

  &__desc {
    margin: 0;
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $nk-spacing-sm;
    max-width: 100%;
  }

  @include respond-to(sm) {
    &__actions {
      width: 100%;

      > * {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
