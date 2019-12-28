import Vue from 'vue';
import Vuex from 'vuex';
import homeStore from '@/store/modules/Home.module.js';
import memberStore from '@/store/modules/Member.module.js';
import {getHit, accountRefresh, memberInfo, fundDetail, toWithdrawal, recover, logout, readBank, findBankArea, addBankCard,
         modifyBankCard, addDrawPwd, modifyDrawPwd, modifyLoginPwd, withdraw, betRecord, rechargeList,  recharge, loginByPwd, loginByCode,
         forgetPwd, register, findOrderBetDetail, perferentDetails, perferent, cancelOrder, transferTo, notice, getHomeUrl, loginRG, broadNotice,
         homeBanner, historyNotice, bannerHot, loginJBB, fundRecord, centerAmount} from '@m/http/Api.module' // api接口
import { setToken, removeToken } from '@m/utils/Auth.module';
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    token: '', /// 权限token
    sourceid: '',
    rgUrl: '', // 雷竞技连接
    jbbUrl: '', // 小金连接
    rechargeContent: {}, // 支付回调
    realname:'', // 真实姓名
    bankName: '', // 银行
    bankCard: '', // 银行卡号
    withdrawMax: '', //  单笔提款最高
    withdrawMin: '', //  单笔提款最低
    isPopNotice: false, // 首页弹出公告是否显示
    loadContent: {}, // loading弹窗内容
    isShowLoad: false, // 是否显示弹出框内容
    scorHid: false, // 隐藏滚动条
    betRecordData: [], // 投注记录查询数据
    isIndex: false, // 用于点击轮播图跳转活动页时返回是否回到首页
    historyNoticeData: [], // 历史公告列表
    noticeIsFinished: false, // 历史公告是否全部加载完
    isTrue: false,
    isReqNotice: false, // 是否获取弹出框
    hotImgData: [], // 热门游戏
    // isShowLoading: false, // 进入是否游戏loading是否显示
    hBannerList: [], // 首页banner
    getRropDrop: '', //  获取下拉来源
    setBetClass: '全部',  // 当前投注记录名称
    userID: '', // 会员ID
    gotoPay: false, // 开始存款
    walletInfo: {
      totalAmount: '',
      centerAmount: '',
      platAmount: ''
    }, // 用户钱包
    cententBlance: '', // 中心钱包余额
    broadNoticeContent: [],
    userInfo: { // 用户信息
      id: '', // 会员id
      bankable: '', // 是否有银行卡，0.无；1.有
      drawPasswdable: '', // 是否有提现密码，0．无；１.有
      mobile: ''  // 手机号
    },
    orderDetial: {}, // 订单详情
    bindCardCache: { // 暂存绑定银行卡参数
      name: '',
      card: '',
      bankName: '',
      cityName: '',
      provinceName: '',
    },
    bankList: [], // 银行卡列表
    cityList: {}, // 城市列表
    fundDetailProp: {
      id: '',
      tradeType: ''
    },
    // prevent: false, // 防止页面滚动
  },
  getters: {
    token: state => state.token,
    rgUrl: state => state.rgUrl,
    orderDetial: state => state.orderDetial, // 获取订单详情
    cityList: state => state.cityList, // 城市列表
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      data ? setToken(data) : removeToken()
      state.token = data
    },
    SET_SOURCEID: (state, data) => {
      state.sourceid = data
    },
    SET_RGURL: (state, data) => { // 雷竞技连接
      state.rgUrl = data
    },
    SET_JBBURL: (state, data) => { // 小金连接
      state.jbbUrl = data
    },
    SET_ISTRUE: (state, data) => { // 小金连接
      state.isTrue = data
    },
    SET_ISREQNOTICE: (state, data) => { // 是否获取弹出框
      state.isReqNotice = data
    },
    SET_HOTIMGDATA: (state, data) => { // 热门游戏
      state.hotImgData = data
    },
    SET_LOADCONTENT: (state, data) => { // loading弹窗内容
      state.loadContent = data
    },
    SET_ISSHOWLOAD: (state, data) => { // 是否显示弹出框内容
      state.isShowLoad = data
    },
    SET_ISPOPNOTICE: (state, data) => { // 首页公告是否显示
      state.isPopNotice = data
    },
    SET_RECHARGECONTENT: (state, data) => { // 支付回调
      state.rechargeContent = data
    },
    SET_REALNAME: (state, data) => { // 真实姓名
      state.realname = data
    },
    SET_ISINDEX: (state, data) => { // 是否回到首页
      state.isIndex = data
    },
    // SET_ISSHOWLOADING: (state, data) => { // 进入是否游戏loading是否显示
    //   state.isShowLoading = data
    // },
    SET_GETPROPDROP: (state, data) => { // 获取下拉来源
      state.getRropDrop = data
    },
    SET_SETBETCLASS: (state, data) => { // 当前投注记录名称
      state.setBetClass = data
    },
    SET_USERID: (state, data) => { // 会员ID
      state.userID = data
    },
    SET_GOTOPAY: (state, data) => { // 开始存款
      state.gotoPay = data
    },
    SET_BANKNAME: (state, data) => { // 银行名称
      state.bankName = data
    },
    SET_BANKCARD: (state, data) => { // 银行卡号
      state.bankCard = data
    },
    SET_WITHDRAWMAX: (state, data) => { // 单笔提款最高
      state.withdrawMax = data
    },
    SET_WITHDRAWMIN: (state, data) => { // 单笔提款最低
      state.withdrawMin = data
    },
    SET_WALLETINFO: (state, data) => { // 获取钱包信息
      state.walletInfo = data
    },
    SET_CENTENTBLANCE: (state, data) => { // 中心钱包余额
      state.cententBlance = data
    },
    SET_BROADNOTICECONTENT: (state, data) => { // 公告列表
      state.broadNoticeContent = data
    },
    SET_USERINFO: (state, data) => { // 获取用户信息
      state.userInfo = data
    },
    SET_ORDERDETIAL: (state, data) => { // 订单详情
      state.orderDetial = data
    },
    SET_BETRECORDDATA: (state, data) => { // 投注记录
      state.betRecordData = data
    },
    SET_HISTORYNOTICEDATA: (state, data) => { // 历史公告列表
      state.historyNoticeData = data
    },
    SET_NOTICEISFINISHED: (state, data) => { // 历史公告是否已全部加载完
      state.noticeIsFinished = data
    },
    SET_HBANNNERLIST: (state, data) => { // 首页banner
      state.hBannerList = data
    },
    SET_BANKLIST: (state, data) => { // 银行卡列表
      state.bankList = data
    },
    SET_CITYLIST: (state, data) => { // 城市列表
      state.cityList = data
    },
    SET_BINDCARDCACHE: (state, data) => { // 暂存绑定银行卡参数
      state.bindCardCache = data
    },
    SET_ISLOGINOUT: (state, data) => {
      state.isLoginOut = data
    },
    SET_FUNDETAILPROP: (state, data) => {
      state.fundDetailProp = data
    },
    SET_SCORHID: (state, data) => {
      state.scorHid = data
    },

  },
  actions: {
    // getAccount({commit}, data) { // 获取用户信息
    //   return new Promise((resolve, reject) => {
    //     account().then( response => {
    //       let res = response
    //       if(res && res.success == 1) {
    //         commit('SET_WALLETINFO', res.content)
    //       }else{
    //         window.f.tips.error(res.respMsg)
    //       }
    //       resolve(res)
    //     })
    //   })
    // },
    getAccountRefresh({commit}, data) { // 总资产刷新
      return new Promise((resolve, reject) => {
        accountRefresh().then( response => {
          let res = response
          if(res && res.success == 1) {
            commit('SET_WALLETINFO', res.content)
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getMemberInfo({commit}, data) { // 获取用户信息
      return new Promise((resolve, reject) => {
        memberInfo().then( response => {
          let res = response
          if(res && res.success == 1) {
            commit('SET_USERINFO', res.content)
            commit('SET_REALNAME', res.content.realname) // 真实姓名
            commit('SET_BANKNAME', res.content.bank) // 银行名称
            commit('SET_BANKCARD',res.content.card) // 银行卡号
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getFundDetail({commit}, data) { // 订单详情
      return new Promise((resolve, reject) => {
        fundDetail(data).then( response => {
          let res = response
          if(res && res.success == 1) {
            commit('SET_ORDERDETIAL', res.content)
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    toWithdrawal({commit}, data) { // 进入提款页面
      return new Promise((resolve, reject) => {
      toWithdrawal().then( response => {
        let res = response
        if(res.success == 1) {

        }else{
          let arr = ['300118', '300110', '300119']
          if(!arr.includes(res.respCode)) {
            window.f.tips.error(res.respMsg)
          }
        }
        resolve(res)
      })
      })
    },
    getRecover({state, commit}) { // 一键回收
      return new Promise((resolve, reject) => {
      let msg = {
        leftIcon: 'loading',
        content: '请稍后，资金正在回收中...'
      }
      commit("SET_LOADCONTENT", msg)
      recover().then( response => {
        let res = response
        resolve(res)
      })
      })
    },
    setLogout({commit}) {
      return new Promise((resolve, reject) => {
        logout().then( response => {
          let res = response
          commit('SET_TOKEN', '');
          removeToken()
          commit("SET_ISSHOWLOAD", false)
          sessionStorage.removeItem('userToken')
          sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('vv-funPram')
          if(res && res.success == 1) {
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getFindBankArea({commit}, data) { // 识别银行卡配置信息
      return new Promise((resolve, reject) => {
        findBankArea(data).then( response => {
          let res = response
          if(res && res.success == 1) {
            commit('SET_BANKLIST', res.content.bankList); // 银行卡列表
            // commit('SET_CITYLIST', res.content.citys); // 城市列表
            let citys = res.content.citys;
            let area = {
              province_list: {},
              city_list: {},
              county_list: {},
            };
            for (let i = 0; i < citys.length; i++) {
              area.province_list[citys[i].id] = citys[i].name;
              if (citys[i].childs) {
                for (let m = 0; m < citys[i].childs.length; m++) {
                  area.city_list[citys[i].childs[m].id] = citys[i].childs[m].name;
                }
              }
            }
            commit('SET_CITYLIST', area); // 城市列表
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getReadBank({commit}, data) { // 识别银行卡
      return new Promise((resolve, reject) => {
        let msg = {
          leftIcon: 'loading',
          content: '请稍后，银行卡正在识别中...'
        }
        commit("SET_LOADCONTENT", msg)
        readBank(data).then( response => {
          let res = response
          if(res.success == 1) {
          }else{
            // window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    addBankCard({commit}, data) { // 新增银行卡
      return new Promise((resolve, reject) => {
        addBankCard(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    modifyBankCard({commit}, data) { // 修改银行卡
      return new Promise((resolve, reject) => {
        modifyBankCard(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    addDrawPwd({commit}, data) { // 无提款密码
      return new Promise((resolve, reject) => {
        addDrawPwd(data).then( response => {
          let res = response
          if(res.success == 1) {

          } else {
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    modifyDrawPwd({commit}, data) { // 有提款密码
      return new Promise((resolve, reject) => {
        modifyDrawPwd(data).then( response => {
          let res = response
          if(res.success == 1) {

          } else {
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    modifyLoginPwd({commit}, data) { // 修改登录密码
      return new Promise((resolve, reject) => {
        modifyLoginPwd(data).then( response => {
          let res = response
          if(res.success == 1) {

          } else {
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    withdraw({commit}, data) { // 提款
      return new Promise((resolve, reject) => {
        withdraw(data).then( response => {
          let res = response
          if(res.success == 1) {

          } else {
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    betRecord({commit}, data) { // 投注记录
      return new Promise((resolve, reject) => {
        betRecord(data).then( response => {
          let res = response
          if(res.success == 1) {

          } else {
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    betRecordSubscribe() {},
    rechargeList({commit}, data) {
      return new Promise((resolve, reject) => {
        rechargeList().then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    recharge({commit}, data) {
      return new Promise((resolve, reject) => {
        recharge(data).then( response => {
          this.isReq = true
          let res = response
          if(res && res.success == 1) {
            let obj = res.content
            commit('SET_RECHARGECONTENT', obj)
          }else{
            // window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    loginByPwd({commit}, data) {
      return new Promise((resolve, reject) => {
        loginByPwd(data).then( response => {
          this.isReq = true
          let res = response
          if(res.success == 1) {
          }else{
            // window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    loginByCode({commit}, data) {
      return new Promise((resolve, reject) => {
          loginByCode(data).then( response => {
            let res = response
            if(res.success == 1) {
              window.f.tips.success({text: '登录成功'}, () => {
              resolve(res)
              return
            })
            }else{
              // window.f.tips.error(res.respMsg)
            }
            resolve(res)
        })
      })
    },
    forgetPwd({commit}, data) {
      return new Promise((resolve, reject) => {
          forgetPwd(data).then( response => {
            let res = response
            if(res.success == 1) {
              window.f.tips.success({text: '密码修改成功', duration: 1500}, () => {
              resolve(res)
              return
            })
            }else{
              // window.f.tips.error(res.respMsg)
            }
            resolve(res)
        })
      })
    },
    register({commit}, data) {
      return new Promise((resolve, reject) => {
        register(data).then( response => {
          let res = response
          if(res && res.success == 1) {

          }else{
            if(res.respCode == '300001') {
              window.f.tips.error(res.respMsg)
            }
          }
          resolve(res)
        })
      })
    },
    findOrderBetDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        findOrderBetDetail(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    perferent({commit}, data) {
      return new Promise((resolve, reject) => {
        perferent(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    perferentDetails({commit}, data) {
      return new Promise((resolve, reject) => {
        perferentDetails(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getNotice({state, commit}, data) { // 获取公告
      return new Promise((resolve, reject) => {
        notice().then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getBannerHot({state, commit}, data) { // 获取热门赛事
      return new Promise((resolve, reject) => {
        bannerHot().then( response => {
          let res = response
          if(res.success == 1) {
            commit('SET_HOTIMGDATA', res.content)
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    cancelOrder({commit}, data) {
      return new Promise((resolve, reject) => {
        cancelOrder(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getHomeUrl({commit}, data) {
      return new Promise((resolve, reject) => {
        getHomeUrl(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    loginRG({commit}) {
      return new Promise((resolve, reject) => {
        loginRG().then( response => {
          let res = response
          if(res && res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    loginJBB({commit}, data) {
      return new Promise((resolve, reject) => {
        loginJBB().then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    broadNotice({commit}, data) {
      return new Promise((resolve, reject) => {
        broadNotice(data).then( response => {
          let res = response
          if(res.success == 1) {
            commit('SET_BROADNOTICECONTENT',  res.content)
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    homeBanner({commit}, data) {
      return new Promise((resolve, reject) => {
        homeBanner(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    historyNotice({commit}, data) { // 历史公告
      return new Promise((resolve, reject) => {
        historyNotice(data).then( response => {
          let res = response
          if(res.success == 1) {

          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    platformTransferTo({state, commit}, data) { // 钱包转账
      return new Promise((resolve, reject) => {
        let msg = {
          leftIcon: 'loading',
          content: '请稍后，资金正在转入中...'
        }
        commit("SET_LOADCONTENT", msg)
        transferTo(data).then(res => {
          if(res && res.success == 1) {
          }
          resolve(res)
        })
      })
    },
    getFundRecord({commit}, data) {
      return new Promise((resolve, reject) => {
        fundRecord(data).then( response => {
          let res = response
          if(res.success == 1) {
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    getHit({commit}, data) {
      return new Promise((resolve, reject) => {
        getHit(data).then( response => {
          let res = response
            if(res.success == 1) {
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    },
    centerAmount({commit}, data) {
      return new Promise((resolve, reject) => {
        centerAmount(data).then( response => {
          let res = response
          if(res && res.success == 1) {
            commit('SET_CENTENTBLANCE', res.content)
          }else{
            window.f.tips.error(res.respMsg)
          }
          resolve(res)
        })
      })
    }
  },
  modules: {
    homeStore,
    memberStore
  }
});
