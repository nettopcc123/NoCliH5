<template>
    <f7-sheet class="perdetial" 
      backdrop 
      @sheet:closed="close" 
      :opened="sheetOpened"
      @sheet:opened="sheetOpenedEvent"
      @sheet:close="sheetClosedEvent"
    >
      <section class="se-heard">
        <f7-link sheet-close>
          <div class="se-htit">活动详情</div>
          <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
        </f7-link>
      </section>

      <div class="per-con">
        <h2 class="prec-tit">{{ showDetail.title }}</h2>
        <div class="per-content" v-html="showDetail.detail">
        </div>
      </div>
    </f7-sheet>
</template>
<script>
  import {ModalHelper} from '@m/utils/ModalHelper.module';
export default {
  name: 'PerferDetails', // 优惠详情
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
      showDetail: {}
    };
  },
  watch: {
  },
  created() {},
  mounted() {
    this.bindEvent()
    this.touchClose();
  },
  filters: {

  },
  methods: {
    bindEvent() {
      this.$customEvent.on('setPreferDetial', data => {
        this.showDetail = data
      })
       this.$customEvent.on('setPreSheetProp', data => {
        this.sheetOpened = data
      })
    },
    close() {
      this.sheetOpened = false
      // this.$store.commit("SET_PREVENT", false)
    },
    sheetOpenedEvent() {
      ModalHelper.afterOpen();
    },
    sheetClosedEvent() {
      ModalHelper.beforeClose();
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


.perdetial{
  background: $sheep-bg;
  height: 70%;
}
.per-con{
  padding: 0rem 0.2rem;
  height: calc(100% - 0.37rem);
  overflow: auto;
  color: $icon;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling:touch;
}
.prec-tit{
  font-size: 0.16rem;
  line-height: 0.3rem;
  color: rgba($notice-title-color,0.3);
  padding-top: 0.1rem;
  font-weight: 400;
  color: $font-per;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  }
.per-content{
  color: $icon;
  padding-bottom: 0.2rem;
  h3{
    font-size: 0.15rem;
    line-height: 0.2rem;
    color: rgba($icon, 0.5);
    padding: 0.15rem 0 0.05rem;
  }
  ul{
    padding-left: 0.18rem;
    li{
      font-size: 0.15rem;
      line-height: 0.24rem;
      color: rgba($icon, 0.5);
      list-style-type: decimal;
    }
  }
}
</style>
