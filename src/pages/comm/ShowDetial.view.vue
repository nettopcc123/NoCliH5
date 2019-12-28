<template>
    <f7-sheet class="show-detial" :opened="sheetOpened" backdrop @sheet:closed="sheetOpened = false">
      <!-- <p class="sd-tit-wrap" @touchend.prevent="close()">
        <span class="sd-tit">投注详情</span>
        <span class="sd-close"><svg-icon icon-class="close02"></svg-icon></span>
      </p> -->

      <section class="se-heard" @click="close">
        <div class="se-htit">投注详情</div>
        <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
      </section>

      <div class="sd-cn">
        <ul class="sd-clist">
          <li><span>平台名称</span><p>{{ showList.platId | formatPlatName }}</p></li>
          <li><span>注单编号</span><p>{{ showList.orderNo }}</p></li>
          <li><span>注单类型</span><p>{{ showList.subPlatName }}</p></li>
          <li><span>注单状态</span><p>{{ showList.settleStatus | formatState }}</p></li>
          <li><span>下注金额</span><p>{{ showList.betAmount }}</p></li>
          <li><span>下注时间</span><p>{{ showList.betTime }}</p></li>
          <li><span>派彩金额</span><p>{{ showList.settleAmount }}</p></li>
          <li><span>输赢金额</span><p>{{ showList.winlossAmount }}</p></li>
          <li><span>游戏名称</span><p><span>{{ showList.gameName }}</span></p></li>
          <li><span>注单内容</span><p><span>{{ showList.betDetail }}</span></p></li>
        </ul>
      </div>
    </f7-sheet>
</template>
<script>
  import {ModalHelper} from '@m/utils/ModalHelper.module';

  export default {
  name: 'ShowDetial', // 显示投注详情
  components: {
  },
  props: {
    detialListProps:{
      type: [Array, Object],
      default: () => {}
    }
  },
  computed: {
  },
  data() {
    return {
      sid: '',
      sheetOpened: false,
      showList: {}
    };
  },
  watch: {
    sheetOpened: {
      handler(newVal) {
        if(!newVal) {
          ModalHelper.beforeClose();
        } else {
          ModalHelper.afterOpen();
        }
      }
    }
  },
  created() {},
  mounted() {
    this.bindEvent()
    this.touchClose();
  },
  filters: {
    formatPlatName: function (v) { // 平台名称式化
      let s = v
        switch (v) {  // 1.V电竞,2.V体育
          case '1':
            s = 'V电竞'
          break;
          case '2':
            s = 'V体育'
          default:
            break;
        }
      return s
    },
    formatState: function (v) { // 状态格式化
      let s = ''
        switch (v) {  // 0.未结算,1.已结算
          case '0':
            s = '未结算'
            break;
          case '1':
            s = '已结算'
          break;
          case '2':
            s = '已取消'
          default:
            break;
        }
      return s
    }
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('setRechargeDetial', data => {
        this.sheetOpened = data
        if(!data){
          this.close()
        }
      });
      this.$customEvent.on('setOrderDetial', data => {
        this.showList = data
      })
    },
    close() {
      const self = this;
      self.$f7.sheet.close();
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
.se-heard{
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 0.01rem solid $close-tit-lin;
  height: 0.37rem;
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


.show-detial{
  background-color: $sheep-bg;
  height: 75vh;
  border-radius: 0.06rem 0.06rem 0 0;
}
// .sd-tit-wrap{
//   line-height: 0.4rem;
//   border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
//   padding: 0 0.2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: $withdraw-tbg;
//   .sd-close{
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     svg{
//       width: 0.2rem;
//       height: 0.2rem;;
//     }
//   }
//   .sd-tit{
//     color: rgba($font-login, 0.6);
//     font-size: 0.16rem;
//   }
// }
.sd-cn{
  padding: 0.2rem;
  color: $font-login;
  line-height: 0.22rem;
  font-size: 0.14rem;
  height: calc(75vh - 0.41rem);
  overflow: auto;
  .sd-clist{
    padding-bottom: 0.2rem;
    li{
      line-height: 0.25rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.12rem;
      span{
        font-size: 0.15rem;
        min-width: 0.6rem;
        margin-right: 0.38rem;
        color: rgba($font-login, 0.9)
      }
      p{
        flex: 1;
        font-size: 0.15rem;
        color: rgba($font-login, 0.9);
        text-align: right;
      }
      &:nth-last-child(-n+2) {
        p{
          display: flex;
          justify-content: flex-end;
          span{
            min-width: auto;
            margin-right: 0;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
