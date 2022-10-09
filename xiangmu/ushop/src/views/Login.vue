<template>

  <div class="login-contact">
    <van-nav-bar
        title="登录"
        left-text="返回"
        right-text="注册"
        @click-right="$router.push('./reg')"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="user.phone"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="user.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
name: "Login",
  data(){
    return {
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
  ...mapActions(['getCartInfo']),
    onSubmit(){
      this.$axios.post('/login',this.user).then(res=>{
        // console.log(res)
        if(res.code===200){
          this.$notify({ type: 'success', message: '登录成功' });
          // 将登录凭证放进本地存储实现持久化登录
          localStorage.setItem('memberInfo',JSON.stringify(res.list))
          // 获取购物车
          this.getCartInfo(res.list.uid)
          // 页面跳转至会员中心
          this.$router.push('/ucenter')

        }else{
          this.$notify({ type: 'danger', message: '登录失败' });

        }
      })
    }
  }
}
</script>

<style scoped>

</style>