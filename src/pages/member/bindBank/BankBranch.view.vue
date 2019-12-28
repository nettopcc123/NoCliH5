<template>
  <f7-page @page:beforeout="onPageBeforeOut">
    <ff-header-goback titProp='绑定银行卡' rUrlProp='/bindBank'></ff-header-goback>
    <section class="bbr scroll-con">
      <article class="bbr-ward">
        <div v-show="realname">
          <p class="bbr-ft">绑定银行卡</p>
          <p class="bbr-has-name">请绑定<span>{{ bindCardCache.name }}</span>的银行卡</p>
          <ul class="bbr-list">
            <li>
              <p class="bbr-iw">
                <span><input disabled type="text" class="ff-input" name="" v-model="card" maxlength="19" placeholder="请输入银行卡号"></span>
              </p>
            </li>
          </ul>
        </div>
        <ul class="login-list" v-show="!realname">
          <li>
            <div class="ll-wrap">
              <span class="log-ls pr20">真实姓名</span>
              <div class="login-pi">
                {{ bindCardCache.name }}
              </div>
            </div>
          </li>
          <li>
            <div class="ll-wrap">
              <span class="log-ls pr20">银行卡</span>
              <div class="login-pi">
                {{ card }}
              </div>
            </div>
          </li>
        </ul>
        <p class="bbr-info" v-show="!(!!bindCardCache.bankId)">
          <span>建议您绑定这些银行：</span>
          <span class="bank-i"><f7-button fill sheet-open=".stand-bank"><svg-icon icon-class="info" /></f7-button></span>
        </p>
        <p class="bbr-ft">相关信息</p>
        <ul class="bbr-b-list">
          <li>
            <p class="bbrb-t">开户行</p>
            <p>
              <f7-button fill @click="sheetOpened" class="bbrb-r">
                <span :class="bank != '请选择银行名称' ? 's_cur' : ''">{{ bank }}</span>
                <span class="bbl-ico"><svg-icon icon-class="more" /></span>
              </f7-button>
            </p>
          </li>
          <li>
            <p class="bbrb-t">开户所在区</p>
            <p class="bbrb-r" @touchend.prevent="showPicker(0)" ref="select0">
              <span class="bb-sads">
                <span :class="province != '开户省' ? 's_cur' : ''" class="bbs-l">{{ province }}</span> <span class="bbl-ico-drop"><svg-icon icon-class="drop"/></span>
              </span>
              <span class="bb-sads">
                <span class="bbs-l" :class="city != '开户市' ? 's_cur' : ''">{{ city }}</span><span class="bbl-ico-drop"><svg-icon icon-class="drop"/></span>
              </span>
            </p>
          </li>
          <li>
            <p class="bbrb-t">开户支行</p>
            <p class="bbrb-r">
              <span><input @input="branchVerif(branch)" type="text" class="ff-input" name="" v-model="branch" placeholder="请输入开户支行信息"></span>
            </p>
          </li>
        </ul>
        <div class="bbf-rem">
          <svg-icon icon-class="info2" class="bbl-ico" />
          银行卡号需与银行名称匹配，如不匹配将无法到账
        </div>
      </article>
      <p class="comm-but but-175" @touchend.prevent="goNext" :class="curBut ? 'cur-but' : ''">提交</p>
    </section>

    <ff-select-bank :sheetProp="showSelectBank" :bankListProps="bankList" v-show="bankList" @setCurBank="setCurBank"></ff-select-bank>
    
    <van-popup v-model="showArea" position="bottom" class="area-select">
      <van-area :area-list="cityList" :columns-num="2" :value="areaValue" @confirm="confirm" @cancel="showArea = false" title="选择地址"/>
    </van-popup>
  </f7-page>
</template>
<script>
import { Area, Popup } from 'vant';
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import StandBank from "@p/comm/StandBank.view"; // 支持银行
import SelectBank from "@p/comm/SelectBank.view"; // 选择银行
import Utils from "@m/utils/Utils.module"; 
import { mapState } from 'vuex';
export default {
  name: 'BindBank', // 绑定银行卡
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-select-bank": SelectBank,
    [Area.name]: Area,
    [Popup.name]: Popup
  },
  props: {},
  computed: {
    ...mapState({
      bindCardCache: state => state.bindCardCache,
      userInfo: state => state.userInfo,
      bankList: state => state.bankList,
      cityList: state => state.cityList,
      realname: state => state.realname, // 真实姓名
    }),
  },
  data() {
    return {
      showArea: false,
      areaValue: '110100',
      beforeCode: '',
      showSelectBank: false,
      hasName: false,
      card: '', // 卡号
      bank: '请选择银行名称', // 开户行
      province: '开户省', // 开户省
      city: '开户市', // 开户市
      branch: '', // 开户支行
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      isReq:  true, // 请求是否完成
      reg:{ // 验证
        bank: { // 开户行
          rem: '',
          isPass: false
        },
        province: { // 开户省
          rem: '',
          isPass: false
        },
        city: { // 开户市
          rem: '',
          isPass: false
        },
        branch: { // 开户支行
          rem: '',
          isPass: false
        },
      }
    };
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {
    
  },
  methods: {
    bindEvent() {
      this.card = this.bindCardCache.card
      this.getFindBankArea()
      this.getDefault()
    },
    bankVerif() { // 开户行验证
      if(this.bank != '请选择银行名称') {
        this.reg.bank.isPass = true
        this.reg.bank.rem = ''
      }else{
        this.reg.bank.isPass = false
        this.reg.bank.rem = '请设置开户行'
      }
      this.nextButVerif()
    },
    provinceVerif() { // 开户省验证
      if(this.province != '开户省') {
        this.reg.province.isPass = true
        this.reg.province.rem = ''
      }else{
        this.reg.province.isPass = false
        this.reg.province.rem = '请设置开户省'
      }
      this.nextButVerif()
    },
    cityVerif() { // 开户市验证
      if(this.city != '开户市') {
        this.reg.city.isPass = true
        this.reg.city.rem = ''
      }else{
        this.reg.city.isPass = false
        this.reg.city.rem = '请设置开户市'
      }
      this.nextButVerif()
    },
    branchVerif() { // 开户支行验证
      if(this.branch != '') {
        this.reg.branch.isPass = true
        this.reg.branch.rem = ''
      }else{
        this.reg.branch.isPass = false
        this.reg.branch.rem = '请设置开户支行'
      }
      this.nextButVerif()
    },
    nextButVerif() { // 按扭验证
      let goBut = [];
      Object.keys(this.reg).forEach((key, val) => {
        if(this.reg[key].isPass) {
          goBut.push(this.reg[key].isPass)
        }
      })
      if(goBut.length == Object.keys(this.reg).length) {
        this.curBut = true
        this.butVerif = true
      }else{
        this.butVerif = false
        this.curBut = false
      }
    },
    sheetOpened() {
      this.showSelectBank = true;
      this.bankVerif()
      return true
    },
    getDefault() {
      if(this.bindCardCache.hasOwnProperty('cityName')) this.city = this.bindCardCache.cityName
      if(this.bindCardCache.hasOwnProperty('provinceName')) this.province = this.bindCardCache.provinceName
      if(this.bindCardCache.hasOwnProperty('bankName')) this.bank = this.bindCardCache.bankName
      this.bankVerif()
      this.provinceVerif()
      this.cityVerif()
    },
    showPicker(index) {
      this.showArea = true
    },
    handleSelect(val, ind, text) {
      this.province =  text[0]
      this.city =  text[1]
      this.provinceVerif()
      this.cityVerif()
    },
    getFindBankArea() { // 识别银行卡配置信息
      this.$store.dispatch('getFindBankArea')
    },
    setCurBank(v) { // 设置当前选中银行
      this.showSelectBank = false
      this.bankVerif()
      if(v && v.name) this.bank = v.name
    },
    goNext() {
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isReq = false
      let param = {
            bank: this.bank,
            card: this.bindCardCache.card,
            name: this.bindCardCache.name,
            bankBranch: this.branch,
            province: this.province,
            city: this.city
          }

      let dispatchAction = 'addBankCard',
          disTips = '银行卡绑定成功'
      if(this.realname) {
        dispatchAction = 'modifyBankCard'
        disTips = '银行卡修改成功'
      }
      this.$store.dispatch(dispatchAction, param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.$tips.success({text: disTips, duration: 1500})
          const router = this.$f7router;
          router.navigate({
            name: 'personalInfo',
            path: '/personalInfo'
          });
        }
      })
    },
    confirm(e) { // 确定选择地区
      this.showArea = false
      this.province = e[0].name
      this.city = e[1].name
      this.areaValue = e[1].code
      this.provinceVerif()
      this.cityVerif()
    },
    onPageBeforeOut() {
      this.$customEvent.trigger('setBankCardSheetProp')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.bbr{
  .bbr-ward{
    background-color: $login-bg;
    border-radius: 0.06rem;
    padding: 0.15rem 0.2rem 0.2rem;
    color: $font-login;
    .bbr-ft{
      font-size: 0.16rem;
      color: $font-login;
      line-height: 0.24rem;
    }
    .bbr-has-name{
      font-size: 0.14rem;
      color: $login-f-pwd;
      line-height: 0.3rem;
      span{
        color: $font-login;
        padding: 0 0.03rem;
        font-size: 0.14rem;
      }
    }
    .bbr-list{
      margin-top: 0.2rem;
      li{
        border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
        padding-bottom: 0.05rem;
        .bbr-iw{
          display: flex;
          justify-content: space-between;
          span{
            flex: 1; 
          }
          .bb-close{
            width: 15%;
          }
          i{
            width: 0.4rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            svg{
              width: 0.18rem;
              height: 0.18rem;
              color: rgba($login-f-pwd, 0.9);
            }
          }
          input{
            line-height: 0.4rem;
            font-size: 0.16rem;
          }
        }
      }
    }
    .bbr-info{
      color: $font-wall;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 0.6rem;
      span{
        font-size: 0.13rem;
      }
      .bank-i{
        a{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          svg{
            width: 0.13rem;
            height: 0.13rem;
          }
        }
      }
    }

    .bbr-b-list{
      margin-top: 0.2rem;
      li{
        border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
        padding: 0.08rem 0 0.03rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bbrb-t{
          width: 30%;
          font-size: 0.15rem;
          color: $font-login;
          line-height: 0.4rem;
        }
        .bbrb-r{
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          input::-webkit-input-placeholder {
            color: rgba($login-f-pwd, 0.6);
          }
          input:-moz-placeholder {
            color: rgba($login-f-pwd, 0.6);
          }
          input::-moz-placeholder { 
            color: rgba($login-f-pwd, 0.6);
          }
          input:-ms-input-placeholder {
            color: rgba($login-f-pwd, 0.6);
          }
          span{
            font-size: 0.15rem;
            color: rgba($login-f-pwd, 0.6);
            &:nth-child(1){
              margin-right: 0.1rem;
            }
          }
          input{
            text-align: right;
            font-size: 0.15rem;
            color: $font-login;
          }
          .bb-sads{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .bbs-l{
              white-space:nowrap;
              overflow:hidden;
              text-align: right;
              text-overflow:ellipsis;
              width: 0.92rem;
            }
            span{
              margin-right: 0rem;
            }
            .bbl-ico-drop{
              svg{
                width: 0.24rem;
                height: 0.24rem;
              }
            }
          }
          .bbl-ico{
            margin-left: 0.05rem;
            display: flex;
            align-items: center;
            svg{
              width: 0.18rem;
              height: 0.18rem;
            }
          }
        }
        .s_cur{
          color: $font-login!important;
        }
      }
    }
    .bbf-rem{
      display: flex;
      justify-content: flex-start;
      color:$info-color;
      align-items: center;
      padding-top: 0.15rem;
      svg{
        margin-right: 0.08rem;
        width: 0.13rem;
        height: 0.13rem;
      }
    }
  }
}
.area-select{

  .van-picker {
      position: relative;
      -webkit-user-select: none;
      user-select: none;
      -webkit-text-size-adjust: 100%;
      background-color: $but-deep;
  }
  ::v-deep .van-hairline--top-bottom.van-picker__toolbar:after {
      border: none;
  }
  ::v-deep .van-hairline-unset--top-bottom.van-picker__frame:after {
      border: none;
  }
  ::v-deep .van-hairline--top-bottom.van-picker__toolbar {
        border-bottom: 0.01rem solid rgba(50,56,76,0.7);
  }
  ::v-deep .van-picker-column__item {
    padding: 0 5px;
    color: #000;
    color: $font-login;
    font-size: 0.16rem;
  }
  ::v-deep .van-ellipsis.van-picker__title {
    color: rgba($font-login,0.8);
  }
  ::v-deep .van-picker__cancel {
      color: $login-f-pwd;
      font-size: 0.15rem;
      width: 1rem;
  }
  ::v-deep .van-picker__confirm {
      color: $but-confirm;
      font-size: 0.15rem;
      width: 1rem;
  }
  ::v-deep .van-picker-column__item {
      color: $font-login;
      font-size: 0.16rem;
  }
  ::v-deep .van-picker__mask {
      background-image: linear-gradient(180deg,rgba(30,37,56,0.8),rgba(30,37,56,0.4)),linear-gradient(0deg,rgba(30,37,56,0.8),rgba(30,37,56,0.4));
  }

}
</style>