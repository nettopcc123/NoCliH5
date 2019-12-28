<template>
  <f7-page @page:beforein="onPageBeforeIn" @page:beforeout="onPageBeforeOut">
    <ff-header-goback rUrlProp='/index'></ff-header-goback>
    <section class="login scroll-con shift-up">
      <article class="login-logo">
        <f7-link href="/index">
          <img :src="logo" alt="威竞技">
        </f7-link>
      </article> 
      <article class="login-l">
        <ul class="login-list">
          <li :class="reg.name.rem ? 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls">手机号</span>
              <div class="login-pi">
                <div class="phone-input" @touchend.prevent="phoneFonce">
                  <ff-input hint='手机号' :showCursor="sheetProp" :shiftUpVal="0.4" maxLength='11' format delName="delLoginPhoneNumber" getName="getLoginPhoneNumber"></ff-input>
                </div>
                <i>{{reg.name.rem}}</i>
              </div>
            </div>
          </li>
          <li :class="reg.pwd.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
            <div class="ll-wrap" v-show="showPwdInp">
              <span class="log-ls login-sp">密码</span>
              <div class="login-pi">
                <input :type="pwdType" ref="loginPwd" class="ff-input" @input="pwdVerif()" @focus="pwdFocus" v-model="passwd" placeholder="密码">
                <i>{{reg.pwd.rem}}</i>
                <ff-change-eye @changeEye="changeEye"></ff-change-eye>
              </div>
            </div>
          </li>
        </ul>
        <p class="login-pw-v"><span><f7-link href="/forgetPwd">忘记密码</f7-link></span> <span><f7-link href="/loginverif">验证码登录<svg-icon icon-class="more" /></f7-link></span></p>
        <p class="comm-but login-but mb15" @touchend.prevent="login" :class="curBut ? 'cur-but' : ''">
          <span>登录<ff-load-but class="lb-load" v-show="!isReq" :isRepProp="!isReq"></ff-load-but></span>
        </p>
        <p class="login-reg"><f7-link href="/registered">还没有账户？ 立即注册<svg-icon icon-class="more" /></f7-link></p>
        <div class="login-arg">
          <p><f7-checkbox name="isRead" :checked="isAgreement" @change="checkAgreement"></f7-checkbox></p>
          <div @touchend.prevent="showServiceAgreementClick">
            <p>已阅读 并同意<span>《用户服务协议》</span></p>
          </div>
        </div>
      </article>
    </section>
    <ff-service-agreement :sheetProp="showServiceAgreement"></ff-service-agreement>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
import ServiceAgreement from "@p/comm/ServiceAgreement.view"; // 服务协议
import Rule from '@/module/rule/Rule.module'; // 验证
import Utils from "@m/utils/Utils.module";
import { setToken, removeToken } from '@m/utils/Auth.module'
export default {
  name: 'Login', // 登入
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-change-eye": ChangEye,
    "ff-service-agreement": ServiceAgreement
  },
  props: {},
  computed: {
  },
  data() {
    return {
      logo: require('@/assets/images/logo2.png'),
      isAgreement: true,
      username: '', // 用户名
      showPwdInp: true,
      passwd: '', // 密码
      isReq:  true, // 请求是否完成
      pwdType: 'password', // 密码是否可见
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      sheetProp: false,
      reg:{ // 验证
        name: { // 用户名验证
          rem: '',
          isPass: false
        },
        pwd: { // 密码验证
          rem: '',
          isPass: false
        },
      },
      showServiceAgreement: false, // 服务协议显示与否
    };
  },
  mounted() {
    this.$customEvent.on('getLoginPhoneNumber', data => {
      this.username = data.join("")
      this.nameVerif()
    })
    this.$customEvent.on('delLoginPhoneNumber', data => {
      this.username = data.join("")
      this.nameVerif()
    })
    setTimeout(() => {
      let dialogTpl = document.getElementById('dialogwin-wrap');
        if(dialogTpl) return document.body.removeChild(dialogTpl);
    } ,500)
  },
  methods: {
    phoneFonce() {
      this.sheetProp = true
      this.$refs.loginPwd.blur()
    },
    pwdFocus() {
      this.sheetProp = false
      window.utils.of().shiftUp(false)
    },
    changeEye(v) { // 改变密码显示状态
      if(v) {
        this.pwdType = 'text'
      }else{
        this.pwdType = 'password'
      }
    },
    checkAgreement(event) {
        this.isAgreement = event.target.checked
        this.loginButVerif()
    },
    nameVerif() { // 用户名验证
      let rr = Rule.of().rules.tel,
          rrt = rr.reg.test(this.username);
      if(rrt) {
        this.reg.name.isPass = true
        this.reg.name.rem = ''
      }else{
        this.reg.name.isPass = false
        this.reg.name.rem = rr.desc
      }
      this.loginButVerif()
    },
    pwdVerif() { // 密码验证
      let rr = Rule.of().rules.passWord,
          rrt = rr.reg.test(this.passwd);
      if(rrt) {
        this.reg.pwd.isPass = true
        this.reg.pwd.rem = ''
      }else{
        this.reg.pwd.isPass = false
        this.reg.pwd.rem = rr.desc
      }
      this.loginButVerif()
    },
    loginButVerif() { // 登入按扭验证
      let goBut = [];
      Object.keys(this.reg).forEach((key, val) => {
        if(this.reg[key].isPass) {
          goBut.push(this.reg[key].isPass)
        }
      })
      if(goBut.length == Object.keys(this.reg).length && this.isAgreement) {
        this.curBut = true
      }else{
        this.butVerif = false
        this.curBut = false
      }
    },
    login() { // 登入
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        username: this.username,
        passwd: Utils.of().md5(this.passwd)
      }
      this.$store.dispatch('loginByPwd', param).then( res => {
        this.isReq = true
        if(res.success == 1) {
          this.butVerif = false
          let t = res.content
          this.$store.commit('SET_TOKEN', t)
          // setToken(t)
          return res
        }else{
          let t = ''
          removeToken()
          this.butVerif = true
          this.reg.pwd.rem = res.respMsg
          return res
        }
      }).then((res) => {
        if(res.success == 1) {
            window.f.tips.success({text: '登录成功', duration: 1500}, () => {
            const router = this.$f7router;
            router.navigate({
              name: 'index',
              path: '/index'
            });
            return
          })
        }
      })
    },
    showServiceAgreementClick() {
      this.$customEvent.trigger('showSerAgr', true)
    },
    onPageBeforeIn() {
      this.showPwdInp = true
      window.f.dialogWin.hid()
      window.f.systemEvent.trigger('changeDialog', false) // 隐藏弹窗提示
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
      window.f.store.commit("SET_ISSHOWLOAD", false) // 隐藏弹窗提示
    },
    onPageBeforeOut() {
      this.showPwdInp = false
      this.$customEvent.trigger('showSerAgr', false)
      this.$store.commit("SET_ISSHOWLOAD", false)
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.login{
  background-color: $login-bg;
  .login-c{
    background-color: $login-bg;
  }
  .login-logo{
    height: calc(100% - 4.22rem);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 42vw;
      height: auto;
    }
  }
  .login-l{
    width: 3.18rem;
    height: 3.2rem;
    margin: 0 auto;
    color: $font-login;
    text-align: center;
    input::-webkit-input-safebox-button{
      display: none;
    }
  }
  .login-pw-v{
    display: flex;
    justify-content: space-between;
    line-height: 0.4rem;
    margin-bottom: 0.1rem;
    span{
      &:nth-child(1){
        color: $login-f-pwd;
      }
    }
  }
  .login-but{
    width: 3.17rem;
    span{
      font-size: 0.18rem;
      position: relative;
      .lb-load{
        position: absolute;
        right: -0.25rem;
        top: 0.03rem;
      }
    }
  }
  .login-reg{
    color: $font-login;
    line-height: 0.5rem;
    a{
      font-size: 0.14rem;
    }
  }
}
</style>