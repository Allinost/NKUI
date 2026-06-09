<template>
  <div
    class="nk-input"
    :class="[
      `nk-input--${size}`,
      { 'nk-input--disabled': disabled, 'nk-input--error': !!error, 'nk-input--focused': isFocused }
    ]"
  >
    <label v-if="label" class="nk-input__label">{{ label }}</label>
    <div class="nk-input__wrapper">
      <span v-if="prefixIcon" class="nk-input__prefix">
        <nk-icon :name="prefixIcon" size="sm" />
      </span>
      <input
        ref="inputRef"
        class="nk-input__inner"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <button
        v-if="clearable && modelValue && !disabled"
        class="nk-input__clear"
        @click="onClear"
      >
        <nk-icon name="close" size="xs" />
      </button>
      <span v-if="suffixIcon && !clearable" class="nk-input__suffix">
        <nk-icon :name="suffixIcon" size="sm" />
      </span>
    </div>
    <p v-if="error" class="nk-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkInput' })

const props = withDefaults(defineProps<{
  modelValue?: string
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  error?: string
  label?: string
  prefixIcon?: string
  suffixIcon?: string
  maxlength?: number
}>(), {
  modelValue: '',
  size: 'md',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const isFocused = ref(false)
const inputRef = ref<HTMLInputElement>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onFocus(e: FocusEvent) {
  isFocused.value = true
  emit('focus', e)
}

function onBlur(e: FocusEvent) {
  isFocused.value = false
  emit('blur', e)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (height: 28px, font: $nk-font-size-sm, padding: 0 8px, radius: $nk-radius-sm),
  'md': (height: 36px, font: $nk-font-size-base, padding: 0 12px, radius: $nk-radius-sm),
  'lg': (height: 44px, font: $nk-font-size-lg, padding: 0 16px, radius: $nk-radius-md),
);

.nk-input {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__label {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-700;
    font-weight: $nk-font-weight-medium;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    border: 1px solid $nk-color-neutral-300;
    background: $nk-color-neutral-0;
    border-radius: $nk-radius-sm;
    transition: all $nk-duration-fast $nk-easing-ease;

    &:hover {
      border-color: $nk-color-neutral-400;
    }
  }

  &--focused &__wrapper {
    border-color: $nk-color-primary-500;
    box-shadow: 0 0 0 3px rgba($nk-color-primary-500, 0.12);
  }

  &--error &__wrapper {
    border-color: $nk-color-error;
    background: color.mix($nk-color-error, #fff, 3%);

    &:hover { border-color: $nk-color-error; }
  }

  &--focused.nk-input--error &__wrapper {
    box-shadow: 0 0 0 3px rgba($nk-color-error, 0.12);
  }

  &--disabled &__wrapper {
    background: $nk-color-neutral-100;
    border-color: $nk-color-neutral-200;
    cursor: not-allowed;
  }

  @each $size, $map in $sizes {
    &--#{$size} &__inner {
      height: map.get($map, height);
      font-size: map.get($map, font);
      padding: map.get($map, padding);
    }
    &--#{$size} &__prefix,
    &--#{$size} &__suffix {
      padding: map.get($map, padding);
    }
  }

  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    color: $nk-color-neutral-900;
    min-width: 0;

    &::placeholder {
      color: $nk-color-neutral-400;
    }

    &:disabled {
      color: $nk-color-neutral-500;
      cursor: not-allowed;
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: $nk-color-neutral-500;
    flex-shrink: 0;
  }

  &__clear {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    color: $nk-color-neutral-400;
    padding: 0 8px;

    &:hover { color: $nk-color-neutral-600; }
  }

  &__error {
    font-size: $nk-font-size-xs;
    color: $nk-color-error;
  }
}
</style>
