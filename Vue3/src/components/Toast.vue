<template>
  <Teleport to="body">
    <Transition name="nk-toast-fade">
      <div v-if="visible" class="nk-toast" :class="[`nk-toast--${type}`, `nk-toast--${position}`]" :style="toastStyle">
        <span v-if="type !== 'loading' && type !== 'text'" class="nk-toast__icon">
          <nk-icon :name="iconName" size="md" />
        </span>
        <nk-loading v-else-if="type === 'loading'" size="sm" />
        <span class="nk-toast__message">{{ message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import NkIcon from './Icon.vue'
import NkLoading from './Loading.vue'

defineOptions({ name: 'NkToast' })

const props = withDefaults(defineProps<{
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading' | 'text'
  duration?: number
  position?: 'top' | 'center' | 'bottom'
  top?: number
}>(), {
  message: '',
  type: 'info',
  duration: 2500,
  position: 'top',
  top: 32,
})

const emit = defineEmits<{ close: [] }>()
const visible = ref(true)

const iconName = computed(() => {
  const map: Record<string, string> = { info: 'info', success: 'success', warning: 'warning', error: 'error' }
  return map[props.type] || 'info'
})

const toastStyle = computed(() => {
  if (props.position === 'top') return { top: `${props.top}px` }
  return {}
})

let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  if (props.duration > 0 && props.type !== 'loading') {
    timer = setTimeout(() => {
      visible.value = false
      setTimeout(() => emit('close'), 300)
    }, props.duration)
  }
}

watch(visible, (v) => { if (!v) timer = null })

onMounted(startTimer)

onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<style lang="scss" scoped>
.nk-toast {
  position: fixed;
  left: 50%;
  display: inline-flex;
  align-items: center;
  gap: $nk-spacing-sm;
  padding: $nk-spacing-sm $nk-spacing-lg;
  border-radius: $nk-radius-full;
  font-size: $nk-font-size-sm;
  line-height: 1.4;
  z-index: $nk-z-toast;
  transform: translateX(-50%);
  pointer-events: none;
  max-width: 80vw;
  box-shadow: 0 10px 30px color-mix(in srgb, #0f172a 22%, transparent);
  backdrop-filter: blur(6px);

  &--top { top: $nk-spacing-2xl; }
  &--center { top: 50%; transform: translate(-50%, -50%); }
  &--bottom { bottom: $nk-spacing-2xl; }

  &--success { background: color-mix(in srgb, $nk-color-success 92%, transparent); color: $nk-color-on-success; }
  &--warning { background: color-mix(in srgb, $nk-color-warning 92%, transparent); color: $nk-color-on-warning; }
  &--error { background: color-mix(in srgb, $nk-color-error 92%, transparent); color: $nk-color-on-error; }
  &--info { background: color-mix(in srgb, $nk-color-info 92%, transparent); color: $nk-color-on-info; }
  &--loading,
  &--text {
    background: color-mix(in srgb, $nk-color-neutral-900 88%, transparent);
    color: $nk-color-neutral-0;
  }

  &__icon {
    display: flex;
    align-items: center;
  }

  &__message { white-space: nowrap; }
}

.nk-toast-fade-enter-active { transition: all 0.25s ease; }
.nk-toast-fade-leave-active { transition: all 0.2s ease; }
.nk-toast-fade-enter-from,
.nk-toast-fade-leave-to { opacity: 0; }
.nk-toast-fade-enter-from { transform: translateX(-50%) translateY(-10px); }
</style>
