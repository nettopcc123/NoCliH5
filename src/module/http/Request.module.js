/**
 * Author: Fay(tigertop001@gmail.com)
 * Date: 2019/11/14
 * Last Modified by: Fay
 * Copyright (c) 2019, HuaSheng, Inc.
 * Description: 请求工具
 */

import axios from 'axios'
import { removeToken } from '@m/utils/Auth.module'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 300000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    config.headers.device = '1';
    if (window.f.store.getters.token) {
      config.headers.authtoken = window.f.store.getters.token;
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let res = response.data
    if(res.success != 1) {
      let outCodeArr = ['10009', '10012', '10013', '10014', '10002', '10017'] // 10009在其他地方登录, 10012踢出, 10013禁用, 10014超时
      if(outCodeArr.includes(res.respCode)) {
        window.f.systemEvent.trigger('changeDialog', false) // 显示弹窗提示
        window.f.store.commit('SET_ISPOPNOTICE', false)
        window.f.store.commit("SET_ISSHOWLOAD", false)
        window.f.store.commit('SET_TOKEN', '');
        let msg = res.respMsg
        if(res.respCode = '10017') {
          msg = '登入已过期,请重新登录'
        }
        removeToken()
        window.f.dialogWin.show({title: '温馨提示', content: msg, buttom: '去登录', link: '/login'})
        return
      }
    }
    return res
  },
  error => {
    return Promise.reject(error);
  }
)
export default service
