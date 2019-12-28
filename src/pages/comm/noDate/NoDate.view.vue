<template>
  <div class="nodate">
    <p class="no-data-bg"></p>
    <p class="nodata-font">{{ titleProp }}</p>
  </div>
</template>
<script>
export default {
  name: 'Nodate', // 暂无数据
  props: {
    titleProp: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.nodata-font{
  color: $font-login;
  font-size: 0.14rem;
  text-align: center;
}
.no-data-bg{
  width: 1.74rem;
  height: 1.36rem;
  background: url('../../../assets/images/noData.png') no-repeat center center / 100% ;
  margin: 0.2rem auto;
}
</style>