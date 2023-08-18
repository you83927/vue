<template>
<h1>隱私設定</h1>
<div class="mb-3 row">
    <label for="staticEmail" class="col-sm-3 col-form-label">使用者名稱</label>
    <div class="col-sm-8">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="user.userName">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-3 col-form-label">舊密碼</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-3 col-form-label">新密碼</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-3 col-form-label">確認新密碼</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
</template>
    
<script setup>
     import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet,axiosPut,axiosDelete, swalSuccess} from '../global'

    const router = useRouter();

const user = ref({});


const fetchUserData = async () => {

  const response = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});

    user.value =response
    
}
fetchUserData()


const showUserDetial = ()=>{
  router.push({ name: "UserDetial"})
}


</script>
    
<style>
    
</style>