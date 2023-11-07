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
  mounted() {
    this.setCSSVariables();
  },
  methods: {
    setCSSVariables() {
      const theme = this.$vuetify.theme.themes.light;
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.secondary);
      document.documentElement.style.setProperty('--tertiary-color', theme.tertiary);
      document.documentElement.style.setProperty('--tertiary2-color', theme.tertiary2);
      document.documentElement.style.setProperty('--white-color', theme.white);
    }
  }
}).$mount('#app');
