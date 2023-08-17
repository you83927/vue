<template>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/Navbar.vue">EEIT166</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>

        <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/userDetial">detial</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/follower">follower</router-link>
        </li>
        <div class="dropdown text-end ">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="photo" alt="mdo" width="50" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li> <router-link class="dropdown-item" to="/userDetial">用戶資料</router-link></li>
            <li> <router-link class="dropdown-item" to="/follower">追蹤用戶</router-link></li>
            <li><router-link class="dropdown-item" to="/">最愛</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click="logOut">登出</a></li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</nav>
</template>
    
<script setup >
    import { ref ,computed,onMounted} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet} from '../global'

    const router = useRouter();

    const user = ref({});
    const photo = ref("")

    onMounted (async () => {
  const response = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response
    // console.log(user.value.photo);
      if(user.value.photo==null || user.value.photo==""){
        photo.value ="/img/noImage.jpg"
      }else{
        photo.value = decodeURIComponent(atob(user.value.photo))
        // console.log(photo.value);
      }
    });

   
    const logOut =async () => {
    const response= await axiosPost('http://localhost:8080/user/logout',{},{withCredentials:true})
      // console.log(response);
      router.push({name:"Login"})
    
}
</script>
    
<style>
        .circular-image {
  width: 8rem;
  border: 2px solid #8f8686;
  margin-top: 5px;
  border-radius: 50%; /* Set the border-radius to 50% for a circular shape */
  display: block;
  margin: 0 auto;
}
  .rounded-circle {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #8f8686;
    border-radius: 50%; /* 添加圆形边框 */
    overflow: hidden; /* 隐藏超出容器的部分 */
    margin: 5px;
  }

  .user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
   
  }
</style>