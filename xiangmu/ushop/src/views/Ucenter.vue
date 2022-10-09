<template>
  <div class="ucenter-container">
    <van-nav-bar
        title="会员中心"
        left-text="返回"
    />
    <div class="header">
      <van-image
          round
          width="10rem"
          height="10rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <h5>{{this.memberInfo.nickname}}</h5>
    </div>
    <div class="section">
      <van-button type="danger" @click="quit" block>安全退出</van-button>
    </div>
    <div class="section">
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>

  </div>
</template>

<script>
import { mapMutations,mapState} from 'vuex'
export default {
  name: "Ucenter",
  computed:{
    ...mapState(['memberInfo'])
  },
  methods:{
    ...mapMutations(['memberInfos','cartListInfo']),


    // 退出
    quit(){
      localStorage.removeItem('memberInfo')
      this.$notify({type:'success',message:'退出成功'})
      this.cartListInfo([])
      // 重定向
      this.$router.push('./login')
    }
  },
  created() {
    this.memberInfos()
  }
}
</script>

<style scoped lang="less">
  .ucenter-container{
    margin-bottom: 60px;
    .header{
      background: #cccccc;
      height: 280px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
    .section{
      margin: 20px 0;
    }

  }
</style>