import { createApp } from 'vue'
import { setupCalendar } from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(setupCalendar, {})
app.mount('#app')
