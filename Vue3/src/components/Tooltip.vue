<template>
  <span
    class="nk-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <Teleport to="body">
      <Transition name="nk-tooltip-fade">
        <span
          v-if="visible && content"
          class="nk-tooltip__content"
          :class="`nk-tooltip--${placement}`"
        >
          {{ content }}
        </span>
      </Transition>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'NkTooltip' })

const props = withDefaults(defineProps<{
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
}>(), {
  placement: 'top',
  delay: 150,
  disabled: false,
})

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function show() {
  if (props.disabled) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { visible.value = true }, props.delay)
}

function hide() {
  if (timer) clearTimeout(timer)
  visible.value = false
}
</script>

<style lang="scss" scoped>
.nk-tooltip {
  position: relative;
  display: inline-flex;

  &__content {
    position: fixed;
    padding: 6px 10px;
    background: $nk-color-neutral-900;
    color: #fff;
    font-size: $nk-font-size-sm;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: $nk-z-tooltip;
    line-height: 1.4;
    max-width: 200px;
  }
}

.nk-tooltip-fade-enter-active,
.nk-tooltip-fade-leave-active { transition: opacity 0.15s; }
.nk-tooltip-fade-enter-from,
.nk-tooltip-fade-leave-to { opacity: 0; }
</style>
