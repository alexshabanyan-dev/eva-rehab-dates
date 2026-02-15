<script setup lang="ts">
import { computed } from 'vue'
import { Calendar } from 'v-calendar'
import { useMiniApp } from 'vue-tg'

const miniApp = useMiniApp()

// Сколько месяцев показывать (текущий + следующие)
const MONTHS_TO_SHOW = 24

// Генерируем массив месяцев начиная с текущего
const months = computed(() => {
  const result: Date[] = []
  const now = new Date()
  
  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1)
    result.push(date)
  }
  
  return result
})

// Форматирование названия месяца на русском
const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

function getMonthLabel(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

function onDateSelect(day: { date: Date }) {
  const date = day.date
  // Отправляем выбранную дату в Telegram
  if (miniApp?.sendData) {
    miniApp.sendData(JSON.stringify({ date: date.toISOString() }))
  } else {
    // Для разработки вне Telegram
    console.log('Выбрана дата:', date.toLocaleDateString('ru-RU'))
    alert(`Выбрана дата: ${date.toLocaleDateString('ru-RU')}`)
  }
}
</script>

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
          :initial-page="{ month: monthDate.getMonth() + 1, year: monthDate.getFullYear() }"
          :rows="1"
          :columns="1"
          expanded
          transparent
          borderless
          :first-day-of-week="1"
          :attributes="[]"
          disable-page-swipe
          @dayclick="onDateSelect"
        />
      </div>
    </div>
  </div>
</template>

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

/* Стили скроллбара для Telegram/мобильных */
.calendar-scroll::-webkit-scrollbar {
  width: 4px;
}

.calendar-scroll::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.3);
  border-radius: 2px;
}

.month-block {
  margin-bottom: 28px;
}

.month-block:last-child {
  margin-bottom: 40px;
}

.month-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-left: 4px;
  color: var(--tg-theme-text-color);
}

/* Стилизация V-Calendar под Telegram */
.month-block :deep(.vc-container) {
  --vc-gray-50: rgba(255, 255, 255, 0.05);
  --vc-gray-100: rgba(255, 255, 255, 0.08);
  --vc-gray-200: rgba(255, 255, 255, 0.12);
  --vc-gray-300: rgba(255, 255, 255, 0.2);
  --vc-gray-400: rgba(255, 255, 255, 0.4);
  --vc-gray-500: rgba(255, 255, 255, 0.6);
  --vc-gray-600: rgba(255, 255, 255, 0.7);
  --vc-gray-700: rgba(255, 255, 255, 0.85);
  --vc-gray-800: #eaeaea;
  --vc-gray-900: #ffffff;
  --vc-accent-50: rgba(124, 58, 237, 0.15);
  --vc-accent-100: rgba(124, 58, 237, 0.3);
  --vc-accent-200: rgba(124, 58, 237, 0.5);
  --vc-accent-300: rgba(124, 58, 237, 0.7);
  --vc-accent-400: #7c3aed;
  --vc-accent-500: #6d28d9;
  --vc-accent-600: #5b21b6;
  border: none !important;
  background: transparent !important;
}

[data-color-scheme="light"] .month-block :deep(.vc-container) {
  --vc-gray-50: rgba(0, 0, 0, 0.03);
  --vc-gray-100: rgba(0, 0, 0, 0.06);
  --vc-gray-200: rgba(0, 0, 0, 0.1);
  --vc-gray-300: rgba(0, 0, 0, 0.15);
  --vc-gray-400: rgba(0, 0, 0, 0.35);
  --vc-gray-500: rgba(0, 0, 0, 0.5);
  --vc-gray-600: rgba(0, 0, 0, 0.65);
  --vc-gray-700: rgba(0, 0, 0, 0.8);
  --vc-gray-800: #1a1a2e;
  --vc-gray-900: #0f0f1a;
}

.month-block :deep(.vc-day) {
  cursor: pointer;
}

.month-block :deep(.vc-day-content:hover),
.month-block :deep(.vc-day-content:focus) {
  background: var(--vc-accent-100) !important;
}

.month-block :deep(.vc-weekday) {
  font-size: 0.7rem;
  color: var(--tg-theme-hint-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
