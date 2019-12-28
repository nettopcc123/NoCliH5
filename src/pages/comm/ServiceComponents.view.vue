<template>
  <f7-sheet class="service-components"
    swipe-to-close
    backdrop
    :swipeToClose="false"
    :opened="showService"
    @sheet:closed="showService = false"
    @sheet:opened="sheetOpenedEvent"
    @sheet:close="sheetClosedEvent"
  >
    <div class="sb-con">
      <p class="sb-tit-wrap">
        <!-- <f7-navbar >
          <div class="top">
            <span>V竞技客服</span>
            <a @click="close"><svg-icon icon-class="close02"></svg-icon></a>
          </div>
        </f7-navbar> -->

      <section class="se-heard" @click="close">
        <div class="se-htit">V竞技客服</div>
        <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
      </section>

      </p>
      <div class="cust-wrap scroll-con">
        <iframe
          :src="customerUrl"
          name="vgame"
          scolling="no"
          class="if-h"
          ref="vgame"
          v-if="showService"
        >
      </iframe>
      <ff-loading-data class="cust-load"></ff-loading-data>
      </div>
    </div>
  </f7-sheet>
</template>

<script>
import {ModalHelper} from '@m/utils/ModalHelper.module';
export default {
  name: 'ServiceComponents', // 客服组件
  components: {
  },
  props: {
    sheetProp:{
      type: Boolean,
      default: false
    },
  },
  computed: {
  },
  data() {
    return {
      showService: this.sheetProp,
      customerUrl: 'https://static.meiqia.com/dist/standalone.html?_=t&eid=177055'
    };
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
      this.$customEvent.on("showService",data => {
        this.showService = data
      })
    },
    close() {
      this.$customEvent.trigger('showService', false)
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
            this.showService = false;
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


.sb-tit-wrap{
  background: $sheep-bg;
  border-radius: 0.06rem 0.06rem 0 0;
}

.service-components{
  height: 80%;
  border-radius: 0.06rem 0.06rem 0 0;
  .sb-con{
    height: 100%;
    .if-h{
      height: 100%;
    }
  }
}
.navbar{
  background-color: $but-deep;
  border-bottom: 0.01rem solid $ver-lin;
  border-radius: 0.06rem 0.06rem 0 0;
}
.navbar-inner{
  .top{
    width: 100%;
    height: 0.44rem;
    display: flex;
    justify-content: space-between;
    a{
      display: inline-flex;
      width: 0.44rem;
      height: 0.44rem;
      align-items: center;
      .svg-icon{
        font-size: 0.15rem;
        margin: auto;
      }
    }
    span{
      margin: auto;
      font-size: 0.16rem;
      padding-left: 0.44rem;
    }
  }
}
.cust-wrap{
  position: relative;
  background: $font-per;
  // height: 90vh;
  top:0!important;
  height: 101%;
  .cust-load{
    color:$but-deep
  }
}
.if-h{
  margin:0;
  padding: 0px;
  overflow: hidden;
  border: none;
  width: 100vw;
  position: absolute;
  top: -52px;
  height: calc(90vh - 0.52px);
  z-index: 10;
  .back-icon{
    display: none;
  }
}
.cust-load{
  margin-top: 0.6rem;
}
</style>
