import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from './Router.config';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerConfig
});

export default router;