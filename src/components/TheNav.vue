<template>
  <header class="nav">
    <div class="nav-inner">
      <router-link to="/" class="site-name">思考记录站</router-link>
      <button class="theme-toggle" type="button" @click="toggleTheme" :aria-label="theme === 'light' ? '切换到深色' : '切换到浅色'">
        <span class="icon" v-html="iconSvg"></span>
        <span class="toggle-label">{{ theme === 'light' ? '深色' : '浅色' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()

const iconSvg = computed(() => {
  if (theme.value === 'light') {
    // 月亮
    return '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
  }
  // 太阳
  return '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
})
</script>

<style scoped>
.nav {
  border-bottom: 1px solid var(--divider);
  background-color: var(--bg);
}
.nav-inner {
  max-width: 1440px;
  margin: 0 auto;
  height: 64px;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
}
.site-name:hover {
  color: var(--text-secondary);
}
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  padding: 6px 2px;
  transition: color 0.15s ease;
}
.theme-toggle:hover {
  color: var(--text);
}
.icon {
  display: inline-flex;
  align-items: center;
}
.toggle-label {
  line-height: 1;
}

@media (max-width: 768px) {
  .nav-inner { padding: 0 20px; }
}
</style>
