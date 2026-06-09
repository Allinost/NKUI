<template>
  <label
    class="nk-checkbox"
    :class="[`nk-checkbox--${size}`, { 'nk-checkbox--checked': modelValue, 'nk-checkbox--disabled': disabled }]"
  >
    <span class="nk-checkbox__box">
      <span v-if="modelValue && !indeterminate" class="nk-checkbox__icon">✓</span>
      <span v-else-if="indeterminate" class="nk-checkbox__icon">−</span>
    </span>
    <span v-if="$slots.default || label" class="nk-checkbox__label"><slot>{{ label }}</slot></span>
    <input
      type="checkbox"
      class="nk-checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkCheckbox' })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  value?: any
}>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; change: [value: boolean] }>()

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (box: 14px, font: $nk-font-size-sm, gap: 6px),
  'md': (box: 16px, font: $nk-font-size-base, gap: 8px),
  'lg': (box: 20px, font: $nk-font-size-lg, gap: 10px),
);

.nk-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &--disabled {
    opacity: $nk-opacity-disabled;
    cursor: not-allowed;
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid $nk-color-neutral-300;
    border-radius: $nk-radius-sm;
    background: $nk-color-neutral-0;
    transition: all $nk-duration-fast;
    flex-shrink: 0;
  }

  &--checked &__box {
    background: $nk-color-primary-500;
    border-color: $nk-color-primary-500;
  }

  &__icon {
    color: #fff;
    font-size: 12px;
    font-weight: $nk-font-weight-bold;
    line-height: 1;
  }

  &__label {
    color: $nk-color-neutral-800;
  }

  @each $size, $map in $sizes {
    &--#{$size} &__box {
      width: map.get($map, box);
      height: map.get($map, box);
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
