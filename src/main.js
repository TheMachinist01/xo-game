import '@/assets/main.scss';
import ripple from '@/directives/ripple';

import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

const app = createApp(App);

app.directive('ripple', ripple);

app.use(store);

app.mount('#app');
