<template>
  <div class="nk-markdown-viewer" :class="{ 'nk-markdown-viewer--loading': loading }">
    <div v-if="loading" class="nk-markdown-viewer__loading">
      <div v-for="n in 4" :key="n" class="nk-markdown-viewer__skeleton" :style="{ width: `${50 + Math.random() * 40}%` }" />
    </div>
    <div v-else-if="error" class="nk-markdown-viewer__error">
      <svg viewBox="0 0 16 16" width="32" height="32"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM5.854 5.146a.5.5 0 1 1 .708-.708L8 6.293l1.646-1.647a.5.5 0 1 1 .708.708L8.707 7l1.647 1.646a.5.5 0 1 1-.708.708L8 7.707l-1.646 1.647a.5.5 0 1 1-.708-.708L7.293 7 5.854 5.854z" fill="currentColor"/></svg>
      <p>内容加载失败</p>
    </div>
    <div v-else class="nk-markdown-viewer__content" v-html="rendered" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'

defineOptions({ name: 'NkMarkdownViewer' })

const props = withDefaults(defineProps<{
  content?: string
  src?: string
}>(), {})

const raw = ref('')
const loading = ref(false)
const error = ref(false)

async function fetchMarkdown(url: string) {
  loading.value = true
  error.value = false
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    raw.value = await res.text()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(() => props.src, (val) => {
  if (val) fetchMarkdown(val)
  else raw.value = ''
}, { immediate: true })

watch(() => props.content, (val) => {
  if (val !== undefined) raw.value = val
}, { immediate: true })

const rendered = computed(() => {
  if (!raw.value) return ''
  return marked.parse(raw.value, { async: false }) as string
})
</script>

<style lang="scss" scoped>
.nk-markdown-viewer {
  padding: $nk-spacing-lg;
  border: 1px solid $nk-color-neutral-200;
  border-radius: $nk-radius-md;
  background: $nk-color-neutral-0;
  font-size: $nk-font-size-base;
  line-height: $nk-line-height-relaxed;
  overflow: auto;

  &__content {
    :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
      margin: 1.5em 0 0.5em;
      font-weight: $nk-font-weight-semibold;
      line-height: $nk-line-height-tight;
    }

    :deep(h1) { font-size: 1.75em; border-bottom: 1px solid $nk-color-neutral-200; padding-bottom: 0.3em; }
    :deep(h2) { font-size: 1.5em; border-bottom: 1px solid $nk-color-neutral-200; padding-bottom: 0.25em; }
    :deep(h3) { font-size: 1.25em; }
    :deep(h4) { font-size: 1.1em; }

    :deep(p) { margin: 0.5em 0; }

    :deep(ul), :deep(ol) {
      padding-left: 2em;
      margin: 0.5em 0;
    }

    :deep(li) { margin: 0.25em 0; }

    :deep(a) {
      color: $nk-color-primary-500;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    :deep(blockquote) {
      margin: 0.5em 0;
      padding: 0.5em 1em;
      border-left: 4px solid $nk-color-primary-300;
      background: $nk-color-neutral-50;
      color: $nk-color-neutral-700;
    }

    :deep(code) {
      font-family: $nk-font-family-mono;
      background: $nk-color-neutral-100;
      padding: 0.15em 0.4em;
      border-radius: $nk-radius-sm;
      font-size: 0.9em;
    }

    :deep(pre) {
      background: $nk-color-neutral-100;
      padding: $nk-spacing-md;
      border-radius: $nk-radius-md;
      overflow-x: auto;

      code {
        background: none;
        padding: 0;
        border-radius: 0;
      }
    }

    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 0.5em 0;

      th, td {
        border: 1px solid $nk-color-neutral-200;
        padding: $nk-spacing-sm $nk-spacing-md;
        text-align: left;
      }

      th {
        background: $nk-color-neutral-50;
        font-weight: $nk-font-weight-semibold;
      }

      tr:nth-child(even) {
        background: $nk-color-neutral-50;
      }
    }

    :deep(img) {
      max-width: 100%;
      border-radius: $nk-radius-sm;
    }

    :deep(hr) {
      border: none;
      border-top: 1px solid $nk-color-neutral-200;
      margin: 1.5em 0;
    }

    :deep(strong) { font-weight: $nk-font-weight-semibold; }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $nk-spacing-md;
    padding: $nk-spacing-lg 0;
  }

  &__skeleton {
    height: 14px;
    background: $nk-color-neutral-200;
    border-radius: $nk-radius-sm;
    animation: nk-md-pulse 1.5s ease-in-out infinite;

    &:nth-child(2) { height: 40px; }
    &:nth-child(4) { height: 10px; width: 70% !important; }
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $nk-spacing-3xl;
    gap: $nk-spacing-md;
    color: $nk-color-neutral-500;
  }
}

@keyframes nk-md-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
