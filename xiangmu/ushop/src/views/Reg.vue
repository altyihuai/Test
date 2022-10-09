<template>

  <div class="reg-contact">
    <van-nav-bar
        title="会员注册"
        left-text="返回"
        right-text="登录"
        @click-right="$router.push('./login')"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="user.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
            v-model="user.nickname"
            type="text"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
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
export default {
  name: "Login",
  data(){
    return {
      user:{
        phone:'',
        nickname:'',
        password:'',
      }
    }
  },
  methods:{
    onSubmit(){
      this.$axios.post('/register',this.user).then(res=>{
        // console.log('res')
        // console.log(res.code)
        // console.log(res)
        if(res.code===200){
          this.$router.push('/login')
          this.$notify({type: 'success', message: '注册成功'});
        }else{
          this.$notify({type: 'danger', message: '注册失败'});

        }
      })
    }
  }
}
</script>

<style scoped>

</style>