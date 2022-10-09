// 导入vue
import Vue from 'vue'
// 导入axios
import axios from '../utils/http'
// 导入vuex
import Vuex from 'vuex'
// 注册
Vue.use(Vuex)
// 封装
const store = new Vuex.Store({
    state:{
        cartList:[],// 购物车列表
        memberInfo:{},// 登录用户信息
    },
    mutations:{
        // 删除
        cartDel(state,id){
            // 根据id查找索引
            var index = state.cartList.findIndex(item=>item.id===id)
            // 根据索引删除数据
            state.cartList.splice(index,1);
        },
        // state: 系统内置
        // list: 谁调用谁注入
        // 初始化购物车列表
        cartListInfo(state,list){
            // 赋值购物车列表
            state.cartList=list
        },
        // 初始化登录页面信息
        memberInfos(state){
            const memberInfo = JSON.parse(localStorage.getItem('memberInfo') || '{}');
            state.memberInfo=memberInfo
        }
    },
    actions:{
        // 删除
        // params:{id:删除用的id,uid:更新用的用户信息}
        deletes({commit,dispatch},params){
            axios.post('/cartdelete',{id:params.id}).then(res=>{
                if(res.code === 200){
                    // 使用数据请求 更新列表
                    // dispatch('getCartInfo',params.uid)
                    // 使用数据操作dom 的方式更新
                    commit('cartDel',params.id)
                }
            })
        },
        // 初始化页面
        // commit: 系统内置
        // uid: 用户信息
        getCartInfo({commit},uid){
            axios.get('/cartlist',{params:{uid:uid}}).then(res=>{
                // console.log(res)
                if(res.code===200){
                    // 调用初始化函数,并传递参数
                    commit('cartListInfo',res.list)
                }
            })
        },
        // 修改
        // params:{id:数据id,type:1减少2增加}
        getCartDit({commit},params){
            axios.post('/cartedit',params).then(res=>{
                if(res.code === 200){
                    // 这里暂时不需要做操作
                }
            })
        },
        // 新增
        // params:{uid:用户信息,goodsid:商品编号,num:数量}
        addCratAction({dispatch},params){
            axios.post('/cartadd',params).then(res=>{
                if(res.code===200){
                    // 增加之后更新列表
                    dispatch('getCartInfo',params.uid)
                }
            })
        }
    },
    getters:{
        CartGoodsNum(state){
            let num=0;
            state.cartList.forEach(item=>{
              num += item.num
            })
            return num
        },
        CartGoodsPrice(state){
            let price=0;
            state.cartList.forEach(item=>{
                price += item.num * item.price
            })
            return price*100
        }
    }
})
export  default store
