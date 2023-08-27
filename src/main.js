import './assets/main.css'
import "./style.css";
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from "vue-router";
// import router from './router'
import "bulma/css/bulma.css";
import "animate.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Paginate from "vuejs-paginate-next";
import VueDatePicker from '@vuepic/vue-datepicker';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'leaflet/dist/leaflet.css'
import LeafLet from 'leaflet'
import '@vuepic/vue-datepicker/dist/main.css'
import "boxicons/css/boxicons.min.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faHouseChimney,
  faUserSecret,
  faUsers,
  faXmark,
  faFile,
  faStore,
  faCirclePlus,
  faRotateLeft,
  faPizzaSlice
} from "@fortawesome/free-solid-svg-icons";


/* add icons to the library */
library.add(faUserSecret);
library.add(faUsers);
library.add(faHouseChimney);
library.add(faXmark);
library.add(faFile);
library.add(faStore)
library.add(faCirclePlus)
library.add(faRotateLeft)
library.add(faPizzaSlice)

import HelloVue from "./components/HelloVue.vue";
import Favorite from "./views/Favorite.vue";
import Products from "./views/Products.vue"
import Login from "./views/Login.vue"
import UserDetial from "./views/UserDetial.vue"
import Follower from "./views/Follower.vue"
import UserModify from "./views/UserModify.vue"
import PrivacySetting from "./views/PrivacySetting.vue"
import OtherUsers from "./views/OtherUsers.vue"
import SearchUsername from "./views/SearchUsername.vue"
const routers=[
    {
        path:'/helloVue',
        name:'HelloVue',
        component:HelloVue
    },

    {
        path:'/favorite',
        name:'Favorite',
        component:Favorite,
        meta: { requiresAuth: true }
    },
    {
        path:'/',
        name:'Login',
        component:Login
    },
    {
        path:'/products',
        name:'Products',
        component:Products
    },
    {
        path:'/userDetial',
        name:'UserDetial',
        component:UserDetial,
        meta: { requiresAuth: true }
    },
    {
        path:'/follower',
        name:'Follower',
        component:Follower,
        meta: { requiresAuth: true }
    },
    {
        path:'/userModify',
        name:'UserModify',
        component:UserModify,
        meta: { requiresAuth: true }
    },
    {
        path:'/rivacySetting',
        name:'PrivacySetting',
        component:PrivacySetting
    },
    {
        path:'/otherUsers/:userId',
        name:'OtherUsers',
        component:OtherUsers
    },
    {
        path:'/searchUsername',
        name:'SearchUsername',  
        component:SearchUsername
    }

    
    
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routers
})

const isUserLoggedIn=()=>{
    let a =  sessionStorage.getItem('userId')
    // console.log(a);
    if(a!=null){
        return true
    }
    return false

}
// 設置全局的路由守衛
router.beforeEach((to, from, next) => {
    // console.log(isUserLoggedIn());
    if (to.meta.requiresAuth && isUserLoggedIn()==false) {
      // 如果路由需要登入，但用戶未登入，將其重定向到登入頁面
      next({ path: '/' }); // 將 "/login" 換成您的登入頁面路徑
    } else if (to.meta.requiresGuest && isUserLoggedIn()==true) {
      // 如果路由需要是訪客（未登入）狀態，但用戶已登入，將其重定向到其他頁面
      next({ path: '/userDetial' }); // 可以將路徑更換成您想要的頁面路徑
    } else {
      next(); // 允許訪問該路由
    }
  });


export default router

createApp(App)
  .use(Paginate)
  .use(router)
  .use(VueAxios, axios)
  .use(LeafLet)
  .use(VueSweetalert2)
  .use(LoadingPlugin)
  .use(ElementPlus)
  .use(ElementPlus)
  
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('VueDatePicker', VueDatePicker)
  .mount("#app");
