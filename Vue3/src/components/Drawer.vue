<template>
  <Teleport to="body">
    <Transition name="nk-drawer-fade">
      <div v-if="visible && showMask" class="nk-drawer__overlay" @click.self="onMaskClick" />
    </Transition>
    <Transition :name="`nk-drawer-slide-${direction}`">
      <div
        v-if="visible"
        ref="drawerRef"
        class="nk-drawer"
        :class="`nk-drawer--${direction}`"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="hasTitle ? titleId : undefined"
        :aria-label="hasTitle ? undefined : '抽屉'"
        tabindex="-1"
      >
        <div class="nk-drawer__header">
          <slot name="title">
            <span :id="titleId" class="nk-drawer__title-text">{{ title }}</span>
          </slot>
          <button
            v-if="closable"
            type="button"
            class="nk-drawer__close"
            aria-label="关闭"
            @click="onClose"
          >
            <nk-icon name="close" size="sm" />
          </button>
        </div>
        <div class="nk-drawer__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="nk-drawer__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkDrawer' })

const props = withDefaults(defineProps<{
  visible?: boolean
  title?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | number
  closable?: boolean
  maskClosable?: boolean
  showMask?: boolean
  closeOnEsc?: boolean
}>(), {
  visible: false,
  title: '',
  direction: 'right',
  size: 'md',
  closable: true,
  maskClosable: true,
  showMask: true,
  closeOnEsc: true,
})

const emit = defineEmits<{ 'update:visible': [value: boolean]; open: []; close: [] }>()

const sizeMap: Record<string, Record<string, string>> = {
  left: { sm: '300px', md: '400px', lg: '600px' },
  right: { sm: '300px', md: '400px', lg: '600px' },
  top: { sm: '200px', md: '300px', lg: '450px' },
  bottom: { sm: '200px', md: '300px', lg: '450px' },
}

const drawerStyle = computed(() => {
  const dir = props.direction
  const val = typeof props.size === 'number' ? `${props.size}px` : (sizeMap[dir]?.[props.size] || '400px')
  return dir === 'left' || dir === 'right' ? { width: val } : { height: val }
})

const slots = useSlots()
const hasTitle = computed(() => !!props.title || !!slots.title)

let uid = 0
const instance = getCurrentInstance()
const titleId = `nk-drawer-title-${instance ? instance.uid : ++uid}`

const drawerRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableItems(): HTMLElement[] {
  const root = drawerRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )
}

function onKeydown(event: KeyboardEvent) {
  if (!props.visible) return
  if (event.key === 'Escape') {
    if (!props.closeOnEsc) return
    event.stopPropagation()
    onClose()
    return
  }
  if (event.key !== 'Tab') return
  const items = focusableItems()
  if (!items.length) {
    event.preventDefault()
    drawerRef.value?.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  } else if (event.shiftKey && (active === first || !drawerRef.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  }
}

let previousOverflow = ''

function activate() {
  previouslyFocused = document.activeElement as HTMLElement | null
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    const root = drawerRef.value
    if (!root) return
    const target =
      root.querySelector<HTMLElement>(`.nk-drawer__body ${FOCUSABLE.split(',').join(', .nk-drawer__body ')}`) ||
      root.querySelector<HTMLElement>(FOCUSABLE) ||
      root
    target.focus({ preventScroll: true })
  })
  document.addEventListener('keydown', onKeydown, true)
}

function deactivate() {
  document.body.style.overflow = previousOverflow
  document.removeEventListener('keydown', onKeydown, true)
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

function onMaskClick() {
  if (props.maskClosable) onClose()
}
function onClose() {
  emit('update:visible', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
.nk-drawer__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: $nk-z-modal;
}

.nk-drawer {
  position: fixed;
  background: $nk-color-neutral-0;
  display: flex;
  flex-direction: column;
  z-index: $nk-z-modal + 1;
  box-shadow: $nk-shadow-lg;
  outline: none;

  &:focus-visible {
    box-shadow: $nk-shadow-lg, 0 0 0 3px $nk-color-primary-200;
  }

  &--left, &--right { top: 0; bottom: 0; }
  &--left { left: 0; }
  &--right { right: 0; }
  &--top, &--bottom { left: 0; right: 0; }
  &--top { top: 0; }
  &--bottom { bottom: 0; }

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
  }

  &__close {
    display: flex;
    border: none;
    background: none;
    cursor: pointer;
    color: $nk-color-neutral-400;
    padding: 4px;
    border-radius: $nk-radius-sm;
    transition: all $nk-duration-fast;

    &:hover { background: $nk-color-neutral-100; color: $nk-color-neutral-700; }

    &:focus-visible {
      outline: 2px solid $nk-color-primary-400;
      outline-offset: 2px;
    }
  }

  &__body { flex: 1; overflow-y: auto; padding: $nk-spacing-xl; }
  &__footer { padding: $nk-spacing-lg $nk-spacing-xl; border-top: 1px solid $nk-color-neutral-100; }
}

// Transitions
.nk-drawer-fade-enter-active,
.nk-drawer-fade-leave-active { transition: opacity 0.25s; }
.nk-drawer-fade-enter-from,
.nk-drawer-fade-leave-to { opacity: 0; }

.nk-drawer-slide-left-enter-active,
.nk-drawer-slide-left-leave-active,
.nk-drawer-slide-right-enter-active,
.nk-drawer-slide-right-leave-active { transition: transform 0.25s ease; }

.nk-drawer-slide-left-enter-from,
.nk-drawer-slide-left-leave-to { transform: translateX(-100%); }

.nk-drawer-slide-right-enter-from,
.nk-drawer-slide-right-leave-to { transform: translateX(100%); }

.nk-drawer-slide-top-enter-active,
.nk-drawer-slide-top-leave-active,
.nk-drawer-slide-bottom-enter-active,
.nk-drawer-slide-bottom-leave-active { transition: transform 0.25s ease; }

.nk-drawer-slide-top-enter-from,
.nk-drawer-slide-top-leave-to { transform: translateY(-100%); }

.nk-drawer-slide-bottom-enter-from,
.nk-drawer-slide-bottom-leave-to { transform: translateY(100%); }

@media (prefers-reduced-motion: reduce) {
  .nk-drawer-fade-enter-active,
  .nk-drawer-fade-leave-active,
  .nk-drawer-slide-left-enter-active,
  .nk-drawer-slide-left-leave-active,
  .nk-drawer-slide-right-enter-active,
  .nk-drawer-slide-right-leave-active,
  .nk-drawer-slide-top-enter-active,
  .nk-drawer-slide-top-leave-active,
  .nk-drawer-slide-bottom-enter-active,
  .nk-drawer-slide-bottom-leave-active {
    transition: none;
  }
}
</style>
