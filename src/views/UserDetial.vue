<template>
   <ul class="list-group list-group-flush" v-if="user">
  <li class="list-group-item" >{{ user.userName}}</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>
<div v-else>
      Loading user data...
   </div>
</template>
    
<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL


const router = useRouter();

const user = ref(null);
    
  
const fetchUserData = async () => {
  const config = {
        headers: {
    'Content-Type': 'application/json'
  }
  };
  const response = await axios.get('http://localhost:8080/user/detial', config);
  console.log(response);
  user.value = response.data;
    
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