import './assets/main.css';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.errorHandler = (err) => {
  console.error('Global error handler:', err);
  router.push('/error');
};

app.use(router);
app.use(store); // Use the store

app.mount('#app');
