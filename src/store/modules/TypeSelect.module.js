const search = () => ({
  //  菜单所属类别的页面
  typePage: "",
  // 右上角显示名称
  typeName: "",
  //  菜单数组
  typeMenuArr: [],
  //  选中数组
  typeSelectArr: []
});
const TypeSelect = {
  namespaced: true,
  state() {
    return {
      ...search(),
    };
  },
  getters: {},
  mutations: {
    SET_TYPE_PAGE: (state, payload) => {
      state.typePage = payload;
    },
    SET_TYPE_NAME: (state, payload) => {
      state.typeName = payload;
    },
    SET_TYPE_MENU_ARR: (state, payload) => {
      state.typeMenuArr = payload;
    },
    SET_TYPE_SELECT_ARR: (state, payload) => {
      state.typeSelectArr = payload;
    },
  },
  actions: {
    subscribeTypeSelect() {}
  }
};

export { TypeSelect };
