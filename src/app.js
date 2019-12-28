import "@babel/polyfill";
// Import Vue
import Vue from 'vue';
// Import App Component
import App from './app.vue';
// import '@/stylus/base.scss'
import SystemLoader from '@m/systemLoader/SystemLoader.module';



SystemLoader.of()
  .bootstrap()
  .then(({ router, store }) => {
    new Vue({
      el: '#app',
      template: '<app/>',
      components: {
        app: App
      },
      router,
      store,
      render: h => h(App)
    })
  })