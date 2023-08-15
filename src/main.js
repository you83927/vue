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
import Home from "./views/Home.vue";
import About from "./views/About.vue"
import Contact from "./views/Contact.vue"
import Products from "./views/Products.vue"
import Login from "./views/Login.vue"
import UserDetial from "./views/UserDetial.vue"
import Follower from "./views/Follower.vue"
import UserModify from "./views/UserModify.vue"
import PrivacySetting from "./views/PrivacySetting.vue"

const routers=[
    {
        path:'/helloVue',
        name:'HelloVue',
        component:HelloVue
    },

    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/about',
        name:'About',
        component:About
    },
    {
        path:'/contact',
        name:'Contact',
        component:Contact
    },
    {
        path:'/products',
        name:'Products',
        component:Products
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    },
    {
        path:'/userDetial',
        name:'UserDetial',
        component:UserDetial
    },
    {
        path:'/follower',
        name:'Follower',
        component:Follower
    },
    {
        path:'/userModify',
        name:'UserModify',
        component:UserModify
    },
    {
        path:'/rivacySetting',
        name:'PrivacySetting',
        component:PrivacySetting
    }
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routers
})
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
