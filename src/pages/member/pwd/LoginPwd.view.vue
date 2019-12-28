<template>
  <f7-page>
    <ff-header-goback titProp='登录密码'></ff-header-goback>
    <section class="login-pwd scroll-con">
      <article class="l-pwd-t">
        <p class="lp-t1">设置登录密码</p>
        <p class="lp-t2">为了您的资金安全，请完成登录密码设置</p>
        <p class="lp-t3">登录密码</p>
        <p class="lp-t4">
          <input type="text" class="ff-input" name="" value="" placeholder="****">
          <ff-change-eye></ff-change-eye>
        </p>
      </article>
      <p class="comm-but pwd-b">确定提交</p>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import ChangEye from "@p/comm/ChangEye.view"; // 密码隐藏显示
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
    }
  },
  destroyed() {
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
    padding: 1.1rem 0.25rem 0.25rem;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .pwd-b{
    width: 1.6rem;
    margin: 0 auto;
  }
}
</style>