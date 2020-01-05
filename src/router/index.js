import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/login.vue'
import PhoneCloud from '@/components/APP/phonecloud'
import Home from '@/components/home.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/PhoneCloud',
      name: 'PhoneCloud',
      component: PhoneCloud
    }
  ]
})
