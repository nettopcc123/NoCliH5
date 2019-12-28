<template>
  <div class="index-footer">
    <p>
      "注册办公地址：Hillside(sports)LP(注册编号118)，Unit1.1,FirstFloor,Waterport   Place,2 Evenue,Gibraltar。Hillside(Sports)LP是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管（GRL编号095）。@2001-2019  V竞技版权所有"
    </p>
  </div>
</template>

<script>
export default {
  name: 'IndexFooter', // 首页页脚组件
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
.index-footer{
  margin-top: 0.1rem;
  p{
    font-size: 0.12rem;
    line-height: 0.2rem;
    letter-spacing: 0rem;
    color: $login-f-pwd;
    word-wrap: keep-all;
    text-align: center;
  }
}
</style>