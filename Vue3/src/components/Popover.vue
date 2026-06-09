<template>
  <span class="nk-popover" ref="triggerRef">
    <span class="nk-popover__trigger" @click="toggle" @mouseenter="onEnter" @mouseleave="onLeave">
      <slot name="reference" />
    </span>
    <Teleport to="body">
      <Transition name="nk-popover-fade">
        <div v-if="visible" class="nk-popover__panel" :style="panelStyle">
          <div class="nk-popover__arrow" />
          <div class="nk-popover__content">
            <slot>{{ content }}</slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'NkPopover' })

const props = withDefaults(defineProps<{
  trigger?: 'click' | 'hover' | 'focus'
  placement?: string
  content?: string
  width?: string | number
  disabled?: boolean
}>(), {
  trigger: 'click',
  placement: 'bottom',
  width: '200px',
  disabled: false,
})

const emit = defineEmits<{ 'visible-change': [visible: boolean] }>()
const visible = ref(false)
const triggerRef = ref<HTMLElement>()
let hoverTimer: ReturnType<typeof setTimeout> | null = null

const panelStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

function toggle() {
  if (props.disabled || props.trigger !== 'click') return
  visible.value = !visible.value
  emit('visible-change', visible.value)
}

function onEnter() {
  if (props.trigger === 'hover') {
    if (hoverTimer) clearTimeout(hoverTimer)
    hoverTimer = setTimeout(() => { visible.value = true; emit('visible-change', true) }, 150)
  }
}

function onLeave() {
  if (props.trigger === 'hover') {
    if (hoverTimer) clearTimeout(hoverTimer)
    hoverTimer = setTimeout(() => { visible.value = false; emit('visible-change', false) }, 100)
  }
}
</script>

<style lang="scss" scoped>
.nk-popover {
  position: relative;
  display: inline-flex;

  &__trigger { cursor: pointer; }

  &__panel {
    position: fixed;
    background: #fff;
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-md;
    box-shadow: $nk-shadow-md;
    z-index: $nk-z-popover;
    padding: $nk-spacing-md $nk-spacing-lg;
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-700;
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border: 1px solid $nk-color-neutral-200;
    transform: rotate(45deg);
    z-index: -1;
  }

  &__content { position: relative; }
}

.nk-popover-fade-enter-active,
.nk-popover-fade-leave-active { transition: opacity 0.2s; }
.nk-popover-fade-enter-from,
.nk-popover-fade-leave-to { opacity: 0; }
</style>
