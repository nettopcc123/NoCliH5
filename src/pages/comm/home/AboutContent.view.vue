<template>
  <section class="about">
    <article class="a-v">
      <span class="a-v-logo"><svg-icon icon-class="v88" /></span>
      <span class="a-v-tit">最专业的电竞和体育实时投注平台</span>
    </article>
    <article class="a-c">
      <h2 class="a-c-tit">官方主赞助商</h2>
      <p class="w25 about-z1"></p>
      <h2 class="a-c-tit">支付合作</h2>
      <p class="w34 about-p1"></p>
      <h2 class="a-c-tit">品牌合作</h2>
      <ul class="a-c-l">
        <li>
          <p class="about-c1t"></p>
          <p class="about-c1b"></p>
        </li>
        <li>
          <p class="about-c2t"></p>
          <p>小金体育</p>
        </li>
      </ul>
    </article>
    <ff-foot-address></ff-foot-address>
  </section>
</template>
<script>
import Foot from '@p/comm/home/FootAddress.view'; // 底部
export default {
  name: 'Member', // 主页
  components: {
    'ff-foot-address': Foot,
  }
};
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.about{
 background: $login-bg;
 text-align: center;
 padding-bottom: 0.02rem;
}
.a-v{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.4rem 0 0rem;
}
.a-v-tit{
  font-size: 0.15rem;
  color: $font-login;
  margin-top: 0.05rem;
}
.a-v-logo{
  width: 0.7rem;
  height: 0.7rem;
  background: url('../../../assets/images/v88.jpg') no-repeat center top / 100% ;
}
.a-c{
  height: 3.2rem;
  img{
    width: 100%;
  }
}
.a-c-tit{
  font-size: 0.14rem;
  color: $font-login;
  margin-top: 0.38rem;
  margin-bottom: 0.1rem;
}
.w25{
  width: 2.5rem;
  margin: 0 auto;
  img{
    height: 0.45rem;
  }
}
.w34{
  width: 3.4rem;
  margin: 0 auto;
  img{
    height: 0.19rem;
    width: 2rem;
  }
}
.a-c-l{
  width: 1.4rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  li{
    width: 50%;
    margin: 0px 0.05rem;
    p{
      &:nth-child(1) {
        margin: 0.05rem auto;
      }
    }
  }
}
.about-z1{
  width: 2.5rem;
  height: 0.48rem;
  background: url('../../../assets/img/login/z02.jpg') no-repeat center top / 100% ;
}
.about-p1{
  width: 2rem;
  height: 0.19rem;
  background: url('../../../assets/img/login/p01.jpg') no-repeat center top / 100% ;
}
.about-c1t{
  width: 0.4rem;
  height: 0.4rem;
  background: url('../../../assets/img/login/c003.jpg') no-repeat center top / 100% ;
}
.about-c1b{
  width: 100%;
  height: 0.2rem;
  background: url('../../../assets/img/login/c0022.jpg') no-repeat center center / 100% ;
  margin: 0 auto;
}
.about-c2t{
  width: 0.4rem;
  height: 0.4rem;
  background: url('../../../assets/img/login/c01.jpg') no-repeat center top / 100% ;
}
</style>