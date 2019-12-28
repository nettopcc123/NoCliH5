<template>
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <ff-dialog :dialProp="diacon" v-show="diaShow" @test="test"></ff-dialog>
    <ff-loading-dialog v-show="isShowLoad" :dialProp="loadContent"></ff-loading-dialog>
    <f7-view id="main-view" :url="`/${defaultUrl}`" main class="safe-areas"></f7-view>
  </f7-app>
</template>

<script>
import '@/stylus/base.scss';
import Dialog from "@c/dialog/Dialog.view"; // 弹出框
import routes from "@/router/Router.config.js";
import LoadingDialog from "@c/loadingDialog/loadingDialog.view"; // 加载弹窗
import { mapState } from 'vuex';
export default {
  name: "App",
  components: {
    "ff-dialog": Dialog,
    "ff-loading-dialog": LoadingDialog
  },
  computed: {
    ...mapState({
      loadContent: state => state.loadContent, // 加载弹窗内容
      isShowLoad: state => state.isShowLoad // 加载弹窗是否显示
    })
  },
  data() {
    return {
      diaShow: false,
      diacon: {},
      f7params: {
        id: "f.app.vapp", // App bundle ID
        name: "app", // App name
        theme: "auto", // Automatic theme detection
        routes: routes,
        view: {
          pushState: true,
          pushStateSeparator: '#',
        }
      },
      defaultUrl: 'index'
    };
  },
  watch: {
  },
  mounted() {
    this.bindEvent()
  },
  filters: {
    
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('changeDialogHome', data => {
        if(data.state && data.page == 'index') {
          this.$store.commit('SET_ISPOPNOTICE', true)
        }
        this.diaShow = data.state
      });
      this.$customEvent.on('changeDialog', data => {
        if(data) {
          this.$store.commit('SET_ISPOPNOTICE', true)
        }
        this.diaShow = data
      });
      this.$customEvent.on('dialogCon', data => {
        this.diacon = data
      });
    },
    test() {
      setTimeout(() => {
          const router = this.$f7router;
          router.navigate({
            name: this.defaultUrl,
            path: `/${this.defaultUrl}'`
          });
      },1000)

    },
    getHomeUrl() {
      if(sessionStorage.getItem('f7router')) {
        return sessionStorage.getItem('f7router').substring(1)
      }else{
        return 'index'
      }
    }
  }
};
</script>