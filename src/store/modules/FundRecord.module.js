// import _ from 'lodash';
import { fundRecord } from "@m/http/Api.module";
import { tableResult } from "@/store/modules/TableResult";
// state 定义表格查询字段
const searchParam = () => ({
  selectType: '',
  dateType: '1',
  stitle: '类型'
});
const outStore = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      ...searchParam(),
    };
  },
  getters: {
    // getters 获取表格查询条件字段
    getFormName(state) {
      return {
        // tableSearch 模块
        size: state.tableResult.size,
        page: state.tableResult.page,
        dateType: state.dateType,
        tradeTypes: state.selectType,
      };
    }
  },
  mutations: {
    // 重置 搜素条件
    RESET_SEARCH_PARAM: (state, payload) => {
      const initialResult = searchParam();
      Object.keys(initialResult).forEach(key => {
        state[key] = initialResult[key];
      });
    },
    CHANGE_DATE_TYPE: (state, payload) => {
      state.dateType = payload;
    },
    CHANGE_SELECT_TYPE: (state, payload) => {
      state.selectType = payload;
    },
    CHANGE_STITLE: (state, payload) => {
      state.stitle = payload;
    },
  },
  actions: {
    // 获取表格数据 async：es6语法 添加在方法前面，表示该方法为异步操作
    async getTableList({ dispatch, commit, getters, state }, payload) {
      let resBack;
      try {
        /**
         * await：es6语法 同步操作
         * formApi: 接口名称
         * body: 接口请求参数
         */
        resBack = await dispatch('tableResult/getTableList', {
          formApi: fundRecord,
          body: getters.getFormName
        });
        return resBack;
      } catch (err) {
        return err;
      }
    }
  },
  // 嵌套模块
  modules: {
    // 进一步嵌套命名空间
    tableResult
  }
};
export default outStore;
