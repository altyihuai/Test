<template>
  <div class="home-container">
    <van-nav-bar
        title="首页"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in banners" :key="item.id">
        <img v-lazy="$baseURL + item.img" />
      </van-swipe-item>
    </van-swipe>
<!--  tab栏-->
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
        <van-card
            v-for="item in goodsList[0].content"
            :key="item.id"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$baseURL + item.img"
        >
          <template #footer>
            <van-button  @click="addCrat(item.id)" type="primary" icon="cart" size="small"></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="发现新品">

        <van-card
            v-for="item in goodsList[1].content"
            :key="item.id"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$baseURL + item.img"
        >
          <template #footer>
            <van-button @click="addCrat(item.id)" type="primary" icon="cart" size="small"></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="全部商品">

        <van-card
            v-for="item in goodsList[2].content"
            :key="item.id"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$baseURL + item.img"
        >
          <template #footer>
            <van-button  @click="addCrat(item.id)" type="primary" icon="cart" size="small"></van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入vuex
import {mapMutations,mapActions,mapState} from 'vuex'
export default {
name: "Home",
  computed:{
    ...mapState(['memberInfo'])
  },
  data() {
    return {
      active:2  ,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      // 获取商品列表
      goodsList:[{content:[]},{content:[]},{content:[]},],// 这里的数据是嵌套类型的,但是在加载时数据没有全部加载出来,没有提前写好就会报错
      banners:[],
    };
  },
  methods:{
    ...mapMutations(['memberInfos']),
    ...mapActions(['addCratAction']),
    addCrat(goodsid){
      if(this.memberInfo.uid){
        this.addCratAction({uid:this.memberInfo.uid,goodsid:goodsid,num:1})
        this.$notify({type: 'success', message: '添加成功'})
      }else {
        this.$notify({type: 'danger', message: '请先登录'})
      }

    },
    goosListInit(){
      this.$axios.get('/getindexgoods').then(res=>{
        // console.log(res)
        if(res.code===200){
          this.goodsList=res.list
        }
      })
    },
    getBanners(){
      this.$axios.get('/getbanner').then(res=>{
        // console.log(res)
        if(res.code===200){
          this.banners=res.list
        }
      })
    }
  },
  created() {
    this.goosListInit();
    this.getBanners();
    this.memberInfos();
  }
}
</script>

<style scoped lang="less">
.home-container{
  margin-bottom: 60px;
  .van-swipe-item{
    img{
      width: 100%;
      height: 220px;
    }
  }
}


</style>