import Vue from 'vue';

import App from './app';

import router from './router';

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

window.app = app;

console.log('Init');
