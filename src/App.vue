<script setup lang="ts">
import { watch } from 'vue'
import { useTheme } from 'vue-tg'
import ScrollableCalendar from './components/ScrollableCalendar.vue'

const theme = useTheme()

// Адаптируем тему Telegram (следим за сменой темы)
// Адаптируем тему Telegram (следим за сменой light/dark)
if (theme?.colorScheme) {
  watch(theme.colorScheme, (scheme) => {
    if (scheme) {
      document.documentElement.setAttribute('data-color-scheme', String(scheme))
    }
  }, { immediate: true })
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Eva Rehab</h1>
      <p class="subtitle">Выберите дату</p>
    </header>
    <ScrollableCalendar />
  </div>
</template>

<style>
:root {
  --tg-theme-bg-color: #1a1a2e;
  --tg-theme-text-color: #eaeaea;
  --tg-theme-hint-color: #a0a0a0;
  --tg-theme-link-color: #7c3aed;
  --tg-theme-button-color: #7c3aed;
  --tg-theme-button-text-color: #ffffff;
  --header-height: 80px;
}

[data-color-scheme="light"] {
  --tg-theme-bg-color: #f8f9fa;
  --tg-theme-text-color: #1a1a2e;
  --tg-theme-hint-color: #6b7280;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  flex-shrink: 0;
  padding: 16px 20px;
  background: var(--tg-theme-bg-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

[data-color-scheme="light"] .header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.subtitle {
  margin-top: 4px;
  font-size: 0.9rem;
  color: var(--tg-theme-hint-color);
}
</style>
