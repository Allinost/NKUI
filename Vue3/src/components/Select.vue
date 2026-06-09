<template>
  <div
    class="nk-select"
    :class="[`nk-select--${size}`, { 'nk-select--disabled': disabled, 'nk-select--open': isOpen, 'nk-select--error': !!error }]"
    ref="triggerRef"
  >
    <div class="nk-select__trigger" @click="toggle">
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
      <span class="nk-select__arrow" :class="{ 'nk-select__arrow--open': isOpen }">
        <nk-icon name="arrow-left" size="xs" />
      </span>
    </div>
    <Transition name="nk-select-dropdown">
      <div v-if="isOpen" class="nk-select__dropdown" :style="dropdownStyle">
        <div
          v-for="opt in filteredOptions"
          :key="opt.value"
          class="nk-select__option"
          :class="{ 'nk-select__option--selected': isSelected(opt.value), 'nk-select__option--disabled': opt.disabled }"
          @click="select(opt)"
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
import { ref, computed, watch } from 'vue'
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

const dropdownStyle = computed(() => {
  if (!triggerRef.value) return {}
  return { minWidth: `${triggerRef.value.offsetWidth}px` }
})

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('visible-change', isOpen.value)
  if (!isOpen.value) searchText.value = ''
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
    isOpen.value = false
    emit('visible-change', false)
    searchText.value = ''
  }
}

function onSearch() { /* just reactively filter */ }

watch(() => props.disabled, (v) => { if (v) isOpen.value = false })
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
    background: #fff;
    cursor: pointer;
    gap: $nk-spacing-sm;
    transition: all $nk-duration-fast;

    &:hover { border-color: $nk-color-neutral-400; }
  }

  &--open &__trigger {
    border-color: $nk-color-primary-500;
    box-shadow: 0 0 0 3px rgba($nk-color-primary-500, 0.12);
  }

  &--error &__trigger {
    border-color: $nk-color-error;
  }

  &__value { flex: 1; color: $nk-color-neutral-900; }
  &__placeholder { color: $nk-color-neutral-400; }

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
    background: #fff;
    border: 1px solid $nk-color-neutral-200;
    border-radius: $nk-radius-sm;
    box-shadow: $nk-shadow-md;
    max-height: 256px;
    overflow-y: auto;
    z-index: $nk-z-dropdown;
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
</style>
