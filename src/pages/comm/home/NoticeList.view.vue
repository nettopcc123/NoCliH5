<template>
  <f7-sheet class="not-list"
    swipe-to-close backdrop
    :opened="showNotice"
    :swipeToClose="false"
    @sheet:closed="showNotice = false"
    @sheet:opened="sheetOpenedEvent"
    @sheet:close="sheetClosedEvent"
  >
    <section class="se-heard" @click="close">
      <div class="se-htit">V竞技公告</div>
      <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
    </section>

    <div class="sb-con" v-show="showNotice">
      <div class="vant-list-box">
          <dl v-for="(item, index) in tableList" :key="index" class="not-dl">
            <dt>
              <p class="not-tit">{{ item.title }}</p>
              <p class="not-date">{{item.createdDate}}</p>
            </dt>
            <dd class="not-detail">
              {{ item.detail }}
            </dd>
          </dl>
          <div class="vant-list-no-more">全部已加载</div>
      </div>
    </div>
  </f7-sheet>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { List } from 'vant';
import {ModalHelper} from '@m/utils/ModalHelper.module';
export default {
  name: 'NoticeList', // 公告详情
  components: {
    [List.name]: List,
  },
  props: {
    sheetProp:{
      type: Boolean,
      default: false
    },
    nameSpaced: {
      type: String,
      default: ""
    },
  },
  computed: {
    ...mapState({
      tableList(state) {
        return state[this.nameSpaced].tableResult.tableList;
      },
      tableFinished(state) {
        return state[this.nameSpaced].tableResult.tableFinished;
      },
      requestFinished(state) {
        return state[this.nameSpaced].tableResult.requestFinished;
      },
      // showNotice(state) {
      //   return state[this.nameSpaced].showNotice;
      // },
    }),
    showNotice: {
      get() {
        return this.$store.state[this.nameSpaced].showNotice
      },
      set(v) {
        this.changeNoticeShow(v);
      }
    },
    tableLoading: {
      get() {
        return this.$store.state[this.nameSpaced].tableResult.tableLoading
      },
      set(v) {
        this.$store.commit(this.nameSpaced + "/tableResult/TABLE_LOADING",v)
      }
    },
    historyNoticeData: {
      get() {
        return this.$store.state.historyNoticeData
      },
      set(v) {
        this.$store.commit("SET_HISTORYNOTICEDATA", v)
      }
    },
    noticeIsFinished: {
      get() {
        return this.$store.state.noticeIsFinished
      },
      set(v) {
        this.$store.commit("SET_NOTICEISFINISHED", v)
      }
    },
  },
  data() {
    return {
      // showNotice: this.sheetProp,
      isReqReg: true, // 请求是否完成
      page: 0,
      contentList: this.contentData
    };
  },
  mounted() {
    this.bindEvent()
    this.touchClose();
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('closeNotice', () => {
        this.showNotice = false
      });
    },
    ...mapMutations({
      changeNoticeShow(commit, payload) {
        return commit(`${this.nameSpaced}/CHANGE_NOTICE_SHOW`,payload);
      },

    }),
    ...mapActions({
      getTableList(dispatch, payload) {
        return dispatch(this.nameSpaced + '/getTableList', payload);
      }
    }),
    close() {
      // this.$store.commit("SET_PREVENT", false)
      // this.$customEvent.trigger('showNoticeDetails', false)
      this.changeNoticeShow(false);
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
            this.showNotice = false;
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
@import "@/stylus/vant-reset-list.scss";
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


.not-tit{
  font-size: 0.14rem;
  line-height: 0.3rem;
  color: $font-per;
}
.not-detail{
  line-height: 0.18rem;
  word-break: break-all;
  color: $not-font;
  font-size: 0.12rem;
}
.not-date{
  color: $not-data;
  padding-bottom: 0.1rem;
}



.not-list{
  background: $sheep-bg;
  height: 60vh;
  border-radius: 0.06rem 0.06rem 0 0;
}
.not-spage{
  height: 60vh;
  border-radius: 0.06rem;
}
.not-dl{
  padding: 0.1rem 0.2rem 0.15rem 0.2rem;
  border-bottom: 0.01rem solid $ver-lin;
  margin: 0 auto;
}
.sb-con{
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  height: calc(100% - 0.37rem);
}
.vant-list-no-more {
  line-height: 0.4rem;
  padding: 0;
  text-align: center;
  color: rgba(196, 218, 255, 0.3);
  font-size: 0.12rem;
}
/*.vant-list-box{*/
/*  overflow: auto;*/
/*  height: 100%;*/
/*}*/
</style>
