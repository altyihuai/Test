// 导入axios和vue
import Vue from 'vue'
import axios from 'axios'
// 配置基础域名
axios.defaults.baseURL='http://localhost:3000/api'  // 打包后代理服务器不可用,要开启基础域名
// axios.defaults.baseURL='/api'
// axios.defaults.headers='*',
// 拦截器
axios.interceptors.request.use(function (request){
    const memberInfo=JSON.parse(localStorage.getItem('memberInfo') || '{}')
    // request.headers.authrozations=memberInfo.token;
    request.headers.authorization=memberInfo.token;
    return request
});
axios.interceptors.response.use(function (response){
    return response.data
})
// 注册&导出
Vue.prototype.$axios=axios;
export default axios