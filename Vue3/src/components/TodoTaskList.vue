<template>
  <div
    class="nk-todo-task-list"
    :class="{ 'nk-todo-task-list--bordered': bordered, 'nk-todo-task-list--loading': loading }"
  >
    <div v-if="$slots.header" class="nk-todo-task-list__header">
      <slot name="header" />
    </div>

    <div v-if="loading && $slots.skeleton" class="nk-todo-task-list__skeleton">
      <slot name="skeleton" />
    </div>

    <div v-else-if="data && data.length" class="nk-todo-task-list__body">
      <TodoTask
        v-for="(item, index) in data"
        :key="index"
        :checked="getItemChecked(item)"
        :title="getItemTitle(item)"
        :category="getItemCategory(item)"
        :color="getItemColor(item)"
        :due-date="getItemDueDate(item)"
        :start-date="getItemStartDate(item)"
        :notes="getItemNotes(item)"
        :repeat="getItemRepeat(item)"
        :reminder="getItemReminder(item)"
        :size="itemSize"
        @update:checked="(v) => onCheckedChange(v, item, index)"
        @click="onItemClick(item, index)"
      />
    </div>

    <Empty v-else-if="!loading" v-bind="emptyProps" size="sm">
      <template v-if="$slots.empty" #default>
        <slot name="empty" />
      </template>
    </Empty>

    <div v-if="$slots.footer" class="nk-todo-task-list__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TodoTask from './TodoTask.vue'
import Empty from './Empty.vue'

defineOptions({ name: 'NkTodoTaskList' })

const props = withDefaults(defineProps<{
  data?: any[]
  size?: 'sm' | 'lg'
  bordered?: boolean
  loading?: boolean
  emptyText?: string
  emptyImage?: string
  itemChecked?: string
  itemTitle?: string
  itemCategory?: string
  itemColor?: string
  itemDueDate?: string
  itemStartDate?: string
  itemNotes?: string
  itemRepeat?: string
  itemReminder?: string
}>(), {
  data: () => [],
  size: 'sm',
  bordered: false,
  loading: false,
  emptyText: '暂无待办任务',
  itemChecked: '',
  itemTitle: '',
  itemCategory: '',
  itemColor: '',
  itemDueDate: '',
  itemStartDate: '',
  itemNotes: '',
  itemRepeat: '',
  itemReminder: '',
})

const emit = defineEmits<{
  'itemClick': [item: any, index: number]
  'checkedChange': [item: any, index: number, checked: boolean]
}>()

const itemSize = computed(() => props.size)

const emptyProps = computed(() => ({
  description: props.emptyText,
  image: props.emptyImage || undefined,
}))

function getItemChecked(item: any): boolean {
  const val = props.itemChecked ? item[props.itemChecked] : item.checked
  return !!val
}

function getItemTitle(item: any): string {
  return props.itemTitle ? item[props.itemTitle] : item.title || item.name || ''
}

function getItemCategory(item: any): string {
  return props.itemCategory ? item[props.itemCategory] : item.category || 'default'
}

function getItemColor(item: any): string {
  return props.itemColor ? item[props.itemColor] : item.color || ''
}

function getItemDueDate(item: any): string {
  return props.itemDueDate ? item[props.itemDueDate] : item.dueDate || item.due || ''
}

function getItemStartDate(item: any): string {
  return props.itemStartDate ? item[props.itemStartDate] : item.startDate || item.start || ''
}

function getItemNotes(item: any): string {
  return props.itemNotes ? item[props.itemNotes] : item.notes || item.note || ''
}

function getItemRepeat(item: any): string {
  return props.itemRepeat ? item[props.itemRepeat] : item.repeat || ''
}

function getItemReminder(item: any): string {
  return props.itemReminder ? item[props.itemReminder] : item.reminder || item.remind || ''
}

function onCheckedChange(v: boolean, item: any, index: number) {
  emit('checkedChange', item, index, v)
}

function onItemClick(item: any, index: number) {
  emit('itemClick', item, index)
}
</script>

<style lang="scss" scoped>
.nk-todo-task-list {
  display: flex;
  flex-direction: column;
  background: $nk-color-neutral-0;
  border-radius: $nk-radius-md;
  overflow: hidden;

  &--bordered {
    border: 1px solid $nk-color-neutral-200;
  }

  &--loading {
    opacity: 0.7;
    pointer-events: none;
  }

  &__header {
    padding: $nk-spacing-md $nk-spacing-lg;
    border-bottom: 1px solid $nk-color-neutral-200;
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-800;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: $nk-spacing-sm;
  }

  &__footer {
    padding: $nk-spacing-md $nk-spacing-lg;
    border-top: 1px solid $nk-color-neutral-200;
    color: $nk-color-neutral-600;
    font-size: $nk-font-size-sm;
  }

  &__skeleton {
    padding: $nk-spacing-lg;
  }
}
</style>
