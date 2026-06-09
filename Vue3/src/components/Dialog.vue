<template>
  <Teleport to="body">
    <Transition name="nk-dialog-fade">
      <div v-if="visible" class="nk-dialog__overlay" @click.self="onMaskClick">
        <div class="nk-dialog" :class="[`nk-dialog--${size}`]" :style="dialogStyle">
          <div class="nk-dialog__header">
            <slot name="title">
              <span class="nk-dialog__title-text">{{ title }}</span>
            </slot>
            <button v-if="closable" class="nk-dialog__close" @click="onCancel">
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
import { computed } from 'vue'
import NkIcon from './Icon.vue'
import NkButton from './Button.vue'

defineOptions({ name: 'NkDialog' })

const props = withDefaults(defineProps<{
  visible?: boolean
  title?: string
  width?: string
  closable?: boolean
  maskClosable?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  visible: false,
  title: '',
  closable: true,
  maskClosable: true,
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

const sizeMap: Record<string, string> = { sm: '320px', md: '420px', lg: '560px' }
const dialogStyle = computed(() => ({
  width: props.width || sizeMap[props.size] || '420px',
}))

function onConfirm() { emit('confirm') }
function onCancel() { emit('cancel'); emit('update:visible', false) }
function onMaskClick() { if (props.maskClosable) onCancel() }
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

@keyframes nk-dialog-enter {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
