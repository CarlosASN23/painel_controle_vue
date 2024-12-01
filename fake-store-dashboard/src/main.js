import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import 'bootstrap'; // Opcional: Importa também os scripts JS do Bootstrap
import './assets/styles.css';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');


