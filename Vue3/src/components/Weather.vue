<template>
  <div
    class="nk-weather"
    :class="[
      `nk-weather--${size}`,
      { 'nk-weather--loading': loading },
      `nk-weather--${weatherCondition}`,
    ]"
  >
    <div v-if="loading" class="nk-weather__loading">
      <div class="nk-weather__skeleton nk-weather__skeleton--icon" />
      <div class="nk-weather__skeleton nk-weather__skeleton--temp" />
      <div class="nk-weather__skeleton nk-weather__skeleton--desc" />
    </div>
    <template v-else>
      <div class="nk-weather__header">
        <div v-if="city" class="nk-weather__city">{{ city }}</div>
        <div class="nk-weather__time">
          <svg viewBox="0 0 16 16" width="12" height="12"><path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0z"/></svg>
          {{ timeText }}
        </div>
      </div>
      <div class="nk-weather__main">
        <div class="nk-weather__icon-wrap">
          <img v-if="icon" :src="icon" class="nk-weather__icon-img" :alt="weather || 'weather'" />
          <div v-else class="nk-weather__icon-svg" v-html="builtinIcon" />
        </div>
        <div class="nk-weather__info">
          <div class="nk-weather__temp">{{ temperature }}<span class="nk-weather__unit">&deg;{{ unit }}</span></div>
          <div class="nk-weather__desc">{{ weather || weatherLabel }}</div>
          <div class="nk-weather__range" v-if="tempHigh != null || tempLow != null">
            <span v-if="tempHigh != null">{{ tempHigh }}&deg;</span>
            <span class="nk-weather__range-sep">/</span>
            <span v-if="tempLow != null">{{ tempLow }}&deg;</span>
          </div>
        </div>
      </div>
      <div class="nk-weather__meta">
        <div v-if="humidity != null" class="nk-weather__meta-item">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5zm-4.5 4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM8 5.5A2.5 2.5 0 0 0 5.5 8v2.5a2.5 2.5 0 0 0 5 0V8A2.5 2.5 0 0 0 8 5.5z" fill="currentColor"/></svg>
          {{ humidity }}% 湿度
        </div>
        <div v-if="wind" class="nk-weather__meta-item">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 0 1 0A1.5 1.5 0 1 1 12.5 6H1.5a.5.5 0 0 0 0 1h11a2.5 2.5 0 0 0 0-5zm-7 5a2.5 2.5 0 0 0-2.5 2.5.5.5 0 0 0 1 0A1.5 1.5 0 1 1 5.5 11H.5a.5.5 0 0 0 0 1h5a2.5 2.5 0 0 0 0-5zm4 3a1.5 1.5 0 0 0-1.5 1.5.5.5 0 0 0 1 0 .5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1h-4z" fill="currentColor"/></svg>
          {{ wind }}
        </div>
        <div v-if="pressure != null" class="nk-weather__meta-item">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 0a1 1 0 0 1 1 1v5.5a3.5 3.5 0 1 1-2 0V1a1 1 0 0 1 1-1zM4.5 9a3.5 3.5 0 0 0 7 0A3.5 3.5 0 0 0 8 5.5 3.5 3.5 0 0 0 4.5 9z" fill="currentColor"/></svg>
          {{ pressure }} hPa
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkWeather' })

const props = withDefaults(defineProps<{
  city?: string
  temperature?: string | number
  weather?: string
  icon?: string
  humidity?: number
  wind?: string
  pressure?: number
  tempHigh?: string | number
  tempLow?: string | number
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}>(), {
  unit: 'C',
  size: 'md',
  loading: false,
})

const timeText = computed(() => {
  const h = new Date().getHours()
  return `${h.toString().padStart(2, '0')}:00`
})

const weatherCondition = computed(() => {
  const w = (props.weather || '').toLowerCase()
  if (w.includes('晴') || w.includes('sun') || w.includes('clear')) return 'sunny'
  if (w.includes('多云') || w.includes('cloud') || w.includes('overcast')) return 'cloudy'
  if (w.includes('阴')) return 'overcast'
  if (w.includes('雨') || w.includes('rain') || w.includes('shower') || w.includes('drizzle')) return 'rainy'
  if (w.includes('雪') || w.includes('snow')) return 'snowy'
  if (w.includes('雾') || w.includes('fog') || w.includes('mist')) return 'foggy'
  if (w.includes('风') || w.includes('wind')) return 'windy'
  if (w.includes('霾') || w.includes('haze')) return 'hazy'
  return 'default'
})

const weatherLabel = computed(() => {
  const map: Record<string, string> = {
    sunny: '晴', cloudy: '多云', overcast: '阴',
    rainy: '雨', snowy: '雪', foggy: '雾',
    windy: '风', hazy: '霾',
  }
  return map[weatherCondition.value] || ''
})

const builtinIcon = computed(() => {
  const c = weatherCondition.value
  if (c === 'sunny') return `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="12" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/><line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/><line x1="12.7" y1="12.7" x2="16.4" y2="16.4"/><line x1="47.6" y1="47.6" x2="51.3" y2="51.3"/><line x1="12.7" y1="51.3" x2="16.4" y2="47.6"/><line x1="47.6" y1="16.4" x2="51.3" y2="12.7"/></g></svg>`
  if (c === 'cloudy') return `<svg viewBox="0 0 64 64" fill="none"><circle cx="26" cy="28" r="10" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="2" stroke-linecap="round"><line x1="26" y1="12" x2="26" y2="16"/><line x1="26" y1="40" x2="26" y2="44"/><line x1="10" y1="28" x2="14" y2="28"/><line x1="38" y1="28" x2="42" y2="28"/></g><path d="M18 44c-6 0-10-4-10-9s4-9 10-9h2a10 10 0 0 1 19 0h1c5 0 9 4 9 9s-4 9-9 9z" fill="#B0BEC5" opacity="0.9"/></svg>`
  if (c === 'overcast') return `<svg viewBox="0 0 64 64"><path d="M14 46c-8 0-13-5-13-12s5-12 13-12h2a13 13 0 0 1 24 0h2c7 0 12 5 12 12s-5 12-12 12z" fill="#90A4AE"/><rect x="16" y="38" width="32" height="4" rx="2" fill="#78909C"/></svg>`
  if (c === 'rainy') return `<svg viewBox="0 0 64 64"><path d="M16 38c-7 0-12-5-12-11s5-11 12-11h2a12 12 0 0 1 22 0h1c6 0 11 5 11 11s-5 11-11 11z" fill="#90A4AE"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line x1="18" y1="44" x2="14" y2="54"/><line x1="28" y1="44" x2="24" y2="54"/><line x1="38" y1="44" x2="34" y2="54"/><line x1="48" y1="44" x2="44" y2="54"/></g></svg>`
  if (c === 'snowy') return `<svg viewBox="0 0 64 64"><path d="M16 38c-7 0-12-5-12-11s5-11 12-11h2a12 12 0 0 1 22 0h1c6 0 11 5 11 11s-5 11-11 11z" fill="#90A4AE"/><circle cx="16" cy="50" r="2.5" fill="#E3F2FD"/><circle cx="28" cy="55" r="2.5" fill="#E3F2FD"/><circle cx="40" cy="50" r="2.5" fill="#E3F2FD"/><circle cx="22" cy="46" r="2" fill="#E3F2FD"/><circle cx="34" cy="46" r="2" fill="#E3F2FD"/></svg>`
  if (c === 'foggy') return `<svg viewBox="0 0 64 64"><g fill="#B0BEC5"><rect x="8" y="22" width="48" height="4" rx="2"/><rect x="14" y="32" width="36" height="4" rx="2"/><rect x="10" y="42" width="44" height="4" rx="2"/></g></svg>`
  if (c === 'windy') return `<svg viewBox="0 0 64 64"><g stroke="#90A4AE" stroke-width="3" stroke-linecap="round"><line x1="8" y1="22" x2="48" y2="22"/><line x1="14" y1="32" x2="52" y2="32"/><line x1="10" y1="42" x2="44" y2="42"/></g></svg>`
  if (c === 'hazy') return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="8" fill="#FFB74D" opacity="0.6"/><g fill="#B0BEC5" opacity="0.5"><rect x="8" y="20" width="48" height="3" rx="1.5"/><rect x="12" y="28" width="40" height="3" rx="1.5"/><rect x="10" y="36" width="44" height="3" rx="1.5"/><rect x="16" y="44" width="32" height="3" rx="1.5"/></g></svg>`
  return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/></g></svg>`
})
</script>

<style lang="scss" scoped>
.nk-weather {
  display: flex;
  flex-direction: column;
  gap: $nk-spacing-md;
  padding: $nk-spacing-lg;
  border-radius: $nk-radius-xl;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: opacity $nk-duration-normal $nk-easing-ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
    pointer-events: none;
  }

  &--default { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  &--sunny { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
  &--cloudy { background: linear-gradient(135deg, #89b4cf 0%, #b8c6d4 100%); }
  &--overcast { background: linear-gradient(135deg, #757f9a 0%, #d7dde8 100%); }
  &--rainy { background: linear-gradient(135deg, #4b6cb7 0%, #6094c4 100%); }
  &--snowy { background: linear-gradient(135deg, #e6e9f0 0%, #a8c0d4 100%); color: #333; }
  &--foggy { background: linear-gradient(135deg, #b8c6d4 0%, #c9d6df 100%); color: #333; }
  &--windy { background: linear-gradient(135deg, #6c89a1 0%, #97b1c6 100%); }
  &--hazy { background: linear-gradient(135deg, #c9a96e 0%, #d4bf8a 100%); }

  &--loading {
    background: $nk-color-neutral-200 !important;
    color: inherit;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $nk-font-size-sm;
    opacity: 0.85;
  }

  &__city {
    font-weight: $nk-font-weight-medium;
    display: flex;
    align-items: center;
    gap: $nk-spacing-xs;
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 4px;
    svg { fill: currentColor; }
  }

  &__main {
    display: flex;
    align-items: center;
    gap: $nk-spacing-lg;
  }

  &__icon-wrap {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__icon-svg {
    width: 100%;
    height: 100%;

    :deep(svg) {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__temp {
    font-size: 36px;
    font-weight: $nk-font-weight-bold;
    line-height: 1;
    letter-spacing: -1px;
  }

  &__unit {
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-regular;
    opacity: 0.8;
    vertical-align: super;
  }

  &__desc {
    font-size: $nk-font-size-base;
    opacity: 0.9;
    margin-top: $nk-spacing-xs;
  }

  &__range {
    font-size: $nk-font-size-sm;
    opacity: 0.75;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__range-sep {
    opacity: 0.5;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $nk-spacing-md;
    padding-top: $nk-spacing-md;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  &--snowy &__meta,
  &--foggy &__meta {
    border-top-color: rgba(0, 0, 0, 0.1);
  }

  &__meta-item {
    display: flex;
    align-items: center;
    gap: $nk-spacing-xs;
    font-size: $nk-font-size-sm;
    opacity: 0.85;

    svg { flex-shrink: 0; }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-sm;
  }

  &__skeleton {
    background: rgba(255, 255, 255, 0.25);
    border-radius: $nk-radius-sm;
    animation: nk-weather-pulse 1.5s ease-in-out infinite;

    &--icon {
      width: 56px;
      height: 56px;
      border-radius: $nk-radius-full;
    }

    &--temp {
      width: 100px;
      height: 28px;
    }

    &--desc {
      width: 140px;
      height: 18px;
    }
  }

  &--sm {
    padding: $nk-spacing-md;
    gap: $nk-spacing-sm;
    border-radius: $nk-radius-lg;

    .nk-weather__icon-wrap { width: 40px; height: 40px; }
    .nk-weather__temp { font-size: 26px; }
    .nk-weather__desc { font-size: $nk-font-size-sm; }
    .nk-weather__meta { gap: $nk-spacing-sm; padding-top: $nk-spacing-sm; font-size: 11px; }
    .nk-weather__header { font-size: 11px; }
  }

  &--lg {
    padding: $nk-spacing-xl;
    gap: $nk-spacing-lg;
    border-radius: 20px;

    .nk-weather__icon-wrap { width: 72px; height: 72px; }
    .nk-weather__temp { font-size: 48px; }
    .nk-weather__desc { font-size: $nk-font-size-lg; }
  }
}

@keyframes nk-weather-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
