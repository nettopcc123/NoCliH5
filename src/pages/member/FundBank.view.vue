<template>
  <f7-sheet class="fund-bank-wrap" backdrop :opened="sheetOpened" @sheet:closed="sheetOpened = false">
    <ff-header-goback titProp='银行卡转账' :showLeftProp="false" riconProp="close02" @hRightAction="hRightAction" rActionName="showFundDetails" :rAction="false"></ff-header-goback>
    <section class="fun-bank scroll-con">
      <article class="fun-bcon">
        您好，非常感谢您的支持。请您务必在收到此信息后2小时内通过网上转账或柜台转账的方式存入以下银行账户内。
      </article>
      <article class="fun-bcon">
        <b>
        【请您在存款时务必使用以下<span class="num-font">充值金额加独特尾数，</span>不然会导致您的存款不能及时到账】
        </b>
      </article>
      <article class="fun-c">
        <div class="fun-ct">
          <p>您充值金额加独特尾数：</p>
          <p class="num-font f22">
            <span>￥{{orderDetial.amount | formatAmount}}</span>
            <span class="f-c0" :data-clipboard-text="orderDetial.amount" @click="copySub('f-c0')">复制</span>
          </p>
        </div>
        <ul class="fun-cl">
          <li>
            <span>账户名称：</span>
            <span>{{orderDetial.receivedName}}</span>
            <span class="f-c1" :data-clipboard-text="orderDetial.receivedName" @click="copySub('f-c1')">复制</span>
          </li>
          <li>
            <span>账户号码：</span>
            <span>{{orderDetial.receivedBankCard}}</span>
            <span class="f-c2" :data-clipboard-text="orderDetial.receivedBankCard" @click="copySub('f-c2')">复制</span>
          </li>
          <li>
            <span>银行名称：</span>
            <span>{{orderDetial.receivedBankName}}</span>
            <span class="f-c3" :data-clipboard-text="orderDetial.receivedBankName" @click="copySub('f-c3')">复制</span>
          </li>
          <li>
            <span>银行分行：</span>
            <span>{{orderDetial.subBankName}}</span>
            <span class="f-c4" :data-clipboard-text="orderDetial.subBankName" @click="copySub('f-c4')">复制</span>
          </li>
          <li>
            <span>您充值金额加独特尾数：</span>
            <span class="num-font f18">￥{{orderDetial.amount | formatAmount}}</span>
            <span class="f-c5" :data-clipboard-text="orderDetial.amount" @click="copySub('f-c5')">复制</span>
          </li>
          <li>
            <span>转账备注码：</span>
            <span class="num-font f18">{{orderDetial.thirdRemark}}</span>
            <span class="f-c6" :data-clipboard-text="orderDetial.thirdRemark" @click="copySub('f-c6')">复制</span>
          </li>
        </ul>
      </article>
      <article class="fun-bcon">
        当您完成该笔存款后，如果需要再进行存款，请点击存款按钮，重新进行存款。<br><br>
        此致！<br><br>
        V竞技团队<br>
        V竞技一直致力于为客户提供最周到的服务。
      </article>
    </section>
  </f7-sheet>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import clipboard from "clipboard"
import { mapState, mapGetters } from 'vuex';
import Utils from "@m/utils/Utils.module";
export default {
  name: 'FundBank', // 银行卡转账
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  props: {
    sheetProp:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['orderDetial']),
    ...mapState({
      rechargeContent: state => state.rechargeContent
    })
  },
  data() {
    return {
      sheetOpened: this.sheetProp,
      ind: 0
    };
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
    formatAmount: function(v) {
      if(!v) return
      return Utils.of().formatAmount(v)
    },
  },
  methods: {
    bindEvent() {
      this.$customEvent.on("showFundDetails",data => {
        this.ind = 0
        if(data && this.ind>0) return
        this.sheetOpened = data
        this.ind++
      })
    },
    close() {
      this.$customEvent.trigger('showFundDetails', false)
      this.ind = 0
    },
    hRightAction() {
      this.$customEvent.trigger('hRightAction' , 'wallet')
    },
    copySub(c) {
      const btnCopy = new clipboard(`.${c}`);
      btnCopy.on('success', e => {
        this.$tips.success(` ${e.text}  复制成功`)
        e.clearSelection();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.fund-bank-wrap{
  width: 100%;
  height: 100%;
}
.fun-bank{
  background: $login-bg;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.fun-bcon{
  font-size: 0.15rem;
  color: rgba($font-login, 0.8);
  line-height: 0.2rem;
  margin-bottom: 0.15rem;
  padding-top: 0.2rem;
  b{
    font-size: 0.15rem;
    span{
      font-size: 0.15rem;
    }
  }
  &:last-child{
    padding-bottom: 0.4rem;
  }
}
.fun-c{
  background: $but-deep;
  border-radius: 0.06rem;
  padding: 0.15rem;
  margin: 0.05rem 0 0.2rem;
  .fun-ct{
    border-bottom: 0.01rem solid rgba($ver-lin, 0.7);
    p{
      &:nth-child(2){
        line-height: 0.4rem;
      }
    }
  }
}
.fun-cl{
  li{
    line-height: 0.32rem;
    display: flex;
    justify-content: space-between;
    text-align: left;
    align-items: center;
    span{
      &:nth-child(2){
        flex-grow: 1
      }
      &:last-child{
        width: 0.36rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        background-color: #3e4966;
        border-radius: 0.03rem;
        font-size: 0.12rem;
        color: #e5ebff;
      }
    }
  }
}
.f18{
  font-size: 0.18rem;
}
.f22{
  font-size: 0.22rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: center;
}
.num-font{
  color: $font-but-wall;
  font-weight: bold;
  span{
    font-size: 0.22rem;
    &:last-child{
      width: 0.36rem;
      height: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
      background-color: #3e4966;
      border-radius: 0.03rem;
      color: #e5ebff;
      font-size: 0.12rem;
    }
  }
}
</style>