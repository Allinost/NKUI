<template>
  <div
    class="nk-todo-task"
    :class="[`nk-todo-task--${size}`, { 'nk-todo-task--done': checked }]"
    @click="onClick"
  >
    <div class="nk-todo-task__checkbox" @click.stop="toggleCheck">
      <span :class="['nk-todo-task__check-icon', { 'nk-todo-task__check-icon--checked': checked }]">
        <nk-icon v-if="checked" name="check" size="xs" />
      </span>
    </div>
    <div class="nk-todo-task__body">
      <div class="nk-todo-task__row">
        <div class="nk-todo-task__title-area">
          <span
            class="nk-todo-task__dot"
            :style="{ background: categoryColor }"
          />
          <span class="nk-todo-task__title">{{ title }}</span>
        </div>
        <span v-if="dueDate" class="nk-todo-task__due">{{ dueDate }}</span>
      </div>
      <div v-if="size === 'lg'" class="nk-todo-task__row nk-todo-task__row--meta">
        <span v-if="notes" class="nk-todo-task__notes">{{ notes }}</span>
        <div class="nk-todo-task__meta-right">
          <span v-if="repeat" class="nk-todo-task__repeat">
            <nk-icon name="refresh" size="xs" />
            {{ repeat }}
          </span>
          <span v-if="reminder" class="nk-todo-task__reminder">
            <nk-icon name="info" size="xs" />
            {{ reminder }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NkIcon from './Icon.vue'

defineOptions({ name: 'NkTodoTask' })

const props = withDefaults(defineProps<{
  checked?: boolean
  title?: string
  category?: string
  color?: string
  dueDate?: string
  startDate?: string
  notes?: string
  repeat?: string
  reminder?: string
  size?: 'sm' | 'lg'
}>(), {
  checked: false,
  title: '',
  category: 'default',
  color: '',
  dueDate: '',
  startDate: '',
  notes: '',
  repeat: '',
  reminder: '',
  size: 'sm',
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
  click: [event: MouseEvent]
}>()

const categoryColors: Record<string, string> = {
  default: '#9E9E9E',
  work: '#2196F3',
  personal: '#4CAF50',
  urgent: '#F44336',
  study: '#FF9800',
  health: '#9C27B0',
  finance: '#009688',
  social: '#E91E63',
  shopping: '#FF5722',
  travel: '#00BCD4',
}

const categoryColor = computed(() => {
  if (props.color) return props.color
  return categoryColors[props.category] || categoryColors.default
})

function toggleCheck() {
  emit('update:checked', !props.checked)
}

function onClick(e: MouseEvent) {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
.nk-todo-task {
  display: flex;
  align-items: flex-start;
  gap: $nk-spacing-sm;
  padding: $nk-spacing-sm $nk-spacing-md;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-sm;
  transition: background $nk-duration-fast $nk-easing-ease;
  cursor: default;

  &:hover {
    background: $nk-color-neutral-50;
  }

  &--done {
    opacity: 0.6;

    .nk-todo-task__title {
      text-decoration: line-through;
      color: $nk-color-neutral-400;
    }
  }

  &--sm {
    .nk-todo-task__row {
      min-height: 32px;
    }
  }

  &--lg {
    .nk-todo-task__row {
      min-height: 24px;
    }
  }

  &__checkbox {
    flex-shrink: 0;
    padding-top: 2px;
    cursor: pointer;
  }

  &__check-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid $nk-color-neutral-300;
    transition: all $nk-duration-fast $nk-easing-ease;
    color: transparent;

    &--checked {
      background: $nk-color-primary-500;
      border-color: $nk-color-primary-500;
      color: #fff;
    }
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $nk-spacing-sm;

    &--meta {
      margin-top: 2px;
    }
  }

  &__title-area {
    display: flex;
    align-items: center;
    gap: $nk-spacing-xs;
    flex: 1;
    min-width: 0;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__title {
    font-size: $nk-font-size-base;
    color: $nk-color-neutral-900;
    font-weight: $nk-font-weight-medium;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__due {
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-400;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__notes {
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  &__meta-right {
    display: flex;
    align-items: center;
    gap: $nk-spacing-sm;
    flex-shrink: 0;
  }

  &__repeat,
  &__reminder {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-400;
    white-space: nowrap;
  }
}
</style>
