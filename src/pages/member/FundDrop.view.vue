<template>
    <f7-sheet class="fund-drop" swipe-to-close backdrop
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      @sheet:opened="sheetOpenedEvent"
      @sheet:close="sheetClosedEvent"
    >
      <section class="se-heard">
        <f7-link sheet-close>
          <div class="se-htit">类型筛选</div>
          <div class="se-cls-btn"><svg-icon icon-class="close02"></svg-icon></div>
        </f7-link>
      </section>

      <f7-page-content class="fd-con">
        <ul class="fd-li">
          <li v-for="(val, index) in typeMenuArr" :key="index" @touchend.prevent="getFdCur(val)" :class="setCurClass(val.code)">{{val.name}}</li>
        </ul>
        <p class="fd-but" :class="!!curFd ? 'fd-but-cur' : ''" @touchend.prevent="getTrade">确定</p>
      </f7-page-content>
    </f7-sheet>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {ModalHelper} from '@m/utils/ModalHelper.module';
export default {
  name: 'PerferDetails', // 优惠详情
  props: {
  },
  computed: {
    ...mapState({
      getRropDrop: state => state.getRropDrop,
      //  菜单所属类别的页面
      typePage(state) {
        return state.typeSelect ? state.typeSelect.typePage : '';
      },
      // 右上角显示名称
      typeName(state) {
        return state.typeSelect ? state.typeSelect.typeName : '';
      },
      //  菜单数组
      typeMenuArr(state) {
        return state.typeSelect ? state.typeSelect.typeMenuArr : '';
      },
      //  选中数组
      typeSelectArr(state) {
        return state.typeSelect ? state.typeSelect.typeSelectArr : '';
      },
    })
  },
  data() {
    return {
      sheetOpened: false,
      curFd: [],
      menu: [],
      dropMenu: '',
      name: []
    };
  },
  watch: {
    getRropDrop: {
      handler(newVal) {
        this.judgeMenu(newVal)
      },
      immediate: true
    }
  },
  mounted() {
    this.bindEvent()
    this.touchClose();
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('closeFundDrop', () => {
        const self = this;
        self.$f7.sheet.close();
        this.sheetOpened = false
      });
    },
    ...mapMutations({
      setTypeName: 'typeSelect/SET_TYPE_NAME',
      setTypeSelectArr: 'typeSelect/SET_TYPE_SELECT_ARR',
    }),
    judgeMenu(v){
      if(v == 'getFunDrop') {
        this.menu = [{code: 1,name: '提款'},{code: 2,name: '存款'},{code: 3,name: '转账'},{code: 4,name: '加扣款'},{code: 5,name: '活动'}]
      }
      if(v == 'getBetDrop') {
        this.menu = [{code: 0,name: '全部'},{code: 1,name: 'V电竞'},{code: 2,name: 'V体育'}]
      }
    },
    setCurClass(code) {
      if(this.typeSelectArr.indexOf(code) > -1) {
        return 'cur-fd'
      }else{
        return ''
      }
    },
    getFdCur(val) {
      // let code = val.code,
      //     name = val.name,
      //     index = this.curFd.indexOf(code)
      // if(index > -1) {
      //   this.curFd.splice(index, 1)
      // } else {
      //   this.curFd.push(code)
      // }
      // if(this.getRropDrop == 'getFunDrop') {
      //   this.curFd = [...new Set(this.curFd)]
      // }
      // if(this.getRropDrop == 'getBetDrop') {
      //   this.curFd = [code]
      //   this.name = [name]
      // }


      let code = val.code;
      let name = val.name;
      let index = this.typeSelectArr.indexOf(code);
      let newArr = [];
      if(index != -1) {
        for (let i = 0; i < this.typeSelectArr.length; i++) {
          if (code != this.typeSelectArr[i]) {
            newArr.push(this.typeSelectArr[i])
          }
        }
      } else {
        newArr = this.typeSelectArr.concat([code])
      }
      if (this.typePage === 'betRecord') {
        this.setTypeName(val.name);
        this.setTypeSelectArr([val.code]);
      } else if (this.typePage === 'fundRecord') {
        this.setTypeSelectArr([...new Set(newArr)]);
      }
    },
    getTrade() {
      let type = '';
      if (this.typePage === 'betRecord') {
        type = 'getBetDrop';
      } else if (this.typePage === 'fundRecord') {
        type = 'getFunDrop';
      }
      this.$store.dispatch('typeSelect/subscribeTypeSelect', {
        type: type,
        data: this.typeSelectArr
      })
      const self = this;
      self.$f7.sheet.close();
    },
    sheetOpenedEvent() {
      ModalHelper.afterOpen();
    },
    sheetClosedEvent() {
      ModalHelper.beforeClose();
    },
    touchClose() {
      this.$nextTick(() => {
        let sheetBackdrop = document.querySelector('.sheet-backdrop');
        if (sheetBackdrop) {
          sheetBackdrop.addEventListener("touchstart", () =>{
            const self = this;
            self.$f7.sheet.close();
          });
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
// 弹出框头部
.se-heard a{
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: 0.37rem;
  border-bottom: 0.01rem solid $close-tit-lin;
}
.se-htit{
  flex: 1;
  padding-left: 0.22rem;
  text-align: left;
  font-size: 0.14rem;
}
.se-cls-btn{
  border-left: 1px solid rgba(48,60,84,.5);
  width: 0.37rem;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 0.37rem;
  align-items: center;
}

.fund-drop{
  background: $sheep-bg;
  height: 2.5rem;
  .fd-twrap{
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 0.01rem solid $per-lin;
    position: relative;
    background-color: $sheep-bg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fd-close{
      width: 15%;
      svg{
        width: 0.21rem;
        height: 0.21rem;
      }
    }
  }
  .fd-con{
    padding: 0.12rem 0.2rem!important;
    .fd-li{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
      min-height: 1rem;
      li{
        width: 0.78rem;
        height: 0.46rem;
        border-radius: 0.06rem;
        border: solid 0.01rem $close-tit-lin;
        line-height: 0.46rem;
        text-align: center;
        margin-left: 0.07rem;
        margin-bottom: 0.12rem;
        box-sizing: border-box;
        font-size: 0.15rem;
        color: $login-f-pwd;
        &:nth-child(4n+1){
          margin-left: 0rem;
        }
      }
      .cur-fd{
        background-color: $fd-but-lin;
        color: rgba($font-funs, 0.8)
      }
    }
  }
  .fd-but{
    width: 1.23rem;
    height: 0.44rem;
    margin: 0.1rem auto 0;
    background-color: $logo-but-bg;
    border-radius: 0.2rem;
    font-size: 0.18rem;
    color: $login-f-pwd;
    text-align: center;
    line-height: 0.44rem;
  }
  .fd-but-cur{
    background-image: linear-gradient(90deg,$but-light-l 0%, $login-lin 100%), linear-gradient($but-deep, $but-deep);
    color: $font-login;
  }
}
</style>
