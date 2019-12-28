<template>
  <f7-navbar>
    <f7-nav-left>
      <f7-link :href="rUrlProp" v-show="showLeftProp" @touchend.prevent="upStatus">
        <svg-icon icon-class="goback" />
      </f7-link>
    </f7-nav-left>
    <!-- <f7-nav-left  v-show="!rUrlProp">
      <f7-link back v-show="showLeftProp">
        <svg-icon icon-class="goback" />
      </f7-link>
    </f7-nav-left> -->
    <f7-nav-title>{{titProp}}</f7-nav-title>
    <f7-nav-right class="hgri-r">
      <div v-show="riconProp || rtit" :class="{'disabled-select': !requestFinished}">
        <f7-button fill :sheet-open="dialogName" @touchend.prevent="stOpenFun" v-show="judeTitle()">
          {{ typeName }}<svg-icon :icon-class="riconProp" class="hgri-drop"/>
        </f7-button>
        <f7-link popup-close @touchend.prevent="close" v-show="!judeTitle()">
          <svg-icon :icon-class="riconProp" class="hgri-c" />
        </f7-link>
      </div>
    </f7-nav-right>
    <ff-fun-drop :name-spaced="nameSpaced"></ff-fun-drop>
  </f7-navbar>
</template>
<script>
import FundDrop from "@p/member/FundDrop.view"; // 资金选择
import { mapState } from 'vuex';
export default {
  name: "HeaderGoBack", // 返回上一页
  components: {
    "ff-fun-drop": FundDrop
  },
  props: {
    titProp: {
      type: String,
      default: ''
    },
    showLeftProp: {
      type: Boolean,
      default: true
    },
    riconProp: {
      type: String,
      default: ''
    },
    rTitProp: {
      type: String,
      default: ''
    },
    rActionName: {
      type: String,
      default: ''
    },
    rAction: {
      type: [String, Boolean],
      default: ''
    },
    rUrlProp: {
      type: [String, Boolean],
      default: ''
    },
    dialogName: {
      type: String,
      default: ''
    },
    showSelectDialog: {
      type: Boolean,
      default: false
    },
    watchProp: {
      type: String,
      default: ''
    },
    nameSpaced: {
      type: String,
      default: ""
    },
  },
  computed: {
    ...mapState({
      requestFinished(state) {
        // 表格loading
        if (this.nameSpaced) {
          return state[this.nameSpaced].tableResult.requestFinished;
        } else {
          return true;
        }
      },
      // 右上角显示名称
      typeName(state) {
        return state.typeSelect ? state.typeSelect.typeName : '';
      },
    }),
  },
  data() {
    return {
      rtit: this.rTitProp,
    }
  },
  watch: {
    rTitProp: {
      handler (val) {
        this.rtit = val
      },
      immediate: true
    }
  },
  mounted() {
    this.bindEvent()
  },
  filters: {},
  methods: {
    bindEvent() {
      this.$customEvent.on('hRightAction', data => {
          const router = this.$f7router;
          router.navigate({
            name: data,
            path: `/${data}`
          });
      })
    },
    judeTitle() {
      if(this.showSelectDialog && this.riconProp){
        return true
      }else{
        return false
      }
    },
    hRightAction() {
      this.$emit('hRightAction')
    },
    close() {
      this.$customEvent.trigger(this.rActionName, this.rAction)
      const router = this.$f7router;
      router.navigate({
        name: 'fundDetails',
        path: `/fundDetails`
      });
    },
    upStatus() {
      this.$store.commit("SET_ISINDEX", false)
    },
    stOpenFun() {
      this.$store.commit('SET_GETPROPDROP', this.watchProp)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.hgri-r{
  a{
    color: #506081;
    font-size: 0.14rem;
    line-height: 0.44rem;
  }
}
.hgri-drop{
  width: 0.19rem;
  height: 0.19rem;
}
.hgri-c{
  width: 0.21rem;
  height: 0.21rem;
}
.navbar a.link{
  svg{
    width: 0.2rem;
    height: 0.2rem;
  }
}
.disabled-select{
  pointer-events: none;
}
</style>
