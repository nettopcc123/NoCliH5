<template>
  <div class="game-btn">
    <div class="gb-warp">
      <span class="gb-v game-but-vgame" @click="gotoUrl('main')"></span>
      <span class="gb-v game-but-vsport" @click="gotoUrl('sportMain')"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'GameBtn', // 游戏分类按钮
  computed: {
    ...mapGetters(['token'])
  },
  data() {
    return {
      isReqGame: true,
      isInto: false,
      type: ''
    }
  },
  methods: {
    gotoUrl(url) {
      if(!this.isReqGame) return
      this.isReqGame = false
      let isTo = false,
          name = 'login'
      const router = this.$f7router;
      if(!this.token) {
        router.navigate({
          name: name,
          path: `/${name}`
        });
        return
      }
      if(url) {
        this.url = url
      }
      url = this.url
      this.$customEvent.trigger('changeDialog', true)
      this.$customEvent.trigger('dialogCon', {
        title: '线路检测', // 标题
        rightIcon: 'close02', // 关闭图标
        but: '进入游戏', // 按钮
        type: 'inToGame',
        gameType: url == "main" ? 'V电竞钱包余额' : 'V体育钱包余额',
        status: false, //
        butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
      })
      this.$store.commit("SET_ISTRUE", false)
      if(url == "sportMain") {
        this.$store.dispatch('loginJBB').then( response => {
          this.isReqGame = true
          let res = response
          this.url = ''
          if(res.success == 1) {
            if(!res.content.url) {
              isTo = true;
              this.$customEvent.trigger('dialogCon', {
                title: res.content.startTime ? '升级维护公告' : '温馨提示', // 标题
                centerIcon: res.content.startTime ? 'weihu' : null, // 图标
                con: res.content.detail, // 内容
                time: res.content.startTime ? res.content.startTime : null, // 时间
                rightIcon: res.content.startTime ? 'close02' : null, // 关闭图标
                but: !res.content.startTime ? '我知道了' : null, // 按钮
                butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
              })
            }else {
              // this.$store.commit('SET_JBBURL', res.content.url);
              this.$store.commit('SET_RGURL', res.content.url);
              if(!this.isInto) {
                this.$customEvent.trigger('changeDialog', true)
                this.$customEvent.trigger('dialogCon', {
                  title: '线路检测', // 标题
                  con: res.content.amount, // 内容
                  rightIcon: 'close02', // 关闭图标
                  but: '进入游戏', // 按钮
                  type: 'inToGame',
                  gameType: 'V体育钱包余额',
                  urlPorp: '/wallet',
                  status: true, //
                  butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                })
                this.$store.commit("SET_ISTRUE", true)
                this.isReqGame = true
              }
              this.isInto = false
              return
            }
          }
          if(isTo) {
            return
          }
          return url
        }).then((url) => {
          if(!url) return
          
          router.navigate({
            name: url,
            path: `${url}`
          });
        })
      }
      if(url == 'main') {
        this.$store.dispatch('loginRG', {platId: '1'}).then( response => { // 执行调接口
          let res = response
          // this.$store.commit("SET_ISSHOWLOADING", false)
          this.url = ''
          if(res.success == 1) { // 成功
            this.isReqGame = true
            if(!res.content.url) { // 判断是否有返回url链接 如果没有
              isTo = true; 
              this.$customEvent.trigger('changeDialog', true) // 显示弹窗提示
              this.$customEvent.trigger('dialogCon', { // 弹窗内容
                title: res.content.startTime ? '升级维护公告' : '温馨提示', // 标题
                centerIcon: res.content.startTime ? 'weihu' : null, // 图标
                con: res.content.detail, // 内容
                time: res.content.startTime ? res.content.startTime : null, // 时间
                rightIcon: res.content.startTime ? 'close02' : null, // 关闭图标
                but: !res.content.startTime ? '我知道了' : null, // 按钮
                butType: 4 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
              })
            }else { // 有url
              this.$store.commit('SET_RGURL', res.content.url); // 保存url
              if(!this.isInto) {
                this.$customEvent.trigger('changeDialog', true)
                this.$customEvent.trigger('dialogCon', {
                  title: '线路检测', // 标题
                  con: res.content.amount, // 内容
                  rightIcon: 'close02', // 关闭图标
                  but: '进入游戏', // 按钮
                  type: 'inToGame',
                  gameType: 'V电竞钱包余额',
                  urlPorp: '/wallet',
                  status: true, //
                  butType: 5 // 1 关闭当前，2,带连接跳转外部连接，3.跳转网页连接
                })
                this.$store.commit("SET_ISTRUE", true)
                this.isReqGame = true
              }
              this.isInto = false
              return
            }
          }
          if(isTo) { // 判断是否有url  没有则不跳转页面
            return
          }
          return url
        }).then((url) => {
          if(!url) return
          router.navigate({
            name: url,
            path: `${url}`
          });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/stylus/comm.scss";
.game-btn{
  margin-top: 0.15rem;
}
.gb-warp{
  display: flex;
  justify-content: space-between;
  img{
    height: 0.8rem;
    border-radius: 0.06rem;
  }
}
.bg-nodate{
  height: 0.8rem;
  text-align: center;
  margin: 0 auto;
}
.gb-v{
  width: 1.7rem;
  height: 0.8rem;
  border-radius: 0.06rem;
}
.game-but-vgame{
  background: url('../../../assets/images/btn2.jpg') no-repeat center top / 100% ;
}
.game-but-vsport{
  background: url('../../../assets/images/btn1.jpg') no-repeat center top / 100% ;
}
</style>