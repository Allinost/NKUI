<template>
  <div v-if="variant === 'custom'" class="nk-skeleton" :class="{ 'nk-skeleton--animated': animated }">
    <slot />
  </div>
  <div v-else class="nk-skeleton" :class="{ 'nk-skeleton--animated': animated }">
    <div v-if="variant === 'avatar'" class="nk-skeleton__avatar" :class="[`nk-skeleton__avatar--${size}`, { 'nk-skeleton--round': round }]" />
    <div v-else-if="variant === 'image'" class="nk-skeleton__image" :style="{ width, height, borderRadius: round ? '50%' : undefined }" />
    <div v-else-if="variant === 'paragraph'" class="nk-skeleton__paragraph">
      <div
        v-for="i in rows"
        :key="i"
        class="nk-skeleton__line"
        :style="{ width: i === rows ? '60%' : '100%' }"
      />
    </div>
    <div v-else class="nk-skeleton__line" :style="{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkSkeleton' })

withDefaults(defineProps<{
  variant?: 'text' | 'avatar' | 'image' | 'paragraph' | 'custom'
  rows?: number
  animated?: boolean
  width?: string | number
  height?: string | number
  round?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'text',
  rows: 3,
  animated: true,
  width: '100%',
  size: 'md',
})
</script>

<style lang="scss" scoped>
.nk-skeleton {
  display: flex;
  flex-direction: column;
  gap: $nk-spacing-sm;

  &--animated &__line,
  &--animated &__avatar,
  &--animated &__image {
    background: linear-gradient(90deg, $nk-color-neutral-100 25%, $nk-color-neutral-200 50%, $nk-color-neutral-100 75%);
    background-size: 200% 100%;
    animation: nk-skeleton-loading 1.5s ease infinite;
  }

  &__line {
    height: 14px;
    border-radius: $nk-radius-sm;
    background: $nk-color-neutral-100;
  }

  &__paragraph {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-sm;
  }

  &__avatar {
    border-radius: $nk-radius-sm;
    background: $nk-color-neutral-100;

    &--sm { width: 32px; height: 32px; }
    &--md { width: 40px; height: 40px; }
    &--lg { width: 56px; height: 56px; }
  }

  &--round { border-radius: 50% !important; }

  &__image {
    width: 100%;
    height: 200px;
    border-radius: $nk-radius-md;
    background: $nk-color-neutral-100;
  }
}

@keyframes nk-skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
