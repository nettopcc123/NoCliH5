<template>
  <f7-page @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='提款' :rUrlProp='withUrl'></ff-header-goback>
    <section class="withdrawal scroll-con shift-up">
      <article class="wi-t">
        <p class="wi-bw">
          <span></span>
          <button class="wi-but btn" @touchend.prevent="recover()" >一键回收</button>
        </p>
        <div class="wi-tf">
          <div class="wi-fz">
            <p class="wi-ft">总资产(元)</p>
            <p class="wi-fn" :class="maxAmountFont" v-show="walletInfo">{{ walletInfo.totalAmount | formatAmount }}</p>
          </div>
          <div class="wi-fz">
            <p class="wi-ft">中心钱包(元)</p>
            <p class="wi-fn" :class="maxAmountFont" v-show="walletInfo">{{ walletInfo.centerAmount | formatAmount }}</p>
          </div>
        </div>
      </article>
      <article class="wi-b">
        <p class="wib-tit">提款至</p>
        <div class="wib-n">
          <p class="wibn-name">{{ realname }}</p>
          <p class="wibn-card"><span>{{ bankCard }}</span><span>{{ bankName }}</span> </p>
        </div>
        <div class="wib-a">
          <div class="wib-tit">提款金额</div>
          <ul class="fgp-list">
            <li class="wib-i" :class="reg.amount.rem ? butVerif ? 'cur-redlin' : 'cur-lin' : ''">
              <p class="wib-inp login-pi" @touchend.prevent="hidKeyBord()">
                <span class="wibi-l">￥</span>
                <ff-input :hint='inputHint' :showCursor="sheetProp" :shiftUpVal="1.4" :content="amount" :maxLength="11" delName="delDrawMoney" getName="getDrawMoney"></ff-input>
                <i>{{reg.amount.rem}}</i>
              </p>
              <p @touchend.prevent="getAllAmount()"  class="wib-allw" v-show="walletInfo">
                <span class="wibi-r" :class="getAllClass()" v-show="walletInfo">全部提款</span>
              </p>
            </li>
          </ul>
        </div>
      </article>
      <p class="comm-but but-175">
        <f7-button @click="sheetOpened" fill :class="curBut ? 'cur-but' : ''">
          <span>下一步</span>
        </f7-button>
      </p>
    </section>
    <ff-keyboard :sheetProp.sync="showKeyBoard" @getPwd="getPwd" @closePwdKeyBoard="closePwdKeyBoard" :paramProp="paramBank" :pwdProp="withdrawPwd" :remProp="keyBoardRem"></ff-keyboard>
    <!-- <ff-loading-dialog v-show="isShow" :dialProp="dialogContent"></ff-loading-dialog> -->
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import KeyBoard from "@p/comm/keyboard/KeyBoard.view"; // 键盘
import { mapState } from 'vuex';
import Utils from "@m/utils/Utils.module";
import Rule from '@/module/rule/Rule.module'; // 验证
// import LoadingDialog from "@c/loadingDialog/loadingDialog.view"; // 加载弹窗
export default {
  name: 'Withdrawal', // 提款
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-keyboard": KeyBoard
    // ,
    // "ff-loading-dialog": LoadingDialog
  },
  props: {},
  computed: {
    ...mapState({
      walletInfo: state => state.walletInfo,
      realname: state => state.realname, // 真实姓名
      bankName: state => state.bankName, // 银行名称
      bankCard: state => state.bankCard, // 银行卡号
      withdrawMax: state => state.withdrawMax, // 单笔提款最高
      withdrawMin: state => state.withdrawMin, // 单笔提款最低
      dialogContent: state => state.dialogContent, // 加载弹窗内容
    }),
    userInfo: { // 当前父菜单
      get() {
        return this.$store.state.userInfo
      },
      set(item) {
        return item
      }
    },
  },
  data() {
    return {
      showKeyBoard: false,
      // isAnimation: true, // 刷新动画
      withUrl: '/wallet',
      isReq: true,
      sheetProp: false,
      // isShow: false, // 加载弹窗是否显示
      amount: '',
      amountKeyBoard: '',
      butVerif: true, // 请求验证是否成功
      curBut: false, // 按扭是否可点
      maxAmountFont: '',
      paramBank: {},
      withdrawPwd: [],
      keyBoardRem: '',
      inputHint: '', // input提示语
      reg:{ // 验证
        amount: {
          rem: '',
          isPass: false
        }
      }
    };
  },
  filters: {
    formatAmount: function(v) {
      return Utils.of().formatAmount(v)
    }
  },
  mounted() {
    this.bindEvent()
    this.paramBank = {name:this.realname,bank:this.bankName, card:this.bankCard}

    this.$customEvent.on('getDrawMoney', data => {
      this.amountKeyBoard = data.join("")
      this.regAmount(this.amountKeyBoard)
      this.amount = this.amountKeyBoard
    })
    this.$customEvent.on('delDrawMoney', data => {
      this.amountKeyBoard = data.join("")
      this.regAmount(this.amountKeyBoard)
      this.amount = this.amountKeyBoard
    })
  },
  methods: {
    bindEvent() {
      if(!this.realname || !this.bankName || !this.bankCard) {
        this.totalUpdte()
        this.toWithdrawal()
      }
      this.inputHint = `单笔提款金额 ${this.withdrawMin} - ${this.withdrawMax} 元`
      if(this.walletInfo) this.judgeClass()
      this.$customEvent.on('delWithAmount', data => {
        this.amountKeyBoard = data.join('')
        this.regAmount(this.amountKeyBoard)
        this.amount = this.amountKeyBoard
      });
      this.$customEvent.on('getWithAmount', data => {
        this.amountKeyBoard = data.join('')
        this.regAmount(this.amountKeyBoard)
        this.amount = this.amountKeyBoard
      });
    },
    judgeClass() {
      let t1 = 0,
          t2 = 0
          isNaN(this.walletInfo.totalAmount) ? t1 = this.walletInfo.totalAmount.length : t1 = Utils.of().formatAmount(this.walletInfo.totalAmount).length
          isNaN(this.walletInfo.centerAmount) ? t2 = this.walletInfo.centerAmount.length : t2 = Utils.of().formatAmount(this.walletInfo.centerAmount).length
      let arr = [t1, t2]
      let result = arr.find(item => {
        return item > 10
      }) !== undefined
      result ? this.maxAmountFont = 'f22' : this.maxAmountFont = ''
    },
    regAmount(d) { // 输入金额校验
      let cAmount = Utils.of().toNum(this.walletInfo.centerAmount),
          iAmount = Utils.of().toNum(d)
      if(cAmount < iAmount) { // 校验余额是否大于提款金额
        this.reg.amount.rem = `余额不足`
        this.butVerif = false
        this.curBut = false
        return
      }
      if( iAmount < this.withdrawMin ||  iAmount > this.withdrawMax ) { // 校验提款金额
        this.reg.amount.rem = `单笔提款金额 ${this.withdrawMin} - ${this.withdrawMax} 元`
        this.butVerif = false
        this.curBut = false
        return
      }
      let rr = Rule.of().rules.wAmount ,
          rrt = rr.reg.test(d)
          this.butVerif = rrt
          this.curBut = rrt
          rrt ? this.reg.amount.rem = '' : this.reg.amount.rem = rr.desc
          return rrt;
    },
    recWarn() {
      this.diacon = {
                      title: '温馨提示',
                      con: '请联系客服为您回收余额。',
                      but: '我知道了',
                      butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接，4 关闭当前
                    }
      this.$customEvent.trigger('dialogCon', this.diacon);
      this.$customEvent.trigger('changeDialog', true);
    },
    toWithdrawal() {  // 进入提款页面
      this.$store.dispatch('toWithdrawal').then((res) => {
        let realname = res.content.name,
            bankCard = Utils.of().numHid(res.content.card),
            bankName = res.content.bank,
            max = res.content.amountMax,
            min = res.content.amountMin
            this.paramBank = {
              name: realname,
              card: bankCard,
              bank: bankName
            }
            this.$store.commit('SET_REALNAME', realname) // 真实姓名
            this.$store.commit('SET_BANKNAME', bankName) // 银行名称
            this.$store.commit('SET_BANKCARD', bankCard) // 银行卡号
            this.$store.commit('SET_WITHDRAWMAX', max) // 单笔提款最高
            this.$store.commit('SET_WITHDRAWMIN', min) // 单笔提款最低
            this.inputHint = `单笔提款金额 ${this.withdrawMin} - ${this.withdrawMax} 元`
      })
    },
    totalUpdte() { // 更新总资产
      this.$store.dispatch("getAccountRefresh").then(res => {
      })
    },
    recover() { // 一键回收
      if(!this.isReq || this.showKeyBoard) return
      // this.isAnimation = false
      // this.isShow = true
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {}
      this.$store.commit("SET_LOADCONTENT", msg)
      // setTimeout(() => {
      //   this.isAnimation = true
      // }, 800)
      this.isReq = false
      this.$store.dispatch('getRecover').then((res) => {
        this.isReq = true
        if(res.success == 1) {
          if(this.amount) this.regAmount(this.amount)
          this.judgeClass()

          let msg = {
            leftIcon: 'success',
            content: '回收成功'
          }
          this.$store.commit("SET_LOADCONTENT", msg)
          setTimeout(() => {
            this.$store.commit("SET_ISSHOWLOAD", false)
          }, 800)

        }else{
          this.recWarn()
          this.$store.commit("SET_ISSHOWLOAD", false)
        }
        this.totalUpdte()
      })
    },
    hidKeyBord() {
      this.sheetProp = true
    },
    getAllAmount() { // 获取所有金额
    let cAmount = Utils.of().toNum(this.walletInfo.centerAmount)
      if(cAmount <= 0) return
      this.amount = cAmount
      this.regAmount(this.amount)
      this.$customEvent.trigger('clearOperations', true);
    },
    getAllClass() {
      let cAmount = Utils.of().toNum(this.walletInfo.centerAmount)
      return cAmount > 0 ? 'cur-font' : ''
    },
    sheetOpened() {
      if(!this.curBut) return
      if(this.amount >= 30000) {
        this.$customEvent.trigger('dialogCon', {
          title: '温馨提示',
          con: '为了您的资金账户安全，我们会将您的资金分成若干笔转入您的账户中，请您耐心等待，如有问题，可以联系线上客服咨询，感谢您的理解与配合',
          but: '我知道了',
          butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
        });
        this.$customEvent.trigger('changeDialog', true);
        this.$customEvent.on("changeDialogHome", data => { // 监听到提示弹窗关闭
          if(data.state == false && data.isBg != 'bg') {
            let obj = {amount: this.amount}
            this.paramBank = Object.assign(this.paramBank, obj)
            this.showKeyBoard = true; // 显示密码输入数字键盘
            this.sheetProp = false; // 隐藏金额输入数字键盘
          }
        })
      }else {
        let obj = {amount: this.amount}
        this.paramBank = Object.assign(this.paramBank, obj)
        this.showKeyBoard = true; // 显示密码输入数字键盘
        this.sheetProp = false; // 隐藏金额输入数字键盘
      }

    },
    getPwd(v) {
      let pwd = v.join('')
      let param = {
        amount: this.amount,
        drawPasswd: Utils.of().md5(pwd),
      }
      this.$store.dispatch('withdraw', param).then((res) => {
        if(res.success == 1) {
          // this.recover()
          this.$tips.success({text: '提款成功', duration: 1500})
          this.showMore(res.content)
          this.closePwdKeyBoard()
        }else{
          this.keyBoardRem = res.respMsg
          setTimeout(() => {
            this.withdrawPwd = []
          }, 1500)
        }
      })
    },
    showMore(val) {
      let param = {
        id: val.id,
        tradeType: val.tradeType
      }
      sessionStorage.setItem('vv-funPram', JSON.stringify(param))
      const router = this.$f7router;
      router.navigate({
        name: 'fundDetails',
        path: '/fundDetails'
      });

      // this.$store.dispatch('getFundDetail', param).then((res) => {
      //   const router = this.$f7router;
      //   router.navigate({
      //     name: 'fundDetails',
      //     path: '/fundDetails'
      //   });
      // })
    },
    closePwdKeyBoard() {
      this.showKeyBoard = false
      this.sheetProp = false
      this.$customEvent.trigger('setKeyBoard', true)
      this.withdrawPwd = []
      this.keyBoardRem = ''
    },
    onPageBeforeOut() {
      this.showKeyBoard = false
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
.withdrawal{
  .wi-t{
    height: 0.85rem;
    padding: 0.15rem 0.2rem 0.2rem 0.2rem;
    position: relative;
    background-color: $withdraw-tbg;
    .wi-tf{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /*padding-top: 0.15rem;*/
      .wi-fz{
        width: 100%;
        color: $font-login;
        .wi-ft{
          font-size: 0.14rem;
          color: rgba($font-login, 0.6)
        }
        .wi-fn{
          font-size: 0.27rem;
          line-height: 0.46rem;
          color: rgba($font-login, 0.8)
        }
      }
    }
    .wi-bw{
      /*position: absolute;*/
      /*top: 0.1rem;*/
      /*right: 0.2rem;*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      .wi-but{
        width: 0.7rem;
        height: 0.28rem;
        border-radius: 0.14rem;
        border: solid 0.01rem $font-but-wall;
        color: $font-but-wall;
        font-size: 0.12rem;
        background: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        transition: all 0.5s;
      }
      .w09{
        width: 0.9rem;
        transition: all 0.5s;
      }
    }

  }
  .wi-b{
    padding: 0.2rem 0.2rem 0.25rem;
    background-color: $login-bg;
    border-radius: 0.06rem;
    .wib-tit{
      font-size: 0.16rem;
      color: rgba($font-login, 0.6);
      line-height: 0.24rem;
    }
    .wib-n{
      display: flex;
      justify-content: space-between;
      border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
      line-height: 0.38rem;
      margin: 0.08rem 0 0.2rem;
      .wibn-name{
        width: 50%;
        font-size: 0.15rem;
        color: $font-login;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .wibn-card{
        width: 100%;
        text-align: right;
        font-size: 0.15rem;
        color: rgba($font-login, 0.8);
        span{
          font-size: 0.14rem;
          color: rgba($font-login, 0.8);
          &:first-child{
            padding-right: 0.1rem;
          }
        }
      }
    }
    .wib-a{
      // border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
      line-height: 0.38rem;
      margin: 0.08rem 0;
      .wib-i{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .wibi-l{
          width: auto;
          font-size: 0.23rem;
          color: $font-login;
        }
        .wib-allw{
          width: 0.7rem;
          display: flex;
          justify-content: space-between;
          align-items: center; 
        }
        .wib-inp{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .wibi-m{
            width: 200%;
            color: $font-login;
            input{
              font-size: 0.23rem;
            }
            input::-webkit-input-placeholder {
              font-size: 0.15rem;
              line-height: 0.4rem;
            }
            input:-moz-placeholder {
              font-size: 0.15rem;
              line-height: 0.4rem;
            }
            input::-moz-placeholder {
              font-size: 0.15rem;
              line-height: 0.4rem;
            }
            input:-ms-input-placeholder {
              font-size: 0.15rem;
              line-height: 0.4rem;
            }
          }
        }
        .cur-font{
          color: $font-but-wall;
        }
      }
    }
  }
}
.cur-but{
  background-image: linear-gradient(90deg, $but-light-l 0%, $login-lin 100%),linear-gradient($but-deep, $but-deep);
  color: $font-color;
}
</style>
