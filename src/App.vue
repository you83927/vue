<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar.vue';

import { provide, ref, onMounted } from 'vue';
import axios from 'axios';
import { axiosGet } from './global';

// const user = ref({});
// // 初始化头像信息
// const avatar = ref('');

// // 获取头像信息
// onMounted(async () => {
//   const response = await axiosGet('http://localhost:8080/user/detial', { withCredentials: true });
//   user.value =response
//   if (user.value.photo==null || user.value.photo=="") {
//       avatar.value = '/img/noImage.jpg';
// } else {
//       avatar.value = decodeURIComponent(atob(user.value.photo));
//   }
// });

// provide('avatar', avatar); 


</script>

<template>
    <div class="container">
        <Navbar ></Navbar>
        <!-- <Navbar  :avatar="avatar"></Navbar> -->
        <router-view></router-view>
    </div>
</template>

<style scoped>

</style>