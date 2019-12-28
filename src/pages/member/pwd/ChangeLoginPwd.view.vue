<template>
  <f7-page @page:beforein="onPageBeforeIn" @page:beforeout="onPageBeforeOut">
    <ff-header-goback titProp='' rUrlProp='/personalInfo'></ff-header-goback>
    <section class="cg-pwd scroll-con">
      <article class="cg-pwd-t">
        <p class="cg-t1">修改登录密码</p>
        <ul class="fgp-list">
          <li class="mb15" :class="reg.oldPwd.rem ? 'cur-lin' : ''">
            <p class="login-pi">
              <input @input="oldPwdVerif()" :type="pwdType" class="ff-input" name="" v-model="oldPwd" placeholder="请输入原登录密码" v-show="showPwdInp">
              <ff-change-eye @changeEye="changeEye"></ff-change-eye>
              <i>{{reg.oldPwd.rem}}</i>
            </p>
          </li>
          <li class="mb15" :class="reg.newPwd.rem ? 'cur-lin' : ''">
            <p class="login-pi">
              <input @input="newPwdVerif()" :type="pwdTypeNew" class="ff-input" name="" v-model="newPwd" placeholder="请重新设置登录密码" v-show="showPwdInp">
              <ff-change-eye @changeEye="changeEyeNew"></ff-change-eye>
              <i>{{reg.newPwd.rem}}</i>
            </p>
          </li>
        </ul>
      </article>
      <p class="comm-but pwd-b" @touchend.prevent="confirmPwd" :class="curBut ? 'cur-but' : ''">确认修改</p>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
import Rule from '@/module/rule/Rule.module'; // 验证
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
      showPwdInp: true,
      pwdType: 'password', // 密码是否可见
      pwdTypeNew: 'password', // 密码是否可见
      curBut: false, // 按扭是否可点
      isReq:  true, // 退出登入请求是否完成
      oldPwd: '', // 旧密码
      newPwd: '', // 新密码
      reg:{ // 验证
        oldPwd: { // 旧密码验证
          rem: '',
          isPass: false
        },
        newPwd: { // 新密码验证
          rem: '',
          isPass: false
        },
      }
    };
  },
  mounted() {
  },
  methods: {
    changeEyeNew(v) {
      if(v) {
        this.pwdTypeNew = 'text'
      }else{
        this.pwdTypeNew = 'password'
      }
    },
    changeEye(v) { // 改变密码显示状态
      if(v) {
        this.pwdType = 'text'
      }else{
        this.pwdType = 'password'
      }
    },
    oldPwdVerif() { // 旧密码验证
      let rr = Rule.of().rules.passWord,
          rrt = rr.reg.test(this.oldPwd);
      if(rrt) {
        this.reg.oldPwd.isPass = true
        this.reg.oldPwd.rem = ''
      }else{
        this.reg.oldPwd.isPass = false
        this.reg.oldPwd.rem = rr.desc
      }
      this.confirmButVerif()
    },
    newPwdVerif() { // 新密码验证
      let rr = Rule.of().rules.passWord,
          rrt = rr.reg.test(this.newPwd);
      if(rrt) {
        this.reg.newPwd.isPass = true
        this.reg.newPwd.rem = ''
      }else{
        this.reg.newPwd.isPass = false
        this.reg.newPwd.rem = rr.desc
      }
      this.confirmButVerif()
    },
    confirmButVerif() { // 登入按扭验证
      let goBut = [];
      Object.keys(this.reg).forEach((key, val) => {
        if(this.reg[key].isPass) {
          goBut.push(this.reg[key].isPass)
        }
      })
      if(goBut.length == Object.keys(this.reg).length) {
        this.curBut = true
      }else{
        this.curBut = false
      }
    },
    confirmPwd() { // 确认修改
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        oldPasswd: Utils.of().md5(this.oldPwd),
        newPasswd: Utils.of().md5(this.newPwd)
      }
      this.$store.dispatch('modifyLoginPwd', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          window.f.tips.success({text: '登录密码修改成功', duration: 1500})
          const router = this.$f7router;
          router.navigate({
            name: 'personalInfo',
            path: '/personalInfo'
          });
        }
      })
    },
    onPageBeforeIn() {
      this.showPwdInp = true
    },
    onPageBeforeOut() {
      this.showPwdInp = false
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
    padding: 1.1rem 0.25rem 0.25rem;
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
      display: flex;
      justify-content: space-between;
      align-items: center;

    }
    input::-webkit-input-safebox-button{
      display: none;
    }
  }
  .pwd-b{
    width: 1.6rem;
    margin: 0 auto;
  }
}
</style>