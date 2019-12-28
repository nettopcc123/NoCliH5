<template>
  <f7-page class="fun-rec-wrap" @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='资金记录' :rTitProp="title" :showSelectDialog="true" riconProp="drop" rUrlProp='/wallet' dialogName='.fund-drop' watchProp="getFunDrop" :name-spaced="nameSpaced"></ff-header-goback>
    <section class="fun-rec height-full" v-show="pageAfterInShow">
      <article class="a-v height-item">
        <ff-funtabs :tabsProp="menulist" curMenuProp="1" tabsPropClass="home-new-tabs" class="height-item"  :name-spaced="nameSpaced"></ff-funtabs>
      </article>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import FunTabs from "@c/tabs/FunTabs.view"; // 资金列表
import { mapMutations, mapActions } from 'vuex'
const vuexModule = 'fundRecordModule';
import thatModule from '@/store/modules/FundRecord.module';
import {TypeSelect} from '@/store/modules/TypeSelect.module';
export default {
  name: 'BetRecord', // 投注列表
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-funtabs": FunTabs
  },
  props: {},
  computed: {
  },
  data() {
    return {
        isReq: true, // 请求是否完成
        dataList: [], // 资金记录
        title: '类型',
        num: '',
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
      nameSpaced: vuexModule,
      pageAfterInShow: false,
    };
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
        // 充值搜索结果
        return commit(`${vuexModule}/tableResult/RESET_SEARCH_RESULT`,payload);
      },
      resetSearchParam(commit, payload) {
        // 充值搜索参数
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
      // this.$store.commit("SET_PITCHONID", '')
      // this.$customEvent.on('setBetClass', data => {
      //   this.title = data
      //   if(!data) this.data = '类型'
      //   let arr = this.title.split(',')
      //   let newArr = []
      //   arr.forEach((val, key) => {
      //     let s = val.substr(0,1)
      //     newArr.push(s)
      //   });
      //   if(arr.length > 4) {
      //     this.title = newArr.join(',')
      //   }
      // })
    },
    onPageBeforeOut() {
      this.resetSearchResult();
      this.resetSearchParam();
      // this.$customEvent.off('pushTradeFun');
      this.pageAfterInShow = false;
      this.$customEvent.trigger('closeFundDrop')
    },
    onPageBeforeIn() {
      this.pageAfterInShow = true;
      this.resetSearchResult();
      this.resetSearchParam();
      this.getTableList();
      //  设置 右上角类型选择数据
      let menuArr = [{code: 1,name: '提款'},{code: 2,name: '存款'},{code: 3,name: '转账'},{code: 4,name: '加扣款'},{code: 5,name: '活动'}];
      this.setTypePage('fundRecord');
      this.setTypeName('类型');
      this.setTypeMenuArr(menuArr);
      this.setTypeSelectArr([]);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.fun-rec-wrap{
  background: $login-bg;
}
.fun-rec{
  text-align: center;
  padding-top:0.44rem;
}
.height-full{
  height: 100%;
  .height-item {
    height: 100%;
  }
}
</style>
