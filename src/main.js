import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import store from './store';
import { router } from './router';

Vue.use(BootstrapVue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");