<template>
  <div class="fun-tabs">
    <div class="toolbar">
      <div class="toolbar-inner">
        <a v-for="(val,index) in tabsList" :key="index" class="tab-link" :class="dateType == `${val.code}` ? 'tab-link-active' :''" @click="getCur(val, index)" >
          {{val.name}}
        </a>
      </div>
    </div>
    <div class="tabs-animated-wrap" ref='funconbox'>

      <div class="list-warp" :class="{'list-null': !tableList.length, 'list-null-finished': !tableList.length && requestFinished}">

        <div class="vant-list-box disabled-scroll" :class="animatTran">
          <van-list
            v-model="tableLoading"
            :finished="tableFinished"
            :offset="50"
            :immediate-check="false"
            @load="getTableList"
          >
            <div class="vant-list-content">
              <div
                v-show="!tableList.length && requestFinished"
                :class="!!tableList.length || !requestFinished ? '' : 'lis-nodate'"
                class="list-null-content"
              >
                <ff-nodate titleProp='暂无记录' ></ff-nodate>
              </div>
              <ul class="tabs-list" v-show="tableList.length">
                <li v-for="(val, index) in tableList" :key="index" @click="showMore(val)" >
                  <div class="f-t-t">
                    <span>{{val.title}} ({{val.tradeType | formatTrade}})</span>
                    <span>{{val.amount | formatAmount}}</span>
                  </div>
                  <div class="f-t-b">
                    <span>{{val.createdDate}}</span>
                    <span :class="stateClass(val.statusStr)">{{ val.statusStr }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <ff-loading-data slot="loading"></ff-loading-data>
            <div v-show="tableList.length && requestFinished && tableFinished" class="vant-list-no-more">全部已加载</div>
          </van-list>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import NoDate from "@p/comm/noDate/NoDate.view"; // 暂无数据
import Utils from "@m/utils/Utils.module";
import { mapState, mapActions, mapMutations } from 'vuex';
import { List } from 'vant';
export default {
  name: "Tab", // 滑动Tab
  components: {
    'ff-nodate': NoDate,
    [List.name]: List,
  },
  props: {
    nameSpaced: {
      type: String,
      default: ""
    },
    tabsProp: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // curMenuProp: {
    //   type: String,
    //   default: "1"
    // }
  },

  computed: {
    // betRecordData: {
    //   get() {
    //     return this.$store.state.betRecordData
    //   },
    //   set(v) {
    //     this.$store.commit("SET_BETRECORDDATA",v)
    //   }
    // },
    ...mapState({
      tableList(state) {
        // 表格数据
        return state[this.nameSpaced].tableResult.tableList;
      },
      tableFinished(state) {
        // 表格loading
        return state[this.nameSpaced].tableResult.tableFinished;
      },
      requestFinished(state) {
        // 表格loading
        return state[this.nameSpaced].tableResult.requestFinished;
      },
      dateType(state) {
        // 表格loading
        return state[this.nameSpaced].dateType;
      },
    }),
    tableLoading: {
      get() {
        return this.$store.state[this.nameSpaced].tableResult.tableLoading
      },
      set(v) {
        this.$store.commit(this.nameSpaced + "/tableResult/TABLE_LOADING",v)
      }
    },
  },
  data() {
    return {
      furl: '/fundDetails',
      animatTran: '',
      curMenu: this.curMenuProp, // 默认选中Tab标签
      tabsList: this.tabsProp, // 数据列表
      ti: 0,
      dataList:[],
      isReq: true,
      isReqReg: true, // 请求是否完成
      arrTrade: [],
      // dateType: this.curMenuProp,
      page: 0,
      size: 20,
      isFinished: false, // 是否已加载全部
      subName: ''
    };
  },
  watch: {
  },
  created() {
    this.subName = this.$store.subscribeAction((action, state) => {
      if (action.type === 'typeSelect/subscribeTypeSelect'){
        if (action.payload.type && action.payload.type === 'getFunDrop') {
          // 重置搜索结果
          this.resetSearchResult();
          this.changeSelectType(action.payload.data);
          this.getTableList();
        }
      }
    })
  },
  mounted() {
    // this.bindEvent()
  },
  filters: {
    formatAmount: function(v) {
      let s = v + '',
          regex = /^[+-]/,
          result = s.match(regex)
      if(result && result[0]) {
        s = result['input'].substr(1)
        s = result[0] + Utils.of().formatAmount(s)
      }else{
        s = Utils.of().formatAmount(s)
      }
      return s
    },
    formatTrade: function (v) { // 状态格式化
      let s = ''
        switch (v) {  // 1、提款 2、存款 3、转账 4、加扣款 5、活动
          case 1:
            s = '提款'
            break;
          case 2:
            s = '存款'
          break;
          case 3:
            s = '转账'
          break;
          case 4:
            s = '加扣款'
          break;
          case 5:
            s = '活动'
          break;
          default:
            break;
        }
      return s
    }
  },
  methods: {
    ...mapMutations({
      resetSearchResult(commit, payload) {
        // 充值搜索结果
        return commit(`${this.nameSpaced}/tableResult/RESET_SEARCH_RESULT`,payload);
      },
      resetSearchParam(commit, payload) {
        // 充值搜索参数
        return commit(`${this.nameSpaced}/RESET_SEARCH_PARAM`,payload);
      },
      changeDateType(commit, payload) {
        // 修改 日期类型
        return commit(`${this.nameSpaced}/CHANGE_DATE_TYPE`, payload);
      },
      changeSelectType(commit, payload) {
        // 修改 资金类型
        return commit(`${this.nameSpaced}/CHANGE_SELECT_TYPE`, payload);
      },
      // setPageSize(commit, payload) {
      //   // 更新页显示条数
      //   return commit(`${this.nameSpaced}/tableResult/SET_PAGE_SIZE`,payload);
      // },
      // setPage(commit, payload) {
      //   // 更新当前页码
      //   return commit(`${this.nameSpaced}/tableResult/SET_PAGE`, payload);
      // },
      // setTableFinished(commit, payload) {
      //   // 列表是否全部加载完毕
      //   return commit(`${this.nameSpaced}/tableResult/SET_TABLE_FINISHED`, payload);
      // },
      // setTableList(commit, payload) {
      //   // 修改列表数据
      //   return commit(`${this.nameSpaced}/tableResult/SET_TABLE_LIST`, payload);
      // },
      // changeRequestFinished(commit, payload) {
      //   // 修改是否加载完成
      //   return commit(`${this.nameSpaced}/tableResult/CHANGE_REQUEST_FINISHED`, payload);
      // },

    }),
    ...mapActions({
      getTableList(dispatch, payload) {
        return dispatch(this.nameSpaced + '/getTableList', payload);
      }
    }),
    getCur(val, i) {
      // if(!this.isReqReg || !this.isReq) return // 防止请求未返回
      if (!this.requestFinished) return;
      let code = val.code
      if(this.dateType == code) {
        return false
      }
      this.animatTran = 'trans'
      setTimeout(() => {
        this.animatTran = ''
      }, 300)
      this.ti = i;
      // this.curMenu = code;
      // this.dateType = code

      // 重置搜索结果
      this.resetSearchResult();
      // 修改日期类型
      this.changeDateType(code);
      // 请求列表数据
      this.getTableList();
    },
    stateClass(val) {
      let sclass = ''
      switch (val) {
        case '成功':
          sclass = 'f-success'
          break;
        case '失败':
          sclass = 'f-fail'
          break;
        case '审核中':
          sclass = 'f-warn'
          break;
        case '已取消':
          sclass = 'f-cancel'
          break;
        default:
          break;
      }
      return sclass
    },
    showMore(val) {
      // if(!this.isReq || !this.isReqReg) {
      //   return
      // }
      // this.isReq = false
      let param = {
        id: val.id,
        tradeType: val.tradeType
      }
      sessionStorage.setItem('vv-funPram', JSON.stringify(param))
      const router = this.$f7router;
      router.navigate({
        name: 'fundDetails',
        path: '/fundDetails'
      });
    }
  },
  beforeDestroy() {
    this.subName();
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
@import "@/stylus/vant-reset-list.scss";
.fun-tabs {
  .toolbar {
    width: 100%;
    border-bottom: 0.01rem solid $logo-but-bg;
    text-align: center;
    background-color: $login-bg;
    .toolbar-inner{
      width: 90%;
      margin: 0px 5%;
    }
    .tab-link {
      line-height: 0.25rem;
      font-size: 0.15rem;
      color: rgba($font-login, 0.3);
      padding: 0 0.1rem;
    }
    .tab-link-active {
      color: $font-color;
      background-image: linear-gradient(90deg, $but-light-l 0%, $login-lin 100%), linear-gradient($message-icon, $message-icon);
      border-radius: 0.15rem;
    }
  }
  .page-content {
    padding-top: 0rem;
  }
  .list-warp {
    transition: all 0.2s;
    width: 100%;
    height: 100%;
    .tabs-list {
      /*overflow: auto;*/
      transition: all 0.2s;
      width: 3.45rem;
      padding: 0 0.15rem;
      background-color: $login-bg;
      border-radius: 0rem 0rem 0.06rem 0.06rem;
      li {
        line-height: 0.2rem;
        color: $font-login;
        border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
        padding: 0.1rem 0.08rem;
        &:last-child {
          border-bottom: none;
        }
        div{
          display: flex;
          justify-content: space-between;
        }
        .f-t-t{
          color: rgba($font-login, 0.8);
          span{
            font-size: 0.14rem;
            &:nth-child(2){
              color: $font-login;
              font-weight: bold;
            }
          }
        }
        .f-t-b{
          color: rgba($font-login, 0.8);
          span{
            font-size: 0.12rem;
            color: $login-f-pwd;
            &:nth-child(2){
              color: rgba($font-login, 0.6);
            }
          }
          .f-success{
            color: $message-icon!important;
          }
          .f-warn{
            color: rgba($font-wall, 0.8)!important;
          }
          .f-fail{
            color: $per-state-bg1!important;
          }
          .f-cancel{
            color: rgba($font-login, 0.3)!important;
          }

        }
      }
    }
  }

  .tabs-animated-wrap{
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
    height: calc(100% - 0.88rem);
  }

  .trans {
    animation: trans 0.3s linear infinite;
  }
  @keyframes trans {
    from {
      transform: translate3d(100%, 0px, 0px);
    }
    to {
      transform: translate3d(0%, 0px, 0px);
    }
  }
}
.ff-tabs {
  display: flex;
  height: 100%;
  .tab {
    width: 100%;
    display: block;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
}

.list-null-finished {
  .van-list{
    height: 100%;
    .vant-list-content{
      height: 100%;
    }
  }
}

.vant-list-no-more {
  line-height: 0.4rem;
  padding: 0;
  text-align: center;
  color: rgba(196, 218, 255, 0.3);
  font-size: 0.12rem;
}
.vant-list-box{
  overflow: auto;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.list-null-content{
  height: 100%;
  ::v-deep .no-data-bg {
    margin: 0 auto 0.2rem;
  }
}
</style>
