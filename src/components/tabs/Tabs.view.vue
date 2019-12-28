<template>
  <div class="com-tabs">
    <div class="toolbar">
      <div class="toolbar-inner">
        <a v-for="(val,index) in tabsList" :key="index" class="tab-link" :class="dateType == `${val.code}` ? 'tab-link-active' :''" @click="getCur(val, index)" >
          {{val.name}}
        </a>
      </div>
    </div>
    <ul class="tabs-title" v-show="!!tableList.length">
      <li v-for="(val, index) in listTitle" :key="index">
        {{val.name}}
      </li>
    </ul>
    <div class="tabs-animated-wrap" :class="{'list-null': !tableList.length, 'list-null-finished': !tableList.length && requestFinished}" ref='contentbox'>
      <div class="ff-tabs ff-tabs-bg" :class="animatTran">
        <div class="list-warp">
          <div class="vant-list-box disabled-scroll">
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
                <ul v-show="tableList.length" class="tabs-list">
                  <li v-for="(val, index) in tableList" :key="index">
                    <f7-button fill @click="sheetOpened(val)">
                    </f7-button>
                    <div class="tabs-lic-warp">
                      <div>
                        <p>{{val.gameName}}</p>
                        <p class="tabs-time">{{val.betTime}}</p>
                      </div>
                      <div>{{val.betAmount}}</div>
                      <div :class="setClass(val.winlose, val.settleStatus,val.betAmount,val.settleAmount)">{{ filtrSum(val.settleAmount, val.settleStatus) }}</div>
                      <div :class="addClass(val.settleStatus)">{{val.settleStatus | formatState}}</div>
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
    <ff-show-detial></ff-show-detial>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Utils from "@m/utils/Utils.module";
import ShowDetial from "@p/comm/ShowDetial.view"; // 显示订单详情
import NoDate from "@p/comm/noDate/NoDate.view"; // 暂无数据
import { List } from 'vant';
export default {
  name: "Tab", // 滑动Tab
  components: {
    "ff-show-detial": ShowDetial,
    'ff-nodate': NoDate,
    [List.name]: List,
  },
  props: {
    nameSpaced: {
      type: String,
      default: ""
    },
    getCurClssProp: {
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
      animatTran: '',
      ti: 0,
      showDetial: false,
      tabsList: this.tabsProp, // 数据列表
      listTitle: [{
        name: '游戏'
      },{
        name: '金额'
      },{
        name: '派彩'
      },{
        name: '状态'
      }],
      subName: ''

      // curMenu: this.curMenuProp, // 默认选中Tab标签
      // isReqReg: true, // 请求是否完成
      // platIds: this.arrTrade, // [1,2,7] 1/RG,2/JBB,7/GG
    };
  },
  watch: {
  },
  filters: {
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
  created() {
    this.subName = this.$store.subscribeAction((action, state) => {
      if (action.type === 'typeSelect/subscribeTypeSelect'){
        if (action.payload.type && action.payload.type === 'getBetDrop') {
          // 重置搜索结果
          this.resetSearchResult();
          // 修改 资金选择类型
          if (action.payload.data.length == 1 && action.payload.data[0] == 0){
            this.changeSelectType([1, 2]);
          } else {
            this.changeSelectType(action.payload.data);
          }
          this.getTableList();
        }
      }
    })
  },
  mounted() {},
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

      // 重置搜索结果
      this.resetSearchResult();
      // 修改日期类型
      this.changeDateType(code);
      // 请求列表数据
      this.getTableList();
    },
    sheetOpened(val) {
      this.showDetial = true;
      this.$customEvent.trigger('setOrderDetial' , {})
      let param = {
        id: val.id,
        platId: val.platId,
        betTime: val.betTime
      }
      this.$store.dispatch('findOrderBetDetail', param).then((reg) => {
        if(reg.success == 1) {
          this.$customEvent.trigger('setOrderDetial' , reg.content)
        }
      }).then(()=>{
        this.$customEvent.trigger('setRechargeDetial', this.showDetial)
      })
    },
    setClass(v,s,b,p) { // v: 输赢状态 0.输；1.赢, s: 结算状态 0未接榫，1已结算，2已取消
      let c = ''
      if (v == 0 && s == 1) {
        c = 'rech-lose'
      }
      if (v == 1 && s == 1) {
        c = 'rech-win'
      }
      if (s == 1 && b == p) {
        c = 'rech-he'
      }
      return c
    },
    addClass(v) {
      let c = ''
      if (v == 1) {
        c = 'rech-account'
      }
      return c
    },
    filtrSum(a, b) { // 过滤输赢金额 a: 派彩金额，b：结算状态
      let c = a
      if (b == 0 && a == 0) {
        c = '-'
      }
      return c
    },
  },
  beforeDestroy() {
    this.subName();
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
@import "@/stylus/vant-reset-list.scss";
.com-tabs {
  height: 100%;
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
    /*padding-bottom: 0.02rem;*/
    /*margin-bottom: 0.12rem;*/
    width: 100%;
    .tabs-list {
      /*overflow: auto;*/
      transition: all 0.2s;
      width: 3.45rem;
      padding: 0 0.15rem;
      background-color: $login-bg;
      border-radius: 0rem 0rem 0.06rem 0.06rem;
      li {
        border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
        position: relative;
        a{
          position: absolute;
          width: 100%;
          height: 0.6rem;
        }
        .tabs-lic-warp{
          display: flex;
          justify-content: space-between;
          line-height: 0.3rem;
          color: $font-login;
          overflow: hidden;
          padding: 0.1rem 0;
          height: 0.4rem;
          &:last-child{
            border-bottom:none;
          }
          .tabs-time{
            color: $login-f-pwd;
            white-space: nowrap;
          }
          div{
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            p{
              width: 100%;
            }
            &:nth-child(1){
              width: 190%;
              text-align: left;
              line-height: 0.18rem;
              font-size: 0.14rem;
              justify-content: flex-start;
            }
            &:nth-child(2), &:nth-child(3){
              width: 130%;
            }
          }
          .rech-lose{
            color: $font-red
          }
          .rech-win{
            color: $message-icon
          }
          .rech-account{
            color: $login-f-pwd;
          }
          .rech-he {
            color: $font-wall;
          }
        }
      }
    }
  }

  .tabs-title{
    display: flex;
    justify-content: space-around;
    width: 3.45rem;
    padding: 0 0.15rem;
    background-color: $login-bg;
    li{
      width: 100%;
      font-size: 0.14rem;
      color: (rgba($font-login, 0.6));
      line-height: 0.3rem;
      &:nth-child(1){
        width: 190%;
        text-align: left
      }
      &:nth-child(2), &:nth-child(3){
        width: 130%;
      }
    }
  }


  .tabs-animated-wrap{
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
    height: calc(100% - 0.74rem);
    &.list-null{
      height: calc(100% - 0.44rem);
    }
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
.ff-tabs-bg{
  background-color: $login-bg;
  height: 100%;
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
