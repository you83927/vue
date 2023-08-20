<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar.vue';

import { provide, ref, onMounted ,watch } from 'vue';
import axios from 'axios';
import { axiosGet } from './global';
import { useRouter} from 'vue-router';

const router = useRouter()
const isLoginPage = ref(false);
console.log(router);

// 使用 watch 監聽 $route 的變化
watch(() => router.currentRoute.value, (to) => {
  isLoginPage.value = to.name === 'Login';
});



</script>

<template>
    <div class="container">
        <Navbar v-if="!isLoginPage"></Navbar>
        <!-- <Navbar  :avatar="avatar"></Navbar> -->
        <router-view></router-view>
    </div>
</template>

<style scoped>

</style>