<template>
  <div class="carousel-box">
    <f7-swiper pagination :autoplay='true' :delay='2000' data-swiper-autoplay="2000" class="carousel">
      <f7-swiper-slide v-for="(item,index) in imgUrl" :key="index">
        <img :src="item" alt="">
      </f7-swiper-slide>
    </f7-swiper>
  </div>
</template>

<script>
export default {
  name: 'carousel', // 轮播组件
  props: {
    listProp: {
      type: Array,
      default: () => {return []}
    }
  },
  computed: {
  },
  data() {
    return {
      imgUrl: [
        
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
.carousel {
  width: 100%;
  height: 1.4rem;
  background: $but-light-l;
}
.swiper-slide{
  text-align: center;
  line-height: 2rem;
  img{
    width: 100%;
    height: 100%;
  }
  .swiper-pagination-bullet-active{
    background-color: red;
  }
}
</style>