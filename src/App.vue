<template>
  <DevSimulator
    v-if="showDevSimulator"
    :visible="showDevSimulator"
    :initial-scheme="initialDevScheme"
    :viewport-width="devViewportWidth"
    @theme-change="(s) => { initialDevScheme = s }"
    @viewport-change="(w) => { devViewportWidth = w }"
  />
  <div
    class="app-wrapper"
    :class="{ 'dev-viewport': showDevSimulator }"
    :style="showDevSimulator ? { '--dev-width': devViewportWidth + 'px' } : {}"
  >
    <div class="app" :class="{ 'dev-padding': showDevSimulator }">
      <header class="header">
        <h1 class="title">Eva Rehab</h1>
        <p class="subtitle">Выберите дату</p>
      </header>
      <ScrollableCalendar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTelegramTheme } from "./composables/useTelegramTheme";
import DevSimulator from "./components/DevSimulator.vue";
import ScrollableCalendar from "./components/ScrollableCalendar.vue";

// Применяем тему Telegram (themeParams) когда доступна
useTelegramTheme();

// Режим разработки: показываем симулятор когда НЕ в Telegram
const isInTelegram = computed(() => {
  const tg = (
    window as Window & { Telegram?: { WebApp?: { initData?: string } } }
  ).Telegram;
  return Boolean(tg?.WebApp?.initData);
});

const showDevSimulator = computed(() => !isInTelegram.value);

// Тема по умолчанию для dev (из URL ?theme=light или ?theme=dark)
function getInitialDevTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const params = new URLSearchParams(window.location.search);
  const t = params.get("theme");
  return t === "dark" || t === "light" ? t : "light";
}

const initialDevScheme = ref<"light" | "dark">("light");

// Ширина viewport для симуляции Mini App (типичные ширины телефонов)
const devViewportWidth = ref(390);

onMounted(() => {
  initialDevScheme.value = getInitialDevTheme();
  const params = new URLSearchParams(window.location.search);
  const w = params.get("width");
  if (w) {
    const num = parseInt(w, 10);
    if (num >= 320 && num <= 600) devViewportWidth.value = num;
  }
  if (showDevSimulator.value) {
    document.body.classList.add("dev-viewport-mode");
  }
});
</script>

<style>
:root {
  /* Тёмная тема — стиль Telegram */
  --tg-theme-bg-color: #17212b;
  --tg-theme-text-color: #e4e4e5;
  --tg-theme-hint-color: #6d7a8a;
  --tg-theme-link-color: #6ab2f2;
  --tg-theme-button-color: #5288c1;
  --tg-theme-button-text-color: #ffffff;
  --tg-theme-secondary-bg-color: #242f3d;
  --tg-theme-accent-soft: rgba(82, 136, 193, 0.2);
  --tg-theme-border: rgba(255, 255, 255, 0.06);
  --scrollbar-color: rgba(106, 178, 242, 0.35);
}

[data-color-scheme="light"] {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-text-color: #221e1e;
  --tg-theme-hint-color: #8c8c8e;
  --tg-theme-link-color: #3390ec;
  --tg-theme-button-color: #3390ec;
  --tg-theme-secondary-bg-color: #f4f4f5;
  --tg-theme-accent-soft: rgba(51, 144, 236, 0.12);
  --tg-theme-border: rgba(0, 0, 0, 0.06);
  --scrollbar-color: rgba(51, 144, 236, 0.35);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

body.dev-viewport-mode {
  background: #0e1621;
}

.app-wrapper {
  height: 100%;
  margin: 0 auto;
}

.app-wrapper.dev-viewport {
  max-width: var(--dev-width, 390px);
  box-shadow: 0 0 0 1px var(--tg-theme-border), 0 8px 32px rgba(0, 0, 0, 0.3);
}

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app.dev-padding {
  padding-top: 44px;
}

.header {
  flex-shrink: 0;
  padding: 20px 20px 18px;
  background: var(--tg-theme-bg-color);
  border-bottom: 1px solid var(--tg-theme-border);
}

.title {
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.3;
}

.subtitle {
  margin-top: 4px;
  font-size: 0.875rem;
  color: var(--tg-theme-hint-color);
  font-weight: 400;
}
</style>
