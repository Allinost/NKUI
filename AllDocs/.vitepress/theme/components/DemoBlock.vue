<template>
  <div class="demo-block">
    <div class="demo-block-preview">
      <slot />
    </div>
    <div class="demo-block-meta">
      <slot name="title" />
      <slot name="description" />
    </div>
    <div v-if="$slots.code" class="demo-block-code">
      <slot name="code" />
    </div>
  </div>
</template>

<style lang="scss">
.demo-block {
  border: 1px solid $nk-color-neutral-200;
  border-radius: $nk-radius-md;
  margin: $nk-spacing-lg 0;
  overflow: hidden;

  &-preview {
    padding: $nk-spacing-xl;
    background: #fff;
    border-bottom: 1px solid $nk-color-neutral-100;
  }

  &-meta {
    padding: $nk-spacing-md $nk-spacing-lg;
    background: $nk-color-neutral-50;
    font-size: $nk-font-size-sm;
    color: $nk-color-neutral-600;
  }

  &-code {
    border-top: 1px solid $nk-color-neutral-200;
    pre {
      margin: 0;
      border-radius: 0;
    }
  }
}
</style>
