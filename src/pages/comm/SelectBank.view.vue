<template>
    <f7-sheet class="select-bank" swipe-to-close backdrop :opened="sheetOpened" @sheet:closed="confireSelectBank()">
      <div class="sb-con">
        <p class="sb-tit-wrap">
          <span class="sb-cancel"><f7-link @click="confireSelectBank()">取消</f7-link></span>
          <span class="sb-tit">选择银行</span>
          <span class="sb-confirm"><f7-link @click="confireSelectBank(curBank)">确定</f7-link></span>
        </p>
        <div class="sb-cn">
          <ul class="sb-clist">
            <li v-for="(val, index) in bankListProps" :key="index" @touchend.prevent="selectBank(val)" :class="sid == val.id ? 'sb-cur' : ''">{{val.name}}</li>
          </ul>
        </div>
      </div>
    </f7-sheet>
</template>
<script>
export default {
  name: 'StandBank', // 支持银行
  components: {
  },
  props: {
    bankListProps:{
      type: [Array, Object],
      default: () => {}
    },
    sheetProp:{
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  data() {
    return {
      sid: '',
      sheetOpened: this.sheetProp,
      curBank: null
    };
  },
  watch: {
    sheetProp: {
      handler: function(newVal) {
        this.sheetProp = newVal
        this.sheetOpened = newVal
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.touchClose();
  },
  methods: {
    selectBank(v) {
      this.sid = v.id
      this.curBank = v
    },
    confireSelectBank(v) {
      if(v) {
        this.$emit('setCurBank', v)
      }else{
        this.$emit('setCurBank')
      }
    },
    touchClose() {
      this.$nextTick(() => {
        let sheetBackdrop = document.querySelector('.sheet-backdrop');
        if (sheetBackdrop) {
          sheetBackdrop.addEventListener("touchstart", () =>{
            this.sheetOpened = false;
          });
        }
      })
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.select-bank{
  background: $but-deep;
  height: 55vh;
  border-radius: 0.06rem 0.06rem 0 0;
  .sb-con{
    .sb-tit-wrap{
      line-height: 0.4rem;
      border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
      padding: 0 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 0.15rem;
        a{
          font-size: 0.15rem;
        }
      }
      .sb-cancel{
        color: $login-f-pwd;
      }
      .sb-confirm{
        color: $but-light-l;
      }
      .sb-tit{
        color: rgba($font-login, 0.6);
      }
    }
    .sb-cn{
      padding: 0.2rem;
      color: $font-login;
      line-height: 0.22rem;
      font-size: 0.14rem;
      height: calc(70vh - 0.8rem);
      overflow: auto;
      .sb-clist{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li{
          width: 30%;
          border:solid 0.01rem $login-f-pwd;
          border-radius: 0.06rem;
          line-height: 0.44rem;
          text-align: center;
          font-size: 0.16rem;
          color: rgba($font-login, 0.6);
          margin-bottom: 0.1rem;
        }
        .sb-cur{
          background-color: $login-f-pwd;
          color: $font-login;
        }
      }
    }
  }
}
</style>
