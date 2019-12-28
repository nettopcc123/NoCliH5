<template>
  <f7-page>
    <ff-header-goback titProp='个人中心' rUrlProp='/index'></ff-header-goback>
    <section class="member scroll-con">
      <article class="m-info-t">
        <div class="m-i-t-cn">
          <p class="m-i-t-c">V竞技号</p>
          <p class="m-i-t-n" v-show="isReq">{{ userID }}，您好</p>
          <p class="m-i-t-n" v-show="!isReq"><ff-loading-data class="p0 font-left"></ff-loading-data></p>
        </div>
      </article>
      <article class="m-info-b">
        <ul class="m-info-b-l">
          <li v-for="(val, index) in mList" :key="index">
            <f7-link :href="val.link">
              <div class="m-i-m">
                <span class="m-i-mr10"><svg-icon :icon-class="val.icon" /></span>
                {{val.name}}
              </div>
              <div class="m-more"><svg-icon icon-class="more" /></div>
            </f7-link>
          </li>
        </ul>
      </article>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import { mapState } from 'vuex';
import Utils from "@m/utils/Utils.module";
export default {
  name: 'Member', // 主页
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {},
  computed: {
    ...mapState({
      userID: state => state.userID
    })
  },
  data() {
    return {
      isReq: true,
      mList: [
        {
          icon: 'wallet',
          name: '我的钱包',
          link: '/wallet'
        },
        {
          icon: 'bet',
          name: '投注记录',
          link: '/betRecord'
        },{
          icon: 'preferential',
          name: '优惠活动',
          link: '/prefer'
        },{
          icon: 'personalInfo',
          name: '个人资料',
          link: '/personalInfo'
        },{
          icon: 'aboutUs',
          name: '关于我们',
          link: '/about'
        }
      ]
    };
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      if(!this.userID) {
        this.getHit()
      }
    },
    getHit() {
      if(!this.isReq) {
        return
      }
      this.isReq = false
      this.$store.dispatch('getHit').then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.$store.commit('SET_USERID', res.content)   
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.m-info-t{
  width: 3.51rem;
  padding: 0.2rem 0.12rem 0;
  background-color: $login-bg;
  border-radius: 0.06rem;
}
.m-i-t-cn{
  border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
  padding: 0.1rem 0.08rem;
}
.m-i-t-c{
  font-size: 0.18rem;
  color: $font-login;
  line-height: 0.4rem;
}
.m-i-t-n{
  color: rgba($font-login, 0.6);
  line-height: 0.24rem;
  font-size: 0.15rem;
}
.font-left{
  justify-content: flex-start
}
.w06{
  width: 0.6rem;
  transition: all 0.5s;
}
.m-i-m{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.15rem;
  color: rgba($font-login, 0.8);
}
.m-i-mr10{
  margin-right: 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg{
    width: 0.19rem;
    height: 0.19rem;
  }
}
.m-info-b{
  background-color: $login-bg;
  width: 3.51rem;
  padding: 0rem 0.12rem;
}
.m-info-b-l{
  li{
    border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
    a{
      display: flex;
      justify-content: space-between;
      line-height: 0.56rem;
      padding: 0 0.08rem;
    }
    &:last-child{
      border-bottom: none;
    }
  }
}
.m-more{
  display: flex;
  align-items: center;
  height: 0.56rem;
  color: rgba($font-login, 0.6);
  svg{
    width: 0.18rem;
    height: 0.18rem;
  }
}
</style>