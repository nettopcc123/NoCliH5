<template>
  <div class="partner">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="">
      <strong> 最佳电竞即时投注 </strong>
    </div>
    <dl class="sponsor">
      <dt>官方主赞助商</dt>
      <dd>
        <img src="@/assets/img/login/z02.png" alt="">
      </dd>
    </dl>
    <dl class="pay">
      <dt>支付合作</dt>
      <dd>
        <img src="@/assets/img/login/p01.png" alt="">
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'partner', // 赞助商组件
  props: {
    
  },
  computed: {
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  filters: {},
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.partner{
  .logo{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    strong{
      font-size: 0.14rem;
      margin-top: 0.06rem;
    }
    img{
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  dl{
    margin-top: 0.3rem;
    dt{
      text-align: center;
      line-height: 0.3rem;
      color: $font-login;
      font-size: 0.14rem;
    }
  }
  .sponsor{
    dd {
      padding: 0 0.5rem;
    }
  }
  .pay {
    dd {
      justify-content: space-between;
      img{
        width: 100%;
        height: 0.24rem;
      }
    }
  }
}
</style>