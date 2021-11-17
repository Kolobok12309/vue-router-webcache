import Vue from 'vue';

import router from './router';

const app = new Vue({
  router,
  render: (h) => h('RouterView'),
}).$mount('#app');

window.app = app;
