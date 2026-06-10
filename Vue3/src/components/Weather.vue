<template>
  <div class="nk-weather" :class="[`nk-weather--${size}`, { 'nk-weather--loading': loading }]">
    <div v-if="loading" class="nk-weather__loading">
      <div class="nk-weather__skeleton nk-weather__skeleton--icon" />
      <div class="nk-weather__skeleton nk-weather__skeleton--temp" />
      <div class="nk-weather__skeleton nk-weather__skeleton--desc" />
    </div>
    <template v-else>
      <div class="nk-weather__main">
        <img v-if="icon" :src="icon" class="nk-weather__icon" :alt="weather" />
        <div class="nk-weather__info">
          <div class="nk-weather__temp">{{ temperature }}<span class="nk-weather__unit">&deg;{{ unit }}</span></div>
          <div class="nk-weather__desc">{{ weather }}</div>
        </div>
      </div>
      <div class="nk-weather__meta">
        <div v-if="city" class="nk-weather__city">{{ city }}</div>
        <div v-if="humidity != null" class="nk-weather__humidity">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5zm-4.5 4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM8 5.5A2.5 2.5 0 0 0 5.5 8v2.5a2.5 2.5 0 0 0 5 0V8A2.5 2.5 0 0 0 8 5.5z"/></svg>
          {{ humidity }}%
        </div>
        <div v-if="wind" class="nk-weather__wind">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 0 1 0A1.5 1.5 0 1 1 12.5 6H1.5a.5.5 0 0 0 0 1h11a2.5 2.5 0 0 0 0-5zm-7 5a2.5 2.5 0 0 0-2.5 2.5.5.5 0 0 0 1 0A1.5 1.5 0 1 1 5.5 11H.5a.5.5 0 0 0 0 1h5a2.5 2.5 0 0 0 0-5zm4 3a1.5 1.5 0 0 0-1.5 1.5.5.5 0 0 0 1 0 .5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1h-4z"/></svg>
          {{ wind }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkWeather' })

withDefaults(defineProps<{
  city?: string
  temperature?: string | number
  weather?: string
  icon?: string
  humidity?: number
  wind?: string
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}>(), {
  unit: 'C',
  size: 'md',
  loading: false,
})
</script>

<style lang="scss" scoped>
.nk-weather {
  display: flex;
  flex-direction: column;
  gap: $nk-spacing-sm;
  padding: $nk-spacing-lg;
  background: linear-gradient(135deg, $nk-color-primary-500, $nk-color-primary-700);
  border-radius: $nk-radius-lg;
  color: #fff;
  transition: opacity $nk-duration-normal $nk-easing-ease;

  &--loading {
    background: $nk-color-neutral-200;
  }

  &__main {
    display: flex;
    align-items: center;
    gap: $nk-spacing-lg;
  }

  &__icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__temp {
    font-size: $nk-font-size-3xl;
    font-weight: $nk-font-weight-bold;
    line-height: 1;
  }

  &__unit {
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-regular;
    opacity: 0.8;
  }

  &__desc {
    font-size: $nk-font-size-base;
    opacity: 0.9;
    margin-top: $nk-spacing-xs;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $nk-spacing-md;
    font-size: $nk-font-size-sm;
    opacity: 0.8;
  }

  &__city,
  &__humidity,
  &__wind {
    display: flex;
    align-items: center;
    gap: $nk-spacing-xs;
  }

  &__humidity svg,
  &__wind svg {
    fill: currentColor;
    flex-shrink: 0;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-sm;
  }

  &__skeleton {
    background: $nk-color-neutral-300;
    border-radius: $nk-radius-sm;
    animation: nk-weather-pulse 1.5s ease-in-out infinite;

    &--icon {
      width: 48px;
      height: 48px;
      border-radius: $nk-radius-full;
    }

    &--temp {
      width: 80px;
      height: 24px;
    }

    &--desc {
      width: 120px;
      height: 16px;
    }
  }

  &--sm {
    padding: $nk-spacing-md;
    .nk-weather__icon { width: 32px; height: 32px; }
    .nk-weather__temp { font-size: $nk-font-size-xl; }
    .nk-weather__desc { font-size: $nk-font-size-sm; }
  }

  &--lg {
    padding: $nk-spacing-xl;
    .nk-weather__icon { width: 64px; height: 64px; }
    .nk-weather__temp { font-size: 40px; }
  }
}

@keyframes nk-weather-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
