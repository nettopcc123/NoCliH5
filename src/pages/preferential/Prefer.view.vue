<template>
  <f7-page @page:beforeout="onPageBeforeOut" @page:beforein="onPageBeforeIn">
    <ff-header-goback titProp='优惠活动' :rUrlProp='isIndex ? "/index" :"/member"'></ff-header-goback>
    <section class="prefer scroll-con disabled-scroll" :class="{'lis-nodate': !list.length}">
      <ff-nodate titleProp='暂无优惠活动' v-show="list.length <= 0 && isReqList"></ff-nodate>
      <ul class="per-li" v-show="!!list.length">
        <li v-for="(val, index) in list" :key="index">
          <f7-button fill @click="sheetOpened(val)">
            <img :src="val.imgUrl" alt />
            <span class="p-s" :class="`pbg${val.status}`">{{ val.status | statToCH }}</span>
          </f7-button>
        </li>
      </ul>
      <ff-perfer-details></ff-perfer-details>
    </section>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import PreferDetails from "@p/preferential/PreferDetails.view"; // 优惠详情
import { perferent } from '@m/http/Api.module';
import NoDate from "@p/comm/noDate/NoDate.view"; // 暂无数据
import { mapState } from 'vuex';
export default {
  name: 'BetRecord', // 投注列表
  components: {
    "ff-header-goback": HeaderGoBack,
    "ff-perfer-details": PreferDetails,
    'ff-nodate': NoDate
  },
  computed: {
    ...mapState({
      isIndex: state => state.isIndex
    }),
  },
  data() {
    return {
      isReq: true, // 请求是否完成
      isReqList: true, // 列表请求是否完成
      list:[],
      page: 0,
      size: 300
    };
  },
  mounted() {
    this.bindEvent()
  },
  filters: {
    statToCH: function(v) {
      let s= ''
      switch (v) {
        case 0:
          s = '进行中';
          break;
        case 1:
          s = '未开始';
          break;
        case 2:
          s = '已完成';
          break;
        case 3:
          s = '已结束';
          break;
        default:
          break;
      }
      return s
    }
  },
  methods: {
    bindEvent() {
      this.page = 0
      this.list = []
      this.perferent()
    },
    onEndReached() {
      this.page++
      this.perferent()
    },
    perferent() { // 优惠活动
      this.isReqList = false
      this.$store.commit("SET_ISSHOWLOAD", true)
      let msg = {
        leftIcon: 'loading',
        content: '请稍后，正在加载中...'
      }
      this.$store.commit("SET_LOADCONTENT", msg)
      let param = {
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('perferent', param).then( response => {
        this.$store.commit("SET_ISSHOWLOAD", false)
        this.isReqList = true
        let res = response
        if(res.success == 1) {
          this.list = this.list.concat(res.content.data)
        }else{
          console.log('获取优惠列表失败', res)
        }
      })
    },
    sheetOpened(val) {
      if(!this.isReq) {
        return
      }
      this.isReq = false
      let param = {
        id: val.articleId
      }
      this.$store.dispatch('perferentDetails', param).then((reg) => {
        this.isReq = true
        if(reg.success == 1) {
          this.$customEvent.trigger('setPreferDetial' , reg.content)
        }
      }).then(() => {
        this.$customEvent.trigger('setPreSheetProp', true)
      })
    },
    onPageBeforeOut() {
      this.$customEvent.trigger('setPreSheetProp', false)
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
.page-content{
  overflow: hidden;
}
.prefer{
 background: $main-bg;
 text-align: center;
}
.per-li{
  li{
    padding-top: 0.15rem;
    position: relative;
    padding-left: 0.12rem;
    padding-right: 0.12rem;
  img{
    width: 100%;
    border-radius: 0.06rem;
  }
}
}
.p-s{
  width: 0.5rem;
  height: 0.18rem;
  border-radius: 0rem 0.06rem 0rem 0.06rem;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  color: $font-per;
}
.pbg0{
  background-color: $font-but-wall;
}
.pbg1{
  background-color: $per-state-bg1;
}
.pbg2{
  background-color: $per-state-bg2;
}
.pbg3{
  background-color: $per-state-bg3;
  color: $font-per-s3;
}
</style>
