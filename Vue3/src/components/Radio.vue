<template>
  <label
    class="nk-radio"
    :class="[`nk-radio--${size}`, { 'nk-radio--checked': isChecked, 'nk-radio--disabled': disabled }]"
  >
    <span class="nk-radio__circle">
      <span class="nk-radio__dot" />
    </span>
    <span v-if="$slots.default || label" class="nk-radio__label"><slot>{{ label }}</slot></span>
    <input
      type="radio"
      class="nk-radio__input"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      @change="onChange"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NkRadio' })

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  value?: string | number | boolean
}>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
})

const isChecked = computed(() =>
  props.value === undefined ? !!props.modelValue : props.modelValue === props.value
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (!checked) return
  const next = props.value === undefined ? true : props.value
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (circle: 14px, dot: 6px, font: $nk-font-size-sm, gap: 6px),
  'md': (circle: 16px, dot: 8px, font: $nk-font-size-base, gap: 8px),
  'lg': (circle: 20px, dot: 10px, font: $nk-font-size-lg, gap: 10px),
);

.nk-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &--disabled {
    opacity: $nk-opacity-disabled;
    cursor: not-allowed;
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid $nk-color-neutral-300;
    border-radius: 50%;
    background: $nk-color-neutral-0;
    transition: all $nk-duration-fast;
    flex-shrink: 0;
  }

  &--checked &__circle {
    border-color: $nk-color-primary-500;
  }

  &__dot {
    border-radius: 50%;
    background: transparent;
    transition: all $nk-duration-fast;
    transform: scale(0);
  }

  &--checked &__dot {
    background: $nk-color-primary-500;
    transform: scale(1);
  }

  &__label {
    color: $nk-color-neutral-800;
  }

  @each $size, $map in $sizes {
    &--#{$size} &__circle {
      width: map.get($map, circle);
      height: map.get($map, circle);
    }
    &--#{$size} &__dot {
      width: map.get($map, dot);
      height: map.get($map, dot);
    }
    &--#{$size} &__label {
      font-size: map.get($map, font);
    }
    &--#{$size} { gap: map.get($map, gap); }
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
}
</style>
