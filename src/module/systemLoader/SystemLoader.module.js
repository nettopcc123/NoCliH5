/**
 * Author: Fay(tigertop001@gmail.com)
 * Date: 2019/10/28
 * Last Modified by: Fay
 * Copyright (c) 2019, HuaSheng, Inc.
 * Description: 全局对象
 */

import Vue from 'vue';
import router from '@/router/Router';
import store from '@/store/Store';
import Observer from '@m/observer/Observer.module';
import Tips from '@c/tips/Tips.module';
import DialogWin from '@c/dialogWin/DialogWin.module';
import Framework7 from 'framework7/framework7.esm.js';
import Loading from '@c/loading/Loding.module' // Loading
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import '@/stylus/framework7.bundle.scss';
import '@c/loading/LoadingBut.view';
import '@m/registerServiceWorker/RegisterServiceWorker' // 离线缓存
import { getToken } from '@m/utils/Auth.module'

import LoadingBut from "@c/loading/LoadingBut.view"; // 加载中
import loadingData from "@p/comm/noDate/loadingData.view"; // 加载中
import Input from "@p/comm/input/inputComponent.view"; // 输入框

Framework7.use(Framework7Vue)

Vue.use(Loading)
Vue.use(Tips)
Vue.use(DialogWin)
// Vue.use(LoadingDialog)
Vue.component('ff-load-but', LoadingBut)
Vue.component('ff-loading-data', loadingData)
Vue.component('ff-input', Input)

import '@/icons'; // svg图标
const ObserverClass = Observer.of();
class SystemLoader {
  mountGlobalVariable() {
      window.f = {};
      window.f.vue = Vue;
      window.f.router = router;
      window.f.store = store;
      window.f.loading = Loading;
      window.f.systemEvent = ObserverClass;
      window.f.baseImg = "http://m1.v1.com";
      window.f.tips = Tips;
      window.f.dialogWin = DialogWin;
      store.commit('SET_TOKEN', getToken());
      return this;
    }
  mountGlobalComponents() {
      const componentsMap = {
        // PageLoading
      };
      Object.keys(componentsMap).map(item => Vue.component(item, componentsMap[item]));
      return this;
    }
  mountGlobalVueConfig() {
      Vue.config.productionTip = false;
      return this;
    }
  mountGlobalVuePrototype() {
      Vue.prototype.$customEvent = ObserverClass;
      Vue.prototype.imgBg = function (url) {
        if(!url)return false
        if(!/^http/.test(url)) url = window.f.baseImg+''+url
        return 'background-image:url('+url+')'
      };
      return this;
    }
  bootstrap() {
    return new Promise((resolve, reject) => {
      this.mountGlobalVariable()
          .mountGlobalComponents()
          .mountGlobalVueConfig()
          .mountGlobalVuePrototype()
      resolve({ router, store });
    });
  }
}

SystemLoader.of = function() {
  return new SystemLoader();
};

export default SystemLoader;
