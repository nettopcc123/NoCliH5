import DialogWin from './DialogWin.view'

const DIALOGWIN = {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DialogWin', DialogWin)

    function msg(type, text) {
      let msg
      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        msg = text.text || ''
      }
      let VueDialogWin = Vue.extend({
        render(h) {
          let props = {
            type,
            text,
            show: this.show
          }
          return h('DialogWin', { props })
        },
        data() {
          return {
            show: false
          }
        }
      })

      if(type == 'show') {
        let newDialogWin = new VueDialogWin()
        let vm = newDialogWin.$mount()
        let el = vm.$el
         vm.show = true
        if(document.getElementsByClassName('dialogwin-wrap').length) return
        document.body.appendChild(el) // 把生成的提示的dom插入body中
      }

      if(type == 'hid') {
        let dialogTpl = document.getElementById('dialogwin-wrap');
        if(dialogTpl) return document.body.removeChild(dialogTpl);
      }
    }

    Vue.prototype.$dialogWin = {
      show(text) {
        if (!text) return
        msg('show', text)
      },
      hid() {
        msg('hid')
      }
    },

    this.show = function(text) {
      if (!text) return
      msg('show', text)
    }
    this.hid = function() {
      msg('hid')
    }
  }
}
export default DIALOGWIN