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
    <el-container
      direction="vertical"
      class="app"
      :class="{ 'dev-padding': showDevSimulator }"
    >
      <el-header class="header">
        <el-text tag="h1" class="title">Eva Rehab</el-text>
        <el-text tag="p" class="subtitle">Расписание курсов</el-text>
      </el-header>
      <el-main class="main">
        <ScrollableCalendar />
      </el-main>
    </el-container>
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
  if (typeof window === "undefined") return "dark";
  const params = new URLSearchParams(window.location.search);
  const t = params.get("theme");
  return t === "dark" || t === "light" ? t : "dark";
}

const initialDevScheme = ref<"light" | "dark">("dark");

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
