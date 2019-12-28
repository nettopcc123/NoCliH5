<template>
  <div class="load-game">
    <p>
      <svg-icon icon-class='loading'></svg-icon>
      <span>正在进入游戏中...</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoadGame',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.load-game{
  height: 100%;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba($main-bg, 0.3);
  p{
    width: 1.25rem;
    height: 1.14rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $sheep-bg;
    border-radius: 0.08rem;
    padding: 0.08rem;
    color: $tips-success-color;
    .svg-icon{
      font-size: 0.25rem;
      margin-bottom: 0.1rem;
      -webkit-animation:myRotate 0.8s linear infinite;
      animation:myRotate 0.6s linear infinite;
    }
    span{
      font-size: 0.12rem;
    }
  }
  @-webkit-keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
}
</style>