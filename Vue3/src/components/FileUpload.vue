<template>
  <div class="nk-file-upload" :class="[`nk-file-upload--${size}`, `nk-file-upload--${variant}`, { 'nk-file-upload--disabled': disabled }]">
    <div
      class="nk-file-upload__trigger"
      :class="{ 'nk-file-upload__trigger--dragover': dragover }"
      @click="triggerInput"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      @drop.prevent="onDrop"
    >
      <Icon v-if="variant === 'drag'" name="upload" size="xl" />
      <span class="nk-file-upload__text">
        <template v-if="variant === 'drag'">将文件拖拽到此处，或点击上传</template>
        <template v-else-if="variant === 'text'">点击上传文件</template>
        <template v-else>选择文件</template>
      </span>
      <span v-if="accept" class="nk-file-upload__hint">支持 {{ accept }} 格式</span>
    </div>
    <input
      ref="inputRef"
      type="file"
      class="nk-file-upload__input"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    />
    <div v-if="files.length > 0" class="nk-file-upload__list">
      <div v-for="(file, idx) in files" :key="idx" class="nk-file-upload__file">
        <Icon name="file" size="sm" />
        <span class="nk-file-upload__name">{{ file.name }}</span>
        <span class="nk-file-upload__size">{{ formatSize(file.size) }}</span>
        <button class="nk-file-upload__remove" @click="remove(idx)">✕</button>
      </div>
    </div>
    <div v-if="error" class="nk-file-upload__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from './Icon.vue'

defineOptions({ name: 'NkFileUpload' })

const props = withDefaults(defineProps<{
  accept?: string
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
  variant?: 'button' | 'drag' | 'text'
  modelValue?: File[]
  size?: 'sm' | 'md' | 'lg'
}>(), {
  accept: '',
  multiple: false,
  maxSize: 0,
  disabled: false,
  variant: 'button',
  modelValue: () => [],
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: File[]]; change: [value: File[]]; remove: [value: { index: number; file: File }]; exceed: [] }>()

const inputRef = ref<HTMLInputElement>()
const dragover = ref(false)
const files = ref<File[]>(props.modelValue)
const error = ref('')

function triggerInput() {
  if (props.disabled) return
  inputRef.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  addFiles(Array.from(input.files))
  input.value = ''
}

function onDrop(e: DragEvent) {
  dragover.value = false
  if (props.disabled) return
  if (!e.dataTransfer?.files.length) return
  addFiles(Array.from(e.dataTransfer.files))
}

function addFiles(newFiles: File[]) {
  error.value = ''
  for (const f of newFiles) {
    if (props.maxSize > 0 && f.size > props.maxSize) {
      error.value = `文件 "${f.name}" 超出大小限制`
      emit('exceed')
      return
    }
    files.value.push(f)
  }
  emit('update:modelValue', files.value)
  emit('change', files.value)
}

function remove(idx: number) {
  const file = files.value[idx]
  files.value.splice(idx, 1)
  emit('remove', { index: idx, file })
  emit('update:modelValue', files.value)
  emit('change', files.value)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + 'B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB'
  return (bytes / 1024 / 1024).toFixed(1) + 'MB'
}
</script>

<style lang="scss" scoped>
.nk-file-upload {
  &--disabled { opacity: $nk-opacity-disabled; pointer-events: none; }

  &__trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $nk-spacing-sm;
    cursor: pointer;
    border: 2px dashed $nk-color-neutral-300;
    border-radius: $nk-radius-md;
    color: $nk-color-neutral-500;
    transition: all $nk-duration-fast;

    &:hover { border-color: $nk-color-primary-500; color: $nk-color-primary-500; }
  }

  &--sm &__trigger { min-height: 80px; padding: $nk-spacing-md; font-size: $nk-font-size-sm; }
  &--md &__trigger { min-height: 120px; padding: $nk-spacing-lg; font-size: $nk-font-size-base; }
  &--lg &__trigger { min-height: 160px; padding: $nk-spacing-xl; font-size: $nk-font-size-lg; }

  &--button &__trigger {
    flex-direction: row;
    min-height: auto;
    border-style: solid;
    border-color: $nk-color-neutral-200;
    border-radius: $nk-radius-sm;
    padding: $nk-spacing-sm $nk-spacing-lg;
    width: auto;
    display: inline-flex;
    background: $nk-color-neutral-0;
    font-size: $nk-font-size-base;
  }

  &--text &__trigger {
    flex-direction: row;
    min-height: auto;
    border: none;
    padding: 0;
    width: auto;
    display: inline-flex;
    color: $nk-color-primary-500;
    text-decoration: underline;
    font-size: $nk-font-size-base;
  }

  &__trigger--dragover {
    border-color: $nk-color-primary-500;
    background: $nk-color-primary-50;
  }

  &__hint {
    font-size: $nk-font-size-xs;
    color: $nk-color-neutral-400;
  }

  &__input { display: none; }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: $nk-spacing-sm;
  }

  &__file {
    display: flex;
    align-items: center;
    gap: $nk-spacing-sm;
    padding: $nk-spacing-sm $nk-spacing-md;
    background: $nk-color-neutral-50;
    border-radius: $nk-radius-sm;
    font-size: $nk-font-size-sm;
  }

  &__name { flex: 1; color: $nk-color-neutral-800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  &__size { color: $nk-color-neutral-400; flex-shrink: 0; }

  &__remove {
    border: none;
    background: none;
    cursor: pointer;
    color: $nk-color-neutral-400;
    font-size: $nk-font-size-sm;
    padding: 2px;
    &:hover { color: $nk-color-error; }
  }

  &__error { color: $nk-color-error; font-size: $nk-font-size-xs; margin-top: $nk-spacing-xs; }
}
</style>
