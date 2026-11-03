<template>
  <Teleport to="body">
    <Transition name="nk-dialog-fade">
      <div
        v-if="visible"
        class="nk-dialog__overlay"
        @mousedown.self="onMaskMouseDown"
        @click.self="onMaskClick"
      >
        <div
          ref="dialogRef"
          class="nk-dialog"
          :class="[`nk-dialog--${size}`]"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="hasTitle ? titleId : undefined"
          :aria-label="hasTitle ? undefined : '对话框'"
          tabindex="-1"
        >
          <div class="nk-dialog__header">
            <slot name="title">
              <span :id="titleId" class="nk-dialog__title-text">{{ title }}</span>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="nk-dialog__close"
              aria-label="关闭"
              @click="onCancel"
            >
              <nk-icon name="close" size="sm" />
            </button>
          </div>
          <div class="nk-dialog__body">
            <slot />
          </div>
          <div v-if="!$slots.footer" class="nk-dialog__footer">
            <nk-button v-if="cancelText" variant="outline" size="md" @click="onCancel">{{ cancelText }}</nk-button>
            <nk-button :loading="loading" size="md" @click="onConfirm">{{ confirmText }}</nk-button>
          </div>
          <div v-else class="nk-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import NkIcon from './Icon.vue'
import NkButton from './Button.vue'

defineOptions({ name: 'NkDialog' })

const props = withDefaults(defineProps<{
  visible?: boolean
  title?: string
  width?: string | number
  closable?: boolean
  maskClosable?: boolean
  closeOnEsc?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  visible: false,
  title: '',
  closable: true,
  maskClosable: true,
  closeOnEsc: true,
  confirmText: '确认',
  cancelText: '取消',
  loading: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: []
  cancel: []
  close: []
}>()

const slots = useSlots()
const sizeMap: Record<string, string> = { sm: '320px', md: '420px', lg: '560px' }
const dialogStyle = computed(() => ({
  width:
    props.width === undefined || props.width === ''
      ? sizeMap[props.size] || '420px'
      : typeof props.width === 'number'
        ? `${props.width}px`
        : props.width,
}))

const hasTitle = computed(() => !!props.title || !!slots.title)

let uid = 0
const instance = getCurrentInstance()
const titleId = `nk-dialog-title-${instance ? instance.uid : ++uid}`

const dialogRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableItems(): HTMLElement[] {
  const root = dialogRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )
}

function onKeydown(event: KeyboardEvent) {
  if (!props.visible) return
  if (event.key === 'Escape') {
    if (!props.closeOnEsc) return
    // 只关闭最上层弹窗：后打开的先响应。
    if (dialogRef.value && dialogRef.value.dataset.topmost !== 'true') return
    event.stopPropagation()
    onCancel()
    return
  }
  if (event.key !== 'Tab') return
  const items = focusableItems()
  if (!items.length) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  } else if (event.shiftKey && (active === first || !dialogRef.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  }
}

let openCount = 0
let previousOverflow = ''

function activate() {
  previouslyFocused = document.activeElement as HTMLElement | null
  openCount++
  if (openCount === 1) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  const all = Array.from(document.querySelectorAll<HTMLElement>('.nk-dialog'))
  all.forEach((el) => delete el.dataset.topmost)
  nextTick(() => {
    const root = dialogRef.value
    if (!root) return
    root.dataset.topmost = 'true'
    // 优先聚焦内容区首个控件，避免默认聚焦到右上角关闭按钮。
    const target =
      root.querySelector<HTMLElement>(`.nk-dialog__body ${FOCUSABLE.split(',').join(', .nk-dialog__body ')}`) ||
      root.querySelector<HTMLElement>(FOCUSABLE) ||
      root
    target.focus({ preventScroll: true })
  })
  document.addEventListener('keydown', onKeydown, true)
}

function deactivate() {
  openCount = Math.max(0, openCount - 1)
  if (openCount === 0) {
    document.body.style.overflow = previousOverflow
  }
  document.removeEventListener('keydown', onKeydown, true)
  const root = dialogRef.value
  if (root) delete root.dataset.topmost
  // 关闭上层弹窗后，把焦点标记交还给仍在打开的最上层弹窗。
  const remaining = Array.from(document.querySelectorAll<HTMLElement>('.nk-dialog')).filter(
    (el) => el !== root,
  )
  const topmost = remaining[remaining.length - 1]
  if (topmost) topmost.dataset.topmost = 'true'
  const target = previouslyFocused
  previouslyFocused = null
  nextTick(() => {
    if (target && typeof target.focus === 'function' && document.contains(target)) {
      target.focus({ preventScroll: true })
    }
  })
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) activate()
    else deactivate()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (props.visible) deactivate()
})

function onConfirm() {
  emit('confirm')
}
function onCancel() {
  emit('cancel')
  emit('close')
  emit('update:visible', false)
}

// Only treat a click as a mask click when the pointer press also started on the
// mask. This prevents closing the dialog when text is selected inside the dialog
// and the mouse is released outside of it.
const maskPressed = ref(false)
function onMaskMouseDown() {
  maskPressed.value = true
}
function onMaskClick() {
  if (props.maskClosable && maskPressed.value) onCancel()
  maskPressed.value = false
}
</script>

<style lang="scss" scoped>
.nk-dialog__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $nk-z-modal;
}

.nk-dialog {
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-lg;
  box-shadow: $nk-shadow-lg;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  outline: none;

  &:focus-visible {
    box-shadow: $nk-shadow-lg, 0 0 0 3px $nk-color-primary-200;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $nk-spacing-lg $nk-spacing-xl;
    border-bottom: 1px solid $nk-color-neutral-100;
  }

  &__title-text {
    font-size: $nk-font-size-lg;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    color: $nk-color-neutral-400;
    padding: 4px;
    border-radius: $nk-radius-sm;
    transition: all $nk-duration-fast;

    &:hover {
      background: $nk-color-neutral-100;
      color: $nk-color-neutral-700;
    }

    &:focus-visible {
      outline: 2px solid $nk-color-primary-400;
      outline-offset: 2px;
    }
  }

  &__body {
    padding: $nk-spacing-xl;
    overflow-y: auto;
    flex: 1;
    color: $nk-color-neutral-700;
    font-size: $nk-font-size-base;
    line-height: $nk-line-height-relaxed;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: $nk-spacing-sm;
    padding: $nk-spacing-lg $nk-spacing-xl;
    border-top: 1px solid $nk-color-neutral-100;
  }
}

.nk-dialog-fade-enter-active { transition: opacity 0.25s; }
.nk-dialog-fade-leave-active { transition: opacity 0.2s; }
.nk-dialog-fade-enter-from,
.nk-dialog-fade-leave-to { opacity: 0; }

.nk-dialog-fade-enter-active .nk-dialog {
  animation: nk-dialog-enter 0.25s ease;
}

@media (prefers-reduced-motion: reduce) {
  .nk-dialog-fade-enter-active,
  .nk-dialog-fade-leave-active {
    transition: none;
  }

  .nk-dialog-fade-enter-active .nk-dialog {
    animation: none;
  }
}

@keyframes nk-dialog-enter {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
