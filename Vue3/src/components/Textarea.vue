<template>
  <div
    class="nk-textarea"
    :class="[
      `nk-textarea--${size}`,
      { 'nk-textarea--disabled': disabled, 'nk-textarea--error': !!error, 'nk-textarea--focused': isFocused }
    ]"
  >
    <label v-if="label" class="nk-textarea__label" :for="textareaId">{{ label }}</label>
    <div class="nk-textarea__wrapper">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        class="nk-textarea__inner"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        :name="name"
        :autocomplete="autocomplete"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <button
        v-if="clearable && modelValue && !disabled"
        class="nk-textarea__clear"
        @click="onClear"
      >
        <nk-icon name="close" size="xs" />
      </button>
    </div>
    <p v-if="error" class="nk-textarea__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkTextarea' })

let textareaIdCounter = 0

const props = withDefaults(defineProps<{
  modelValue?: string
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  error?: string
  label?: string
  maxlength?: number
  rows?: number
  name?: string
  autocomplete?: string
}>(), {
  modelValue: '',
  size: 'md',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  rows: 3,
  name: '',
  autocomplete: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const isFocused = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()
const textareaId = `nk-textarea-${getCurrentInstance() ? getCurrentInstance()!.uid : ++textareaIdCounter}`

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
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
  textareaRef.value?.focus()
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (font: $nk-font-size-sm, padding: 6px 8px, radius: $nk-radius-sm),
  'md': (font: $nk-font-size-base, padding: 8px 12px, radius: $nk-radius-sm),
  'lg': (font: $nk-font-size-lg, padding: 10px 16px, radius: $nk-radius-md),
);

.nk-textarea {
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
    align-items: flex-start;
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
    box-shadow: 0 0 0 3px rgba(var(--nk-color-primary-500-rgb), 0.12);
  }

  &--error &__wrapper {
    border-color: $nk-color-error;
    background: color-mix(in srgb, $nk-color-error 3%, white);

    &:hover { border-color: $nk-color-error; }
  }

  &--focused.nk-textarea--error &__wrapper {
    box-shadow: 0 0 0 3px rgba(var(--nk-color-error-rgb), 0.12);
  }

  &--disabled &__wrapper {
    background: $nk-color-neutral-100;
    border-color: $nk-color-neutral-200;
    cursor: not-allowed;
  }

  @each $size, $map in $sizes {
    &--#{$size} &__inner {
      font-size: map.get($map, font);
      padding: map.get($map, padding);
      border-radius: map.get($map, radius);
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
    min-height: 60px;
    resize: vertical;
    line-height: $nk-line-height-normal;

    &::placeholder {
      color: $nk-color-neutral-400;
    }

    &:disabled {
      color: $nk-color-neutral-500;
      cursor: not-allowed;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    color: $nk-color-neutral-400;
    padding: 8px;
    flex-shrink: 0;

    &:hover { color: $nk-color-neutral-600; }
  }

  &__error {
    font-size: $nk-font-size-xs;
    color: $nk-color-error;
  }
}
</style>
