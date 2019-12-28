<template>
  <f7-sheet class="keyboard" swipe-to-close backdrop :opened="sheetOpened" @sheet:closed="sheetOpened = false" :closeByBackdropClick="false">
    <div class="key-pwd">
      <p class="key-pwd-tit" @touchend.prevent="closeKeyBoard()"><svg-icon icon-class="close01"></svg-icon>请输入提款密码</p>
      <div class="key-con">
        <p class="key-cft">确认提款</p>
        <p class="key-cfm"><span>￥</span><span>{{ paramProp.amount | formatAmount }}</span></p>
        <p class="key-cfb">
          <span>{{ paramProp.name }}</span>
          <span>{{ paramProp.card }}</span>
          <span>{{ paramProp.bank }}</span> 
        </p>
        <p class="key-inp" @touchend.prevent="hidKeyBord()">
          <span>{{ this.pwd[0] }}</span>
          <span>{{ this.pwd[1] }}</span>
          <span>{{ this.pwd[2] }}</span>
          <span>{{ this.pwd[3] }}</span>
        </p>
      </div>
    </div>
    <ul class="key-list" :class="!sheetOpened ? 'hid-kb' : ''">
      <li v-for="(val,index) in number" :key="index">
        <span v-show="val != 'del'" @touchend.prevent="getCurAmount(val)">{{ val }}</span>
        <span v-show="val == 'del'"  @touchend.prevent="delAmount()"><svg-icon :icon-class="val" v-if="val == 'del'"></svg-icon></span>
      </li>
    </ul>
  </f7-sheet>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import Utils from "@m/utils/Utils.module";
export default {
  name: 'KeyBoard', // 键盘
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {
    delName: {
      type: String,
      default: 'delWithAPwd'
    },
    getAmount: {
      type: String,
      default: 'getWithAPwd'
    },
    sheetProp:{
      type: Boolean,
      default: false
    },
    disPoint: {
      type: Boolean,
      default: true
    },
    paramProp: {
      type: Object,
      default: () => {return {}}
    },
    pwdProp: {
      type: Array,
      default: () => {return []}
    },
    remProp: {
      type: String,
      default: ''
    }
  },
  computed: {
    sheetOpened: {
      get() {
        return this.sheetProp
      },
      set(v) {
        this.$emit("update:sheetProp",v)
      }
    }
  },
  data() {
    return {
      number: [1,2,3,4,5,6,7,8,9,'.',0,'del'],
      pwd: this.pwdProp,
      paramBank: this.paramProp,
    };
  },
  watch: {
    pwdProp: {
      handler(newVal, oldVal) {
        this.pwd = newVal
      }
    }
  },
  created() {},
  mounted() {
  },
  filters: {
    formatAmount: function(v) {
      if(v) {
        return Utils.of().formatAmount(v)
      }
    }
  },
  methods: {
    bindEvent() {
      this.pwd = this.pwdProp
      this.paramProp = this.paramBank
      this.$customEvent.on('setKeyBoardWPwd', data=> {
        this.sheetOpened = data
      })
    },
    hidKeyBord() {
      this.sheetOpened = !this.sheetOpened
    },
    delAmount() {
      this.pwd.pop()
      this.$customEvent.trigger(this.delName, this.pwd);
    },
    getCurAmount(v) {
      if(this.disPoint) {
        if(v != '.' && this.pwd.length < 4) {
          this.pwd.push(v)
          if(this.pwd.length == 4) this.$emit('getPwd', this.pwd)
        }
      }else{
        this.pwd.push(v)
      }
      this.$customEvent.trigger(this.getAmount, this.pwd);
    },
    closeKeyBoard() {
      this.pwd = []
      this.$emit('closePwdKeyBoard', this.pwd)
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.keyboard{
  .key-pwd{
    margin: 0 auto 0.3rem;
    background-color: $but-deep;
    width: 2.7rem;
    height: 2.25rem;
    border-radius: 0.06rem;
    position: relative;
    .key-pwd-tit{
      text-align: center;
      position: relative;
      font-size: 0.15rem;
      line-height: 0.4rem;
      border-bottom: 0.01rem solid $logo-but-bg;
      svg{
        position: absolute;
        left: 0.12rem;
        top: 0.12rem;
        width: 0.2rem;
        height: 0.2rem;
      }
    }
    .key-con{
      text-align: center;
      .key-inp{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 0.44rem;
        border-top: 0.02rem solid $logo-but-bg;
        span{
          width: 25%;
          line-height: 0.44rem;
          height: 0.44rem;
          display: inline-block;
          font-size: 0.25rem;
          border-left: 0.02rem solid $logo-but-bg;
          &:nth-child(1){
            border-left: none;
          }
        }
      }
      .key-cft{
        font-size: 0.15rem;
        line-height: 0.16rem;
        padding-top: 0.2rem;
        color: rgba($font-login, 0.8);
      }
      .key-cfm{
        line-height: 0.6rem;
        span{
          font-size: 0.28rem;
          color: $font-login;
          font-weight: bold;
        }
      }
      .key-cfb{
        line-height: 0.2rem;
        font-size: 0.15rem;
        color: $font-login;
        span{
          margin-right: 0.05rem;
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
    .key-rem{
      position: absolute;
      bottom: -0.2rem;
      left: 0;
      color: $font-red;
    }
  }
  .keybord-close{
    background: $but-deep;
    line-height: 0.26rem;
    height: 0.26rem;
    border-radius: 0.06rem 0.06rem 0 0;
    justify-content: center;
    align-items: center;
    display: flex;
    svg{
      height: 0.2rem;
      width: 0.2rem;
    }
  }
  .hid-kb{
    height: 0rem!important;
    transition: all 0.3s;
  }
  .key-list{
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
          border-top: 0.01rem solid $logo-but-bg;
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