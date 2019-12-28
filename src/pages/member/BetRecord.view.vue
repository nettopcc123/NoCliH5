<template>
  <f7-page class="bet-record" @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-header-goback v-show="pageAfterInShow" titProp='投注记录' rUrlProp='/member'></ff-header-goback>
    <section class="bet-rec" v-show="pageAfterInShow">
      <article class="a-v">
        <ff-tabs :tabsProp="menulist" curMenuProp="1" tabsPropClass="home-new-tabs" :name-spaced="nameSpaced"></ff-tabs>
      </article>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import Tabs from "@c/tabs/Tabs.view"; // 新闻列表
import { mapState, mapMutations, mapActions } from 'vuex'

const vuexModule = 'betRecordModule';
import thatModule from '@/store/modules/BetRecord.module';
import {TypeSelect} from '@/store/modules/TypeSelect.module';

export default {
  name: 'BetRecord', // 投注列表
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-tabs": Tabs
  },
  computed: {
    ...mapState({
      setBetClass: state => state.setBetClass
    }),
  },
  data() {
    return {
      stitle: '全部',
      menulist: [
        {
          code: "1",
          name: "今日"
        },
        {
          code: "9",
          name: "近3天"
        },
        {
          code: "10",
          name: "近一周"
        },
        {
          code: "11",
          name: "近10天"
        },
        {
          code: "12",
          name: "近15天"
        }
      ],
      pageAfterInShow: false,
      nameSpaced: vuexModule
    };
  },
  watch: {
    setBetClass: {
      handler(newValue) {
        this.stitle = newValue
      },
      immediate: true
    },
  },
  created() {
    // 动态注册vuex模块
    const store = this.$store;
    if (!(store && store.state && store.state[vuexModule])) {
      store.registerModule(vuexModule, thatModule);
    }
    // 动态注册 右上角 类型选择vuex
    if (!(store && store.state && store.state['typeSelect'])) {
      store.registerModule('typeSelect', TypeSelect);
    }
  },
  mounted() {
    // this.bindEvent()
  },
  methods: {
    ...mapMutations({
      resetSearchResult(commit, payload) {
        // 重置搜索结果
        return commit(`${vuexModule}/tableResult/RESET_SEARCH_RESULT`,payload);
      },
      resetSearchParam(commit, payload) {
        // 重置搜索参数
        return commit(`${vuexModule}/RESET_SEARCH_PARAM`,payload);
      },
      setTypePage(commit, payload) {
        return commit(`typeSelect/SET_TYPE_PAGE`,payload);
      },
      setTypeName(commit, payload) {
        return commit(`typeSelect/SET_TYPE_NAME`,payload);
      },
      setTypeMenuArr(commit, payload) {
        return commit(`typeSelect/SET_TYPE_MENU_ARR`,payload);
      },
      setTypeSelectArr(commit, payload) {
        return commit(`typeSelect/SET_TYPE_SELECT_ARR`,payload);
      },
    }),
    ...mapActions({
      getTableList(dispatch, payload) {
        return dispatch(vuexModule + '/getTableList', payload);
      }
    }),
    bindEvent() {
      // this.$customEvent.on('setBetClass', data => {
      //   this.stitle = data
      //   if(!this.stitle) this.stitle = '全部'
      // })
    },
    onPageBeforeOut() {
      // this.$customEvent.off('pushTradeBet')
      this.resetSearchResult();
      this.resetSearchParam();
      this.pageAfterInShow = false;
      this.$customEvent.trigger('setRechargeDetial', false)
    },
    onPageBeforeIn() {
      this.pageAfterInShow = true;
      this.resetSearchResult();
      this.resetSearchParam();
      this.getTableList();
      //  设置 右上角类型选择数据
      let menuArr = [{code: 0,name: '全部'},{code: 1,name: 'V电竞'},{code: 2,name: 'V体育'}];
      this.setTypePage('betRecord');
      this.setTypeName('全部');
      this.setTypeMenuArr(menuArr);
      this.setTypeSelectArr([0]);

      window.f.systemEvent.trigger('changeDialog', false) // 隐藏弹窗提示
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
      window.f.store.commit("SET_ISSHOWLOAD", false) // 隐藏弹窗提示
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.bet-record{
  background-color: $login-bg;
}
.bet-rec{
 background: $login-bg;
 text-align: center;
 padding-top: 0.44rem;
 height: calc(100% - 0.44rem);
}
article.a-v {
  height: 100%;
}
</style>
