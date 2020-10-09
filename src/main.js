import Vue from 'vue';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import vuetify from '@/plugins/vuetify';
import awsconfig from './aws-exports';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/tailwind.css';

Amplify.configure(awsconfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
