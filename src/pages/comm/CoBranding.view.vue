<template>
  <div class="co-branding">
    <dl>
      <dt>品牌合作</dt>
      <dd>
        <li v-for="(item,index) in coBrandingIconList" :key="index">
          <img :src="item.url" alt="">
          <span>{{item.name}}</span>
        </li>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'CoBranding', // 品牌合作组件
  props: {
    
  },
  computed: {
  },
  data() {
    return {
      coBrandingIconList: [
        {name: '188体育',url: require("@/assets/images/b02.png")},
        {name: 'GG彩票',url: require("@/assets/images/b03.png")},
      ]
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
.co-branding{
  margin-top: 0.3rem;
  padding-bottom: 0.2rem;
  border-bottom: solid 0.01rem $cut-off-rule;
  dl{
    dt{
      text-align: center;
      line-height: 0.25rem;
      color: $font-login;
      font-size: 0.14rem;
    }
    dd{
      display: flex;
      justify-content: center;
      padding: 0.1rem;
      li{
        list-style: none;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: 0.3rem;
        &:nth-last-child(1){
          margin-right: 0;
        }
        img{
          width: 0.4rem;
          height: 0.4rem;
          margin-bottom: 0.05rem;
        }
      }
    }
  }
}
</style>