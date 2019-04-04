import Vue from 'vue'
import App from './App'
import router from './router'
import { Swipe, SwipeItem } from 'vue-swipe'
import '../static/css/global.css'
import annunciate from '../src/components/annunciate'
import Axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'

// 注册轮播图
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.component('annunciate', annunciate)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.qs = qs // https://www.easyserp.com/taijipay // http://192.168.1.180/weixinPay http://www.easyserp.com:8091/taijizf
Axios.defaults.baseURL = 'https://www.147soft.cn/taijipay'
Vue.prototype.$moment = Moment
Axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    let str = router.match(location).hash
    if (str.substr(0, str.indexOf('?')) === '#/succeed') {
      ElementUI.Message({
        showClose: true,
        message: '打印失败',
        type: 'error'
      })
      return error
    }
    ElementUI.Message({
      showClose: true,
      message: '网络连接出了点小状况，请您稍后再试',
      type: 'error'
    })
    setTimeout(() => {
      router.push({ name: 'index' })
    }, 3000)
    return error
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
