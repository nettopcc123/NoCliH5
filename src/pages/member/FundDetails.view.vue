<template>
  <f7-page @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='资金详情' rUrlProp='/fundrecord'></ff-header-goback>
    <section class="fun-det scroll-con" v-show="isReqFun">
      <p class="f-d-t">{{ orderDetial.tradeType | formatTradeType }}金额</p>
      <p class="f-d-a">￥{{ orderDetial.amount | formatAmount }}</p>
      <div class="f-d-progress" :class="judgeCancel()">
        <p class="f-pt">
          <span class="f-p-cir" :class="judgeCircle(1)"><svg-icon :icon-class="judgeIcon(1)" v-if="isReqFun"/></span>
          <span class="f-p-lin" :class="judgeLin(2)"></span>
          <span class="f-p-cir" :class="judgeCircle(2)"><svg-icon :icon-class="judgeIcon(2)" v-if="isReqFun"/></span>
          <span class="f-p-lin" v-show="!isCancel" :class="judgeLin(3)"></span>
          <span class="f-p-cir" v-show="!isCancel" :class="judgeCircle(3)"><svg-icon :icon-class="judgeIcon(3)" v-if="isReqFun"/></span>
        </p>
        <p class="f-ps">
          <span v-for="(val, index) in orderDetial.statusList" :key="index" :class="judgeCircle(index + 1)">
            {{val.status}} 
          </span>
        </p>
        <p class="f-pb">
          <span v-for="(val, index) in orderDetial.statusList" :key="index">{{ val.time }}</span>
        </p>
      </div>
      <ul class="f-p-list">
        <li><span>支付渠道</span><span>{{ orderDetial.payType | formatPayType }}</span></li>
        <li><span>订单类型</span><span>{{ orderDetial.tradeType | formatTradeType }}</span></li>
        <li><span>订单金额</span><span>{{ orderDetial.amount | formatAmount }}</span></li>
        <li><span>实际到账金额</span><span>{{ orderDetial.actualAmount | formatactualAmount }}</span></li>
        <li><span>备注</span><span>{{ orderDetial.remark | formatStr }}</span></li>
        <li><span>订单创建时间</span><span>{{ orderDetial.createdDate }}</span></li>
        <li><span>订单更新时间</span><span>{{ orderDetial.lastModifiedDate }}</span></li>
        <li><span>订单编号</span><span>{{ orderDetial.id }}</span></li>
        <li><span>转入平台</span><span>{{ orderDetial.toPlat | formatPlant }}</span></li>
        <li><span>转出平台</span><span>{{ orderDetial.fromPlat | formatPlant }}</span></li>
        <li><span>提款银行卡</span><span>{{ formatBankCard(orderDetial.receivedBankCard) }}</span></li>
        <!-- <li><span>手续费</span><span>无</span></li> -->
      </ul>
      <ul class="f-p-bbut" v-show="showFootBut()">
        <li @touchend.prevent="cancelDetail(orderDetial)">取消订单</li>
        <li @touchend.prevent="showMore(orderDetial)">查看转账详情</li>
      </ul>
      <ff-fundBank :sheetProp="showFundBank"></ff-fundBank>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import FundBank from '@p/member/FundBank.view'; // 查看转账详情
import { mapGetters, mapState } from 'vuex';
import Utils from "@m/utils/Utils.module";
export default {
  name: 'FundDetails', // 资金详情
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-fundBank" : FundBank
  },
  computed: {
    ...mapGetters(['orderDetial']),
    ...mapState({
      fundDetailProp: state => state.fundDetailProp,
    })
  },
  data() {
    return {
      stact: '',
      showFundBank: false,
      isCancel: false,
      isFail: false,
      showBank: false, // 是否显示提款银行卡栏
      isReq: true,
      isReqFun: false
    };
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
    formatAmount: function(v) {
      let s = v + '',
          regex = /^[+-]/,
          result = s.match(regex)
      if(result && result[0]) {
        s = result['input'].substr(1)
        s = result[0] + Utils.of().formatAmount(s)
      }else{
        s = Utils.of().formatAmount(s)
      }
      return s
    },
    formatStr: function(v) {
      if(!v) return '无'
      return v
    },
    formatPlant: function(v) {
      let s = ''
      if(!v){
        s = '无'
      }else{
        switch (v) {
          case '0':
            s = '中心钱包'
            break;
          case '1':
            s = 'V电竞'
            break;
          case '2':
            s = 'V体育'
            break;
        }
      }
      return s
    },
    formatTradeType(v) {
      let tradeType = ''
      switch (v) {
        case 1:
          tradeType = '提款'
          break;
        case 2:
          tradeType = '存款'
          break;
        case 3:
          tradeType = '转账'
          break;
        case 4:
          tradeType = '加扣款'
          break;
        case 5:
          tradeType = '活动'
          break;
        default:
          break;
      }
      return tradeType
    },
    formatPayType(v) {
      let payType = ''
      switch (v) {
        case 1001:
          payType = '扫码-支付宝支付'
          break;
        case 1002:
          payType = '扫码-微信支付'
          break;
        case 1003:
          payType = '扫码-云闪付'
          break;
        case 1004:
          payType = 'H5-支付宝支付'
          break;
        case 1005:
          payType = 'H5-微信支付'
          break;
        case 1006:
          payType = '网银支付'
          break;
        case 1007:
          payType = '快捷支付'
          break;
        case 1008:
          payType = '银行卡转账'
          break;
        default:
          payType = '无'
          break;
      }
      return payType
    },
    formatactualAmount(v) {
      let c = v
      !v ?  c = '-' : c = Utils.of().formatAmount(v)
      return c
    }
  },
  methods: {
    bindEvent() {
      this.getDetial()
    },
    formatBankCard(v) {
      if(v && this.orderDetial.tradeType == 1) {
        return Utils.of().numHid(v)
      } else {
        return '无'
      }
    },
    getDetial() {
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {}
      this.$store.commit("SET_LOADCONTENT", msg)
      // let msg = {
      //   leftIcon: 'loading',
      //   content: '请稍后，正在加载中...'
      // }
      // this.$store.commit("SET_LOADCONTENT", msg)
      let param = JSON.parse(sessionStorage.getItem('vv-funPram'))
      this.$store.dispatch('getFundDetail', param).then((res) => {
        this.$store.commit("SET_ISSHOWLOAD", false)
        this.isReqFun = true;
        this.judgeCancel()
        this.judgeFail()
        this.showBankCard()
      })
    },
    showBankCard() {
      if(this.orderDetial.tradeType == 1) {
        this.showBank = true
      }
    },
    judgeCancel() {
      if(!this.orderDetial.statusList) {
        return
      }
      let listLen = this.orderDetial.statusList.length
      this.isCancel = this.orderDetial.statusList[listLen-1].status == '已取消'
      if(this.isCancel) {
        return 'f-ps-cancel'
      }else{
        return ''
      }
    },
    judgeCircle(len) {
      if(!this.orderDetial.statusList) {
        return
      }
      let c = '',
          listLen = this.orderDetial.statusList.length
          if(listLen != len) {
            c = 'dis-font'
          }else{
            c = 'cur-font'
            if(this.isFail) c = 'cur-font-fail'
          }
          return c
    },
    judgeLin(len) {
      if(!this.orderDetial.statusList) {
        return
      }
      let c = '',
          listLen = this.orderDetial.statusList.length
          if(listLen <= len-1) {
            c = 'dis-lin'
          }else{
            c = 'cur-lin'
            if(listLen == len && this.judgeFail()) {
              c = 'cur-fail'
            } 
          }
          return c
    },
    judgeIcon(len) {
      if(!this.orderDetial.statusList) {
        return
      }
      let c = '',
          listLen = this.orderDetial.statusList.length
      if(listLen == len) {
        c = 'circle2'
      }else if(listLen < len) {
        c = 'circle3'
      }else if(listLen >= len) {
        c = 'circle1'
      }
      return c
    },
    judgeFail() {
      if(!this.orderDetial.statusList) {
        return
      }
      let listLen = this.orderDetial.statusList.length
      this.isFail = this.orderDetial.statusList[listLen-1].status == '失败'
      return this.isFail
    },
    showFootBut() {
      if(!this.orderDetial.statusList) {
        return
      }
      let listLen = this.orderDetial.statusList.length,
          isReview = this.orderDetial.statusList[listLen-1].status == '审核中'
      return this.orderDetial.payType == '1008' && isReview
    },
    showMore(v) {
      if(!this.isReq) {
        return
      }
      this.$customEvent.trigger('showFundDetails', true)
    },
    cancelDetail(v) { // 取消订单
      if(!this.isReq) {
        return
      }
      this.isReq = false
      let tradeType = ''
      switch (v.tradeType) {
        case '提款':
          tradeType = 1
          break;
        case '存款':
          tradeType = 2
          break;
        case '转账':
          tradeType = 3
          break;
        case '加扣款':
          tradeType = 4
        case '活动':
          tradeType = 5
          break;
        default:
          break;
      }
      let param = {
        id: v.id,
        tradeType: v.tradeType
      }
      this.$store.dispatch('cancelOrder', param).then((res) => {
        if(res.success == 1) {
          this.$tips.success({text: '取消成功', duration: 1500},() => {
            this.isReq = true
            const router = this.$f7router;
            router.navigate({
              name: 'fundrecord',
              path: '/fundrecord'
            });
          })
        }else{
          this.isReq = true
        }
      })
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
.fun-det{
 background: $login-bg;
 text-align: center;
 padding: 0.25rem;
 .f-d-t{
	font-size: 0.14rem;
  color: $font-login;
 }
 .f-d-a{
	font-size: 0.27rem;
	line-height: 0.24rem;
  color: $font-login;
  line-height: 0.5rem;
  font-weight: bold;
 }
 .f-d-progress{
   height: 0.8rem;
   width: 3.2rem;
   margin: 0 auto;
   .f-pt{
      width: 2.6rem;
      margin: 0 auto;
      display: flex;
      height: 0.3rem;
      justify-content: space-between;
      align-items: center;
      align-content: center;
    span{
      width: 100%;
      font-size: 0;
    }
    .f-p-lin{
      height: 0.01rem;
      background-color: $font-color;
    }
    .f-p-cir{
      width: 10%;
      svg{
        width: 0.16rem;
        height: 0.16rem;
      }
    }
   }
  .dis-font{
     color: $login-f-pwd!important;
   }
   .cur-font{
     color: $font-but-wall!important;
   }
   .cur-font-fail{
     color: $font-red!important;
   }
   .dis-lin{
     background-color: $login-f-pwd!important;
   }
   .cur-lin{
     background-color: $font-but-wall!important;
   }
   .cur-fail{
     background-color: $font-red!important;
   }
  .f-ps{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    span{
      width: 0.8rem;
      color: $login-f-pwd;
      &:nth-child(2) {
        width: 1.6rem;
      }
    }
   }
  .f-pb{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    line-height: 0.14rem;
    padding-top: 0.05rem;
    span{
      width: 0.8rem;
      color: $login-f-pwd;
      line-height: 0.18rem;
      &:nth-child(2) {
        width: 1.6rem;
      }
    }
   }
 }

  .f-p-list{
    padding-top: 0.3rem;
    padding-bottom: 0.8rem;
    li{
      line-height: 0.36rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      span{
        font-size: 0.15rem;
        color: $font-login;
        &:nth-child(1){
          width: 45%;
          text-align: left
        }
        &:nth-child(2){
          width: 100%;
          text-align: right;
        }
      }
    }
  }
.f-ps-cancel{
  .f-ps{
    justify-content: space-between;
    span{
      width: 0.8rem;
      &:nth-child(2) {
        width: 0.8rem;
      }
    }
  }
  .f-pb{
    justify-content: space-between;
    span{
      width: 0.8rem;
      &:nth-child(2) {
        width: 0.8rem;
      }
    }
  }
  .cur-lin{
    background-color: $font-red!important;
  }
  .cur-font{
    color: $font-red!important;
  }
 }
  .f-p-bbut{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    li{
      width: 100%;
      line-height: 0.5rem;
      background-color: $but-deep;
      &:nth-child(1){
        border-right: 0.01rem solid $fd-d-lin;
      }
    }
  }
}
</style>