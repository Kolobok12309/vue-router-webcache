import { createApp, version, h } from 'vue';
import { RouterView } from 'vue-router4';

import router from './router';

const App = {
  render() {
    return h(RouterView);
  },
};

const app = createApp(App)
  .use(router)
  .mount('#app');

window.app = app;
