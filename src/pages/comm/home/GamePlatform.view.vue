<template>
  <f7-block :class="{'no-hot-img': !hotImg.length}">
    <dl>
      <dt>
        <svg-icon icon-class="hot"></svg-icon>
        热门赛事
      </dt>
      <dd class="hot-game" v-for="(item, index) in hotImg" :key="index" :style="imgBg(item)">
        <!-- <img :src="item" alt=""> -->
      </dd>
    </dl>
    <ff-nodate v-show="!hotImg.length" titleProp="暂无热门赛事，请到游戏大厅看看吧!"></ff-nodate>
  </f7-block>
</template>

<script>
import { mapGetters } from 'vuex';
import NoDate from "@p/comm/noDate/NoDate.view"; // 暂无数据
export default {
  name: 'GamePlatform', // 游戏平台组件
  components: {
    'ff-nodate': NoDate
  },
  props: {
    hotImg:{
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  data() {
    return {
     
    }
  },
  mounted() {
    
  },
  filters: {},
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.block{
  padding: 0;
  dl{
    dt{
      font-size: 0.16rem;
      color: $font-but-wall;
      line-height: 0.3rem;
      svg{
        font-size: 0.14rem;
      }
    }
    dd{
      margin-top: 0.1rem;
      img{
        width: 100%;
        height: 1.4rem;
        max-height: 1.4rem;
        border-radius: 0.04rem;
      }
    }
    .no-dada{
      min-height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon{
        font-size: 2.2rem;
      }
    }
  }
}
.no-hot-img{
  padding-bottom: 0.2rem;
}
.hot-game{
  height: 1.4rem;
  background-size: cover;
}
</style>