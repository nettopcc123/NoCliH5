<template>
  <transition name="fade">
    <div class="tips" :class="type" v-show="show">
      <div>
      <span class="tips-icon"><svg-icon :icon-class="getIcon(type)" /></span>
      <span class="tips-text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'tips',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    },
  text: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
 },
 methods: {
   getIcon(t) {
     if(t =='info') {
       return 'info1'
     }else
     if(t =='error') {
       return 'close02'
     }else{
       return t
     }
   }
 }
}
</script>
<style scoped lang="scss" >
@import "@/stylus/comm.scss";
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.tips{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $tips-text-color;
    background: #1e2738;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    z-index: 100000;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    width: 1.35rem;
    height: 1.24rem;
    padding: 0.08rem 0.15rem;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .tips-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.1rem;
      border: 1px solid #01b7f4;
      border-radius: 0.03rem;
      width: 0.35rem;
      height: 0.35rem;
      margin-left: auto;
      margin-right: auto;
      svg{
        width: 0.18rem;
        height: 0.18rem;
      }
    }
    .tips-text{
      line-height: 0.16rem;
      width: 100%;
      justify-content: center;
      text-align: center;
    }
}
.tips.info{
  color: $tips-text-color;
  .tips-icon{
    border: 1px solid $tips-text-color!important;
  }
}
.tips.success{ 
  color: $tips-success-color;
}
.tips.warning{
  color: $tips-warning-color;
  .tips-icon{
    border: 1px solid $tips-warning-color!important;
  }
}
.tips.error{
  color: $tips-error-color;
  .tips-icon{
    border: 1px solid $tips-error-color!important;
  }
}
</style>
