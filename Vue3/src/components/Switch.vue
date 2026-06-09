<template>
  <label
    class="nk-switch"
    :class="[`nk-switch--${size}`, { 'nk-switch--checked': modelValue, 'nk-switch--disabled': disabled }]"
  >
    <span class="nk-switch__track">
      <span v-if="loading" class="nk-switch__spinner" />
      <span v-else class="nk-switch__thumb" />
    </span>
    <span v-if="$slots.default || label" class="nk-switch__label"><slot>{{ label }}</slot></span>
    <input
      type="checkbox"
      class="nk-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkSwitch' })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
}>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (track-w: 32px, track-h: 18px, thumb: 14px),
  'md': (track-w: 44px, track-h: 24px, thumb: 20px),
  'lg': (track-w: 56px, track-h: 30px, thumb: 26px),
);

.nk-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;

  &--disabled {
    opacity: $nk-opacity-disabled;
    cursor: not-allowed;
  }

  &__track {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    border-radius: $nk-radius-full;
    background: $nk-color-neutral-300;
    transition: background $nk-duration-fast $nk-easing-ease;
  }

  &--checked &__track {
    background: $nk-color-primary-500;
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background: $nk-color-neutral-0;
    box-shadow: $nk-shadow-sm;
    transition: left $nk-duration-fast $nk-easing-ease;
  }

  &--checked &__thumb {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  @each $size, $map in $sizes {
    &--#{$size} &__track {
      width: map.get($map, track-w);
      height: map.get($map, track-h);
    }
    &--#{$size} &__thumb {
      width: map.get($map, thumb);
      height: map.get($map, thumb);
    }
    &--#{$size} &__spinner {
      position: absolute;
      top: 2px;
      left: 2px;
      width: map.get($map, thumb);
      height: map.get($map, thumb);
    }
  }

  &__spinner {
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: nk-switch-spin 0.6s linear infinite;
    box-sizing: border-box;
  }

  &__label {
    font-size: $nk-font-size-base;
    color: $nk-color-neutral-800;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
}

@keyframes nk-switch-spin {
  to { transform: rotate(360deg); }
}
</style>
