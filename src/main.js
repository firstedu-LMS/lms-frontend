import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//tailwind css
import './styles/index.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/api/'

createApp(App).use(router).mount('#app')
