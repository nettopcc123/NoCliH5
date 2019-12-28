<template>
  <span class="cg-eye" @touchend.prevent="changeEye"><svg-icon :icon-class="pwdShow ? 'oeye' : 'ceye'" /></span>
</template>
<script>
export default {
  name: 'ChangeEye', // 更改密码显示状态
  data() {
    return {
      pwdShow: false // 密码是否显示
    }
  },
  methods: {
    changeEye() {
      this.pwdShow = !this.pwdShow
      this.$emit('changeEye', this.pwdShow)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.cg-eye{
  position: relative;
  z-index: 3;
  width: 0.4rem;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    width: 0.2rem;
    height: 0.2rem;
  }
}
</style>