<template>
    <f7-sheet class="stand-bank" swipe-to-close backdrop :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <!-- <section class="se-heard" @click="close">
        <div class="se-htit">支持银行</div>
        <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
      </section> -->
      <section class="se-heard">
        <f7-link sheet-close>
          <div class="se-htit">支持银行</div>
          <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
        </f7-link>
      </section>

      <div class="sb-con">
        <ul class="sb-cn">
          <li v-for="item in bankList" :key="item.id">{{ item.name }}</li>
        </ul>
        <p class="comm-but sb-b cur-but"><f7-link sheet-close>我知道了</f7-link></p>
      </div>
    </f7-sheet>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'StandBank', // 支持银行
  components: {
  },
  props: {
  },
  computed: {
    ...mapState({
      bankList: state => state.bankList
    })
  },
  data() {
    return {
      sheetOpened: false
    };
  },
  created() {},
  mounted() {
    if(this.bankList.length <= 0) {
      this.getFindBankArea()
    }
    this.bindEvent()
    this.touchClose()
  },
  filters: {
    arrToStr: function (v) {
      let s = '',
          a = []
      v.forEach((val, key) => {
        a.push(val.name)
      });
      s = a.join('，')
      return s
    }
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('setBankCardSheetProp', () => {
        const self = this;
        self.$f7.sheet.close();
      });
    },
    getFindBankArea() { // 识别银行卡配置信息
      this.$store.dispatch('getFindBankArea').then(() => {
      })
    },
    touchClose() {
      this.$nextTick(() => {
        let sheetBackdrop = document.querySelector('.sheet-backdrop');
        if (sheetBackdrop) {
          sheetBackdrop.addEventListener("touchstart", () =>{
            this.sheetOpened = false;
          });
        }
      })
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
// 弹出框头部
.se-heard a{
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: 0.37rem;
  border-bottom: 0.01rem solid $close-tit-lin;
}
.se-htit{
  flex: 1;
  padding-left: 0.22rem;
  text-align: left;
  font-size: 0.14rem;
}
.se-cls-btn{
  border-left: 1px solid rgba(48,60,84,.5);
  width: 0.37rem;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 0.37rem;
  align-items: center;
}



.stand-bank{
  background: $sheep-bg;
  height: 2.6rem;
  .sb-con{
    .sb-tit{
      color: rgba($font-login, 0.6);
      font-size: 0.15rem;
      border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
      line-height: 0.4rem;
      padding: 0 0.2rem;
    }
    .sb-cn{
      padding: 0.2rem 0.05rem;
      height: 1.1rem;
      overflow: auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li{
        min-width: 25%;
        text-align: center;
        color: $font-login;
        line-height: 0.22rem;
        font-size: 0.14rem;
      }
    }
  }
  .sb-b{
    width: 1.6rem;
    margin: 0.1rem auto;
  }
}
</style>
