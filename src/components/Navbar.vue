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
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click="logOut">Sign out</a></li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</nav>
</template>
    
<script setup >
    import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet} from '../global'

    const router = useRouter();

   
    const logOut =async () => {
    const response= await axiosPost('http://localhost:8080/user/logout',{},{withCredentials:true})
      console.log(response);
      // router.push({name:"Login"})
    
}
</script>
    
<style>
    
</style>