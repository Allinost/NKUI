<template>
  <div class="app">
    <h1>NKUI Vue3</h1>

    <section class="demo-section">
      <h2>Button</h2>
      <div class="demo-row">
        <nk-button>Default</nk-button>
        <nk-button type="success">Success</nk-button>
        <nk-button type="warning">Warning</nk-button>
        <nk-button type="danger">Danger</nk-button>
        <nk-button type="neutral">Neutral</nk-button>
      </div>
      <div class="demo-row">
        <nk-button variant="outline">Outline</nk-button>
        <nk-button variant="ghost">Ghost</nk-button>
        <nk-button variant="text">Text</nk-button>
      </div>
      <div class="demo-row">
        <nk-button size="sm">Small</nk-button>
        <nk-button size="md">Medium</nk-button>
        <nk-button size="lg">Large</nk-button>
      </div>
      <div class="demo-row">
        <nk-button loading>Loading</nk-button>
        <nk-button disabled>Disabled</nk-button>
        <nk-button block>Block</nk-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Input</h2>
      <div class="demo-row" style="flex-direction: column; max-width: 320px;">
        <nk-input v-model="inputVal" placeholder="Basic input" />
        <nk-input v-model="inputVal" placeholder="With label" label="用户名" />
        <nk-input v-model="inputVal" placeholder="Clearable" clearable />
        <nk-input v-model="inputVal" placeholder="With error" error="请输入有效内容" />
        <nk-input v-model="inputVal" placeholder="Disabled" disabled />
        <nk-input v-model="inputVal" size="sm" placeholder="Small" />
        <nk-input v-model="inputVal" size="lg" placeholder="Large" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Icon</h2>
      <div class="demo-row">
        <nk-icon name="info" />
        <nk-icon name="success" color="#4CAF50" />
        <nk-icon name="warning" color="#FF9800" />
        <nk-icon name="error" color="#F44336" />
        <nk-icon name="close" />
        <nk-icon name="check" />
        <nk-icon name="arrow-left" />
        <nk-icon name="arrow-right" />
        <nk-icon name="info" size="xl" />
        <nk-icon name="info" spin />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NkButton, NkInput, NkIcon } from './components'
import './styles/_reset.scss'
</script>

<style lang="scss">
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: $nk-spacing-3xl $nk-spacing-lg;

  h1 {
    font-size: $nk-font-size-3xl;
    margin-bottom: $nk-spacing-2xl;
  }
}

.demo-section {
  margin-bottom: $nk-spacing-2xl;

  h2 {
    font-size: $nk-font-size-xl;
    margin-bottom: $nk-spacing-lg;
    padding-bottom: $nk-spacing-sm;
    border-bottom: 1px solid $nk-color-neutral-200;
  }
}

.demo-row {
  display: flex;
  gap: $nk-spacing-sm;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: $nk-spacing-md;
}
</style>
