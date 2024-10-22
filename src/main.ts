import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/index.css'
import './assets/styles/styles.scss'

const app = createApp(App).use(store).use(router)
app.mount('#app')
