<template>
  <div class="nk-empty" :class="`nk-empty--${size}`">
    <div class="nk-empty__image">
      <slot name="image">
        <nk-icon :name="imageIcon" :size="iconSize" color="#C0C4CC" />
      </slot>
    </div>
    <p class="nk-empty__description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.default" class="nk-empty__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkEmpty' })

const props = withDefaults(defineProps<{
  image?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  description: '暂无数据',
  size: 'md',
})

const imageIcon = computed(() => {
  if (!props.image || props.image === 'default') return 'info'
  return props.image
})

const iconSize = computed(() => {
  return props.size === 'lg' ? 'xl' : props.size === 'sm' ? 'md' : 'lg'
})
</script>

<style lang="scss" scoped>
.nk-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $nk-spacing-3xl $nk-spacing-lg;
  text-align: center;

  &__image {
    margin-bottom: $nk-spacing-lg;
    line-height: 0;
  }

  &__description {
    margin: 0 0 $nk-spacing-lg;
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-sm;
  }

  &__actions {
    display: flex;
    gap: $nk-spacing-sm;
  }

  &--sm { padding: $nk-spacing-2xl $nk-spacing-lg; }
  &--lg { padding: $nk-spacing-3xl * 2 $nk-spacing-lg; }
}
</style>
