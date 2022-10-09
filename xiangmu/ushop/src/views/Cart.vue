<template>
  <div class="cart-container">
<!--    nav标题-->
    <van-nav-bar

        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
<!--    购物车-->
    <van-card
        v-for="item in cartList"
        :key="item.id"
        :price="item.price"
        :title="item.goodsname"
        :thumb="$baseURL + item.img"
    >
      <template #footer>
        <div class="option">

          <van-stepper @plus="plus(item.id)" @minus="minus(item.id)" v-model="item.num" theme="round" button-size="22" />
          <van-button type="danger" size="mini" @click="deletess(item.id)">删除</van-button>
        </div>
      </template>
    </van-card>
    <van-submit-bar :price="CartGoodsPrice" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
// 导入子模块
import {mapActions,mapState,mapMutations,mapGetters} from 'vuex'

export default {
  name: "cart",
  computed:{
    ...mapGetters(["CartGoodsNum","CartGoodsPrice"]),
    ...mapState(["cartList",'memberInfo','memberInfo'])
  },
  data(){
    return {

      value:1,// 购物车数量的默认值
    }
  },
  methods:{
    ...mapActions(["getCartInfo",'getCartDit','deletes']),
    ...mapMutations(['memberInfos']),
    // 删除
    deletess(id){
      if(this.memberInfo.uid){
        const uid = this.memberInfo.uid
        this.deletes({id:id,uid:uid})

      }
    },
    // 增加
    plus(id){
      // console.log(id,'plus')
      this.getCartDit({id:id,type:2})

    },
    // 减少
    minus(id){
      // console.log(id,'minus')
      this.getCartDit({id:id,type:1})

    },
    onSubmit(){

    },
    // 删除  (废弃)
    // deletes(id){
    //   this.$axios.post('/cartdelete',{id:id}).then(res=>{
    //     console.log(res)
    //     if(res.code === 200){
    //       console.log(res)
    //       dispatch('getCartInfo',params.uid)
    //     }
    //   })
    // }
  },
  created() {
    // 初始化用户登录信息
    this.memberInfos()
    // 如果有uid就渲染列表
    // console.log(this.memberInfo.uid)
    if(this.memberInfo.uid){
      this.getCartInfo(this.memberInfo.uid)
    }
  }
}
</script>

<style scoped lang="less">
.cart-container{
  margin-bottom: 110px;
  .option{
    display: flex;
    justify-content: end;
  }
  .van-submit-bar{
    bottom: 50px
  }
}

</style>