<template>
  <div class="nk-pdf-viewer" :style="{ width, height }">
    <iframe
      v-if="!error"
      class="nk-pdf-viewer__frame"
      :src="pdfSrc"
      :title="title"
      frameborder="0"
      @error="onError"
      @load="onLoad"
    />
    <div v-else class="nk-pdf-viewer__error">
      <svg viewBox="0 0 16 16" width="32" height="32"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM5.854 5.146a.5.5 0 1 1 .708-.708L8 6.293l1.646-1.647a.5.5 0 1 1 .708.708L8.707 7l1.647 1.646a.5.5 0 1 1-.708.708L8 7.707l-1.646 1.647a.5.5 0 1 1-.708-.708L7.293 7 5.854 5.854z" fill="currentColor"/></svg>
      <p>PDF 加载失败</p>
    </div>
    <div v-if="loading" class="nk-pdf-viewer__loading">
      <div class="nk-pdf-viewer__spinner" />
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'NkPdfViewer' })

const props = withDefaults(defineProps<{
  src: string
  title?: string
  width?: string
  height?: string
}>(), {
  title: 'PDF',
  width: '100%',
  height: '600px',
})

const pdfSrc = computed(() => {
  const s = props.src
  if (s.includes('docs.google.com')) return s
  return s
})

const loading = ref(true)
const error = ref(false)

function onLoad() { loading.value = false }
function onError() { loading.value = false; error.value = true }
</script>

<style lang="scss" scoped>
.nk-pdf-viewer {
  position: relative;
  overflow: hidden;
  border-radius: $nk-radius-md;
  border: 1px solid $nk-color-neutral-200;
  background: $nk-color-neutral-50;

  &__frame {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: $nk-spacing-md;
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-base;
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $nk-spacing-sm;
    background: $nk-color-neutral-0;
    color: $nk-color-neutral-500;
    font-size: $nk-font-size-sm;
    z-index: 1;
  }

  &__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid $nk-color-neutral-200;
    border-top-color: $nk-color-primary-500;
    border-radius: $nk-radius-full;
    animation: nk-pdf-spin 0.8s linear infinite;
  }
}

@keyframes nk-pdf-spin {
  to { transform: rotate(360deg); }
}
</style>
