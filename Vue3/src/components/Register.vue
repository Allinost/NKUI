<template>
  <div class="nk-register" :class="[`nk-register--${size}`, `nk-register--${variant}`]">
    <div class="nk-register__header">
      <slot name="title">
        <h3 class="nk-register__title">{{ title }}</h3>
      </slot>
      <p v-if="subtitle" class="nk-register__subtitle">{{ subtitle }}</p>
    </div>
    <div class="nk-register__form">
      <div class="nk-register__field">
        <Input
          v-model="formData.username"
          :placeholder="usernamePlaceholder"
          :size="inputSize"
          :label="usernameLabel"
          :prefix-icon="usernameIcon"
          :error="errors.username"
          :disabled="disabled"
          @update:model-value="onFieldChange('username', $event)"
        />
      </div>
      <div class="nk-register__field">
        <Input
          v-model="formData.email"
          :placeholder="emailPlaceholder"
          :size="inputSize"
          :label="emailLabel"
          :prefix-icon="emailIcon"
          :error="errors.email"
          :disabled="disabled"
          @update:model-value="onFieldChange('email', $event)"
        />
      </div>
      <div class="nk-register__field">
        <Input
          v-model="formData.password"
          type="password"
          :placeholder="passwordPlaceholder"
          :size="inputSize"
          :label="passwordLabel"
          :prefix-icon="passwordIcon"
          :error="errors.password"
          :disabled="disabled"
          @update:model-value="onFieldChange('password', $event)"
        />
      </div>
      <div class="nk-register__field">
        <Input
          v-model="formData.confirmPassword"
          type="password"
          :placeholder="confirmPlaceholder"
          :size="inputSize"
          :label="confirmLabel"
          :prefix-icon="passwordIcon"
          :error="errors.confirmPassword"
          :disabled="disabled"
          @update:model-value="onFieldChange('confirmPassword', $event)"
        />
      </div>
      <div v-if="$slots.extra" class="nk-register__extra">
        <slot name="extra" />
      </div>
      <div class="nk-register__actions">
        <Button
          :type="submitType"
          variant="solid"
          :size="btnSize"
          block
          :loading="loading"
          :disabled="disabled"
          @click="onSubmit"
        >
          {{ submitText }}
        </Button>
      </div>
    </div>
    <div v-if="$slots.footer" class="nk-register__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import Input from './Input.vue'
import Button from './Button.vue'

defineOptions({ name: 'NkRegister' })

const props = withDefaults(defineProps<{
  modelValue?: { username: string; email: string; password: string; confirmPassword: string }
  title?: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'card' | 'plain'
  loading?: boolean
  disabled?: boolean
  submitText?: string
  submitType?: 'primary' | 'success' | 'accent'
  usernameLabel?: string
  usernamePlaceholder?: string
  usernameIcon?: string
  emailLabel?: string
  emailPlaceholder?: string
  emailIcon?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  passwordIcon?: string
  confirmLabel?: string
  confirmPlaceholder?: string
  rules?: {
    username?: (v: string) => string | true
    email?: (v: string) => string | true
    password?: (v: string) => string | true
    confirmPassword?: (v: string, password: string) => string | true
  }
}>(), {
  modelValue: () => ({ username: '', email: '', password: '', confirmPassword: '' }),
  title: '注册',
  subtitle: '',
  size: 'md',
  variant: 'card',
  loading: false,
  disabled: false,
  submitText: '注 册',
  submitType: 'primary',
  usernameLabel: '用户名',
  usernamePlaceholder: '请输入用户名',
  usernameIcon: 'user',
  emailLabel: '邮箱',
  emailPlaceholder: '请输入邮箱',
  emailIcon: '',
  passwordLabel: '密码',
  passwordPlaceholder: '请输入密码',
  passwordIcon: '',
  confirmLabel: '确认密码',
  confirmPlaceholder: '请再次输入密码',
  rules: () => ({}),
})

const emit = defineEmits<{
  'update:modelValue': [value: { username: string; email: string; password: string; confirmPassword: string }]
  submit: [value: { username: string; email: string; password: string; confirmPassword: string }]
}>()

const formData = reactive({ ...props.modelValue })
const errors = reactive({ username: '', email: '', password: '', confirmPassword: '' })

const inputSize = computed(() => {
  const map = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const }
  return map[props.size]
})

const btnSize = computed(() => {
  const map = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const }
  return map[props.size]
})

function validate(): boolean {
  let valid = true
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  if (props.rules.username) {
    const res = props.rules.username(formData.username)
    if (res !== true) { errors.username = res; valid = false }
  }
  if (props.rules.email) {
    const res = props.rules.email(formData.email)
    if (res !== true) { errors.email = res; valid = false }
  }
  if (props.rules.password) {
    const res = props.rules.password(formData.password)
    if (res !== true) { errors.password = res; valid = false }
  }
  if (props.rules.confirmPassword) {
    const res = props.rules.confirmPassword(formData.confirmPassword, formData.password)
    if (res !== true) { errors.confirmPassword = res; valid = false }
  }
  return valid
}

function onFieldChange(field: string, value: string) {
  formData[field as keyof typeof formData] = value
  emit('update:modelValue', { ...formData })
}

function onSubmit() {
  if (!validate()) return
  emit('submit', { ...formData })
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (width: 340px, gap: 12px, pad: 20px, title: $nk-font-size-lg, subtitle: $nk-font-size-xs),
  'md': (width: 400px, gap: 16px, pad: 28px, title: $nk-font-size-xl, subtitle: $nk-font-size-sm),
  'lg': (width: 460px, gap: 20px, pad: 36px, title: $nk-font-size-2xl, subtitle: $nk-font-size-base),
);

.nk-register {
  display: flex;
  flex-direction: column;

  &--card {
    background: $nk-color-neutral-0;
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-lg;
    box-shadow: $nk-shadow-sm;
  }

  &--plain {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  @each $size, $map in $sizes {
    &--#{$size} {
      max-width: map.get($map, width);
      width: 100%;
      padding: map.get($map, pad);
      gap: map.get($map, gap);
    }
    &--#{$size} &__title { font-size: map.get($map, title); }
    &--#{$size} &__subtitle { font-size: map.get($map, subtitle); }
  }

  &__header {
    text-align: center;
  }

  &__title {
    margin: 0;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
  }

  &__subtitle {
    margin: 4px 0 0;
    color: $nk-color-neutral-500;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-md;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__extra {
    display: flex;
    justify-content: flex-end;
  }

  &__actions {
    display: flex;
    flex-direction: column;
  }

  &__footer {
    display: flex;
    justify-content: center;
    gap: $nk-spacing-sm;
  }
}
</style>
