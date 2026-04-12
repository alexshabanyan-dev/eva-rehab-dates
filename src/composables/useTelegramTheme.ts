import { watch, onMounted } from 'vue'
import { useTheme } from 'vue-tg'

interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

// Дефолтные цвета — стиль Telegram (если не переданы themeParams)
const DEFAULT_DARK = {
  bg_color: '#17212b',
  text_color: '#e4e4e5',
  hint_color: '#6d7a8a',
  link_color: '#6ab2f2',
  button_color: '#5288c1',
  button_text_color: '#ffffff',
  secondary_bg_color: '#242f3d',
}

const DEFAULT_LIGHT = {
  bg_color: '#ffffff',
  text_color: '#221e1e',
  hint_color: '#8c8c8e',
  link_color: '#3390ec',
  button_color: '#3390ec',
  button_text_color: '#ffffff',
  secondary_bg_color: '#f4f4f5',
}

function applyThemeParams(params: ThemeParams) {
  const root = document.documentElement
  if (params.bg_color) root.style.setProperty('--tg-theme-bg-color', params.bg_color)
  if (params.text_color) root.style.setProperty('--tg-theme-text-color', params.text_color)
  if (params.hint_color) root.style.setProperty('--tg-theme-hint-color', params.hint_color)
  if (params.link_color) root.style.setProperty('--tg-theme-link-color', params.link_color)
  if (params.button_color) root.style.setProperty('--tg-theme-button-color', params.button_color)
  if (params.button_text_color) root.style.setProperty('--tg-theme-button-text-color', params.button_text_color)
  if (params.secondary_bg_color) root.style.setProperty('--tg-theme-secondary-bg-color', params.secondary_bg_color)
}

function applyDefaults(scheme: 'light' | 'dark') {
  const params = scheme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT
  applyThemeParams(params)
}

function safeUseTheme(): ReturnType<typeof useTheme> | null {
  try {
    return useTheme()
  } catch {
    // В части браузеров (вне Mini App / до готовности WebApp) vue-tg может кинуть —
    // иначе пустой #app при том, что body уже с фоном из CSS.
    return null
  }
}

export function useTelegramTheme() {
  const theme = safeUseTheme()

  function syncTheme() {
    const tg = (window as Window & { Telegram?: { WebApp?: { themeParams?: ThemeParams; colorScheme?: string; initData?: string } } }).Telegram
    // Не применяем тему в dev (когда не в Telegram) — за это отвечает DevSimulator
    if (!tg?.WebApp?.initData) return

    const params = tg.WebApp.themeParams
    const scheme = (theme?.colorScheme?.value ?? theme?.colorScheme ?? tg.WebApp.colorScheme) as string | undefined

    if (params && Object.keys(params).length > 0) {
      applyThemeParams(params)
      document.documentElement.setAttribute('data-color-scheme', scheme || 'dark')
    } else {
      const colorScheme = (scheme || 'dark') as 'light' | 'dark'
      applyDefaults(colorScheme)
      document.documentElement.setAttribute('data-color-scheme', colorScheme)
    }
  }

  onMounted(syncTheme)

  const colorScheme = theme?.colorScheme
  if (colorScheme) {
    watch(colorScheme, syncTheme, { immediate: true })
  }

  return { syncTheme }
}
