<template>
  <f7-page class="index-page" @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-index-header iconProp="kefu" v-if="isReqNotice" :isReq="isReq"></ff-index-header>
    <div class="scroll-con disabled-scroll">
      <ff-notice v-if="broadNoticeContent.length > 0" :data="broadNoticeContent" v-show="isReqNotice"></ff-notice>
      <div class="notice-nodate" v-show="!isReqNotice">
        <ff-loading-data class="p0"></ff-loading-data>
      </div>
      <div class="carousel-container">
        <div class="cc-nodate" v-show="!isReqBanner">
          <ff-loading-data></ff-loading-data>
        </div>
        <div class="swiper-box" v-if="isReqBanner">
          <van-swipe :autoplay="3000" indicator-color="white" class="sw-center">
            <van-swipe-item
              v-for="(item, index) in hBannerList"
              :key="index"
              @click.prevent="skip(item.linkCategroy)"
            >
              <img class="swipe-img" :src="item.url" />
            </van-swipe-item>
          </van-swipe>
          <div class="sw-left"></div>
          <div class="sw-right"></div>
        </div>
        <ff-game-btn></ff-game-btn>
      </div>
      <div class="hot-container">
        <ff-game-platform :hotImg="hotImgData"></ff-game-platform>
      </div>
      <ff-title titProp="关于我们"></ff-title>
      <ff-about-conent></ff-about-conent>
      <!-- <ff-load-game-loading v-show="isShowLoading"></ff-load-game-loading> -->
    </div>
  </f7-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { removeToken } from '@m/utils/Auth.module'
import IndexHeader from "@p/comm/headerFoot/IndexHeader.view"; // 首页头部
import GameBtn from "@p/comm/home/GameBtn.view"; //
const Notice = () => import("@p/comm/home/Notice.view"); // 公告
import GamePlatform from "@p/comm/home/GamePlatform.view"; // 游戏平台
import loadingDialog from "@c/loadingDialog/loadingDialog.view"; //
const AboutContent = () => import("@p/comm/home/AboutContent.view"); // 关于我们内容
import Title from '@p/comm/headerFoot/Title.view'; // 标题
import { Swipe, SwipeItem } from 'vant';
const LoadGameLoading = () => import("@p/comm/home/LoadGame.view"); // 进入三方游戏加载loading
import Utils from "@m/utils/Utils.module";
import { setToken } from '@m/utils/Auth.module';
export default {
  name: 'index',
  components: {
    "ff-index-header": IndexHeader,
    "ff-game-btn": GameBtn,
    "ff-notice": Notice,
    "ff-game-platform": GamePlatform,
    "ff-loading-dialog": loadingDialog,
    'ff-about-conent': AboutContent,
    'ff-title': Title,
    'ff-load-game-loading': LoadGameLoading,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  computed: {
    ...mapGetters(['token']),
    ...mapState({
      noticeContent: state => state.noticeContent, // 公告内容
      isPopNotice: state => state.isPopNotice, // 首页公告是否显示过
      hBannerList: state => state.hBannerList, // 首页banner
      broadNoticeContent: state => state.broadNoticeContent, // 公告列表
      hotImgData: state => state.hotImgData, // 门赛事数据
      isReqNotice: state => state.isReqNotice // 是否获取弹出框
    }),
  },
  data() {
    return {
      isReqGame: true, // 防多点击
      // broadNoticeContent: [], // 走马灯内容
      // hBannerList: [],
      // hotImgData: [], // 热门赛事数据
      isReqBanner: false,
      // isReqNotice: false,
      swipWidth: null,
      isInto: false,
      isReq:  true // 请求是否完成
      // dialogObj: {
      //   leftIcon: 'loading',
      //   content: '扔垃圾达拉斯就够了'
      // }
    }
  },
  mounted() {
    // this.bindEvent()
  },
  methods: {
    bindEvent() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.getCNZZjs()
        }, 1000)
      })
      this.getCenterAmount()
      this.getBroadNotice()
      this.getBanner()
      this.getNotice()
      this.getBannerHot()
      this.$customEvent.on('swiperWidth', (data) => {
        this.swipWidth = data
      })
      let sourceId = Utils.of().getUrlParam('source');
      if(sourceId) this.$store.commit('SET_SOURCEID', sourceId);

      let urlToken = Utils.of().getUrlParam('authtoken');
      if(urlToken) {
        this.$store.commit('SET_TOKEN', urlToken) ;
        let host =  window.location.host,
            proto = window.location.protocol
        let hurl = proto + "//" + host
        window.location.href = hurl
      }
    },
    getCNZZjs() {
      const env = process.env.NODE_ENV
      let arr = ['test', 'test1', 'test2', 'uat'],
        url = 'https://v1.cnzz.com/z_stat.php?id=1278291308&web_id=1278291308'
      if(arr.includes(env)) {
        url = 'https://s4.cnzz.com/z_stat.php?id=1278307168&web_id=1278307168'
      }
      let cnzz = document.getElementById('cnzz');
      if(cnzz) return
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.id = 'cnzz';
      s.src = url;
      document.body.appendChild(s);
    },
    getCenterAmount() {
      if(!this.token || this.token == "undefined") {
        return
      }
      this.isReq = false
      this.$store.dispatch("centerAmount").then(() => {
        this.isReq = true
      })
    },
    getBroadNotice() { // 获取跑马灯数据
      if(this.broadNoticeContent.length <= 0) this.$store.dispatch(`broadNotice`)
      // .then(res => {
      //   if(res && res.success == 1) {
      //     this.broadNoticeContent = res.content
      //   }
      // })
    },
    getBanner() { // 获取轮播图
      if(this.hBannerList.length > 0) { // 如果已请求过
        this.isReqBanner = true
        return
      }
      this.isReqBanner = false
      this.$store.dispatch("homeBanner").then(res => {
        this.isReqBanner = true
        if(res && res.success == 1) {
          this.$store.commit('SET_HBANNNERLIST', res.content)
        }
      })
    },
    to(val) { // 点击轮播图跳转相应页面
      let url
      if (val) { // 判断轮播图是否有跳转类型 有则进入跳转页面
        switch (val) {
          case 1:
            url = 'recharge'
            break;
          case 2:
            url = 'prefer'
            break;
          case 3:
            url = 'member'
            break;
          case 4:
            url = 'main'
            break;
          case 5:
            url = 'sportMain'
            break;
          default:
            url = 'index'
            break;
        }
      }else {
        url = 'index'
      }
      return url
    },
    skip(val) {
      if(!this.isReqGame) return
      let isTo = false,
          name = 'login',
          path = '/login',
          url = this.to(val)
      const router = this.$f7router;
      if(!this.token) {
        router.navigate({
          name: name,
          path: path
        });
        return
      }
      this.isReqGame = false
      if(url != 'sportMain' && url != 'main') {
        let arr = ['prefer','recharge']
        if(arr.includes(url)) this.$store.commit("SET_ISINDEX", true)
        this.isReqGame = true
        router.navigate({
          name: url,
          path: `/${url}`
        });
        return
      }


      this.$customEvent.trigger('changeDialog', true)
      this.$customEvent.trigger('dialogCon', {
        title: '线路检测', // 标题
        rightIcon: 'close02', // 关闭图标
        but: '进入游戏', // 按钮
        type: 'inToGame',
        gameType: url == "main" ? 'V电竞钱包余额' : 'V体育钱包余额',
        status: false, //
        butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
      })
      this.$store.commit("SET_ISTRUE", false)
      if(url == "sportMain") {
        this.$store.dispatch('loginJBB').then( response => {
          this.isReqGame = true
          let res = response
          if(res.success == 1) {
            if(!res.content.url) {
              isTo = true;
              this.$customEvent.trigger('changeDialog', true)
              this.$customEvent.trigger('dialogCon', {
                title: res.content.startTime ? '升级维护公告' : '温馨提示', // 标题
                centerIcon: res.content.startTime ? 'weihu' : null, // 图标
                con: res.content.detail, // 内容
                time: res.content.startTime ? res.content.startTime : null, // 时间
                rightIcon: res.content.startTime ? 'close02' : null, // 关闭图标
                but: !res.content.startTime ? '我知道了' : null, // 按钮
                butType: 1 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
              })
            }else {
              // this.$store.commit('SET_JBBURL', res.content.url);
              this.$store.commit('SET_RGURL', res.content.url);
              if(!this.isInto) {
                // this.$customEvent.trigger('changeDialog', true)
                this.$customEvent.trigger('dialogCon', {
                  title: '线路检测', // 标题
                  con: res.content.amount, // 内容
                  rightIcon: 'close02', // 关闭图标
                  but: '进入游戏', // 按钮
                  type: 'inToGame',
                  gameType: 'V体育钱包余额',
                  urlPorp: '/wallet',
                  status: true, //
                  butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                })
                this.$store.commit("SET_ISTRUE", true)
                this.isReqGame = true
              }
              this.isInto = false
              return
            }
          }
          if(isTo) {
            return
          }
          name = url,
          path = `/${path}`
          router.navigate({
            name: name,
            path: path
          });
        }).then(() => {
          // this.judgeLogin()
        })
      }
      if(url == 'main') {
        this.$store.dispatch('loginRG', {platId: '1'}).then( response => { // 执行调接口
          let res = response
          if(res.success == 1) { // 成功
            this.isReqGame = true
            if(!res.content.url) { // 判断是否有返回url链接 如果没有
              isTo = true;
              this.$customEvent.trigger('changeDialog', true) // 显示弹窗提示
              this.$customEvent.trigger('dialogCon', { // 弹窗内容
                title: res.content.startTime ? '升级维护公告' : '温馨提示', // 标题
                centerIcon: res.content.startTime ? 'weihu' : null, // 图标
                con: res.content.detail, // 内容
                time: res.content.startTime ? res.content.startTime : null, // 时间
                rightIcon: res.content.startTime ? 'close02' : null, // 关闭图标
                but: !res.content.startTime ? '我知道了' : null, // 按钮
                butType: 1 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
              })
            }else { // 有url
              this.$store.commit('SET_RGURL', res.content.url); // 保存url
              if(!this.isInto) {
                this.$customEvent.trigger('changeDialog', true)
                this.$customEvent.trigger('dialogCon', {
                  title: '线路检测', // 标题
                  con: res.content.amount, // 内容
                  rightIcon: 'close02', // 关闭图标
                  but: '进入游戏', // 按钮
                  type: 'inToGame',
                  gameType: 'V电竞钱包余额',
                  urlPorp: '/wallet',
                  status: true, //
                  butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                })
                this.$store.commit("SET_ISTRUE", true)
                this.isReqGame = true
              }
              this.isInto = false
              return
            }
          }
          if(isTo) { // 判断是否有url  没有则不跳转页面
            return
          }
          name = url,
          path = `/${path}`
          router.navigate({
            name: name,
            path: path
          });
        }).then(() => {
          // this.judgeLogin()
        })
      }
    },
    getBannerHot() { // 获取热门赛事
      if(this.hotImgData.length <= 0) this.$store.dispatch("getBannerHot")
      // .then(res => {
      //   if(res && res.success == 1) {
      //     this.hotImgData = res.content
      //   }
      // })
    },
    getNotice() { // 获取弹窗公告
      if(this.isPopNotice || this.isReqNotice) {
        // this.isReqNotice = true
        return
      }
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {}
      this.$store.commit("SET_LOADCONTENT", msg)
      // this.isReqNotice = false
      this.$store.dispatch('getNotice').then(res => {
        // this.isReqNotice = true
        this.$store.commit("SET_ISREQNOTICE", true)
        this.$store.commit("SET_ISSHOWLOAD", false)
        if(res && res.success == 1) {
          if(res.content) {
            let title = res.content.title,
                detail = res.content.detail,
                time = res.content.times
            this.diacon = {
                            title: title,
                            con: detail,
                            rightIcon: 'close02',
                            time: time,
                          }
            if(!title && !detail) return
            this.$customEvent.trigger('dialogCon', this.diacon);
            this.$customEvent.trigger('changeDialogHome', {page: 'index', state: true});
          }
        }
      })
    },
    onPageBeforeIn() {
      this.bindEvent()
      this.$customEvent.trigger('curPage', 'index')
      this.$store.commit("SET_ISSHOWLOAD", false)
    },
    onPageBeforeOut() {
      this.$customEvent.trigger('clearNotice')
      this.$customEvent.trigger('clearSwiper')
      this.$customEvent.trigger('closeNotice')
      this.$customEvent.trigger('showService', false)
      this.$customEvent.trigger('changeDialog', false)
      this.$customEvent.trigger('changeDialogHome', {page: '', state: false});
      this.$store.commit('SET_ISPOPNOTICE', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
  .carousel-container,.hot-container{
    padding: 0.13rem;
    border-bottom: solid 0.01rem $cut-off-rule;
  }
  .cc-nodate{
    min-height: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notice-nodate{
    margin-top: 0.1rem;
    line-height: 0.3rem;
    height: 0.3rem;
    background: $login-bg;
    padding: 0 0.15rem;
    border-top: solid 0.01rem $cut-off-rule;
    border-bottom: solid 0.01rem $cut-off-rule;
    display: flex;
  }
  .about-us-container {
    padding: 0.13rem;
    background: $footer-bg;
  }
  .swiper-box{
    height: 1.4rem;
    overflow: hidden;
    /*padding: 0 1px;*/
    position: relative;
    width: 100%;
    /*.sw-center{*/
    /*  position:relative;*/
    /*  width: 100%;*/
    /*  float: left;*/
    /*}*/
    .sw-left{
      position:absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: $main-bg;
      z-index: 12312312;
    }
    .sw-right{
      position:absolute;
      right: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: $main-bg;
      z-index: 12312312;
    }
    /*margin-right: 10px;*/
    /*overflow: hidden;*/
    .van-swipe{
      height: 1.4rem;
      margin-right: 1px;
    }
    .swipe-img{
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
</style>
