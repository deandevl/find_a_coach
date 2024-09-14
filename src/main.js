import { createApp, defineAsyncComponent } from 'vue';
import './style.css';
import store from './store.js';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.component('BaseDialog', defineAsyncComponent(() => 
  import('./components/ui/BaseDialog.vue')
));

app.use(store);
app.use(router);
app.mount('#app');
