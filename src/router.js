import {createRouter,createWebHistory} from "vue-router";
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Contact from "./views/Contact.vue"
import Products from "./views/Products.vue"
import Login from "./views/Login.vue"
import UserDetial from "./views/UserDetial.vue"


const routers=[

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
    UserDetial
]

const router = createRouter({
    history:createWebHistory(),
    routes:routers
})
export default router
