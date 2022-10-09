<template>
  <div class="goods-container">
      <van-nav-bar
          title="分类列表"
          left-text="返回"
          @click-left="$router.back()"
      />
    <van-card
        v-for="item in goodsLst"
        :key="item.id"
        :price="item.price"
        :title="item.goodsname"
        :thumb="$baseURL+item.img"
    >
      <template #footer>
        <van-button @click="addCart(item.id)" icon="cart" type="primary" size="small"></van-button>
      </template>
    </van-card>
<!--    加载更多按钮-->
    <van-button @click="goodsData" v-if="hide" plain block type="primary">加载更多</van-button>


  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  name: "Goods",
  computed:{
    ...mapState(['memberInfo'])
  },
  data(){
    return {
      // 分类列表数据:
      goodsLst:[],
      page:1,// 页码
      size:3,// 每页几条数据
      total:0,// 所有得到列表条数
      hide:true,// 控制加载更多按钮显示隐藏
    }
  },
  methods:{
    ...mapMutations(['memberInfos']),
    ...mapActions(['addCratAction']),
    // 增加
    addCart(goodsid) {
      if(this.memberInfo.uid){
        this.addCratAction({uid:this.memberInfo.uid,goodsid:goodsid,num:1})
        this.$notify({type:'success',message:'添加成功'})
      }else{
        this.$notify({type:'danger',message:'请先登录'})
      }
    },
    // 点击加载更多获取更多数据
    goodsData(){
      // 让页码自增
      this.page+=1
      // 发送请求获取数据
      this.getGoodsList()
    },
    // 获取分类列表数据
    getGoodsList(){
      this.$axios.get('/getcategoods',{params:{page:this.page,size:this.size,sid:this.$route.params.id}}).then(res=>{
        if(res.code===200){
          this.goodsLst=this.goodsLst.concat(res.list.list)
          this.total=res.list.total
          // 当数据获取完毕,隐藏加载更多按钮
          if(this.goodsLst.length>=this.total){
            this.hide=false
          }
        }

      })
    }
  },
  created(){
    this.getGoodsList()
    this.memberInfos();
  }
}
</script>

<style scoped lang="less">
.goods-container{
  margin-bottom: 60px;
}
</style>