<template>
  <div class="cate-container">
    <van-nav-bar
        title="分类"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <div class="content">
<!--      侧边栏-->
      <van-sidebar @change="cateChange" v-model="active" >
        <van-sidebar-item  :title="item.catename" v-for="item in cateList" :key="item.id"/>
      </van-sidebar>
<!--      九宫格内容-->
      <van-grid class="cate_grid" :border="false" :column-num="3">
        <van-grid-item v-for="item in secondCateList" :key="item.id" @click="$router.push(`/goods/${item.id}`)">
          <van-image
              :src="$baseURL + item.img"
          />
          <h5>{{item.catename}}</h5>
        </van-grid-item>

      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cate",
  data(){
    return{
      // 控制侧边栏选择的默认
      active:0,
     // 商品分类信息
      cateList:[],
      // 二级商品分类信息
      secondCateList:[],
    }
  },
  methods:{
    // 获取二级分类信息
    cateChange(index){
      this.secondCateList=this.cateList[index].children
    },
    // 获取分类商品信息
    getCateList(){
      this.$axios.get('/getcate').then(res=>{
        // console.log(res)
        if(res.code===200){
          this.cateList=res.list
          // 获取完商品信息后,获取二级商品信息  this.active== 0
          this.cateChange(this.active)
        }
      })
    }

  },
  created(){
    this.getCateList()
  }
}
</script>

<style scoped lang="less">
  .cate-container{
    .content{
      display: flex;
      .cate_grid{
        flex: 1;
      }
    }
  }

</style>