// import _ from 'lodash';
import { historyNotice } from "@m/http/Api.module";
import { tableResult } from "@/store/modules/TableResult";

const outStore = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      showNotice: false
    };
  },
  getters: {
    // getters 获取表格查询条件字段
    getFormName(state) {
      return {
        // tableSearch 模块
        size: state.tableResult.size,
        page: state.tableResult.page,
      };
    }
  },
  mutations: {
    CHANGE_NOTICE_SHOW: (state, payload) => {
      state.showNotice = payload;
    },
  },
  actions: {
    // 获取表格数据 async：es6语法 添加在方法前面，表示该方法为异步操作
    async getTableList({ dispatch, commit, getters, state }, payload) {
      commit('tableResult/SET_PAGE_SIZE', 4);
      let resBack;
      try {
        /**
         * await：es6语法 同步操作
         * formApi: 接口名称
         * body: 接口请求参数
         */
        resBack = await dispatch('tableResult/getTableList', {
          formApi: historyNotice,
          body: getters.getFormName
        });
        if(resBack.content && resBack.content.content.length > 0) {
          // commit("SET_PREVENT", true, {root: true});
          commit("CHANGE_NOTICE_SHOW", true);
        }
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
