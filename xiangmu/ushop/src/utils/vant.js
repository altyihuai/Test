// 导入axios和vue
import Vue from 'vue'
import vant from 'vant'
// 导入全部样式
import 'vant/lib/index.css'
// 全局注册
Vue.use(vant)

import { Lazyload } from 'vant';
// 这是一个指令
Vue.use(Lazyload);