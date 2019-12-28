<template>
  <button class="btn pw-v-but" @touchend.prevent="getVCode" :class="judgeButClass()">
    {{ sendMsg }} {{ showCountDown() ? curDownDate : '' }}
  </button>
</template>

<script>
import SystemBase from '@m/systemBase/SystemBase.module';
import TimerManager from '@m/timerManager/TimerManager.module'; // 计时任务管理器
export default {
  name: 'countDown', // 倒计时
  props: {
    curDownProp: { // 父级传来的倒计时剩余时间
      type: Number,
      default: 59
    },
    curDownNameProp: { // 父级传来的倒计时名称
      type: String,
      required: true,
      default: 'sendMsg'
    },
    isPassProp: { // 是否验证通过
      type: Boolean,
      required: true,
      default: false
    },
    usernameProp: {
      type: String,
      required: true
    },
    codeProp: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      curDownDate: this.curDownProp, // 倒计时剩余时间
      curDownName: this.curDownNameProp, // 倒计时名称
      sendMsg: '发送验证码',
      isSendCode: this.isPassProp, // 是否可发送验证码
      isReq:  true, // 请求是否完成
    }
  },
  watch: {
    curDownProp: {
      handler(newValue) {
        this.curDownDate = newValue
      },
      immediate: true
    },
    isPassProp: {
      handler(newValue) {
        let iscd = this.showCountDown()
        if(newValue && !iscd) {
          this.isSendCode = true
        }else{
          this.isSendCode = false
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      SystemBase.of().getTCjs()
      this.isReq = true
      this.$customEvent.on('verifyCodeFirst', data => { // 无防水墻验证码
        TimerManager.of().stopSetTimeout(this.curDownName); // 计时器销毁
        if(data) {
          this.sendMsg = '已发送'
          this.isSendCode = false
        }else{
          this.sendMsg = '发送失败'
          this.isSendCode = false
        }
        TimerManager.of()
        .addSetTimeout(this.curDownName, this.startDate)
        .startSetTimout(this.curDownName);
      });
      this.$customEvent.on('verifyCodeSecond', data => { // 有防水墻验证码
        TimerManager.of().stopSetTimeout(this.curDownName); // 计时器销毁
        if(data) {
          this.sendMsg = '已发送'
          this.isSendCode = false
        }else{
          this.sendMsg = '发送失败'
          this.isSendCode = false
        }
        TimerManager.of()
        .addSetTimeout(this.curDownName, this.startDate)
        .startSetTimout(this.curDownName);
      });
    },
    judgeButClass() {
       let c = '',
           iscd = this.showCountDown()
      if(this.isSendCode && !iscd) {
        c = 'pb-cur'
      }
      return c
    },
    showCountDown() {
      let arr = ['已发送', '发送失败']
      return arr.includes(this.sendMsg)
    },
    getVCode() { // 获取验证码
      if(!this.isSendCode || !this.isReq) {
        return
      }
      this.isReq = false
      let name = this.usernameProp,
          code = this.codeProp
      SystemBase.of().verifyCode(name, code).then((res) => {
        this.isReq = true
      })
    },
    startDate() { // 开始倒计时
      if (this.curDownDate <= 1) {
        this.isSendCode = true
        this.isReq = true
        this.sendMsg = '发送验证码'
        this.curDownDate = this.curDownProp
        TimerManager.of().stopSetTimeout(this.curDownName); // 计时器销毁
        this.curDownDate = this.curDownProp
      }else{
        this.curDownDate--
      }
    }
  },
  beforeDestroy() {
    TimerManager.of().stopSetTimeout(this.curDownName); // 计时器销毁
  }
};
</script>

<style lang="scss">
@import "@/stylus/comm.scss";
.pw-v-but{
  width: 1.2rem;
  height: 0.44rem;
  font-size: 0.14rem;
  line-height: 0.44rem;
  color: $login-f-pwd;
  border: none;
  background: none;
}
.pb-cur{
  color: $but-light-l;
} 
</style>