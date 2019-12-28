<template>
  <f7-page @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='个人资料' rUrlProp='/member'></ff-header-goback>
    <section class="personal scroll-con">
      <article class="p-c-con">
        <ul class="p-c-c-list">
          <li>
            <a href="javascript:void(0);">
              <div class="p-c-n">V竞技号</div>
              <div class="p-c-h">
                {{ userInfo.id }}
                <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
              </div>
            </a>
          </li>
          <li>
            <f7-link :href="realname ? null : bankLink"><div class="p-c-n">真实姓名</div>
              <div class="p-c-nf p-c-r">
                <span> {{ realname | formatRealname }} </span>
                <svg-icon icon-class="more" v-show="!realname && isReq"/>
                <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
              </div>
            </f7-link>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div class="p-c-n">手机号码</div>
              <div class="p-c-h">{{ userInfo.mobile | formatMobile }}
                <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
              </div>
            </a>
          </li>
          <li>
            <f7-link :href="bankName ? null : bankLink"><div class="p-c-n">银行名称</div>
              <div class="p-c-nf p-c-r">
                <span> {{ bankName ? bankName   : '未绑定银行卡'}} </span>
                <svg-icon icon-class="more" v-show="!bankName && isReq"/>
                <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
              </div>
            </f7-link>
          </li>
          <li>
            <f7-link :href="bankLink"><div class="p-c-n">银行卡号</div>
              <div class="p-c-nf p-c-r">
                <span> {{ getBankNum() }} </span>
                <svg-icon icon-class="more" v-show="isReq"/>
                <ff-load-but class="iha-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but>
              </div>
            </f7-link>
          </li>
          <li>
            <f7-link @click="goSetWithdrawPwd()">
              <div class="p-c-n">提款密码</div>
              <div class="p-c-nf p-c-r">
                <span>{{ userInfo.drawPasswdable ? '已设置' : '未设置' }}</span>
                <svg-icon icon-class="more" />
              </div>
            </f7-link>
          </li>
          <li>
            <f7-link :href="loginPwd">
              <div class="p-c-n">登录密码</div>
              <div class="p-c-nf p-c-r">
                <span>密码可修改</span>
                <svg-icon icon-class="more" />
              </div>
            </f7-link>
          </li>
        </ul>
        <p class="comm-but but-175" @touchend.prevent="logout" >退出登录</p>
      </article>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import { logout } from '@m/http/Api.module' // api接口
import { removeToken } from '@m/utils/Auth.module'
import Utils from "@m/utils/Utils.module";
import { mapState } from 'vuex';
export default {
  name: 'PersonalInfo', // 个人资料
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {},
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      realname: state => state.realname, // 真实姓名
      bankName: state => state.bankName, // 银行名称
      bankCard: state => state.bankCard // 银行卡号
    })
  },
  data() {
    return {
      loginPwd: '/changeLoginPwd',
      bankLink: '/bindBank',
      isReq:  true, // 
      isReqOut:  true // 退出登入请求是否完成
    };
  },
  mounted() {
  },
  filters: {
    formatRealname: function(v) {
      if(!v) {
        return '未填写姓名'
      }
      return v
    },
    formatBankNumb: function(v) {
      return Utils.of().numHid(v)
    },
    formatMobile: function(v) {
      return Utils.of().numHidf3l4(v)
    }
  },
  methods: {
    bindEvent() {
      this.memberInfo()
    },
    memberInfo() { // 获取用户信息
      this.isReq = false
      this.$store.dispatch('getMemberInfo').then(() => {
        this.isReq = true
      })
    },
    getBankNum() {
      let s = '立即去绑定'
      if(this.bankCard) s= Utils.of().numHid(this.bankCard)
      return s
    },
    logout() { // 退出登入
      if(!this.isReqOut) {
        return
      }
      this.isReqOut = false
      this.$store.dispatch('setLogout').then((res) => {
        this.isReqOut = true
        if(res.success == 1) {
          window.f.tips.success({text: '退出成功', duration: 1500}, () => {
            const router = this.$f7router;
            router.navigate({
              name: 'index',
              path: '/index'
            });
          })
          
        }
      })
    },
    goSetWithdrawPwd() {
      let name = 'withdrawPwd'
      if(this.userInfo.drawPasswdable) name = 'changeWithPwd'
      const router = this.$f7router;
      router.navigate({
        name: name,
        path: `/${name}`
      });
    },
    onPageBeforeIn() {
      this.bindEvent()
      window.f.systemEvent.trigger('changeDialog', false) // 隐藏弹窗提示
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
      window.f.store.commit("SET_ISSHOWLOAD", false) // 隐藏弹窗提示
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.personal{
  .p-c-con{
    align-items: center;
    font-size: 0.15rem;
    .p-c-c-list{
      background-color: $login-bg;
      width: 3.51rem;
      padding: 0rem 0.12rem;
      li{
        padding: 0 0.1rem;
        border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
        a{
          display: flex;
          justify-content: space-between;
          line-height: 0.56rem;
          div{
            font-size: 0.15rem;
            color: $font-login;
            span{
              font-size: 0.15rem;
            }
          }
        }
        &:last-child{
          border-bottom: none;
        }
        .p-c-r{
          display: flex;
          justify-content: space-between;
          align-items: center;
          svg{
            margin-left: 0.05rem;
            width: 0.18rem;
            height: 0.18rem;
          }
        }
      }
      .p-c-h{
        color: rgba($font-login, 0.6);
      }
      .p-c-nf{
        color: $login-f-pwd;
      }
    }
  }
}
</style>