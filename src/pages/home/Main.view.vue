<template>
    <f7-page class="vgame-main">
      <ff-vgame-header></ff-vgame-header>
      <iframe 
        :src="url"
        name="vgame" 
        scolling="no"
        class="vgif-h"
        ref="vgame"
        v-show="rgUrl"
      >
      </iframe>
    </f7-page>
</template>
<script>
import Header from "@p/comm/headerFoot/Header.view"; // 头部
import { mapGetters } from 'vuex';
import { removeToken } from '@m/utils/Auth.module'
export default {
  components: {
    "ff-vgame-header": Header
  },
  computed: {
    ...mapGetters(['rgUrl', 'token'])
  },
  data() {
    return {
      leftIconProp: 'personal',
      resolution: 200,  
      iframes: [],  
      interval: null,
      frame: null,
      vueid:"myid",
      startTime: '', // 维护开始时间
      endTime: '', // 维护结束时间
      detail: '', // 维护内容
      isGetUrl: false, // 是否已获取URL
      url: this.rgUrl,
      isReqGame: true
    }
  },
  watch: {
  },
  created(){
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      this.url = this.rgUrl;
      if(!this.url) {
        this.gotoUrl('main')
      }else{
      const isEnv = process.env.NODE_ENV;
      let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2flogo.v88.mobi%2fv_h5_2019091.css%22%7d'
      // let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2fwww.v2.me%2fv_h5_2019091.css%22%7d'
      if(isEnv == 'uat') enCodeUrl = '%7B%22ocss%22%3A%22https%3A%2F%2Fimages.qiankeduo.cc%2Flogo%2Fv_h5_2019091.css%22%7D'
      this.url = `${this.rgUrl}&init=${enCodeUrl}`
      }
    },
    judgeLogin() {
      if(this.rgUrl,this.rgUrl.indexOf('payload=logout') > -1 || this.rgUrl.indexOf('?payload=') < 0) {
        this.$store.commit('SET_TOKEN', '');
        removeToken()
      }
    },
    gotoUrl(url) {
      if(!this.isReqGame) return
      this.isReqGame = false
      let isTo = false,
          name = 'login'
      const router = this.$f7router;
      if(!this.token) {
        router.navigate({
          name: name,
          path: `/${name}`
        });
        return
      }
      // this.$store.commit("SET_ISSHOWLOADING", true)
      if(url == 'main') {
        this.$store.dispatch('loginRG', {platId: '1'}).then( response => { // 执行调接口
          let res = response
          // this.$store.commit("SET_ISSHOWLOADING", false)
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
              const isEnv = process.env.NODE_ENV;
              let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2flogo.v88.mobi%2fv_h5_2019091.css%22%7d'
              // let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2fwww.v2.me%2fv_h5_2019091.css%22%7d'
              if(isEnv == 'uat') enCodeUrl = '%7B%22ocss%22%3A%22https%3A%2F%2Fimages.qiankeduo.cc%2Flogo%2Fv_h5_2019091.css%22%7D'
              this.url = `${res.content.url}&init=${enCodeUrl}`
            }
          }
          if(isTo) { // 判断是否有url  没有则不跳转页面
            return
          }
          return url
        }).then((url) => {
          if(!url) return
          router.navigate({
            name: url,
            path: `${url}`
          });
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.header {
  height: 0.44rem;
  background-size: 0.91rem 0.23rem;
  background-position: 50%;
  background-repeat: no-repeat;
}
.vgif-h{
  height: 100%;
  margin: 0px; 
  padding: 0px; 
  overflow: hidden; 
  border: none; 
  width: 100vw;
  .back-icon{
    display: none;
  }
}
.h-maintain{
  display: flex;
  height: calc(100% - 0.44rem);
  background-color: $login-bg;
  .contentBox {
    height: auto;
    margin: auto;
    .maintain{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height: 1.17rem;
        max-width: 1.44rem;
      }
    }
    div.content{
      margin-top: 0.16rem;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 2rem;
        height: auto;
        h2{
          line-height: 0.2rem;
          font-size: 0.16rem;
          color: $font-login;
          opacity: rgba(0,0,0,0.6);
          text-align: center;
        }
        p{
          font-size: 0.14rem;
          line-height: 0.22rem;
          color: $font-login;
        }
        .time{
          line-height: 0.3rem;
          font-size: 0.11rem;
          color: $login-f-pwd;
          text-align: center;
        }
      }
    }
  }
  
}
</style>
