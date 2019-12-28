<template>
  <f7-page @page:beforeout="onPageBeforeOut">
    <ff-header-goback rUrlProp='/login'></ff-header-goback>
    <section class="login-ver scroll-con shift-up" >
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
              <div class="login-pi" @touchend.prevent="focus(1)">
                <ff-input hint='手机号' maxLength='11' :showCursor="sheetProp" :shiftUpVal="0.5" :format="true" delName="delCellPhoneNumber" getName="getCellPhoneNumber"></ff-input>
                <i>{{reg.name.rem}}</i>
              </div>
            </div>
          </li>
          <li :class="reg.vcode.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls">验证码</span>
              <div class="l-v-warp login-pi">
                <div class="code-input" @touchend.prevent="focus(2)">
                  <ff-input hint='请输入验证码' maxLength='4' :shiftUpVal="0.5" :showCursor="CodeProp" delName="delLoginSecurityCode" getName="getLoginSecurityCode"></ff-input>
                </div>
                <ff-send-msg curDownNameProp='sendMsg' :isPassProp="reg.name.isPass" :usernameProp="username" codeProp="0"></ff-send-msg>
                <i>{{reg.vcode.rem}}</i>
              </div>
            </div>
          </li>
        </ul>
        <p class="login-pw-p"><f7-link href="/login"><span>密码登录<svg-icon icon-class="more" /></span></f7-link></p>
        <p class="comm-but login-but mb15" @touchend.prevent="login" :class="curBut ? 'cur-but' : ''">
          <span>登录<ff-load-but class="lb-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but></span>
        </p>
        <p class="login-reg"><f7-link href="/registered">还没有账户？ 立即注册<svg-icon icon-class="more" /></f7-link></p>
      </article>
      <div class="login-arg">
        <p><f7-checkbox name="isRead" :checked="isAgreement" @change="checkAgreement"></f7-checkbox></p>
        <div @touchend.prevent="showServiceAgreementClick">
          <p>已阅读 并同意<span>《用户服务协议》</span></p>
        </div>
      </div>
    </section>
    <ff-service-agreement :sheetProp="showServiceAgreement"></ff-service-agreement>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import Rule from '@m/rule/Rule.module'; // 验证
import { setToken, removeToken } from '@m/utils/Auth.module';
import ServiceAgreement from "@p/comm/ServiceAgreement.view"; // 服务协议
import SendMsg from "@c/sendMsg/SendMsg.view"; // 发送验证码
import TimerManager from '@m/timerManager/TimerManager.module'; // 计时任务管理器
export default {
  name: 'LoginVerif', // 验证码登入
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-send-msg": SendMsg,
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
      veirfCode: '', // 验证码
      isReq:  true, // 请求是否完成
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      sheetProp: false, // 是否显示键盘
      CodeProp: false, // 验证码键盘
      reg:{ // 验证
        name: { // 用户名验证
          rem: '',
          isPass: false
        },
        vcode: { // 密码验证
          rem: '',
          isPass: false
        },
      },
      sendMsg: '发送验证码',
      showServiceAgreement: false, // 服务协议显示与否
    };
  },
  filters: {
    
  },
  created() {},
  mounted() {
    this.$customEvent.on('getCellPhoneNumber', data => {
      this.username = data.join("")
      this.nameVerif()
    })
    this.$customEvent.on('delCellPhoneNumber', data => {
      this.username = data.join("")
      this.nameVerif()
    })
    this.$customEvent.on('getLoginSecurityCode', data => {
      this.veirfCode = data.join("")
      this.vCodeVerif()
    })
    this.$customEvent.on('delLoginSecurityCode', data => {
      this.veirfCode = data.join("")
      this.vCodeVerif()
    })
  },
  methods: {
    focus(v) {
      if(v == 1) {
        this.sheetProp = true
        this.CodeProp = !this.sheetProp
      }
      if(v == 2) {
        this.CodeProp = true
        this.sheetProp = !this.CodeProp
      }
    },
    startDate() { // 开始倒计时
      if (this.curDownDate === 0) {
        this.refresh(true)
      }
      this.curDownDate--
      this.$emit('change', this.curDownDate)
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
    vCodeVerif() { // 验证码验证
      let rr = Rule.of().rules.vcode,
          rrt = rr.reg.test(this.veirfCode);
      if(rrt) {
        this.reg.vcode.isPass = true
        this.reg.vcode.rem = ''
      }else{
        this.reg.vcode.isPass = false
        this.reg.vcode.rem = rr.desc
      }
      this.loginButVerif()
    },
    loginButVerif() { // 按扭验证
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
        smsCode: this.veirfCode
      }
      this.$store.dispatch('loginByCode', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.butVerif = false
          let t = res.content
          this.$store.commit('SET_TOKEN', t);
          // setToken(t)
          return res
        }else{
          let t = ''
          this.$store.commit('SET_TOKEN', t);
          removeToken()
          this.butVerif = true
          this.reg.vcode.rem = res.respMsg
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
    onPageBeforeOut() {
      TimerManager.of().stopSetTimeout('sendMsg'); // 计时器销毁
      this.$customEvent.trigger('showSerAgr', false)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.login-ver{
  background-color: $login-bg;
  .login-logo{
    min-height: calc(100% - 4.1rem);
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
    min-height: 2rem;
    margin: 0 auto;
    color: $font-login;
    text-align: center;
  }

  .l-v-warp{
    display: flex;
    justify-content: space-between;
  }
  .code-input{
    flex: 1;
  }
  .login-pw-p{
    display: flex;
    justify-content: flex-end;
    line-height: 0.4rem;
    margin-bottom: 0.1rem;
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