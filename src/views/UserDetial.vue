<template>
   <ul class="list-group list-group-flush" v-if="user">
  <li class="list-group-item" >userName : {{ user.userName}}</li>
  <li class="list-group-item">identity : {{ user.identity}}</li>
  <li class="list-group-item">nickName : {{ user.nickName}}</li>
  <li class="list-group-item">gender : {{ user.gender}}</li>
  <li class="list-group-item">birthday : {{ user.birthday}}</li>
</ul>
<div v-else>
    Loading user data...
</div>
<button class="btn btn-info" type="butten">編輯</button>
</template>
    
<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL


const router = useRouter();

const user = ref({});
console.log(user.userName);
  
const fetchUserData = async () => {

  const response = await axios.get('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response.data.data
  console.log(response.data.data);
//   user.value = response.data;
    
//   axios
//     .get('http://localhost:8080/user/detial', config)
//     .then((res) => {
//         user.value = res.data.data;
//         console.log(user);
    
//     })
//     .catch((error) => {
//         console.log(error.response.data.msg);
//     });
};
fetchUserData()

</script>
    
<style>
    
</style>