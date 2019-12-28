<template>
  <f7-page>
    <ff-header-goback titProp='提款密码' rUrlProp='/personalInfo'></ff-header-goback>
    <section class="login-pwd scroll-con shift-up">
      <article class="l-pwd-t">
        <p class="lp-t1">设置提款密码</p>
        <p class="lp-t2">为了您的资金安全，请完成提款密码设置</p>
        <p class="lp-t3">提款密码</p>
        <p class="lp-t4">
          <span class="upd-wit-pwd" @touchend="hidKeyBord()">
            <ff-input hint='请输入提款密码' maxLength='4' :shiftUpVal="0.5" :showCursor="sheetProp" :content="withPwd"  delName="delSheZhiNewWitPwd" getName="getSheZhiNewWitPwd"></ff-input>
          </span>
          <ff-change-eye @changeEye="changeEye"></ff-change-eye>
        </p>
      </article>
      <p class="comm-but pwd-b" @touchend.prevent="confirmDrawPwd" :class="curBut ? 'cur-but' : ''">确定提交</p>
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
  props: {},
  computed: {
  },
  data() {
    return {
      withdrawPwd: null, // for显示
      withdrawPwdParam: null, // for传参
      pwd: null, // for转义
      withPwd: '',
      sheetProp: false,
      showEye: false,
      curBut: false, // 按扭是否可点
      isReq:  true, // 请求是否完成
    };
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('getSheZhiNewWitPwd', data => {
        this.pwd = data.join('')
        this.conversionValue(this.pwd)
        this.hidPwdForBindEvent(this.pwd)
      })
      this.$customEvent.on('delSheZhiNewWitPwd', data => {
        this.pwd = data.join('')
        this.conversionValue(this.pwd)
        this.hidPwdForBindEvent(this.pwd)
      })
    },
    conversionValue(data) {
      if(data == null) return
      if(this.showEye) {
        this.withPwd = this.pwd
      }else {
        let arr = []
        for(let i = 0; i < data.length; i++) {
          arr.push("●")
        }
        this.withPwd = arr.join("")
      }
    },
    hidPwdForBindEvent(data) {
      this.curBut = data.length == 4
      this.withdrawPwdParam = data
    },
    changeEye(v) { // 改变密码显示状态
      this.showEye = v
      this.conversionValue(this.pwd)
    },
    hidKeyBord() {
      this.sheetProp = true
    },
    confirmDrawPwd() { // 确定提交
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        drawPasswd: Utils.of().md5(this.withdrawPwdParam)
      }
      this.$store.dispatch('addDrawPwd', param).then((res) => {
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
.login-pwd{
  .l-pwd-t{
    width: 3.25rem;
    background-color: $login-bg;
    border-radius: 0rem 0rem 0.06rem 0.06rem;
    padding: calc(100vh - 5.6rem) 0.25rem 0.25rem;
    margin-bottom: 0.2rem;
    .lp-t1{
      font-size: 0.23rem;
      color: $icon;
      padding-bottom: 0.1rem;
    }
    .lp-t2{
      font-size: 0.11rem;
      color: $login-f-pwd;
      padding-bottom: 0.25rem;
    }
    .lp-t3{
      font-size: 0.16rem;
      color: $icon;
      padding-bottom: 0.1rem;
    }
    .lp-t4{
      border-bottom: 0.01rem solid $per-lin;
      font-size: 0.16rem;
      color: $icon;
      line-height: 0.4rem;
      height: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 0.2rem;
        color: $icon;
      }
      .lp-pwd{
        width: 90%;
        display: block;
        height: 0.4rem;
      }
    }
  }
  .pwd-b{
    width: 1.6rem;
    margin: 0 auto;
  }
  .upd-wit-pwd{
    width: 100%;
  }
}
</style>