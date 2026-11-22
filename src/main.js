import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { applyTheme } from './composables/useTheme'
import './styles/global.css'

applyTheme()
createApp(App).use(router).mount('#app')
