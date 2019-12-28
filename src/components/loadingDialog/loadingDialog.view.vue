<template>
  <div id="loading-dialog">
    <div class="content-box" :class="dialProp.leftIcon == 'success' ? 'load-success' : ''" v-show="dialProp.content">
      <span class="d-close" v-show="dialProp.leftIcon">
        <svg-icon v-if="dialProp.leftIcon" :icon-class="dialProp.leftIcon" :class="dialProp.leftIcon == 'loading' ? 'load-circle' : ''"/>
      </span>
      <div class="hd-c" v-html="dialProp.content"></div>
    </div>
    <div :class="dialProp.content ? 'bg' : 'bgw'"></div>
  </div>
</template>
<script>
export default {
  name: 'Dialog', // 对话框
  props: {
    dialProp: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
  }
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
#loading-dialog{
  .content-box{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.06rem;
    z-index: 20100;
    background-color: $sheep-bg;
    display: flex;
    padding: 0.2rem;
    color: $font-login;
    line-height: 0.26rem;
    max-width: 80vw; 
    span{
      display: flex;
      margin-right: 0.1rem;
      .svg-icon{
        font-size: 0.2rem;
        margin: auto;
      }
    }
    .load-circle{
      -webkit-animation:myRotate 1s linear infinite;
      animation:myRotate 1s linear infinite;
    }
    div{
      white-space:nowrap;
    }
  }
  .load-success{
    color: $tips-success-color;
  }
  @-webkit-keyframes myRotate{
      0%{ -webkit-transform: rotate(0deg);}
      100%{ -webkit-transform: rotate(360deg);}
  }
}
</style>