const homeStore = {
  state: {
    scrollShow: null, // 滚动新闻
    curMenu: "1",
  },
  mutations: {
    SET_SCROLLSHOW: (state, data) => {
      state.scrollShow = data
    },
    SET_CURMENU: (state, data) => {
      state.curMenu = data
    }
  },
  actions: {

  }
}
export default homeStore