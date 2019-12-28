<template>
  <f7-page @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='钱包' :rUrlProp='isFrom == "/index" ? "/index" :"/member"'></ff-header-goback>
    <section class="wallet scroll-con">
      <article class="w-c-warp">
        <p class="w-c-t">
          <span>总资产(元)</span>
          <svg-icon icon-class="refresh" @touchend.prevent="totalUpdte('true')" :class="isUpd ? 'rotate' : ''"></svg-icon>
        </p>
        <p class="w-c-z" v-show="walletInfo">{{ walletInfo.totalAmount | formatAmount }}</p>
        <ul class="w-c-list">
          <li>
            <p class="wc-n" v-show="walletInfo">{{ walletInfo.centerAmount | formatAmount }}</p>
            <p class="wc-f">中心钱包</p>
          </li>
          <li @touchend.prevent="akeyRecovery">一键回收</li>
        </ul>
      </article>
      <article class="w-c-b">
        <p class="w-c-ti">我的服务</p>
        <ul class="wc-l">
          <li><f7-link href="/recharge"><svg-icon icon-class="qb01" /><span>存款</span></f7-link></li>
          <li @touchend.prevent="toWithdrawal" ><a><svg-icon icon-class="qb02" /><span>提款</span></a></li>
          <li><f7-link href="/fundrecord"><svg-icon icon-class="qb03" /> <span>资金记录</span></f7-link></li>
        </ul>
        <p class="w-c-ti">资产分布</p>
        <ul class="assets" v-show="walletInfo">
          <li v-for="(val,ind) in walletInfo.platAmount" :key="ind" v-show="val.platId != '7'">
            <span class="name">{{ val.platId | formatPlanName }}</span>
            <span class="strong" v-show="judgeVAmount(val.amount)">{{ val.amount | formatAmount }}</span>
            <span class="a-repear" v-show="!judgeVAmount(val.amount)"><svg-icon icon-class="repear" />系统维护中</span>
            <p @touchend.prevent="platformTransferTo(val.platId)">一键转入</p>
          </li>
        </ul>
      </article>
    </section>
    <!-- <ff-loading-dialog v-show="isShow" :dialProp="dialogContent"></ff-loading-dialog> -->
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
// import LoadingDialog from "@c/loadingDialog/loadingDialog.view"; // 加载弹窗
import { mapState } from 'vuex';
import Utils from "@m/utils/Utils.module"; 
export default {
  name: 'Wallet', // 钱包
  components: {
    "ff-header-goback": HeaderGoBack
    // ,
    // "ff-loading-dialog": LoadingDialog
  },
  props: {},
  computed: {
    ...mapState({
      walletInfo: state => state.walletInfo
      // dialogContent: state => state.dialogContent, // 加载弹窗内容
    })
  },
  data() {
    return {
      // isShow: false, // 加载弹窗是否显示
      isUpd: false, // 
      isFrom: ''
    };
  },
  mounted() {
    
  },
  filters: {
    formatAmount: function(v) {
      return Utils.of().formatAmount(v)
    },
    formatPlanName: function(v) {
      let s = ''
      switch (v) {
        case '1':
          s = 'V电竞账户'
          break;
        case '2':
          s = 'V体育账户'
          break;
        case '7':
          s = 'V彩票'
          break;
        default:
          break;
      }
      return s
    }
  },
  methods: {
    bindEvent() {
      this.totalUpdte()
      // if(this.walletInfo.totalAmount == '' && this.walletInfo.centerAmount == '' && this.walletInfo.platAmount == '') {
      //   this.totalUpdte()
      // }
    },
    judgeVAmount(v) {
      let s = false
      if(Utils.of().toNum(v) >= 0) s = true
      return s
    },
    toWithdrawal() {  // 进入提款页面
      // this.isShow = true
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {
        leftIcon: 'loading',
        content: '请稍后，正在加载中...'
      }
      this.$store.commit("SET_LOADCONTENT", msg)
      this.$store.dispatch('toWithdrawal').then((res) => {
        // this.isShow = false
        this.$store.commit("SET_ISSHOWLOAD", false)
        if(res.success == 1) {
          let realname = res.content.name,
              bankName = Utils.of().numHid(res.content.card),
              bankCard = res.content.bank,
              max = res.content.amountMax,
              min = res.content.amountMin
          this.$store.commit('SET_REALNAME', realname) // 真实姓名
          this.$store.commit('SET_BANKNAME', bankName) // 银行名称
          this.$store.commit('SET_BANKCARD', bankCard) // 银行卡号
          this.$store.commit('SET_WITHDRAWMAX', max) // 单笔提款最高
          this.$store.commit('SET_WITHDRAWMIN', min) // 单笔提款最低
          const router = this.$f7router;
          router.navigate({
            name: 'withdrawal',
            path: '/withdrawal'
          });
        }else{
          let arr = ['300118', '300110', '300119']
          if(arr.includes(res.respCode)) {
            this.diacon = {
                            title: '温馨提示',
                            con: `${res.respMsg}`,
                            but: '我知道了',
                            urlPorp: '/personalInfo',
                            status: true,
                            butType: 3 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                          }
            this.$customEvent.trigger('dialogCon', this.diacon);
            this.$customEvent.trigger('changeDialog', true);
          }
        }
      })
    },
    totalUpdte(v) { // 更新总资产
      if(this.isUpd) return
      this.isUpd = true;
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {
        leftIcon: 'loading',
        content: '请稍后，资金正在刷新中...'
      }
      this.$store.commit("SET_LOADCONTENT", msg)
      this.$store.dispatch("getAccountRefresh").then(res => {
        this.isUpd = false;
        if(res && res.success == 1 && v) {
          let msg = {
            leftIcon: 'success',
            content: '刷新成功'
          }
          this.$store.commit("SET_LOADCONTENT", msg)
          setTimeout(() => {
            this.$store.commit("SET_ISSHOWLOAD", false)
          }, 800)
        }else{
          this.$store.commit("SET_ISSHOWLOAD", false)
        }
      })
    },
    akeyRecovery() { // 一键回收
      if (this.isUpd) return;
      this.$store.commit("SET_ISSHOWLOAD", true)
      this.$store.dispatch("getRecover").then(res => {
        if (res && res.success == 1) {
          this.totalUpdte();
          let msg = {
            leftIcon: 'success',
            content: '回收成功'
          }
          this.$store.commit("SET_LOADCONTENT", msg)
          setTimeout(() => {
            this.$store.commit("SET_ISSHOWLOAD", false)
          }, 800)
        }else{
          this.$store.commit("SET_ISSHOWLOAD", false)
        }
      })
    },
    recWarn(v) {
      this.diacon = {
                      title: '温馨提示',
                      con: `请联系客服为您${v}。`,
                      but: '我知道了',
                      butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                    }
      this.$customEvent.trigger('dialogCon', this.diacon);
      this.$customEvent.trigger('changeDialog', true);
    },
    platformTransferTo(val) {
      if (this.isUpd) return;
      this.$store.commit("SET_ISSHOWLOAD", true)
      this.$store.dispatch("platformTransferTo",{toPlatId: val}).then(res => {
        if(res.success == 1) {
          let msg = {
            leftIcon: 'success',
            content: '转账成功'
          }
          this.$store.commit("SET_LOADCONTENT", msg)
          setTimeout(() => {
            this.$store.commit("SET_ISSHOWLOAD", false)
          }, 800)
          this.totalUpdte()
        }else{
          this.$customEvent.trigger('dialogCon', {
            title: '充值金额', // 标题
            con: '确认充值： 50元', // 内容
            rightIcon: 'close02', // 关闭图标
            but: '准备充值', // 按钮
            status: false, //
            type: 'goPay',
            butType: 2 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
          })
          this.$customEvent.trigger('dialogCon', {
            title: '温馨提示',
            con: res.respMsg,
            but: '我知道了',
            butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
          });
          this.$customEvent.trigger('changeDialog', true);
          this.$store.commit("SET_ISSHOWLOAD", false);
        }
      })
    },
    onPageBeforeOut() {
      this.$customEvent.trigger('changeDialog', false);
      this.$store.commit("SET_ISSHOWLOAD", false);
      this.$store.commit('SET_ISPOPNOTICE', false)
    },
    onPageBeforeIn() {
      this.bindEvent()
      const router = this.$f7router;
      let len = router.history.length-2
      this.isFrom = router.history[len]
      this.$store.commit("SET_ISSHOWLOAD", false)
      
      window.f.systemEvent.trigger('changeDialog', false) // 隐藏弹窗提示
      window.f.store.commit('SET_ISPOPNOTICE', false) // 隐藏弹窗提示
      window.f.store.commit("SET_ISSHOWLOAD", false) // 隐藏弹窗提示
    }
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.wallet{
  background: $main-bg;
}
.w-c-warp{
  height: 1.35rem;
  padding: 0.2rem;
  background-color: $wallet-bg;
  border-radius: 0.06rem;
}
.w-c-t{
  display: flex;
  justify-content: space-between;
  font-size: 0.15rem;
  line-height: 0.2rem;
  color: rgba($font-login, 0.6);
  .svg-icon{
    font-size: 0.2rem;
    color: $login-f-pwd;
  }
  .rotate{
    -webkit-animation:myRotate 0.5s linear infinite;
    animation:myRotate 0.5s linear infinite;
  }
  @-webkit-keyframes myRotate{
      0%{ -webkit-transform: rotate(0deg);}
      100%{ -webkit-transform: rotate(180deg);}
  }
}
.w-c-z{
  font-size: 0.28rem;
  color: $font-but-wall;
  line-height: 0.4rem;
}
.w-c-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.6rem;
  margin-top: 0.2rem;
  li{
    &:nth-last-child(1) {
      width: 0.9rem;
      line-height: 0.3rem;
      text-align: center;
      border: 0.01rem solid $font-wall;
      border-radius: 0.07rem;
      font-size: 0.14rem;
      color: $font-wall;
    }
    p{
      text-align: left;
    }
  }
}
.wc-n{
  font-size: 0.23rem;
  color: $font-login;
}
.wc-f{
  font-size: 0.14rem;
  color: rgba($font-login, 0.6);
}
.wc-but{
  width: 0.71rem;
  height: 0.3rem;
  border-radius: 0.15rem;
  border: solid 0.01rem $font-but-wall;
  color: $font-but-wall;
  font-size: 0.12rem;
  background: none;
}
.w-c-b{
  margin-top: 0.14rem;
  padding: 0 0.12rem;
}
.w-c-ti{
  line-height: 0.4rem;
  font-size: 0.15rem;
  padding: 0 0.1rem;
  color:rgba($font-login, 0.6);
}
.wc-l{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 0.06rem;
  background-color: $wallet-bg;
  padding: 0.05rem 0;
  margin-bottom: 0.14rem;
  li{
    min-width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $font-wall;
    padding: 0.07rem 0;
    height: 0.55rem;
    font-size: 0.16rem;
    border-right: 0.01rem solid $cut-off-rule;
    &:nth-child(3n) {
      border-right: none;
    }
    &:not(:nth-child(-n+3)){
      border-bottom: none;
    }
    a{
      display: inline-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    span{
      font-size: 0.14rem;
      color: rgba($font-login, 0.6);
    }
    &:nth-child(2n){
      margin-right: 0rem;
    }
    svg{
      width: 0.22rem;
      height: 0.22rem;
      margin-bottom: 0.05rem;
    }
  }
}
.assets{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    width: 1.5rem;
    height: 1.4rem;
    border-radius: 0.06rem;
    background-color: $wallet-bg;
    padding: 0 0.1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    line-height: 0.4rem;
    .name{
      color: $font-color;
      font-size: 0.14rem;
      margin-top: 0.2rem;
      opacity: 0.8;
    }
    .strong{
      font-size: 0.18rem;
      color: $font-color;
    }
    .a-repear{
      color: $font-color;
      font-size: 0.14rem;
      svg{
        padding-right: 0.05rem;
        width: 0.16rem;
        height: 0.14rem;
      }
    }
    p{
      width: 0.9rem;
      background-color: $wallet-btn-bg;
      border-radius: 0.06rem;
      color: $font-color;
      text-align: center;
      position: absolute;
      bottom: -0.2rem;
      left: calc((1.7rem - 0.9rem)/2);
    }
  }
}
</style>