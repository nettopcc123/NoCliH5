<template>
  <div class="kbn">
    <div class="kbn-close" @touchend.prevent="hidKeyBord()"><svg-icon icon-class="more"  :class="sheetOpened ? 'tran270' : 'tran90'"></svg-icon></div>
    <ul class="kbn-list" :class="sheetOpened ? 'hid-kb' : ''">
      <li v-for="(val,index) in number" :key="index">
        <span v-show="val != 'del'" @touchend.prevent="getCurAmount(val)">{{ val }}</span>
        <span v-show="val == 'del'" @touchend.prevent="delAmount()"><svg-icon :icon-class="val" v-if="val == 'del'"></svg-icon></span>
      </li>
    </ul>
  </div>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
export default {
  name: 'KeyBoardNum', // 数字键盘
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {
    delName: { // 监听要删除的名称
      type: String,
      default: 'delWithPwd'
    },
    getAmount: { // 监听要获取输入的名称
      type: String,
      default: 'getWithPwd'
    },
    sheetProp: { // 键盘是否显示
      type: Boolean,
      default: false
    },
    disPoint: { // 小数点是否可点
      type: Boolean,
      default: true
    },
    maxLength: { // 最大长度
      type: [Number,String]
    },
    clearOperation: { 
      type: Boolean,
      default: false
    },
    inputVal: {
      type: [String,Number],
    },
    shiftUpVal: { // 页面上移值
      type: Number
    }
  },

  computed: {
  },
  data() {
    return {
      number: [1,2,3,4,5,6,7,8,9,'.',0,'del'],
      pwd: [],
      sheetOpened: this.sheetProp,
    };
  },
  watch: {
    sheetOpened: {
      handler(newVal, oldVal) {
        window.utils.of().shiftUp(!newVal, this.shiftUpVal)
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
  },
  methods: {
    bindEvent() {
      this.$customEvent.on('setKeyBoard', data=> {
        this.sheetOpened = data
      })
      this.$customEvent.on('clearOperations', data=> {
        if(data) {
          this.pwd = []
          this.$emit("update:inputVal",'')
          this.$customEvent.trigger('clearOperations', false);
        }
        
      })
    },
    hidKeyBord() {
      this.sheetOpened = !this.sheetOpened
      window.utils.of().shiftUp(!this.sheetOpened, this.shiftUpVal)
      this.$customEvent.trigger('setKeyBoard', this.sheetOpened)
    },
    delAmount() {
      let str = this.inputVal,
          str1 = str.toString(),
          arr = str1.split("")
      if(arr[arr.length-1] == ' ') {
        arr.pop()
      }
      arr.pop()
      this.pwd = arr
      this.$customEvent.trigger(this.delName, this.pwd);
    },
    getCurAmount(v) {
      for(let i = 0; i< this.pwd.length; i++) {
        if(this.pwd[i] === ' ') {
          this.pwd.splice(i,1)
        }
      }
      if(this.pwd.length + 1 > this.maxLength) return
      if(this.disPoint) {
        if( v != '.') this.pwd.push(v)
      }else{
        this.pwd.push(v)
      }
      this.$customEvent.trigger(this.getAmount, this.pwd);
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.kbn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $but-deep;
  border-radius: 0.06rem 0.06rem 0 0;
  z-index: 10;
  .kbn-close{
    line-height: 0.26rem;
    height: 0.26rem;
    justify-content: center;
    align-items: center;
    display: flex;
    border-bottom: 0.01rem solid $logo-but-bg;
    svg{
      height: 0.2rem;
      width: 0.2rem;
    }
  }
  .hid-kb{
    height: 0rem!important;
    transition: all 0.3s;
  }
  .kbn-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: row;
    background: $but-deep;
    height: 2rem;
    transition: all 0.3s;
    background-image:linear-gradient(
      rgba($but-deep, 0.9), 
      rgba($but-deep, 0.9)
    ), url('../../../assets/img/login/keyLogo.png');
    background-size: 47% 90%;
    background-position: 50%;
    background-repeat: no-repeat;
    li{
        line-height: 0.5rem;
        height: 0.5rem;
        color: $font-color;
        text-align: center;
        padding-top: 0;
        border-bottom: 0.01rem solid $logo-but-bg;
        border-left: 0.01rem solid $logo-but-bg;
        flex: 1 1 33.33%;
        box-sizing:border-box;
        svg{
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.5rem;
          margin-top: 0.1rem;
          color: $font-color;
        }
        span{
          font-size: 0.25rem;
          font-family: Arial, Helvetica, sans-serif;
          display: inline-block;
          width: 100%;
        }
    }
    }
}
</style>