import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//tailwind css
import './styles/index.css'

//material icons
import 'material-icons/iconfont/material-icons.css';

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/api/'

createApp(App).use(router).use(createPinia()).mount('#app')
