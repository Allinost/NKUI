<template>
  <div
    class="nk-form-item"
    :class="{
      'nk-form-item--error': !!errorMessage,
      'nk-form-item--left': form?.labelPosition === 'left',
    }"
    @focusout="onFocusOut"
    @input="onInput"
  >
    <label
      v-if="label"
      class="nk-form-item__label"
      :style="labelStyle"
    >
      <span v-if="isRequired" class="nk-form-item__required">*</span>{{ label }}
    </label>
    <div class="nk-form-item__content">
      <slot />
      <p v-if="errorMessage" class="nk-form-item__error" role="alert">{{ errorMessage }}</p>
      <p v-else-if="help" class="nk-form-item__help">{{ help }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { NK_FORM_KEY, getByPath, type FormRule } from '../utils/form'

defineOptions({ name: 'NkFormItem' })

const props = defineProps<{
  label?: string
  prop?: string
  required?: boolean
  help?: string
  error?: string
}>()

const form = inject(NK_FORM_KEY, null)

const itemRules = computed<FormRule[]>(() => {
  if (!form || !props.prop) return []
  const rules = form.rules[props.prop]
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
})

const isRequired = computed(() => props.required || itemRules.value.some((r) => r.required))

const errorMessage = computed(() => {
  if (props.error) return props.error
  if (!form || !props.prop) return ''
  return form.errors[props.prop] || ''
})

const labelStyle = computed(() => {
  if (form?.labelPosition === 'left') return { width: form.labelWidth, flexShrink: 0 }
  return undefined
})

/** 失焦时校验；已出现错误后输入即时重新校验，避免刚输入就报错 */
function onFocusOut() {
  if (form && props.prop && itemRules.value.length) form.validateField(props.prop)
}

function onInput() {
  if (form && props.prop && errorMessage.value) form.validateField(props.prop)
}
</script>

<style lang="scss" scoped>
.nk-form-item {
  display: flex;
  flex-direction: column;
  gap: $nk-spacing-xs;

  &--left {
    flex-direction: row;
    align-items: flex-start;
    gap: $nk-spacing-md;
  }

  &__label {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-700;
    font-weight: $nk-font-weight-medium;
    line-height: 30px;
  }

  &__required {
    color: $nk-color-error;
    margin-right: 2px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-xs;
    flex: 1;
    min-width: 0;
  }

  &__error {
    font-size: $nk-font-size-sm;
    color: $nk-color-error;
    margin: 0;
  }

  &__help {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
    margin: 0;
  }
}
</style>
