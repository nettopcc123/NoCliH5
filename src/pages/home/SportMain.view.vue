<template>
    <f7-page>
      <ff-vgame-header vhclass="vsoprt"></ff-vgame-header>
      <iframe 
        :src="jbbUrl"
        name="vgame" 
        scolling="no"
        class="vsif-h"
        ref="vgame"
        v-show="jbbUrl"
        sandbox="allow-forms allow-scripts allow-same-origin"
        allowfullscreen
      >
      </iframe>
    </f7-page>
</template>
<script>
import Header from "@p/comm/headerFoot/Header.view"; // 头部
import { mapState } from 'vuex';
import { removeToken } from '@m/utils/Auth.module'
import { mapGetters } from 'vuex';
export default {
  components: {
    "ff-vgame-header": Header
  },
  computed: {
    ...mapState({
      jbbUrl: state => state.jbbUrl, // 小金体育
    }),
    ...mapGetters(['token'])
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
      isReqGame: true
    }
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      if(!this.jbbUrl) { this.gotoUrl('sportMain') }
    },
    judgeLogin() {
      if(this.jbbUrl,this.jbbUrl.indexOf('payload=logout') > -1 || this.jbbUrl.indexOf('?payload=') < 0) {
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
      if(url == "sportMain") {
        this.$store.dispatch('loginJBB').then( response => {
          this.isReqGame = true
          let res = response
          // this.$store.commit("SET_ISSHOWLOADING", false)
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
              this.$store.commit('SET_JBBURL', res.content.url);
            }
          }
          if(isTo) {
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
.vsif-h{
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
