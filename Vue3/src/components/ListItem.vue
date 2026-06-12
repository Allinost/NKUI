<template>
  <div
    class="nk-list-item"
    :class="[
      `nk-list-item--${size}`,
      { 'nk-list-item--clickable': clickable, 'nk-list-item--disabled': disabled }
    ]"
    @click="onClick"
  >
    <div v-if="$slots.prefix || avatar || icon" class="nk-list-item__prefix">
      <slot name="prefix">
        <Avatar v-if="avatar" :src="avatar" :size="avatarSize" class="nk-list-item__avatar" />
        <nk-icon v-else-if="icon" :name="icon" size="sm" class="nk-list-item__icon" />
      </slot>
    </div>
    <div class="nk-list-item__content">
      <div v-if="$slots.title || title" class="nk-list-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.description || description" class="nk-list-item__description">
        <slot name="description">{{ description }}</slot>
      </div>
      <div v-if="$slots.default" class="nk-list-item__extra-content">
        <slot />
      </div>
    </div>
    <div v-if="$slots.extra" class="nk-list-item__extra">
      <slot name="extra" />
    </div>
    <div v-if="arrow" class="nk-list-item__arrow">
      <nk-icon name="arrow-right" size="xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NkIcon from './Icon.vue'
import Avatar from './Avatar.vue'

defineOptions({ name: 'NkListItem' })

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  avatar?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  disabled?: boolean
  arrow?: boolean
}>(), {
  title: '',
  description: '',
  avatar: '',
  icon: '',
  size: 'md',
  clickable: false,
  disabled: false,
  arrow: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const avatarSize = computed(() => {
  const map = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const }
  return map[props.size]
})

function onClick(e: MouseEvent) {
  if (props.disabled) return
  emit('click', e)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (min-h: 40px, pad: 8px 12px, gap: 10px, title: $nk-font-size-sm, desc: $nk-font-size-xs),
  'md': (min-h: 48px, pad: 12px 16px, gap: 12px, title: $nk-font-size-base, desc: $nk-font-size-sm),
  'lg': (min-h: 60px, pad: 16px 20px, gap: 14px, title: $nk-font-size-lg, desc: $nk-font-size-base),
);

.nk-list-item {
  display: flex;
  align-items: center;
  background: $nk-color-neutral-0;
  transition: background $nk-duration-fast $nk-easing-ease;
  cursor: default;

  &--clickable {
    cursor: pointer;

    &:hover {
      background: $nk-color-neutral-50;
    }

    &:active {
      background: $nk-color-neutral-100;
    }
  }

  &--disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }

  @each $size, $map in $sizes {
    &--#{$size} {
      min-height: map.get($map, min-h);
      padding: map.get($map, pad);
      gap: map.get($map, gap);
    }
    &--#{$size} &__title { font-size: map.get($map, title); }
    &--#{$size} &__description { font-size: map.get($map, desc); }
  }

  &__prefix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__icon {
    color: $nk-color-neutral-500;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    color: $nk-color-neutral-900;
    font-weight: $nk-font-weight-medium;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__description {
    color: $nk-color-neutral-500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__extra-content {
    margin-top: 2px;
  }

  &__extra {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-sm;
  }

  &__arrow {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: $nk-color-neutral-400;
    margin-left: auto;
  }
}
</style>
