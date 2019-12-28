<template>
  <div class="kbn">
    <div class="kbn-close" @touchend.prevent="hidKeyBord()"><svg-icon icon-class="more"  :class="sheetOpened ? 'tran270' : 'tran90'"></svg-icon></div>
    <ul class="kbn-list" :class="sheetOpened ? 'hid-kb' : ''">
      <li v-for="(val,index) in number" :key="index">
        <span v-show="val != 'del'" @touchend.prevent="getCurAmount(val)">{{ val }}</span>
        <span v-show="val == 'del'" @touchend.prevent="delAmount()"><svg-icon :icon-class="val" v-if="val == 'del'"></svg-icon></span>
      </li>
    </ul>
  </div>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
export default {
  name: 'KeyBoardNum01', // 数字键盘
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {
  },
  computed: {
  },
  data() {
    return {
      number: [1,2,3,4,5,6,7,8,9,'.',0,'del'],
      pwd: [],
      sheetOpened: false
    };
  },
  created() {},
  mounted() {
  },
  filters: {
  },
  methods: {
    hidKeyBord() {
      this.sheetOpened = !this.sheetOpened
    },
    delAmount() {
      this.pwd.pop()
      this.$customEvent.trigger('delWithPwd01', this.pwd);
    },
    getCurAmount(v) {
      if(this.pwd.length < 4 && v != '.') this.pwd.push(v)
      this.$customEvent.trigger('getWithPwd01', this.pwd);
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.kbn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $but-deep;
  border-radius: 0.06rem 0.06rem 0 0;
  .kbn-close{
    line-height: 0.26rem;
    height: 0.26rem;
    justify-content: center;
    align-items: center;
    display: flex;
    svg{
      height: 0.2rem;
      width: 0.2rem;
    }
  }
  .hid-kb{
    height: 0rem!important;
    transition: all 0.3s;
  }
  .kbn-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: row;
    background: $but-deep;
    height: 2rem;
    transition: all 0.3s;
    background-image:linear-gradient(
      rgba($but-deep, 0.9), 
      rgba($but-deep, 0.9)
    ), url('../../../assets/img/login/keyLogo.png');
    background-size: 47% 90%;
    background-position: 50%;
    background-repeat: no-repeat;
    li{
        line-height: 0.5rem;
        height: 0.5rem;
        color: $font-color;
        text-align: center;
        border-top: 0.01rem solid $logo-but-bg;
        border-left: 0.01rem solid $logo-but-bg;
        flex: 1 1 33.33%;
        box-sizing:border-box;
        svg{
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.5rem;
          margin-top: 0.1rem;
          color: $font-color;
        }
        span{
          font-size: 0.25rem;
          font-family: Arial, Helvetica, sans-serif;
          display: inline-block;
          width: 100%;
        }
    }
    }
}
</style>