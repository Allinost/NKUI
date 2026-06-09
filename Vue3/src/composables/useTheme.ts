import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  theme.value = t
  localStorage.setItem('nkui-theme', t)
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

function initTheme() {
  const stored = localStorage.getItem('nkui-theme') as Theme | null
  if (stored) {
    applyTheme(stored)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark')
  } else {
    applyTheme('light')
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('nkui-theme')) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}

if (typeof document !== 'undefined') {
  initTheme()
}

export function useTheme() {
  return {
    theme: theme,
    isDark: () => theme.value === 'dark',
    toggleTheme,
    setTheme: applyTheme,
  }
}
