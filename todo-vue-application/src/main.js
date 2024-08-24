import { createApp } from 'vue'
import App from './App.vue';
import router from './Router/routes';


import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css'

import './assets/style.css'


createApp(App).use(router).mount('#app')
