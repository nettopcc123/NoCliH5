<template>
  <transition name="fade">
    <section class="dialogwin-wrap" v-show="show" id="dialogwin-wrap">
      <article class="diw-com">
        <f7-link :href="text.link" class="diw-tit">
          <span class="diw-t-title">{{text.title}}</span> 
          <span class="diw-t-d-close">
            <svg-icon icon-class="close02" />
          </span>
        </f7-link>
        <div class="diw-c">{{text.content}}</div>
        <f7-link :href="text.link" class="dwi-href">
          <p class="comm-but dwi-w12 cur-but dial-bug">{{text.buttom}}</p>
        </f7-link>
      </article>
      <div class="bg"></div>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'dialogWin',
  props: {
    type: {
      type: String,
      default: 'show',
      validator: val => ['show', 'hid'].includes(val)
    },
  text: {
    type: [Object, String],
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  }
 },
 data() {
   return {
     dialShow: this.show
   }
 },
  mounted() {
    this.bindEvent()
  },
 methods: {
   bindEvent() {
     this.dialShow = this.show
   },
   closeDialog() {
     window.f.dialogWin.hid()
   }
 }
}
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.dialogwin-wrap{
  width: 100%;
  height: 100%;
  z-index: 20100;
  border-radius: 0.06rem!important;
}
.diw-com{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  z-index: 20100;
  background-color: $sheep-bg;
  color: $font-login;
  line-height: 0.26rem;
  width: 3.2rem;
  border-radius: 0.06rem;
  padding-bottom: 0.15rem;
}
.diw-tit{
  font-size: 0.15rem;
  color: $icon;
  text-align: center;
  border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
  line-height: 0.4rem;
  position: relative;
  display: block;
}
.diw-t-title{
  font-size: 0.15rem;
  color: $icon;
}
.diw-t-d-close{
  position: absolute;
  right: 0.15rem;
  top: 0.03rem;
  color: $icon;
  svg{
    width: 0.14rem;
    height: 0.18rem;
  }
}
.diw-c{
  padding: 0rem 0.15rem 0.2rem;
  font-size: 0.15rem;
  color: $font-login;
  overflow: auto;
  margin-top: 0.12rem ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  word-break:break-all;
  width: 2.9rem;
  min-height: 0.5rem;
}
.dwi-href{
  display: block;
}
.dwi-w12{
  width: 1.2rem;
  margin: 0 auto;
}
</style>