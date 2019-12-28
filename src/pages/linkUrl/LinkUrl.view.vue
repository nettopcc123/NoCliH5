<template>
    <f7-page class="link-warp">
      <ff-header-goback titProp="存款"  rUrlProp='/fundDetails'></ff-header-goback>
      <iframe 
        :src="rechargeContent.url"
        name="rechargeContent" 
        scolling="no"
        class="linkif-h"
        ref="rechargeContent"
      >
      </iframe>
    </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import { mapState } from 'vuex';
export default {
  components: {
    "ff-header-goback": HeaderGoBack,
  },
  computed: {
    ...mapState({
      rechargeContent: state => state.rechargeContent
    })
  },
  data() {
    return {
    }
  },
  mounted() {
    // this.bindEvent()
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.linkif-h{
  height: calc(100% - 0.44rem);
  padding: 0px; 
  overflow: hidden; 
  border: none; 
  width: 100vw;
  .back-icon{
    display: none;
  }
}
.link-warp{
  background-color: $font-funs
}
</style>