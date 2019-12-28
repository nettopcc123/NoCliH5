<template>
  <f7-page @page:beforein="onPageBeforeIn" @page:beforeout="onPageBeforeOut">
    <ff-header-goback titProp='注册' rUrlProp='/login'></ff-header-goback>
    <section class="register scroll-con shift-up">
      <article class="login-l">
        <p class="logo-reg-tit">欢迎注册V竞技</p>
        <ul class="login-list" v-show="showPwdInp">
          <li :class="reg.name.rem ? 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls">手机号</span>
              <div class="login-pi">
                <div class="phone-input" @touchend.prevent="focus(1)">
                  <ff-input hint='手机号' :showCursor="sheetProp" :format="true" maxLength='11' delName="delSignPhoneNumber" getName="getSignPhoneNumber"></ff-input>
                </div>
                <i>{{reg.name.rem}}</i>
              </div>
            </div>
          </li>
          <li :class="reg.vcode.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls">验证码</span>
              <div class="l-v-warp login-pi">
                <div class="code-input" @touchend.prevent="focus(2)">
                  <ff-input hint='请输入验证码' :showCursor="CodeSheet" :shiftUpVal="1.2" maxLength='4' delName="delSignSecurityCode" getName="getSignSecurityCode"></ff-input>
                </div>
                <ff-send-msg curDownNameProp='sendMsgReg' :isPassProp="reg.name.isPass" :usernameProp="username" codeProp="2"></ff-send-msg>
                <i>{{reg.vcode.rem}}</i>
              </div>
            </div>
          </li>
          <li :class="reg.pwd.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls login-sp">密码</span>
              <div class="login-pi">
                <input :type="pwdType" class="ff-input" @input="pwdVerif()" @focus="pwdFocus" ref="signPwd" v-model="passwd" placeholder="密码">
                <i>{{reg.pwd.rem}}</i>
                <ff-change-eye @changeEye="changeEye"></ff-change-eye>
              </div>
            </div>
          </li>
        </ul>
        <p class="login-pw-p"><f7-link href="/login"><span>已有账号，立即登录<svg-icon icon-class="more" /></span></f7-link></p>
        <p class="comm-but login-but ptb15" @touchend.prevent="register" :class="curBut ? 'cur-but' : ''">
          <span>确定<ff-load-but class="lb-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but></span>
        </p>
      </article>
        <div class="login-arg">
          <p><f7-checkbox name="isRead" :checked="isAgreement" @change="checkAgreement"></f7-checkbox></p>
          <div @touchend.prevent="showServiceAgreementClick">
            <p>已阅读 并同意<span>《用户服务协议》</span></p>
          </div>
        </div>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import { register } from '@m/http/Api.module'
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
import Rule from '@m/rule/Rule.module'; // 验证
import SystemBase from '@m/systemBase/SystemBase.module';
import { setToken } from '@m/utils/Auth.module'
import { mapState } from 'vuex';
import SendMsg from "@c/sendMsg/SendMsg.view"; // 发送验证码
import Utils from "@m/utils/Utils.module"; 
import TimerManager from '@m/timerManager/TimerManager.module'; // 计时任务管理器
export default {
  name: 'LoginVerif', // 验证码登入
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-change-eye": ChangEye,
    "ff-send-msg": SendMsg,
  },
  props: {},
  computed: {
    ...mapState({
      sourceid: state => state.sourceid 
    }),
  },
  data() {
    return {
      username: '',
      passwd: '',
      veirfCode: '', // 验证码
      isAgreement: true,
      // isSendCode: false, // 是否可发送验证码
      pwdType: 'password', // 密码是否可见
      curBut: false, // 按扭是否可点
      showPwdInp: true,
      isReq:  true, // 请求是否完成
      sheetProp: false,
      CodeSheet: false,
      // sourceId: '',
      reg:{ // 验证
        name: { // 用户名验证
          rem: '',
          isPass: false
        },
        pwd: { // 密码验证
          rem: '',
          isPass: false
        },
        vcode: { // 验证码验证
          rem: '',
          isPass: false
        },
      },
    };
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
    
  },
  methods: {
    bindEvent(){
      SystemBase.of().getTCjs()
      this.$customEvent.on('getSignPhoneNumber', data => {
        this.username = data.join("")
        this.nameVerif()
      })
      this.$customEvent.on('delSignPhoneNumber', data => {
        this.username = data.join("")
        this.nameVerif()
      })
      this.$customEvent.on('getSignSecurityCode', data => {
        this.veirfCode = data.join("")
        this.vCodeVerif()
      })
      this.$customEvent.on('delSignSecurityCode', data => {
        this.veirfCode = data.join("")
        this.vCodeVerif()
      })
    },
    focus(v) {
      this.$refs.signPwd.blur()
      if(v == 1) {
        this.sheetProp = true
        this.CodeSheet = !this.sheetProp
      }
      if(v == 2) {
        this.CodeSheet = true
        this.sheetProp = !this.CodeSheet
      }
    },
    pwdFocus() {
      this.CodeSheet = false
      this.sheetProp = false
      window.utils.of().shiftUp(false)
    },
    checkAgreement(event) {
      this.isAgreement = event.target.checked
      this.loginButVerif()
    },
    changeEye(v) { // 改变密码显示状态
      if(v) {
        this.pwdType = 'text'
      }else{
        this.pwdType = 'password'
      }
    },
    nameVerif() { // 用户名验证
      let rr = Rule.of().rules.tel,
          rrt = rr.reg.test(this.username);
      if(rrt) {
        this.reg.name.isPass = true
        this.reg.name.rem = ''
        // this.isSendCode = true
      }else{
        this.reg.name.isPass = false
        this.reg.name.rem = rr.desc
        // this.isSendCode = false
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
    register() {
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        username: this.username,
        passwd: Utils.of().md5(this.passwd),
        smsCode: this.veirfCode
      }
      if(this.sourceid){
        param = Object.assign(param, {sourceId : this.sourceid})
      }
      this.$store.dispatch('register', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.butVerif = false
          // window.f.tips.success({text: '注册成功', duration: 1500})
          let t = res.content
          this.$store.commit('SET_TOKEN', t);

          // let t = res.content;
          // this.$store.commit('SET_TOKEN', t);
          // setToken(t)
          return res
        }else{
          if(res.respCode == '300001') {
            this.butVerif = false
            return
          }
          this.butVerif = true
          this.reg.pwd.rem = res.respMsg
        }
      }).then((res) => {
        if(res.success && res.success == 1) {
            window.f.tips.success({text: '注册成功', duration: 1500}, () => {
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
    },
    onPageBeforeOut() {
      TimerManager.of().stopSetTimeout('sendMsgReg'); // 计时器销毁
      this.$customEvent.trigger('showSerAgr', false)
      this.showPwdInp = false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.register{
  background-color: $login-bg;
  .logo-reg-tit{
    font-size: 0.23rem;
    color: $font-login;
    text-align: left;
    padding: 0.25rem 0 0.2rem 0;
  }
  .login-l{
    padding: 0.4rem 0.28rem 0;
    width: 3.19rem;
    margin: 0 auto;
    color: $font-login;
    text-align: center;
    background: $login-bg;
    border-radius: 0.06rem;
    overflow: hidden;
    position: relative;
    min-height: calc(100% - 1.82rem);
    input::-webkit-input-safebox-button{
      display: none;
    }
  }
  .l-v-warp{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .login-pw-p{
    display: flex;
    justify-content: flex-end;
    line-height: 0.4rem;
    margin-bottom: 0.1rem;
    padding-top: 0.1rem;
  }
  .ptb15{
    margin: 0.15rem 0
  }
  .phone-input,.code-input {
    width: 100%;
  }
}
</style>