<template>
  <div class="calendar-wrapper">
    <div class="calendar-scroll">
      <div
        v-for="(monthDate, index) in months"
        :key="index"
        class="month-block"
      >
        <h2 class="month-title">{{ getMonthLabel(monthDate) }}</h2>
        <Calendar
          :initial-page="pageAddress(monthDate)"
          :min-page="pageAddress(monthDate)"
          :max-page="pageAddress(monthDate)"
          :rows="1"
          :columns="1"
          expanded
          transparent
          borderless
          :first-day-of-week="1"
          :attributes="[]"
          disable-page-swipe
          @dayclick="onDateSelect"
        >
          <template #header-title />
        </Calendar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Calendar } from "v-calendar";
import { useMiniApp } from "vue-tg";
import { MONTHS_TO_SHOW } from "../constants";
import { getMonthLabel } from "../helpers";

const miniApp = useMiniApp();

function pageAddress(date: Date) {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

// Генерируем массив месяцев начиная с текущего
const months = computed(() => {
  const result: Date[] = [];
  const now = new Date();

  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    result.push(date);
  }

  return result;
});

function onDateSelect(day: { date: Date }) {
  const date = day.date;
  // Отправляем выбранную дату в Telegram
  if (miniApp?.sendData) {
    miniApp.sendData(JSON.stringify({ date: date.toISOString() }));
  } else {
    // Для разработки вне Telegram
    console.log("Выбрана дата:", date.toLocaleDateString("ru-RU"));
    alert(`Выбрана дата: ${date.toLocaleDateString("ru-RU")}`);
  }
}
</script>

<style scoped>
.calendar-wrapper {
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.calendar-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 16px 12px 32px;
}

/* Стили скроллбара */
.calendar-scroll::-webkit-scrollbar {
  width: 4px;
}

.calendar-scroll::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color);
  border-radius: 2px;
}

.month-block {
  margin-bottom: 15px;
}

.month-block:last-child {
  margin-bottom: 40px;
}

.month-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 14px;
  padding-left: 2px;
  color: var(--tg-theme-text-color);
  letter-spacing: -0.01em;
}

/* Скрываем встроенный header внутри Calendar (в т.ч. «февраль 2026» в каждой ячейке) */
.month-block :deep(.vc-pane-header-wrapper),
.month-block :deep(.vc-pane .vc-header) {
  display: none !important;
}

/* Стилизация V-Calendar — тёмная тема */
.month-block :deep(.vc-container) {
  --vc-gray-50: rgba(255, 255, 255, 0.04);
  --vc-gray-100: rgba(255, 255, 255, 0.08);
  --vc-gray-200: rgba(255, 255, 255, 0.12);
  --vc-gray-300: rgba(255, 255, 255, 0.18);
  --vc-gray-400: rgba(255, 255, 255, 0.35);
  --vc-gray-500: rgba(255, 255, 255, 0.55);
  --vc-gray-600: rgba(255, 255, 255, 0.7);
  --vc-gray-700: rgba(255, 255, 255, 0.88);
  --vc-gray-800: #e4e4e5;
  --vc-gray-900: #ffffff;
  --vc-accent-50: rgba(82, 136, 193, 0.15);
  --vc-accent-100: rgba(82, 136, 193, 0.28);
  --vc-accent-200: rgba(82, 136, 193, 0.45);
  --vc-accent-300: rgba(82, 136, 193, 0.65);
  --vc-accent-400: #5288c1;
  --vc-accent-500: #4a7ab5;
  --vc-accent-600: #406a9e;
  border: none !important;
  background: transparent !important;
}

[data-color-scheme="light"] .month-block :deep(.vc-container) {
  --vc-gray-50: rgba(0, 0, 0, 0.02);
  --vc-gray-100: rgba(0, 0, 0, 0.05);
  --vc-gray-200: rgba(0, 0, 0, 0.08);
  --vc-gray-300: rgba(0, 0, 0, 0.12);
  --vc-gray-400: rgba(0, 0, 0, 0.3);
  --vc-gray-500: rgba(0, 0, 0, 0.5);
  --vc-gray-600: rgba(0, 0, 0, 0.65);
  --vc-gray-700: rgba(0, 0, 0, 0.82);
  --vc-gray-800: #221e1e;
  --vc-gray-900: #0d0d0d;
  --vc-accent-50: rgba(51, 144, 236, 0.1);
  --vc-accent-100: rgba(51, 144, 236, 0.2);
  --vc-accent-200: rgba(51, 144, 236, 0.35);
  --vc-accent-300: rgba(51, 144, 236, 0.55);
  --vc-accent-400: #3390ec;
  --vc-accent-500: #2d7fd4;
  --vc-accent-600: #256cbb;
}

.month-block :deep(.vc-day) {
  cursor: pointer;
}

.month-block :deep(.vc-day-content:hover),
.month-block :deep(.vc-day-content:focus) {
  background: var(--vc-accent-100) !important;
  border-radius: 10px;
}

.month-block :deep(.vc-day.is-today .vc-day-content) {
  background: var(--vc-accent-100) !important;
  border-radius: 10px;
  font-weight: 600;
}

.month-block :deep(.vc-weekday) {
  font-size: 0.6875rem;
  color: var(--tg-theme-hint-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 500;
}
</style>
