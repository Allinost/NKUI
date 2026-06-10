<template>
  <div class="nk-profile-card" :class="[`nk-profile-card--${variant}`, `nk-profile-card--${size}`]">
    <div class="nk-profile-card__top">
      <div class="nk-profile-card__avatar-wrap">
        <Avatar v-if="avatar" :src="avatar" :size="avatarSize" />
        <Avatar v-else-if="name" :text="name.charAt(0)" :size="avatarSize" />
      </div>
      <div class="nk-profile-card__info">
        <div class="nk-profile-card__name">{{ name }}</div>
        <div v-if="title" class="nk-profile-card__title">{{ title }}</div>
        <div v-if="description" class="nk-profile-card__desc">{{ description }}</div>
      </div>
    </div>
    <div v-if="$slots.actions" class="nk-profile-card__actions">
      <slot name="actions" />
    </div>
    <div v-if="$slots.default" class="nk-profile-card__extra">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './Avatar.vue'

defineOptions({ name: 'NkProfileCard' })

const props = withDefaults(defineProps<{
  name?: string
  title?: string
  description?: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'elevated' | 'flat'
}>(), {
  name: '',
  title: '',
  description: '',
  avatar: '',
  size: 'md',
  variant: 'outlined',
})

const avatarSize = computed(() => {
  const map = { sm: 'md' as const, md: 'lg' as const, lg: 'xl' as const }
  return map[props.size]
})
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (gap: 12px, name: $nk-font-size-base, title: $nk-font-size-xs, desc: $nk-font-size-xs, pad: 12px),
  'md': (gap: 16px, name: $nk-font-size-lg, title: $nk-font-size-sm, desc: $nk-font-size-sm, pad: 16px),
  'lg': (gap: 20px, name: $nk-font-size-xl, title: $nk-font-size-base, desc: $nk-font-size-base, pad: 20px),
);

.nk-profile-card {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-md;
  overflow: hidden;
  transition: box-shadow $nk-duration-fast $nk-easing-ease;

  &--outlined { border: 1px solid $nk-color-neutral-200; }
  &--elevated { box-shadow: $nk-shadow-sm; }
  &--flat { border: none; box-shadow: none; }

  @each $size, $map in $sizes {
    &--#{$size} {
      padding: map.get($map, pad);
    }
    &--#{$size} &__top { gap: map.get($map, gap); }
    &--#{$size} &__name { font-size: map.get($map, name); }
    &--#{$size} &__title { font-size: map.get($map, title); }
    &--#{$size} &__desc { font-size: map.get($map, desc); }
  }

  &__top {
    display: flex;
    align-items: center;
  }

  &__avatar-wrap { flex-shrink: 0; }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__name {
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
  }

  &__title {
    color: $nk-color-neutral-600;
  }

  &__desc {
    color: $nk-color-neutral-500;
    margin-top: 2px;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    gap: $nk-spacing-sm;
    margin-top: $nk-spacing-md;
    padding-top: $nk-spacing-md;
    border-top: 1px solid $nk-color-neutral-100;
  }

  &__extra {
    margin-top: $nk-spacing-md;
  }
}
</style>
