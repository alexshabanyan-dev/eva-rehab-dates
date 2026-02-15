<template>
  <div v-if="visible" class="dev-simulator">
    <div class="dev-header">
      <el-tag size="small" type="info" effect="dark" class="dev-badge">DEV</el-tag>
      <span class="dev-title">Симуляция Telegram</span>
      <el-select
        :model-value="viewportWidth"
        size="small"
        class="width-select"
        @update:model-value="emit('viewportChange', $event)"
      >
        <el-option
          v-for="w in viewportPresets"
          :key="w"
          :label="`${w}px`"
          :value="w"
        />
      </el-select>
      <el-button size="small" @click="toggleTheme" :title="`Тема: ${scheme}`">
        {{ scheme === 'light' ? '🌙 Тёмная' : '☀️ Светлая' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  initialScheme?: 'light' | 'dark'
  viewportWidth?: number
}>()

const emit = defineEmits<{
  themeChange: [scheme: 'light' | 'dark']
  viewportChange: [width: number]
}>()

const viewportPresets = [360, 375, 390, 414, 428]

const scheme = ref<'light' | 'dark'>(props.initialScheme ?? 'light')

const DEV_THEMES = {
  dark: {
    '--tg-theme-bg-color': '#17212b',
    '--tg-theme-text-color': '#e4e4e5',
    '--tg-theme-hint-color': '#6d7a8a',
    '--tg-theme-link-color': '#6ab2f2',
    '--tg-theme-button-color': '#5288c1',
    '--tg-theme-secondary-bg-color': '#242f3d',
    '--tg-theme-border': 'rgba(255, 255, 255, 0.06)',
    '--tg-theme-accent-soft': 'rgba(82, 136, 193, 0.2)',
    '--scrollbar-color': 'rgba(106, 178, 242, 0.35)',
  },
  light: {
    '--tg-theme-bg-color': '#ffffff',
    '--tg-theme-text-color': '#221e1e',
    '--tg-theme-hint-color': '#8c8c8e',
    '--tg-theme-link-color': '#3390ec',
    '--tg-theme-button-color': '#3390ec',
    '--tg-theme-secondary-bg-color': '#f4f4f5',
    '--tg-theme-border': 'rgba(0, 0, 0, 0.06)',
    '--tg-theme-accent-soft': 'rgba(51, 144, 236, 0.12)',
    '--scrollbar-color': 'rgba(51, 144, 236, 0.35)',
  },
}

function applyDevTheme(s: 'light' | 'dark') {
  const root = document.documentElement
  root.setAttribute('data-color-scheme', s)
  Object.entries(DEV_THEMES[s]).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', s === 'dark' ? '#17212b' : '#ffffff')
}

function toggleTheme() {
  scheme.value = scheme.value === 'light' ? 'dark' : 'light'
  applyDevTheme(scheme.value)
  emit('themeChange', scheme.value)
}

watch(
  () => [props.visible, scheme.value] as const,
  ([visible, s]) => {
    if (visible) applyDevTheme(s)
  },
  { immediate: true }
)
</script>
