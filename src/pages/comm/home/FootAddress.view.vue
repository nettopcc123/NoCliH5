<template>
  <footer class="foot-address">
    注册办公地址：Hillside(sports)LP(注册编号118),Unit1.1,First
    Floor,Waterport   Place,2 Evenue,Gibraltar。Hillside(Sports)LP
    是由直布罗陀政府颁发执照并受
    直布罗陀博彩委员会监管（GRL编号095）。
    @2001-2019  V竞技版权所有
  </footer>
</template>
<script>
export default {
  name: 'FootAddress', // 底部版权
  }
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.foot-address{
  width: 3.53rem;
  margin: 0.1rem auto 0;
  font-size: 0.11rem;
  line-height: 0.22rem;
  color: $login-f-pwd;
  border-top: 0.01rem solid rgba($login-f-pwd, 0.3);
  padding: 0.1rem 0;
  text-align: left;
  word-break: break-all;
  padding-bottom: 0.35rem;
}
</style>
