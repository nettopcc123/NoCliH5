<template>
  <div class="content-box">
    <div class="box">
      <div class="input-text" :class="{'input-active': showCursor}" :data-content="deliverContent" @touchend.prevent="showkeyBOrd">
        <em v-show="inputeCon ? !inputeCon : !inputData">{{hint}}</em>
      </div>
      <span class="close" v-show="showClose && inputeCon || showClose && inputData" @touchend.prevent="clearContent()"><svg-icon icon-class="close01" v-if="showClose && inputeCon || showClose && inputData"/></span>
    </div>
    <KeyBoardNum 
      v-show="showCursor"
      :inputVal.sync="inputData"
      :maxLength="maxLength" 
      :sheetProp="showKey" 
      :disPoint="true" 
      :delName="delName" 
      :getAmount="getName"
      :shiftUpVal="shiftUpVal"
    ></KeyBoardNum>
  </div>
</template>

<script>
import KeyBoardNum from "@p/comm/keyboard/KeyBoardNum.view"; // 数字键盘
export default {
  name: 'inputComponent',
  components: {
    KeyBoardNum
  },
  props: {
    showCursor: { // 光标是否显示
      type: Boolean,
      default: false
    },
    content: { // 输入框内容  非必传 传了则使用传入的值  没有则使用组件内部变量
      type: [String,Number],
    },
    hint: { // 提示语
      type: String,
      default: '请输入'
    },
    delName: { // 监听要删除的名称
      type: String,
      default: 'deleteName'
    },
    getName: { // 监听要获取输入的名称
      type: String,
      default: 'getName'
    },
    maxLength: { // 输入的最大长度
      type: [Number,String]
    },
    showClose: { // 一键清除
      type: Boolean,
      default: false
    },
    format: { // 是否格式化数字
      type: Boolean,
      default: false
    },
    shiftUpVal: {
      type: Number
    }
  },
  computed: {
    inputeCon: {
      get() {
        return this.content;
      },
      set(v) { 
        this.$emit('update:content', v)
      }
    },
    
    deliverContent() {
      let content = this.inputeCon ? this.inputeCon : this.inputData;
      return content
    },
  },
  data() {
    return {
      inputData: '', // 组件内部输入内容
      showKey: !this.showCursor, // 
      sheetOpened: true, 
      close: false, // 是否一键清除内容
    }
  },
  watch: {
    showCursor: {
      handler(newVal,oldVal) {
        if(!newVal) {
          this.showKey = true
        }
      }
    },
  },
  mounted() {
    this.$customEvent.on(this.delName, data => {
      this.inputData = data.join("")
    })
    this.$customEvent.on(this.getName, data => {
      this.inputData = data.join("")
      this.formatString()
    })
    this.$customEvent.on('setKeyBoard', data=> { // 监听数字键盘的显示隐藏按钮
      this.sheetOpened = data
    })
  },
  methods: {
    showkeyBOrd() { // 输入框被点击
      // this.showKey = this.sheetOpened ? !this.sheetOpened : !this.showKey
      this.showKey = this.sheetOpened ? !this.sheetOpened : !this.sheetOpened && this.showKey ? false : !this.showKey
      this.$customEvent.trigger('setKeyBoard', this.showKey)
    },
    clearContent() { // 删除内容
      this.inputeCon = ''
      this.inputData = ''
      // this.close = true
      this.$customEvent.trigger('clearOperations', true);
      this.$emit("closeUpdate", '')
    },
    formatString() { // 格式化手机号 3 4 4
      if(!this.format) return
      let resArr = [];
      let num = this.inputData.split("")
      // let newStr = '';
      // for(let i = 0; i< num.length; i++) {
      //   if (i == 2) {
      //     newStr = newStr + num[i] + ' ';
      //   } else if (i == 6) {
      //     newStr = newStr + num[i] + ' ';
      //   } else {
      //     newStr += num[i];
      //   }
      // }
      for(let i = 0; i< num.length; i++) {
        resArr.push(num[i])
        if (i == 2) {
          resArr.push(' ')
        } else if ((i-2)%4 == 0) {
          resArr.push(' ')
        }
      }
      this.inputData = resArr.join('');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.content-box{
  width: 100%;
  .box{
    display: flex;
    justify-content: space-between;
    .input-text{
      flex: 1;
    }
    .close{
      width: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .svg-icon{
        font-size: 0.18rem;
        color: #BACEF1;
      }
    }
  }
  
}
</style>