import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/login.vue'
import Index from '@/components/index.vue'
import PhoneCloud from '@/components/APP/phonecloud'
import APITest from '@/components/API/API'
import Home from '@/components/home.vue'
import Project from "@/components/product/project";
import Model from "@/components/product/model";
import APIlist from "../components/API/APIlist";
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
      path: '/',
      name: 'Home',
      component: Home,
      children :[
        { path: 'index', name: 'Index', component: Index }
      ]
    },

    {
      path: '/APP',
      name: 'APP',
      component: Home,
      children: [
        {path: 'PhoneCloud', name: "PhoneCloud", component: PhoneCloud}
      ]
    },
    {
      path: '/product',
      name: 'Product',
      component: Home,
      children: [
        {path: 'project', name: "project", component: Project},
        {path: 'model', name: "model", component: Model}
      ]
    },
    {
      path: '/api',
      name: 'API',
      component: Home,
      children: [
        { path: 'APIlist', name: 'APIlist', component: APIlist },
        {path: 'APITest', name: "APITest", component: APITest}
      ]
    }
  ]
})
