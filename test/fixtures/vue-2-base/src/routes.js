import IndexPage from './pages/index.vue';
import TestPage from './pages/test.vue';
import ErrorPage from './pages/error.vue';

export default [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/test',
    component: TestPage,
  },
  {
    path: '*',
    component: ErrorPage,
  },
];
