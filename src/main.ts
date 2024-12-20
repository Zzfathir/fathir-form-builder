import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia)
createApp(App).mount('#app')
