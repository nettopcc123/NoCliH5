<template>
  <div class="index-header">
    <div class="hg-r">
      <f7-link class="personal-icon"  @click="sheetOpened"><svg-icon :icon-class="iconProp" class="ih-wico" /></f7-link>
    </div>
    <div class="ih-tit">
      <f7-link href="/index"><img :src="logo" alt="威竞技"></f7-link>
    </div>
    <div class="login-btn" :class="token && isReq ? 'ih-cur' : 'on-cur'" @touchend.prevent="gotoUrl()">
      <p class="symbol" v-show="token && isReq"><span></span><span>￥</span></p>
      <p class="money">
        <span><svg-icon :icon-class="token && isReq ? 'login_user' : 'login'" class="ih-wico-l"/></span>
        <span v-show="token && isReq">{{cententBlance}}</span>
        <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
      </p>
    </div>
    <ff-servicecomponents :sheetProp="isShow"></ff-servicecomponents>
  </div>
</template>

<script>
const ServiceComponents = () => import("@p/comm/ServiceComponents.view") // 客服
import { mapGetters, mapState } from 'vuex';
import { type } from 'os';
export default {
  name: "IndexHeader", // 首页头部
  components: {
    "ff-servicecomponents": ServiceComponents,
  },
  props: {
    iconProp: { // 左侧图标名称
      type: String,
      default: '/personal'
    },
    urlProp: { // 跳转的地址 默认跳首页
      type: String,
      default: '/index'
    },
    logoIcon: { // 中间logo图标名称
      type: String,
      default: '/logo'
    },
    isReq: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // ...mapGetters(['token']),
    ...mapState({
      cententBlance: state => state.cententBlance
    }),
    token: {
      get() {
        return this.$store.state.token
      },
      set(item) {
        return item
      }
    }
  },
  data() {
    return {
      isShow: false, // 客服组件是否显示
      logo: require('@/assets/images/logo2.png')
    }
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      // this.getCenterAmount()
      this.$customEvent.on('hRightAction', data => {
          const router = this.$f7router;
          router.navigate({
            name: data,
            path: `/${data}`
          });
      })
    },
    sheetOpened() {
      this.isShow = true;
      this.$customEvent.trigger('showService', true)
    },
    hRightAction() {
      this.$emit('hRightAction')
    },
    close() {
      this.$customEvent.trigger(this.rActionName, this.rAction)
    },
    gotoUrl() {
      const router = this.$f7router;
      let name = 'login'
      if(this.token) {
        name = 'member'
      }
      router.navigate({
        name: name,
        path:`/${name}`
      });
    }
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.index-header{
  position: fixed;
  top:0;
  right: 0;
  z-index: 100;
  background: $main-bg;
  height: 0.44rem;
  line-height: 0.44rem;
  width: 100%;
}
.ih-wico{
  width: 0.23rem!important;
  height: 0.23rem!important;
}
.ih-wico-l{
  width: 0.22rem!important;
  height: 0.22rem!important;
  color: $font-but-wall;
}
.ih-wlogo{
  width: 1.2rem!important;
  height: 0.26rem!important;
}
.login-blance{
  position: absolute;
  top: 0.05rem;
  left: 0.4rem;
}
.login-btn{
  width: auto;
  height: 100%;
  float:right;
  z-index: 10;
  display: flex;
  .money,.symbol{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $font-but-wall;
    span{
      display: inline-block;
      height: 0.22rem;
      line-height: 0.22rem;
    }
  }
}
.ih-cur{
  color: rgba($icon, 0.6);
  padding: 0.02rem 0.13rem 0 0;
  svg{
    color: rgba($font-but-wall, 0.8);
    width: 0.23rem!important;
    height: 0.23rem!important;
  }
  .iha-load{
    width: 0.16rem !important;
    height: 0.16rem !important;
    margin-top: 0.02rem
  }
}
.on-cur{
  min-width: 0.44rem;
  .money{
    margin: auto;
  }
}
.ih-tit{
  width: 1.75rem;
  position: absolute;
  left: 1rem;
  line-height: 0.44rem;
  height: 0.44rem;
  z-index: 0;
  a{
    width: 100%;
    height: 0.44rem;
    img{
      max-height: 0.28rem;
    }
  }
}
.hg-r{
  width: 0.44rem;
  float: left;
  text-align: center;
  display: flex;
  justify-items: flex-end;
  height: 0.44rem;
  z-index: 2;
  a{
    width: 100%;
    height: 0.44rem;
    color: $font-but-wall;
  }
}
</style>
