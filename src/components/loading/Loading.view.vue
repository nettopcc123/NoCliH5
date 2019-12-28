<template>
  <div class="load-effect-wrap" id="loadEffect">
    <div class="load-effect" v-show="loading">
      <svg-icon icon-class="loading" class="home-loading home-loading-rotate" v-if="loading" />
    </div>
    <div class="bg"></div>
  </div>
</template>
<script>
export default {
  name:'loading',
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style>
.load-effect {
  width: 0.4rem;
  height: 0.4rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20002;
}
.home-loading {
  width: 0.4rem!important;
  height: 0.4rem!important;
}
.home-loading-rotate {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
    transform-origin: center center;
  }
  to {
    transform: rotate(360deg);
    transform-origin: center center;
  }
}
</style>