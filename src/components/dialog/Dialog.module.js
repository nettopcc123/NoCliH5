const Dialog = {
  install(Vue) {
    if (document.getElementsByClassName('.ff-dialog').length) return
    if (typeof window != 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    let tpl;
    Vue.prototype.$dialog = {
      show() {
        let dialog = Vue.extend(require('@c/dialog/Dialog.view').default);
        tpl = new dialog().$mount().$el;
        document.body.appendChild(tpl);
        return tpl
      },
      hidden() {
        let dialogTpl = document.getElementById('.ff-dialog');
        return document.body.removeChild(dialogTpl);
      }
    }
  }
}