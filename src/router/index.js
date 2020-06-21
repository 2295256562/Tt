import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/login.vue'
import Register from '@/components/register.vue'
import Index from '@/components/index.vue'
import PhoneCloud from '@/components/APP/phonecloud'
import APITest from '@/components/API/API'
import Home from '@/components/home.vue'
import Project from "@/components/product/project";
import Model from "@/components/product/model";
import APIlist from "../components/API/APIlist";
import APIreport from "../components/API/APIreport";
import APIreportinfo from "../components/API/reportinfo";
import ApiMap from "../components/API/ApiMap";
import Headers from "../components/API/project_headers";
import Interface from "../components/API/apitree";
import taskList from "../components/task/taskList";
import addTask from "../components/task/addTask";
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
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: 'index', name: 'Index', component: Index}
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
        {path: 'APIlist', name: 'APIlist', component: APIlist},
        {path: '/APITest', name: "APITest", component: APITest},
        {path: 'APIreport', name: "APIreport", component: APIreport},
        {path: '/api/APIreport/info', name: "info", component: APIreportinfo},
        {path: 'Headers', name: "Headers", component: Headers},
        {path: 'API', name: "API", component: ApiMap},
        {
          path: 'interface', name: "interface", component: Interface, children: [
            {path: 'list', name: "list", component: () => import("../components/API/list")},
            {path: 'apiInfo', name: "apiInfo", component: () => import("../components/API/apiInfo")},
          ]
        },
      ]
    },
    {
      path: '/task',
      name: 'Task',
      component: Home,
      children: [
        {path: 'taskList', name: "taskList", component: taskList},
        {path: 'addTask', name: "addTask", component: addTask},
        // {path: 'model', name: "model", component: Model}
      ]
    },
  ]
})
