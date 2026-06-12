<template>
  <div class="nk-profile" :class="[`nk-profile--${size}`, `nk-profile--${variant}`]">
    <div class="nk-profile__avatar-section">
      <Avatar
        v-if="avatar"
        :src="avatar"
        :size="avatarSize"
        :variant="avatarVariant"
        class="nk-profile__avatar"
      />
      <Avatar
        v-else-if="name"
        :text="name.charAt(0)"
        :size="avatarSize"
        :variant="avatarVariant"
        class="nk-profile__avatar"
      />
      <div class="nk-profile__avatar-info">
        <div class="nk-profile__name">{{ name }}</div>
        <div v-if="title" class="nk-profile__title">{{ title }}</div>
        <div v-if="email" class="nk-profile__email">{{ email }}</div>
      </div>
    </div>

    <div v-if="stats && stats.length" class="nk-profile__stats">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="nk-profile__stat"
      >
        <span class="nk-profile__stat-value">{{ stat.value }}</span>
        <span class="nk-profile__stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <div v-if="$slots.default" class="nk-profile__content">
      <slot />
    </div>

    <div v-if="$slots.actions" class="nk-profile__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './Avatar.vue'

defineOptions({ name: 'NkProfile' })

const props = withDefaults(defineProps<{
  name?: string
  title?: string
  email?: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'elevated' | 'flat'
  avatarVariant?: 'circle' | 'square'
  stats?: { label: string; value: string | number }[]
}>(), {
  name: '',
  title: '',
  email: '',
  avatar: '',
  size: 'md',
  variant: 'outlined',
  avatarVariant: 'circle',
  stats: () => [],
})

const avatarSize = computed(() => {
  const map = { sm: 'lg' as const, md: 'xl' as const, lg: 'xl' as const }
  return map[props.size]
})
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (gap: 14px, pad: 16px, name: $nk-font-size-lg, title: $nk-font-size-xs, email: $nk-font-size-xs, stat-gap: 8px),
  'md': (gap: 18px, pad: 24px, name: $nk-font-size-xl, title: $nk-font-size-sm, email: $nk-font-size-sm, stat-gap: 12px),
  'lg': (gap: 24px, pad: 32px, name: $nk-font-size-2xl, title: $nk-font-size-base, email: $nk-font-size-base, stat-gap: 16px),
);

.nk-profile {
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
      gap: map.get($map, gap);
    }
    &--#{$size} &__name { font-size: map.get($map, name); }
    &--#{$size} &__title { font-size: map.get($map, title); }
    &--#{$size} &__email { font-size: map.get($map, email); }
    &--#{$size} &__stats { gap: map.get($map, stat-gap); }
  }

  &__avatar-section {
    display: flex;
    align-items: center;
    gap: $nk-spacing-lg;
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__avatar-info {
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

  &__email {
    color: $nk-color-neutral-500;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    padding: $nk-spacing-lg 0;
    border-top: 1px solid $nk-color-neutral-100;
    border-bottom: 1px solid $nk-color-neutral-100;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__stat-value {
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
  }

  &__stat-label {
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-500;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__actions {
    display: flex;
    gap: $nk-spacing-sm;
  }
}
</style>
