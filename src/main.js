import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
