<template>
  <div id="ff-dialog">
    <section class="ff-dialog">
      <article class="ff-dlg-com" :class="dialProp.time ? 'pb4' : ''">
        <p class="ff-dlg-tit" :class="dialProp.centerIcon ? 'ff-dlg-icon' : ''">
          <span class="ffdlgt-title">{{dialProp.title}}</span> 
          <span class="center-icon" v-show="dialProp.centerIcon">
          </span>
          <span class="ffdlg-close" @touchend="closeDialog" v-show="dialProp.rightIcon">
            <svg-icon :icon-class="dialProp.rightIcon" v-if="dialProp.rightIcon" />
          </span>
        </p>
        <div class="ffdlg-hd-c" v-show="dialProp.type != 'inToGame'">
          <!-- <span class="dlg-rotwrap" v-show="dialProp.loading">
            <svg-icon icon-class='loading' class="dlg-rot"></svg-icon>
          </span> -->
          <div v-html="dialProp.con"></div>
        </div>
        <div class="ffdlg-hd-c" v-show="dialProp.type == 'inToGame'">
          <ul>
            <li v-for="(item, index) in plathList" :key="index">
              <span class="title">{{item.name}}:</span>
              <span class="time" v-show="dialProp.status">{{item.time}}ms</span>
              <span class="loading-box" v-show="!dialProp.status">
                <svg-icon icon-class='loading' class="path-loading" v-if="!dialProp.status"></svg-icon> 
                检测中
              </span>
              <p class="btn" :class="{'btn-active': active == item.id}" @click="btnClick(item.id)">选择</p>
            </li>
            <li class="money">
              <p>
                <span class="title">{{ dialProp.gameType }}：</span>
                <span v-show="dialProp.status">{{dialProp.con}}</span> 
                <span v-show="!dialProp.status"><svg-icon icon-class='loading' class="path-loading" v-if="!dialProp.status"></svg-icon> </span> 
                元
              </p>
            </li>
          </ul>
        </div>
        <div class="ffdlg-hd-t" v-html="dialProp.time"></div>
        <p class="comm-but ffdlg-w12" :class="{'cur-but': dialProp.but}" v-show="dialProp.butType==1 && dialProp.but" >{{dialProp.but}}</p>
        <p class="comm-but ffdlg-w12" :class="{'cur-but': dialProp.status}"  v-show="dialProp.butType==2 && dialProp.but" @touchend="openUrl()">{{dialProp.but}}</p>
        <f7-link :href="dialProp.urlPorp" v-show="dialProp.butType==3 && dialProp.but" class="dialog-href">
          <p class="comm-but ffdlg-w12 dial-bug" :class="{'cur-but': dialProp.status}">{{dialProp.but}}</p>
        </f7-link>

        <div v-show="dialProp.butType==5 && dialProp.but" class="line-dete">
          <f7-link :href="dialProp.urlPorp" class="dialog-href">
            <p class="comm-but ffdlg-w12 dial-bug" :class="{'cur-but': dialProp.status}">转账/充值</p>
          </f7-link>
          <p class="comm-but ffdlg-w12" :class="{'cur-but': dialProp.status}" @touchend="openUrl()">{{dialProp.but}}</p>
        </div>

        <p class="comm-but ffdlg-w12" :class="{'cur-but': dialProp.but}" v-show="dialProp.butType==4 && dialProp.but" @touchend="closeDialog" >{{dialProp.but}}</p>
      </article>
    </section>
    <div class="bg" @touchend="closeDialog('bg')" ></div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Utils from "@m/utils/Utils.module"
// import { runMain } from 'module';
export default {
  name: 'Dialog', // 对话框
  computed: {
    ...mapGetters(['rgUrl', 'token']),
    ...mapState({
      isTrue: state => state.isTrue
    }),
  },
  props: {
    dialProp: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    isTrue: {
      handler(newVal,oldVal) {
        if(newVal) {
          this.time()
        }
      }
    }
  },
  data() {
    return {
      active: null,
      plathList: [
        {name: '大陆线路',time: Utils.of().randomNumber(60,20),id:1},
        {name: '香港线路',time: Utils.of().randomNumber(80,40),id:2},
        {name: '欧美线路',time: Utils.of().randomNumber(99,70),id:3},
      ],
    }
  },
  mounted() {},
  methods: {
    time() {
      // if(!this.dialProp.status) return
      let num = this.plathList.sort(function (a, b) {
        return a.time-b.time;
      });
      if(!this.dialProp.status) return
      this.active = num[0].id;
    },
    closeDialog(v) {
      let obj = {state: false}
      if(v) obj = Object.assign(obj, {isBg: v})
      this.$customEvent.trigger('changeDialogHome', obj);
    },
    goLink() {
      this.$customEvent.trigger('changeDialogHome', {state: false});
      this.$emit('test')
    },
    openUrl() {
      if(!this.dialProp.status) return
      if(this.dialProp.type == 'goPay') {
        window.open(this.dialProp.outUrl, '_blank');
        this.$store.commit('SET_GOTOPAY', true)
        return
      }
      if(!this.dialProp.status) return
      const isEnv = process.env.NODE_ENV;
      let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2flogo.v88.mobi%2fv_h5_2019091.css%22%7d'
      // let enCodeUrl = '%7b%22ocss%22%3a%22https%3a%2f%2fwww.v2.me%2fv_h5_2019091.css%22%7d'
      if(isEnv == 'uat') enCodeUrl = '%7B%22ocss%22%3A%22https%3A%2F%2Fimages.qiankeduo.cc%2Flogo%2Fv_h5_2019091.css%22%7D'
      if(isEnv == 'prod') enCodeUrl = '%7B%22ocss%22%3A%22https%3A%2F%2Fv88images.fpx666.top%2Flogo%2Fv_h5_2019091.css%22%7D'
      let url = this.rgUrl
      // https://h5.egaming1.com/
      // https://h5.raygaming.com/
      if(this.rgUrl.indexOf('raygaming') > -1 || this.rgUrl.indexOf('egaming1') > -1) url = `${this.rgUrl}&init=${enCodeUrl}`
      if(this.dialProp.type == 'inToGame') window.open(url, '_blank')
      this.$customEvent.trigger('changeDialogHome', {state: false});
    },
    btnClick(v) {
      if(!this.dialProp.status) return
      this.active = v
    }
  },
  }
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.dlg-rot{
    font-size: 0.25rem;
    margin-bottom: 0.1rem;
    -webkit-animation:myRotate 0.8s linear infinite;
    animation:myRotate 0.6s linear infinite;
  }
.path-loading{
  font-size: 0.15rem;
  margin-right: 0.05rem;
  -webkit-animation:myRotate 0.6s linear infinite;
  animation:myRotate 0.6s linear infinite;
}
.dlg-rotwrap{
  padding-right: 0.15rem;
}
@-webkit-keyframes myRotate{
  0%{ -webkit-transform: rotate(0deg);}
  100%{ -webkit-transform: rotate(360deg);}
}

.ff-dialog{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20100;
  border-radius: 0.06rem!important;
  .pb4{
    padding-bottom: .3rem!important;
  }
}

.ff-dlg-com{
  position: relative;
  z-index: 20100;
  background-color: $sheep-bg;
  color: $font-login;
  line-height: 0.26rem;
  width: 3.2rem;
  border-radius: 0.06rem;
  padding-bottom: 0.15rem;
}
.ff-dlg-tit{
  font-size: 0.15rem;
  color: $icon;
  text-align: center;
  border-bottom: 0.01rem solid rgba($login-f-pwd, 0.3);
  line-height: 0.37rem;
  position: relative;
  .ffdlgt-title{
    font-size: 0.15rem;
    color: $icon;
  }
  .ffdlg-close{
    position: absolute;
    right: 0.15rem;
    top: 0.03rem;
    color: $icon;
    svg{
      width: 0.14rem;
      height: 0.18rem;
    }
  }
}
.ff-dlg-icon{
  border-bottom: none;
  .ffdlgt-title{
    display: inline-block;
    font-size: 0.15rem;
    padding-top: 0.4rem;
  }
  .center-icon{
    position: absolute;
    top: -0.4rem;
    left: 50%;
    width: 1rem;
    height: 0.8rem;
    background: url('../../assets/images/weihu.png') no-repeat center center / 100% ;
    transform: translateX(-50%);
    .svg-icon{
      font-size: 1rem;
    }
  }
}
.ffdlg-hd-c{
  padding: 0rem 0.15rem 0.2rem;
  color: $not-font;
  overflow: auto;
  margin-top: 0.12rem ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  word-break:break-all;
  width: 2.9rem;
  min-height: 0.5rem;
  div,span{
    min-height: 0.36rem;
    font-size: 0.14rem;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  ul{
    width: 100%;
    li{
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      span{
        font-size: 0.16rem;
      }
      .time{
        color: $wallet-btn-bg;
      }
      .btn{
        border: 0.01rem solid rgba($login-f-pwd, 0.3);
        padding: 0 0.15rem;
        height: 0.26rem;
        line-height: 0.26rem;
        border-radius: 0.08rem;
        margin-top: 0.05rem;
        font-size: 0.14rem;
        color: rgba($login-f-pwd, 0.7);
      }
      .loading-box{
        font-size: 0.13rem;
        color: $wallet-btn-bg;
      }
      .btn-active{
        background-color: $wallet-btn-bg;
        color: $font-color;
        border: 0.01rem solid $wallet-btn-bg;
      }
    }
    .money{
      margin-top: 0.05rem;
      p{
        width: 100%;
        line-height: 0.4rem;
        font-size: 0.14rem;
        display: flex;
        justify-content: center;
        background-color: #1B293A;
        border-radius: 0.08rem;
        span{
          display: inline-block;
          color: $wallet-btn-bg;
          font-size: 0.14rem;
          margin-right: 0.05rem;
        }
        .title{
          font-size: 0.14rem;
          color: $font-login;
          margin-right: 0;
        }
      }
    }
  }
}
.ffdlg-hd-t{
  position: absolute;
  padding-bottom: 0.1rem;
  bottom: 0rem;
  right: 0.2rem;
  color: $login-f-pwd;
  font-size: 0.12rem;
}
.ffdlg-w12{
  width: 1rem;
  line-height: 0.34rem;
  height: 0.34rem;
  font-size: 0.14rem;
  background-image: linear-gradient(90deg,$inp-p 0%, $inp-p 100%), linear-gradient($footer-bg, $footer-bg);
  margin: 0 auto;
}
.dialog-href{
  display: block;
  width: 1rem;
  margin: 0 auto;
}
.line-dete{
  // width: 80%;
  padding: 0 0.5rem;
  display: flex;
  justify-content:space-between;
  align-items: center;
  .ffdlg-w12,.dialog-href{
    margin: 0;
  }
}
</style>