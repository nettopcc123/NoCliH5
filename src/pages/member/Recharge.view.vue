<template>
  <f7-page @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='存款' :rUrlProp='isIndex ? "/index" :"/wallet"'></ff-header-goback>
    <section class="recharge scroll-con shift-up" v-show="!!payList.length && isReqReg">
      <article class="r-t">
        <!-- <p class="r-title">选择支付渠道</p> -->
        <ul class="r-payli">
          <li v-for="(val, index) in payList" :key="index" @click.stop="getCurPay(val)" :class="curPay==val.category  ? 'cur-pay' : ''">
            <div><p :class="judgeClass(val.category)"><svg-icon :icon-class="val.category | machIcon" /></p></div>
            <div v-html="formatName(val.name)"></div>
          </li>
        </ul>
        <ul class="login-list" v-show="showUserName">
          <li :class="reg.recName.rem ? 'cur-lin' : ''">
            <div class="ll-wrap">
              <span class="log-ls c-w100">存款人名字</span>
              <div class="login-pi">
                <input type="text" class="ff-input" @input="recNameVerif()" @focus="nameFocus" name="" v-model="name" ref="nameInput" :placeholder="name">
                <i>{{reg.recName.rem}}</i>
              </div>
            </div>
          </li>
        </ul>
        <p class="r-title-b">存款金额</p>
        <div class="r-i-wrap" :class="amountReg ?  butVerif ? 'cur-redlin' : 'cur-lin' : ''">
          <div class="r-i-d">
            <span>￥</span>
            <div class="input-text" @touchend.prevent="hidKeyBord()">
              <!--:content.sync="rAmount" 等于后面表达式  v-bind:content="rAmount" v-on:update:content="changeContent" -->
              <ff-input ref="deposit" :hint='inputHint' :shiftUpVal="0.2" :showCursor="sheetProp" :maxLength="11" :content.sync="rAmount" :showClose="true" delName="delMoney" getName="getMoney" @closeUpdate="clearAmount"></ff-input>
            </div>
          </div>
          <i class="r-i-rem">{{ amountRegRem }}</i>
        </div>
        <ul class="pay-amount" v-show="showQAmount">
          <li v-for="(val, index) in amount" :key="index" @click.stop="getCurInp(val)" :class="curInp==val.code  ? 'cur-inp' : ''"> {{ val.amount }}</li>
        </ul>
      </article>
      <p class="comm-but but-175 mb15" @click.stop="gotoNextPage()" :class="curBut ? 'cur-but' : ''">
        <span>下一步</span>
      </p>
    </section>
    <ff-loading-data v-show="!isReqReg"></ff-loading-data>
    <section class="recharge scroll-con lis-nodate" v-show="!payList.length && isReqReg">
      <div class="re-nodata-wrap">
        <ff-nodate titleProp="暂无支付渠道"></ff-nodate>
        <p class="comm-but cur-but re-ref" @click.stop="rechargeList(true)">
          <span>刷新一下</span>
          <ff-load-but class="lb-load r-load" v-show="!isReqList" :isRepProp="isReqList"></ff-load-but>
        </p>
      </div>
    </section>
    <ff-fundBank :sheetProp="showFundBank"></ff-fundBank>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import FundBank from '@p/member/FundBank.view'; // 查看转账详情
import Rule from '@/module/rule/Rule.module'; // 验证
import NoDate from "@p/comm/noDate/NoDate.view"; // 暂无数据
import { mapState } from 'vuex';
export default {
  name: 'Recharge', // 充值
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-fundBank" : FundBank,
    'ff-nodate': NoDate
  },
  computed: {
    ...mapState({
      isIndex: state => state.isIndex,
      gotoPay: state => state.gotoPay
    }),
    // betRecordData: {
    //   get() {
    //     return this.$store.state.betRecordData
    //   },
    //   set(v) {
    //     this.$store.commit("SET_BETRECORDDATA",v)
    //   }
    // },
    // rAmount: {
    //   get() {
    //     return this.rAmount
    //   },
    //   set(v) {
    //     this.rAmount = v
    //   }
    // }
  },
  data() {
    return {
      curPay: '', // 当前选中支付方式
      curInp: '', // 快捷金额
      showUserName: false, // 充值用户是否显示
      showQAmount: false, // 快捷金额是否显示
      name: '', // 充值姓名
      inputHint: '', // input提示语
      rAmount: '', // 当前支付金额
      amount: [], // 快捷充值列表
      payList: [], // 支付方式列表
      amountKeyBoard: '',
      isReq: true, // 请求是否完成
      isReqReg: true, // 请求是否完成
      isReqList: true, // 刷新动画
      payTypeId: '',
      payTitle: '',
      maxAmount: '', // 最大金额限制
      minAmount: '', // 最小金额限制
      showFundBank: false,
      sheetProp: false,
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      reg:{ // 验证
        recName: { // 用户名验证
          rem: '',
          isPass: false
        }
      },
      amountReg: false, // 金额验证是否通过
      amountRegRem: ''
    };
  },
  watch: {
    gotoPay: {
      handler(newValue) {
        if(newValue) {
            name = 'fundDetails'
            const router = this.$f7router;
            router.navigate({
              name: name,
              path: `/${name}`
            });
        }
        this.$store.commit('SET_GOTOPAY', false)
      },
      immediate: true
    }
  },
  filters: {
    machIcon: function(v) {
      let icon = ''
      switch (v) {
        case 1001:
          icon = 'alipayScan'
          break;
        case 1002:
          icon = 'weChatScan'
          break;
        case 1003:
          icon = 'recharge'
          break;
        case 1004:
          icon = 'alipay'
          break;
        case 1005:
          icon = 'weChat'
          break;
        case 1006:
          icon = 'recharge'
          break;
        case 1007:
          icon = 'weChat'
          break;
        case 1008:
          icon = 'recharge'
          break;
        default:
          icon = 'recharge'
          break;
      }
      return icon
    }
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      this.rechargeList()
      this.$customEvent.on('getMoney', data => {
        this.rAmount = data.join("")
        this.amountVerif() // 金额校验
        if(this.curPay == 1008) {
          this.recNameVerif()
        }
      })
      this.$customEvent.on('delMoney', data => {
        this.rAmount = data.join("")
        this.amountVerif() // 金额校验
        if(this.curPay == 1008) {
          this.recNameVerif()
        }
      })
    },
    judgeClass(v) {
      switch (v) {
        case 1008:
          return 'bank-icon'
          break;
        default:
          break;
      }
    },
    judgeButClass(v) {
      let c = ''
       switch (v) {
        case 1008:
          if(this.rAmount && this.name ) c = 'cur-but'
          break;
        default:
          if(this.rAmount) c = 'cur-but'
          break;
      }
      return c
    },
    hidKeyBord() {
      this.$refs.nameInput.blur()
      if(this.inputHint=='请选择金额'){
        this.sheetProp = false
        return
      }
      this.sheetProp = true
    },
    formatName(v) {
      let str = v.split('-'),
          temp = ''
      str.forEach((item, index) => {
        temp += `<p>${item}</p>`
      })
      return temp
    },
    nameFocus() { // 名字输入框聚焦事件
      this.sheetProp = false // 去除金额输入光标
      window.utils.of().shiftUp(false)
    },
    recNameVerif() { // 真实姓名验证
      let rr = Rule.of().rules.realName,
          rrt = rr.reg.test(this.name);
      if(rrt) {
        this.reg.recName.isPass = true
        this.reg.recName.rem = ''
      }else{
        this.reg.recName.isPass = false
        this.reg.recName.rem = rr.desc
      }
      this.recButVerif()
    },
    amountVerif() { // 金额验证
      this.rAmount = parseInt(this.rAmount)
      if(!this.rAmount) this.rAmount = 0
      if(this.rAmount < this.minAmount || this.rAmount > this.maxAmount || !this.rAmount) {
        this.amountReg = true
        this.amountRegRem = this.inputHint
        this.butVerif = false
         this.curBut = false
      }else{
        this.curBut = true
        this.amountReg = false
        this.amountRegRem = ''
      }
      
    },
    recButVerif() { // 按扭验证
      let goBut = [];
      Object.keys(this.reg).forEach((key, val) => {
        if(this.reg[key].isPass) {
          goBut.push(this.reg[key].isPass)
        }
      })
      if(goBut.length == Object.keys(this.reg).length) {
        this.curBut = true
        this.amountVerif()
      }else{
        this.curBut = false
      }
    },
    getCurPay(val) {
      this.$nextTick(() => {
        this.$refs.deposit.clearContent()
      })
      window.utils.of().shiftUp(false)
      this.curInp = ''
      this.curPay = val.category
      this.payTypeId = val.id
      this.payTitle = val.name
      this.showUserName = false
      this.sheetProp = false
      this.clearAmount()
      this.maxAmount = val.maxAmount
      this.minAmount = val.minAmount
      if(this.curPay == 1008) {
        this.showUserName = true
      }
      if(val.fixedQuota == 1 || ((val.fixedQuota == 0) &&　val.fixedAmounts)) {
        this.showQAmount= true
        this.inputHint = '请选择金额'
        if((val.fixedQuota == 0) &&　val.fixedAmounts) {
          this.inputHint = `单笔金额 ${val.minAmount} - ${val.maxAmount} 元`
          // this.sheetProp = true
        }
        let quotaArr = val.fixedAmounts.split(',')
        this.amount = []
        for(let i of quotaArr.keys()) {
          if (!!quotaArr[i]) this.amount[i] = {amount: quotaArr[i], code: i + ''}
        }
      }else{
        this.showQAmount= false
        // this.sheetProp = true
        this.inputHint = `单笔金额 ${val.minAmount} - ${val.maxAmount} 元`
      }
    },
    getCurInp(val) {
      this.$customEvent.trigger('clearOperations', true);
      this.curInp = val.code
      this.rAmount = val.amount
      if(this.showUserName) {
        this.recNameVerif()
      }else if(this.rAmount){
        this.curBut = true
      }
    },
    rechargeList(isRef) { // 充值列表请求
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {
        leftIcon: 'loading',
        content: '请稍后，正在加载中...'
      }
      this.$store.commit("SET_LOADCONTENT", msg)

      if(isRef) {
        this.isReqList = false
        setTimeout(() => {
          this.isReqList = true
        }, 1000)
      }else{
        this.isReqReg = false
      }
      this.$store.dispatch('rechargeList').then((res) => {
        this.$store.commit("SET_ISSHOWLOAD", false)
        this.curBut = true
        this.isReqReg = true
        if(res.success == 1) {
            this.payList = res.content.payTypeList
            if(this.payList.length < 1) {
              return
            }
            let cid = this.payList[0]
            if(this.name == '') {
              this.name = res.content.realname
              if( res.content.payTypeList[0].maxAmount ) this.maxAmount = res.content.payTypeList[0].maxAmount // 最大金额限制
              if( res.content.payTypeList[0].minAmount ) this.minAmount = res.content.payTypeList[0].minAmount // 最小金额限制
            }
            this.getCurPay(cid)
          }
        })
    },
    gotoNextPage() {
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        payTypeId: this.payTypeId,
        amount: this.rAmount
      }
      let name = 'linkUrl'
      if(this.curPay == 1008) { // 银行卡转帐
        let obj =  { depositorName: this.name }
        param =  Object.assign(param, obj)
        name = 'fundBank'
      }else{
        this.$customEvent.trigger('changeDialog', true)
        this.$customEvent.trigger('dialogCon', {
          title: '温馨提示', // 标题
          con: `订单已生成，充值金额： ${this.rAmount} 元`, // 内容
          rightIcon: 'close02', // 关闭图标
          but: '准备充值', // 按钮
          status: false, //
          type: 'goPay',
          butType: 2 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
        })
      }

      this.$store.dispatch('recharge', param, this.payTitle).then((res) => {
        setTimeout(() => {
          this.isReq = true
        }, 500) 
        if(res.success == 1) {
          this.butVerif = false
          let param = {
            id: res.content.id,
            tradeType: res.content.tradeType
          }
          sessionStorage.setItem('vv-funPram', JSON.stringify(param))
          if(this.curPay == 1008) { // 银行卡转帐
            this.$store.commit('SET_ORDERDETIAL', res.content)
            this.$customEvent.trigger('showFundDetails', true)
            return
          }
          
          this.$customEvent.trigger('changeDialog', true)
          this.$customEvent.trigger('dialogCon', {
            title: '温馨提示', // 标题
            con: `订单已生成，充值金额： ${this.rAmount} 元`, // 内容
            rightIcon: 'close02', // 关闭图标
            but: '进入充值', // 按钮
            status: true, //
            type: 'goPay',
            outUrl: res.content.url,
            butType: 2 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
          })
          this.$store.commit('SET_GOTOPAY', false)
        }else{
          this.amountReg = true
          this.butVerif = true
          this.amountRegRem = res.respMsg
          if(res.respCode == '300107') {
            setTimeout(() => {
              this.amountReg = false
              this.butVerif = false
              this.amountRegRem = ''
            }, 3000)
          }
        }
      })
    },
    clearAmount() { // 清空输入框
      // this.akeyToRemove = true
      this.$customEvent.trigger('clearKeyBoard', true)
      // this.curBut = false
      this.curBut = false
      this.amountReg = false
      this.amountRegRem = ''
      // this.recButVerif()
    },
    changeContent(event) {
      this.rAmount = event;
    },
    onPageBeforeIn() {
      window.f.systemEvent.trigger('changeDialog', false) // 隐藏弹窗提示
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
      window.f.store.commit("SET_ISSHOWLOAD", false) // 隐藏弹窗提示
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.recharge{
  .r-t{
    width: 3.51rem;
    padding: 0.1rem 0.12rem 0.25rem;
    background-color: $login-bg;
    border-radius: 0.06rem;
    margin-bottom: 0.13rem;
  }
  .r-title{
    font-size: 0.14rem;
    color: $font-login;
    padding-left: 0.1rem;
  }
  .r-payli{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
      background-color: $but-deep;
      border-radius: 0.06rem;
      width: 0.78rem;
      height: 0.74rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0.02rem 0;
      margin-top: 0.1rem;
      border: 0.01rem solid $but-deep;
      margin-left: 0.1rem;
      &:nth-child(4n+1){
        margin-left: 0rem;
      } 
      div{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        text-align: center;
        color: rgba($login-f-pwd, 0.8);
        height: 0.4rem;
        &:nth-child(2){
          height: 0.26rem;
          line-height: 0.13rem;
        }
        svg{
          width: 0.42rem;
	        height: 0.42rem;
        }
        .bank-icon{
          width: 0.4rem;
          height: 0.4rem;
          background-color: $font-red;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          svg{
            width: 0.25rem;
            height: 0.25rem;
            color: $font-color;
          }
        }
      }
    }
    .cur-pay{
      background-color: $fd-but-lin;
      border: 0.01rem solid $login-lin;
      div{
        color: $font-login;
      }
    }
  }

  .r-title-b{
    font-size: 0.16rem;
    color: rgba($font-login, 0.6);
    padding-top: 0.28rem;
    padding-left: 0.1rem;
  }
  .r-i-wrap{
    width: 3.34rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
    padding: 0 0.08rem;
    line-height: 0.4rem;
    position: relative;
    .r-i-d{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span{
        &:nth-child(1){
          font-size: 0.23rem;
          font-weight: bold;
          width: 10%;
          text-align: left;
        }
        &:nth-child(2){
          width: 100%;
          color: $login-f-pwd;
        }
        &:nth-child(3){
          width: 10%;
          text-align: right;
          svg{
            width: 0.15rem;
            height: 0.15rem;
          }
        }
      }
    }

    .show-key-bord{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 0.44rem;
      width: 90%;
    }
    .r-i-rem{
      position: absolute;
      bottom: 0rem;
      left: 0.2rem;
      font-style: normal;
      color: rgba($font-but-wall, 0);
      transition: all 0.5s;
    }



    &:after{
      content: '';
      height: 0.01rem;
      width: 0;
      transition: all 1s;
      background-color: rgba($font-but-wall, 0.5);
      position: absolute;
      left: 0;
      bottom: -0.01rem;
    }
    &:before{
      content: '';
      height: 0.01rem;
      width: 0;
      transition: all 1s;
      background-color: rgba($font-but-wall, 0.5);
      position: absolute;
      right: 0;
      bottom: -0.01rem;
    }
  }
  .cur-lin{
    &:after{
      width: 50%;
      transition: all 1s;
    }
    &:before{
      width: 50%;
      transition: all 1s;
    }
    .r-i-rem{
      bottom: -0.32rem;
      left: 0.2rem;
      color: $font-but-wall;
      transition: all 0.5s;
    }
  }
  .cur-redlin{
    &:after{
      width: 50%;
      transition: all 1s;
      background-color: rgba($font-red, 0.3);
    }
    &:before{
      width: 50%;
      transition: all 1s;
      background-color: rgba($font-red, 0.3);
    }
    .r-i-rem{
      bottom: -0.32rem;
      left: 0.2rem;
      color: $font-red;
      transition: all 0.5s;
    }
  }
  .pay-amount{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 0.15rem;
    li{
      width: 0.75rem;
      height: 0.44rem;
      background-color: $but-deep;
      border-radius: 0.03rem;
      line-height: 0.44rem;
      text-align: center;
      margin-left: 0.1rem;
      margin-top: 0.13rem;
      font-size: 0.15rem;
      color: rgba($font-login, 0.8)
    }
    .cur-inp{
      background-color: $fd-but-lin;
    }
  }
  .c-w100{
    width: 1.45rem!important;
    color: rgba($font-login, 0.6)!important;
    padding-left: 0.1rem;
  }
  .re-nodata-wrap{
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 3.2rem;
  }
  .re-ref{
    clear: both;
    width: 1.3rem;
    margin: 0.3rem auto 0;
    position: relative;
    .r-load{
      position: absolute;
      right: 0.08rem;
      top: 0.13rem;
    }
  }
  // .r-name{
  //   border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
  //   color: rgba($font-login, 0.6);
  //   font-size: 0.16rem;
  //   line-height: 0.4rem;
  //   padding: 0.2rem 0.08rem 0;
  //   display: flex;
  //   justify-content: flex-start;
  //   span{
  //     color: $font-login;
  //     font-size: 0.16rem;
  //     input{
  //       line-height: 0.4rem;
  //       height: 0.4rem;
  //     }
  //   }
  // }
}
</style>