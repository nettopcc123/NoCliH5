<template>
  <div class="home-title">
    <span class="ht-bg ht-dl"></span>
    <span class="ht-tf">{{titProp}}</span>
    <span class="ht-bg ht-dr"></span>    
  </div>
</template>
<script>
export default {
  name: 'Title', // 标题
  props: {
    titProp: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.home-title{
  display: flex;
  justify-content: center;
  align-items: center;
}
.ht-tf{
  font-size: 0.16rem;
  color: $font-wall;
  line-height: 0.5rem;
}
.ht-bg{
  width: 0.16rem;
  height: 0.16rem;
  height: 0.5rem;
}
.ht-dl{
  margin-right: 0.05rem;
  background: url('../../../assets/images/dleft.png') no-repeat center center / 100% ;
}
.ht-dr{
  margin-left: 0.05rem;
  background: url('../../../assets/images/dleft.png') no-repeat center center / 100% ;
  transform: rotate(180deg);
  transition: all 0.3s;
}
</style>