import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/main.css'
import { setupCalendar } from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(setupCalendar, {})
app.mount('#app')
