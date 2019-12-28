<template>
  <f7-page @page:beforeout="onPageBeforeOut">
    <ff-header-goback titProp='绑定银行卡' rUrlProp='/personalInfo'></ff-header-goback>
    <section class="bindbank scroll-con shift-up">
      <article class="bandbank-ward">
        <p class="bb-ft">绑定银行卡</p>
        <p v-show="!hasName" class="bb-ftrem">为了您的资金安全，请绑定您的银行卡{{hasName}}</p>
        <p v-show="hasName" class="bb-has-name">请绑定<span>{{hasName}}</span>的银行卡</p>
        <ul class="fgp-list">
          <li v-show="!hasName" :class="reg.reaName.rem ? 'cur-lin' : ''">
            <p class="fgp-l-tit">真实姓名</p>
            <p class="login-pi">
              <input @input="realNameVerif()" type="text" class="ff-input" name="" v-model="cRealName" placeholder="请输入您的真实姓名" ref='name' @focus="nameFocus" />
              <i>{{reg.reaName.rem}}</i>
            </p>
          </li>
          <li :class="reg.number.rem ? 'cur-lin' : ''">
            <p class="fgp-l-tit">银行卡</p>
            <div class="l-v-warp login-pi" @touchend.prevent="hidKeyBord">
              <ff-input hint='请输入银行卡号' maxLength='19' :shiftUpVal="hasName ? 0.8 : 1.6" :showCursor="sheetProp" :showClose="true" delName="delGakey" getName="getGakey" @closeUpdate="clearAmount" ref="gakey"></ff-input>
              <i>{{reg.number.rem}}</i>
            </div>
          </li>
        </ul>
        <p class="bank-info">
          <span>建议您绑定这些银行：</span>
          <span class="bank-i" @touchend="getFindBankArea"><f7-button fill sheet-open=".stand-bank"><svg-icon icon-class="info" /></f7-button></span>
        </p>
      </article>
      <p class="comm-but login-but but-175" @touchend.prevent="goNext" :class="curBut ? 'cur-but' : ''">下一步</p>
    </section>
    <ff-stand-bank></ff-stand-bank>
    <!-- <ff-loading-dialog v-show="isShow" :dialProp="dialogContent"></ff-loading-dialog> -->
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import StandBank from "@p/comm/StandBank.view"; // 支持银行
import Rule from '@/module/rule/Rule.module'; // 验证
// import LoadingDialog from "@c/loadingDialog/loadingDialog.view"; // 加载弹窗
import { mapState } from 'vuex';
export default {
  name: 'BindBank', // 绑定银行卡
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-stand-bank": StandBank
    // ,
    // "ff-loading-dialog": LoadingDialog
  },
  props: {},
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      realname: state => state.realname,
      dialogContent: state => state.dialogContent, // 加载提示语
    })
  },
  data() {
    return {
      hasName: '', // 真实姓名
      cRealName: '', // 绑定银行卡参数
      bankNumb: '', // 暂存银行卡号
      curBut: false, // 按扭是否可点
      butVerif: true, // 请求验证是否成功
      isReq:  true, // 请求是否完成
      isShow: false, // 加载状态是否显示
      sheetProp: false, // 键盘/光标是否显示
      reg:{ // 验证
        reaName: { // 真实姓名验证
          rem: '',
          isPass: false
        },
        number: { // 银行卡号验证
          rem: '',
          isPass: false
        },
      }
    };
  },
  mounted() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      this.hasName = this.realname
      this.cRealName = this.realname
      if(this.hasName) this.realNameVerif()
      this.$customEvent.on('getGakey', data => {
        this.bankNumb = data.join("")
        this.bankNumVerif()
      })
      this.$customEvent.on('delGakey', data => {
        this.bankNumb = data.join("")
        this.bankNumVerif()
      })
    },
    getFindBankArea() { // 获取银行名称
      this.$store.dispatch("getFindBankArea")
    },
    realNameVerif() { // 真实姓名验证
      let rr = Rule.of().rules.realName,
          rrt = rr.reg.test(this.cRealName);
      if(rrt) {
        this.reg.reaName.isPass = true
        this.reg.reaName.rem = ''
      }else{
        this.reg.reaName.isPass = false
        this.reg.reaName.rem = rr.desc
      }
      this.bankButVerif()
    },
    hidKeyBord() {
      if(this.$refs.name) {
        this.$refs.name.blur()
      }
      this.sheetProp = true
      // this.$customEvent.trigger('setKeyBoard', this.sheetProp)
    },
    nameFocus() {
      this.sheetProp = false
      window.utils.of().shiftUp(false)
    },
    bankNumVerif() { // 银行卡验证
      let rr = Rule.of().rules.bankCard,
          rrt = rr.reg.test(this.bankNumb);
      if(rrt) {
        this.reg.number.isPass = true
        this.reg.number.rem = ''
      }else{
        this.reg.number.isPass = false
        this.reg.number.rem = rr.desc
      }
      this.bankButVerif()
    },
    bankButVerif() { // 按扭验证
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
    goNext() {
      if(!this.curBut || !this.isReq) {
        return
      }
      this.isShow = true;
      this.isReq = false
      let param = {
        name: this.cRealName,
        card: this.bankNumb
      }
      this.$store.dispatch('getReadBank', param).then((res) => {
        this.isReq = true
        if(res.success == 1) {
          this.butVerif = false
          let c = res.content,
              newObj = {},  // 缓存绑定卡名，及卡号
              arr = ['bankName', 'cityName', 'provinceName']
          for(let i in c) {
            if(arr.includes(i)) {
              newObj[i] = res.content[i]
            }
          }
          newObj = Object.assign(param, newObj)
          this.$store.commit('SET_BINDCARDCACHE', newObj) // 缓存绑定卡名，及卡号
          const router = this.$f7router;
          router.navigate({
            name: 'bankBranch',
            path: '/bankBranch'
          });
        }else{
          this.butVerif = true
          if(res.respCode == '300012') {
          this.diacon = {
                          title: '温馨提示',
                          con: '<div style="font-size:0.15rem;">您的银行卡类型暂不支持使用该服务，请更换其它银行卡重试，请点击查看<span style="font-size:0.15rem; color:#17acc7; padding-left:0.05rem">支持的银行。</div>',
                          rightIcon: 'close02'
                        }
                          this.$customEvent.trigger('dialogCon', this.diacon);
                          this.$customEvent.trigger('changeDialog', true);
                        }
        }
        this.isShow = false;
      })
    },
    clearAmount() { // 清空输入框
      this.curBut = false
    },
    onPageBeforeOut() {
      this.$customEvent.trigger('setBankCardSheetProp')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.bindbank{
  .bandbank-ward{
    background-color: $login-bg;
    border-radius: 0.06rem;
    padding: 0.5rem 0.2rem 0.2rem;
    color: $font-login;
    .bb-ft{
      font-size: 0.16rem;
      color: $font-login;
      line-height: 0.24rem;
    }
    .bb-ftrem{
      font-size: 0.11rem;
      color: rgba($icon, 0.6);
      line-height: 0.24rem;
    }
    .bb-has-name{
      font-size: 0.14rem;
      color: $login-f-pwd;
      line-height: 0.3rem;
      span{
        color: $font-login;
        padding: 0 0.03rem;
        font-size: 0.14rem;
      }
    }
    .bb-close{
      width: 0.3rem;
      position: relative;
      z-index: 10;
      text-align: center;
    }
    .bank-info{
      color: $font-wall;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 0.4rem;
      padding-top: 0.2rem;
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
    .login-pi{
      input{
        color: $font-color;
        font-size: 0.16rem;
      }
      .svg-icon{
        color: $info-bg-color;
      }
    }
  }
}
</style>