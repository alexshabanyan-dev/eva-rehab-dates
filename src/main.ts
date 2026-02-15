import { createApp } from "vue";
import "./styles/main.css";
import { setupCalendar } from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'

const app = createApp(App);
app.use(setupCalendar, {});
app.mount('#app')
