<template>
  <div class="nk-login" :class="[`nk-login--${size}`, `nk-login--${variant}`]">
    <div class="nk-login__header">
      <slot name="title">
        <h3 class="nk-login__title">{{ title }}</h3>
      </slot>
      <p v-if="subtitle" class="nk-login__subtitle">{{ subtitle }}</p>
    </div>
    <div class="nk-login__form">
      <div class="nk-login__field">
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
      <div class="nk-login__field">
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
      <div v-if="$slots.extra" class="nk-login__extra">
        <slot name="extra" />
      </div>
      <div class="nk-login__actions">
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
    <div v-if="$slots.footer" class="nk-login__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Input from './Input.vue'
import Button from './Button.vue'

defineOptions({ name: 'NkLogin' })

const props = withDefaults(defineProps<{
  modelValue?: { username: string; password: string }
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
  passwordLabel?: string
  passwordPlaceholder?: string
  passwordIcon?: string
  rules?: { username?: (v: string) => string | true; password?: (v: string) => string | true }
}>(), {
  modelValue: () => ({ username: '', password: '' }),
  title: '登录',
  subtitle: '',
  size: 'md',
  variant: 'card',
  loading: false,
  disabled: false,
  submitText: '登 录',
  submitType: 'primary',
  usernameLabel: '用户名',
  usernamePlaceholder: '请输入用户名',
  usernameIcon: 'user',
  passwordLabel: '密码',
  passwordPlaceholder: '请输入密码',
  passwordIcon: '',
  rules: () => ({}),
})

const emit = defineEmits<{
  'update:modelValue': [value: { username: string; password: string }]
  submit: [value: { username: string; password: string }]
}>()

const formData = reactive({ ...props.modelValue })
const errors = reactive({ username: '', password: '' })

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
  errors.password = ''
  if (props.rules.username) {
    const res = props.rules.username(formData.username)
    if (res !== true) { errors.username = res; valid = false }
  }
  if (props.rules.password) {
    const res = props.rules.password(formData.password)
    if (res !== true) { errors.password = res; valid = false }
  }
  return valid
}

function onFieldChange(field: 'username' | 'password', value: string) {
  formData[field] = value
  emit('update:modelValue', { ...formData })
}

function onSubmit() {
  if (!validate()) return
  emit('submit', { ...formData })
}
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (width: 320px, gap: 12px, pad: 20px, title: $nk-font-size-lg, subtitle: $nk-font-size-xs),
  'md': (width: 380px, gap: 16px, pad: 28px, title: $nk-font-size-xl, subtitle: $nk-font-size-sm),
  'lg': (width: 440px, gap: 20px, pad: 36px, title: $nk-font-size-2xl, subtitle: $nk-font-size-base),
);

.nk-login {
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
