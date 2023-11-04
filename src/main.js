import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './services/axios/axios-config';

Vue.filter('formatDate', function (value) {
  if (value) {
    return new Date(value).toLocaleDateString();
  }
  return '';
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
