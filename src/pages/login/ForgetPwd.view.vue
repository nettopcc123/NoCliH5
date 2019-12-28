<template>
  <f7-page class="forget-pwd" @page:beforeout="onPageBeforeOut">
    <ff-header-goback titProp='忘记密码' rUrlProp='/login'></ff-header-goback>
    <section class="fgp-c scroll-con shift-up">
      <article class="fgp-l">
        <ul class="fgp-list">
          <li :class="reg.name.rem ? 'cur-lin' : ''">
            <p class="fgp-l-tit">手机号</p>
            <div class="login-pi">
              <div class="phone-input" @touchend.prevent="focus(1)">
                <ff-input hint='请输入注册手机号' :showCursor="sheetProp" :shiftUpVal="0.9" :format="true" maxLength='11' delName="delForgetPhoneNumber" getName="getForgetPhoneNumber"></ff-input>
              </div>
              <i>{{reg.name.rem}}</i>
            </div>
          </li>
          <li :class="reg.vcode.rem ? 'cur-lin' : ''">
            <p class="fgp-l-tit">验证码</p>
            <div class="l-v-warp login-pi">
              <div class="code-input" @touchend.prevent="focus(2)">
                <ff-input hint='请输入验证码' :showCursor="CodeSheet" :shiftUpVal="0.9" maxLength='4' delName="delForgetSecurityCode" getName="getForgetSecurityCode"></ff-input>
              </div>
              <ff-send-msg curDownNameProp='forgetPwdSendMsg' :isPassProp="reg.name.isPass" :usernameProp="username" codeProp="1"></ff-send-msg>
              <i>{{reg.vcode.rem}}</i>
            </div>
          </li>
          <li :class="reg.pwd.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
            <p class="fgp-l-tit">密码</p>
            <p class="l-v-warp login-pi">
              <input :type="pwdType" class="ff-input" @input="pwdVerif()" @focus="pwdFocus" v-model="passwd" ref="forgetPwd" placeholder="请重新设置密码">
              <ff-change-eye @changeEye="changeEye"></ff-change-eye>
              <i>{{reg.pwd.rem}}</i>
            </p>
          </li>
        </ul>
      </article>
      <p class="comm-but but-175" @touchend.prevent="forgetPwd" :class="curBut ? 'cur-but' : ''">
        <span>确定<ff-load-but class="lb-load" v-show="!isReq" :isRepProp="isReq"></ff-load-but></span>
      </p>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
import Rule from '@m/rule/Rule.module'; // 验证
import SystemBase from '@m/systemBase/SystemBase.module';
import { forgetPwd } from '@m/http/Api.module' // api接口
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
  },
  data() {
    return {
      username: '', // 用户名
      veirfCode: '', // 验证码
      passwd: '', // 密码
      isReq:  true, // 请求是否完成
      pwdType: 'password', // 密码是否可见
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      sheetProp: false,  
      CodeSheet: false,
      // isSendCode: false, // 是否可发送验证码
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
      this.$customEvent.on('getForgetPhoneNumber', data => {
        this.username = data.join("")
        this.nameVerif()
      })
      this.$customEvent.on('delForgetPhoneNumber', data => {
        this.username = data.join("")
        this.nameVerif()
      })
      this.$customEvent.on('getForgetSecurityCode', data => {
        this.veirfCode = data.join("")
        this.vCodeVerif()
      })
      this.$customEvent.on('delForgetSecurityCode', data => {
        this.veirfCode = data.join("")
        this.vCodeVerif()
      })
    },
    focus(v) {
      this.$refs.forgetPwd.blur()
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
    loginButVerif() { // 登入按扭验证
      let goBut = [];
      Object.keys(this.reg).forEach((key, val) => {
        if(this.reg[key].isPass) {
          goBut.push(this.reg[key].isPass)
        }
      })
      if(goBut.length == Object.keys(this.reg).length) {
        this.curBut = true
      }else{
        this.butVerif = false
        this.curBut = false
      }
    },
    forgetPwd() { // 忘记密码
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        mobile: this.username,
        passwd: Utils.of().md5(this.passwd),
        smsCode: this.veirfCode
      }
      this.$store.dispatch('forgetPwd', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.butVerif = false
          const router = this.$f7router;
          router.navigate({
            name: 'login',
            path: '/login'
          });
        }else{
          this.butVerif = true
          this.reg.pwd.rem = res.respMsg
        }
      })
    },
    onPageBeforeOut() {
      TimerManager.of().stopSetTimeout('forgetPwdSendMsg'); // 计时器销毁
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.forget-pwd{
    background-color: $login-bg;
  .fgp-c{
    background-color: $login-bg;
    height: calc(100% - 0.44rem);
  }
  .fgp-l{
    padding: 0.4rem 0.28rem 0;
    width: 3.19rem;
    margin: 0 auto 0.4rem;
    color: $font-login;
    text-align: center;
    background: $login-bg;
    border-radius: 0.06rem;
  }
  // .pw-v-but{
  //   width: 1.2rem;
  //   height: 0.44rem;
  //   font-size: 0.14rem;
  //   line-height: 0.44rem;
  //   color: $login-f-pwd;
  //   border: none;
  //   background: none;
  // }
  .fgp-pw-p{
    display: flex;
    justify-content: flex-end;
    line-height: 0.4rem;
    margin-bottom: 0.1rem;
  }
  .phone-input,.code-input {
    width: 100%;
  }
}
</style>