import { ref } from 'vue'

const STORAGE_KEY = 'thinking-notes-theme'
const theme = ref('light')

export function applyTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  theme.value = saved === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem(STORAGE_KEY, theme.value)
  }
  return { theme, toggleTheme }
}
