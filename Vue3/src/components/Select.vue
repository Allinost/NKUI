<template>
  <div
    class="nk-select"
    :class="[`nk-select--${size}`, { 'nk-select--disabled': disabled, 'nk-select--open': isOpen, 'nk-select--error': !!error }]"
    ref="triggerRef"
  >
    <div
      class="nk-select__trigger"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      :tabindex="disabled ? -1 : filterable ? undefined : 0"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <input
        v-if="filterable"
        class="nk-select__search"
        :placeholder="displayText || placeholder"
        v-model="searchText"
        @input="onSearch"
        @click.stop
        :disabled="disabled"
      />
      <span v-else class="nk-select__value" :class="{ 'nk-select__placeholder': !displayText }">
        {{ displayText || placeholder }}
      </span>
      <button
        v-if="clearable && hasValue && !disabled"
        type="button"
        class="nk-select__clear"
        aria-label="清空选择"
        @click.stop="clear"
      >
        <nk-icon name="close" size="xs" />
      </button>
      <span class="nk-select__arrow" :class="{ 'nk-select__arrow--open': isOpen }">
        <nk-icon name="arrow-left" size="xs" />
      </span>
    </div>
    <Transition name="nk-select-dropdown">
      <div
        v-if="isOpen"
        :id="listboxId"
        class="nk-select__dropdown"
        :class="{ 'nk-select__dropdown--up': placement.up }"
        :style="dropdownStyle"
        role="listbox"
        :aria-multiselectable="multiple || undefined"
      >
        <div
          v-for="(opt, index) in filteredOptions"
          :key="opt.value"
          class="nk-select__option"
          :class="{
            'nk-select__option--selected': isSelected(opt.value),
            'nk-select__option--disabled': opt.disabled,
            'nk-select__option--active': index === activeIndex,
          }"
          role="option"
          :aria-selected="isSelected(opt.value)"
          :aria-disabled="opt.disabled || undefined"
          @click="select(opt)"
          @mouseenter="activeIndex = index"
        >
          <span>{{ opt.label }}</span>
          <nk-icon v-if="isSelected(opt.value)" name="check" size="sm" color="#2196F3" />
        </div>
        <div v-if="filteredOptions.length === 0" class="nk-select__empty">无匹配数据</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import NkIcon from './Icon.vue'

export interface SelectOption {
  label: string
  value: any
  disabled?: boolean
}

defineOptions({ name: 'NkSelect' })

const props = withDefaults(defineProps<{
  modelValue?: any
  options?: SelectOption[]
  multiple?: boolean
  filterable?: boolean
  clearable?: boolean
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  error?: string
}>(), {
  modelValue: undefined,
  options: () => [],
  multiple: false,
  filterable: false,
  clearable: false,
  placeholder: '请选择',
  disabled: false,
  size: 'md',
  loading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
  'visible-change': [visible: boolean]
}>()

const isOpen = ref(false)
const searchText = ref('')
const triggerRef = ref<HTMLElement>()
const activeIndex = ref(-1)

let uid = 0
const instance = getCurrentInstance()
const listboxId = `nk-select-listbox-${instance ? instance.uid : ++uid}`

const hasValue = computed(() => {
  if (props.multiple) return (props.modelValue || []).length > 0
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

const displayText = computed(() => {
  if (props.multiple) {
    const selected = (props.modelValue || []) as any[]
    if (selected.length === 0) return ''
    return selected.map(v => props.options.find(o => o.value === v)?.label).filter(Boolean).join(', ')
  }
  return props.options.find(o => o.value === props.modelValue)?.label || ''
})

const filteredOptions = computed(() => {
  if (!searchText.value) return props.options
  const q = searchText.value.toLowerCase()
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})

const dropdownMaxHeight = 256
const tick = ref(0)

function recompute() {
  if (isOpen.value) tick.value++
}

// Flip the dropdown upward when there is not enough space below the trigger,
// and cap its height to the available space so it is never clipped.
const placement = computed(() => {
  if (!isOpen.value || !triggerRef.value) return { up: false, maxHeight: dropdownMaxHeight }
  void tick.value
  const rect = triggerRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const up = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow
  const maxHeight = Math.max(80, Math.min(dropdownMaxHeight, (up ? spaceAbove : spaceBelow) - 8))
  return { up, maxHeight }
})

const dropdownStyle = computed(() => {
  if (!triggerRef.value || !isOpen.value) return {}
  const p = placement.value
  return {
    minWidth: `${triggerRef.value.offsetWidth}px`,
    maxHeight: `${p.maxHeight}px`,
    ...(p.up ? { bottom: 'calc(100% + 4px)' } : {}),
  }
})

watch(isOpen, (v) => {
  if (v) {
    nextTick(() => {
      recompute()
      moveActiveToSelected()
    })
  }
})

watch(filteredOptions, () => {
  if (activeIndex.value >= filteredOptions.value.length) {
    activeIndex.value = filteredOptions.value.length - 1
  }
})

onMounted(() => {
  window.addEventListener('resize', recompute)
  window.addEventListener('scroll', recompute, true)
  document.addEventListener('mousedown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', recompute)
  window.removeEventListener('scroll', recompute, true)
  document.removeEventListener('mousedown', onDocumentPointerDown)
})

function onDocumentPointerDown(event: MouseEvent) {
  if (!isOpen.value) return
  const root = triggerRef.value
  if (root && !root.contains(event.target as Node)) close()
}

function open() {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  emit('visible-change', true)
  moveActiveToSelected()
}

function close() {
  if (!isOpen.value) return
  isOpen.value = false
  emit('visible-change', false)
  searchText.value = ''
  activeIndex.value = -1
}

function toggle() {
  if (props.disabled) return
  if (isOpen.value) close()
  else open()
}

function moveActiveToSelected() {
  const options = filteredOptions.value
  if (!options.length) {
    activeIndex.value = -1
    return
  }
  const selected = options.findIndex((opt) => isSelected(opt.value))
  activeIndex.value = selected >= 0 ? selected : options.findIndex((opt) => !opt.disabled)
}

function isSelected(value: any) {
  if (props.multiple) return (props.modelValue || []).includes(value)
  return props.modelValue === value
}

function select(opt: SelectOption) {
  if (opt.disabled) return
  if (props.multiple) {
    const current = [...(props.modelValue || [])]
    const idx = current.indexOf(opt.value)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(opt.value)
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', opt.value)
    emit('change', opt.value)
    close()
  }
}

function clear() {
  const empty = props.multiple
    ? []
    : props.options.some((opt) => opt.value === '')
      ? ''
      : null
  emit('update:modelValue', empty)
  emit('change', empty)
  activeIndex.value = -1
}

function onSearch() {
  activeIndex.value = filteredOptions.value.length ? 0 : -1
}

function scrollActiveIntoView() {
  nextTick(() => {
    const root = triggerRef.value
    if (!root || activeIndex.value < 0) return
    const options = root.querySelectorAll<HTMLElement>('.nk-select__option')
    options[activeIndex.value]?.scrollIntoView({ block: 'nearest' })
  })
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const key = event.key
  if (key === 'Escape') {
    if (!isOpen.value) return
    event.stopPropagation()
    close()
    return
  }
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      open()
      return
    }
    const total = filteredOptions.value.length
    if (!total) return
    const step = key === 'ArrowDown' ? 1 : -1
    let next = activeIndex.value + step
    if (next < 0) next = total - 1
    if (next >= total) next = 0
    activeIndex.value = next
    scrollActiveIntoView()
    return
  }
  if (key === 'Enter' || key === ' ') {
    // 过滤输入框内的空格用于输入关键词，不拦截。
    if (key === ' ' && props.filterable) return
    event.preventDefault()
    if (!isOpen.value) {
      open()
      return
    }
    const opt = filteredOptions.value[activeIndex.value]
    if (opt) select(opt)
  }
}

watch(() => props.disabled, (v) => {
  if (v) close()
})
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (height: 28px, font: $nk-font-size-sm, padding: 0 8px, radius: $nk-radius-sm),
  'md': (height: 36px, font: $nk-font-size-base, padding: 0 12px, radius: $nk-radius-sm),
  'lg': (height: 44px, font: $nk-font-size-lg, padding: 0 16px, radius: $nk-radius-md),
);

.nk-select {
  position: relative;
  display: inline-block;
  width: 100%;

  &--disabled { opacity: $nk-opacity-disabled; pointer-events: none; }

  @each $size, $map in $sizes {
    &--#{$size} &__trigger {
      height: map.get($map, height);
      font-size: map.get($map, font);
      padding: map.get($map, padding);
      border-radius: map.get($map, radius);
    }
  }

  &__trigger {
    display: flex;
    align-items: center;
    border: 1px solid $nk-color-neutral-300;
    background: $nk-color-neutral-0;
    cursor: pointer;
    gap: $nk-spacing-sm;
    transition: all $nk-duration-fast;

    &:hover { border-color: $nk-color-neutral-400; }

    &:focus-visible {
      outline: 2px solid $nk-color-primary-400;
      outline-offset: 2px;
    }
  }

  &--open &__trigger {
    border-color: $nk-color-primary-500;
    box-shadow: 0 0 0 3px rgba(var(--nk-color-primary-500-rgb), 0.12);
  }

  &--error &__trigger {
    border-color: $nk-color-error;
  }

  &__value { flex: 1; color: $nk-color-neutral-900; }
  &__placeholder { color: $nk-color-neutral-400; }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 2px;
    border-radius: 50%;
    cursor: pointer;
    color: $nk-color-neutral-400;
    transition: all $nk-duration-fast;
    flex-shrink: 0;

    &:hover {
      background: $nk-color-neutral-100;
      color: $nk-color-neutral-600;
    }

    &:focus-visible {
      outline: 2px solid $nk-color-primary-400;
      outline-offset: 1px;
    }
  }

  &__search {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    color: $nk-color-neutral-900;
    min-width: 0;

    &::placeholder { color: $nk-color-neutral-400; }
  }

  &__arrow {
    display: flex;
    align-items: center;
    color: $nk-color-neutral-400;
    transition: transform $nk-duration-fast;
    font-size: 10px;

    &--open { transform: rotate(-90deg); }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background: $nk-color-neutral-0;
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-sm;
    box-shadow: $nk-shadow-md;
    max-height: 256px;
    overflow-y: auto;
    z-index: $nk-z-dropdown;
  }

  &__dropdown--up {
    top: auto;
    bottom: calc(100% + 4px);
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $nk-spacing-sm $nk-spacing-md;
    font-size: $nk-font-size-sm;
    cursor: pointer;
    transition: background $nk-duration-fast;
    gap: $nk-spacing-sm;

    &:hover { background: $nk-color-neutral-50; }
    &--active { background: $nk-color-neutral-100; }
    &--selected { color: $nk-color-primary-500; font-weight: $nk-font-weight-medium; }
    &--disabled { opacity: $nk-opacity-disabled; cursor: not-allowed; }
  }

  &__empty {
    padding: $nk-spacing-lg;
    text-align: center;
    color: $nk-color-neutral-400;
    font-size: $nk-font-size-sm;
  }
}

.nk-select-dropdown-enter-active,
.nk-select-dropdown-leave-active { transition: all 0.2s ease; }
.nk-select-dropdown-enter-from,
.nk-select-dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
.nk-select__dropdown--up.nk-select-dropdown-enter-from,
.nk-select__dropdown--up.nk-select-dropdown-leave-to { transform: translateY(4px); }
</style>
