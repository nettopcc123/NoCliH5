<template>
  <f7-page>
    <ff-header-goback titProp='' rUrlProp='/personalInfo'></ff-header-goback>
    <section class="cg-pwd scroll-con shift-up">
      <article class="cg-pwd-t">
        <div class="cg-t1">修改提款密码</div>
        <div class="cg-t2">
          <div class="upd-wit-pwd" @touchend="getOpwd()">
            <ff-input hint='请输入原提款密码' maxLength='4' :shiftUpVal="0.8" :showCursor="keybordShow" :content="withPwd" delName="delUpdWitPwd" getName="getUpdWitPwd"></ff-input>
          </div>
          <ff-change-eye @changeEye="changeEye"></ff-change-eye>
        </div>
        <div class="cg-t2">
          <div class="upd-wit-pwd" @touchend="getNpwd()">
            <ff-input hint='请重新设置提款密码' maxLength='4' :shiftUpVal="0.8" :showCursor="keybordShow01" :content="withPwdNew"  delName="delUpdNewWitPwd" getName="getUpdNewWitPwd"></ff-input>
          </div>
          <ff-change-eye @changeEye="changeEyeNew"></ff-change-eye>
        </div>
      </article>
      <p class="comm-but pwd-b" @touchend.prevent="confirmDrawPwd" :class="curBut ? 'cur-but' : ''">确认修改</p>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
import Utils from "@m/utils/Utils.module";
export default {
  name: 'LoginPwd', // 登录密码
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-change-eye": ChangEye
  },
  data() {
    return {
      keybordShow: false, // 旧密码数字键盘
      keybordShow01: false, // 新密码数字键盘
      pwd: null, // for转义
      pwdNew: null, // for转义
      withPwd: '',
      withPwdNew: '',
      password: false,
      newPassword: false,
      curBut: false, // 按扭是否可点
      isReq:  true, // 请求是否完成
    };
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('getUpdWitPwd', data => {
        this.pwd = data.join('')
        this.conversionValue(this.pwd,'old')
        this.hidPwdForBindEvent()
      })
      this.$customEvent.on('delUpdWitPwd', data => {
        this.pwd = data.join('')
        this.conversionValue(this.pwd,'old')
        this.hidPwdForBindEvent()
      })
      this.$customEvent.on('getUpdNewWitPwd', data => {
        this.pwdNew = data.join('')
        this.conversionValue(this.pwdNew,'new')
        this.hidPwdForBindEvent()
      })
      this.$customEvent.on('delUpdNewWitPwd', data => {
        this.pwdNew = data.join('')
        this.conversionValue(this.pwdNew,'new')
        this.hidPwdForBindEvent()
      })
    },
    conversionValue(data,type) {
      if(type == 'old') {
        if(this.password) {
          this.withPwd = this.pwd
        }else {
          let arr = []
          for(let i = 0; i < data.length; i++) {
            arr.push("●")
          }
          this.withPwd = arr.join("")
        }
      }
      if(type == 'new') {
        if(this.newPassword) {
          this.withPwdNew = this.pwdNew
        }else {
          let arr = []
          for(let i = 0; i < data.length; i++) {
            arr.push("●")
          }
          this.withPwdNew = arr.join("")
        }
      }
    },
    changeEyeNew(v) {
      this.newPassword = v
      this.conversionValue(this.pwdNew,'new')
    },
    changeEye(v) { // 改变密码显示状态
      this.password = v
      this.conversionValue(this.pwd,'old')
    },
    getOpwd() { // 旧密码输入框点击事件
      this.keybordShow = true;
      this.keybordShow01 = false;
    },
    getNpwd() {
      this.keybordShow = false;
      this.keybordShow01 = true;
    },
    hidPwdForBindEvent() {
      this.curBut = this.withPwd.length == 4 && this.withPwdNew.length == 4
    },
    confirmDrawPwd() { // 确定提交
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        oldDrawPasswd: Utils.of().md5(this.pwd),
        newDrawPasswd: Utils.of().md5(this.pwdNew)
      }
      this.$store.dispatch('modifyDrawPwd', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.$tips.success('提款密码设置成功')
          const router = this.$f7router;
          router.navigate({
            name: 'personalInfo',
            path: '/personalInfo'
          });
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.cg-pwd{
  .cg-pwd-t{
    width: 3.25rem;
    background-color: $login-bg;
    border-radius: 0rem 0rem 0.06rem 0.06rem;
    padding: calc(100vh - 5.6rem) 0.25rem 0.25rem;
    margin-bottom: 0.2rem;
    .cg-t1{
      font-size: 0.23rem;
      color: $icon;
      padding-bottom: 0.1rem;
    }
    .cg-t2{
      border-bottom: 0.01rem solid $per-lin;
      font-size: 0.16rem;
      color: $icon;
      line-height: 0.4rem;
      height: 0.4rem;
      padding-top: 0.3rem;
      position: relative;
      display: flex;
      span{
        width: 100%;
        input{
          width: 100%;
          height: 0.44rem;
          line-height: 0.44rem;
        }
      }
      .cg-eye{
        width: 0.44rem;
      }
    }
    .c-i{
      width: 2.81rem;
      float: left;
    }
    .cg-left{
      width: 100%;
      height: 0.44rem;
      position: absolute;
      left: 0;
      top: 0;
      // z-index: 2;
      margin-top: 0.3rem;
    }
  }
  .pwd-b{
    width: 1.6rem;
    margin: 0 auto;
  }
  .upd-wit-pwd{
    flex: 1;
  }
}
</style>