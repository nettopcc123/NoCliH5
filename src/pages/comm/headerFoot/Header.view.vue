<template>
  <div class="vgame-header" :class="vhclass">
    <f7-link href="/index">
      <div class="v-game-goback">
        <svg-icon icon-class="home"/>
      </div>
      <div class="v-game-logo">
        <div class="logo-icon"></div>
      </div>
    </f7-link>
  </div>
</template>
<script>
export default {
  name: "Header", // V竞技
  components: {
  },
  props: {
    vhclass: {
      type: String
    }
  },
  computed: {
  },
  data() {
    return {
    }
  },
  watch: {
  },
  created() {},
  mounted() {
    this.bindEvent()
  },
  filters: {},
  methods: {
    bindEvent() {

    }
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.vgame-header{
  position: absolute;
  left: 0px;
  top: 0px;
  width: calc(100vw - 44px);
  background-color: $main-bg;
  a{
    height: 48px;
    line-height: 48px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .v-game-goback{
    width: 44px;
    padding-top: 8px;
    color: $but-light-l;
    svg{
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .v-game-logo{
    flex: 1;
    .logo-icon {
      width: 100%;
      height: 48px;
      display: block;
      background-image: url('../../../assets/images/logo2.png');
      background-size: 0.91rem 0.23rem;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
}
.vsoprt{
  width: 100vw!important;
  // background-color: $font-per!important;
  .v-game-logo{
    padding-right: 0.44rem;
  }
}
</style>
