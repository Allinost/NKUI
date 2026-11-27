<template>
  <div class="nk-toolbar" :class="`nk-toolbar--${align}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NkToolbar' })

withDefaults(defineProps<{
  align?: 'start' | 'end' | 'between'
}>(), {
  align: 'start',
})
</script>

<style lang="scss" scoped>
// 子元素加 nk-toolbar__field 即为输入类控件：桌面端固定宽度，窄屏自动占满整行
.nk-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $nk-spacing-sm;
  margin-bottom: $nk-spacing-md;

  &--end {
    justify-content: flex-end;
  }

  &--between {
    justify-content: space-between;
  }

  > * {
    min-width: 0;
    max-width: 100%;
  }

  :deep(.nk-toolbar__field) {
    width: var(--nk-toolbar-field-width, 220px);
    max-width: 100%;
  }

  @include respond-to(sm) {
    gap: $nk-spacing-xs;

    :deep(.nk-toolbar__field) {
      width: 100%;
      flex: 1 1 100%;
    }
  }
}
</style>
