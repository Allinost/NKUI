<template>
  <form
    class="nk-form"
    :class="`nk-form--${labelPosition}`"
    novalidate
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, onMounted } from 'vue'
import { NK_FORM_KEY, getByPath, runRules, type FormRules } from '../utils/form'

defineOptions({ name: 'NkForm' })

const props = withDefaults(defineProps<{
  model: Record<string, any>
  rules?: FormRules
  labelWidth?: string
  labelPosition?: 'top' | 'left'
}>(), {
  rules: () => ({}),
  labelWidth: '96px',
  labelPosition: 'top',
})

const emit = defineEmits<{
  submit: [model: Record<string, any>]
  validate: [prop: string, valid: boolean]
}>()

const errors = reactive<Record<string, string>>({})
let initialSnapshot: Record<string, any> = {}

function snapshot(): Record<string, any> {
  return JSON.parse(JSON.stringify(props.model))
}

function validateField(prop: string): Promise<boolean> {
  const rules = props.rules[prop]
  const list = rules ? (Array.isArray(rules) ? rules : [rules]) : []
  const message = runRules(getByPath(props.model, prop), list, props.model)
  errors[prop] = message
  emit('validate', prop, !message)
  return Promise.resolve(!message)
}

async function validate(): Promise<boolean> {
  const results = await Promise.all(Object.keys(props.rules).map((prop) => validateField(prop)))
  return results.every(Boolean)
}

function clearValidate(prop?: string) {
  if (prop) {
    delete errors[prop]
    return
  }
  Object.keys(errors).forEach((key) => delete errors[key])
}

function resetFields() {
  Object.keys(props.model).forEach((key) => delete props.model[key])
  Object.assign(props.model, JSON.parse(JSON.stringify(initialSnapshot)))
  clearValidate()
}

async function onSubmit() {
  if (await validate()) emit('submit', props.model)
}

provide(NK_FORM_KEY, reactive({
  get model() { return props.model },
  get rules() { return props.rules },
  get labelWidth() { return props.labelWidth },
  get labelPosition() { return props.labelPosition },
  errors,
  validateField,
}))

onMounted(() => {
  initialSnapshot = snapshot()
})

defineExpose({ validate, validateField, clearValidate, resetFields })
</script>

<style lang="scss" scoped>
.nk-form {
  display: flex;
  flex-direction: column;
  gap: $nk-spacing-md;
}
</style>
