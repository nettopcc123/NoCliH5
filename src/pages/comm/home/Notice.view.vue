<template>
  <div class="notice-page">
    <div class="trumpet-icon">
      <svg-icon icon-class='notice'></svg-icon>
    </div>
    <div class="notice-box" ref="noticeBox" @touchend.prevent="clickNotice">
      <ff-scroll :dataList="noticeContent"></ff-scroll>
    </div>
    <ff-notice-list :showNotice="isShow" :name-spaced="nameSpaced" ></ff-notice-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const NoticeList = () => import("@p/comm/home/NoticeList.view")
import Scroll from '@p/comm/home/Scroll.view'
import { mapMutations } from 'vuex'
const vuexModule = 'noticeModule';
import thatModule from '@/store/modules/NoticeList.module';

export default {
  name: 'notice', // 公告组件
  props: {
    data: {
      type: Array,
      default: [],
    }
  },
  components: {
    "ff-notice-list": NoticeList,
    'ff-scroll': Scroll,
  },
  data() {
    return {
      noticeContent: this.data, //
      distance: 0, // 位移距离
      isShow: false, // 是否显示详情
      is: true,
      nameSpaced: vuexModule
    }
  },
  created() {
    // 动态注册vuex模块
    const store = this.$store;
    if (!(store && store.state && store.state[vuexModule])) {
      store.registerModule(vuexModule, thatModule);
    }
  },
  methods: {
    ...mapMutations({
      resetSearchResult(commit, payload) {
        // 重置公告列表 结果
        return commit(`${vuexModule}/tableResult/RESET_SEARCH_RESULT`,payload);
      }
    }),
    clickNotice() {
      this.resetSearchResult();
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {}
      this.$store.commit("SET_LOADCONTENT", msg)
      this.$store.dispatch(`${vuexModule}/getTableList`).then(() => {
        this.$store.commit("SET_ISSHOWLOAD", false)
        this.$customEvent.trigger('changeDialog', false)
      });
    }

  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.notice-page{
  /*margin-top: 0.1rem;*/
  line-height: 0.3rem;
  height: 0.3rem;
  background: $login-bg;
  padding: 0 0.15rem;
  border-top: solid 0.01rem $cut-off-rule;
  border-bottom: solid 0.01rem $cut-off-rule;
  display: flex;
  overflow: auto;
}
.trumpet-icon{
  min-width: 0.25rem;
  padding-top: 0.02rem;
  .svg-icon{
    font-size: 0.18rem;
    color: $font-but-wall;
  }
}
.notice-box {
  flex: 1;
  overflow: hidden;
  ul{
    width: auto;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    li{
      // min-width: calc(100vw - 0.6rem);
      flex: 1;
      height: 0.3rem;
      margin-right: 0.3rem;
      color: $font-but-wall;
      white-space:nowrap;
    }
  }
}
</style>
