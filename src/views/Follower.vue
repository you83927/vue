<template>
   <div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      {{ follower.id.following }}
      
    </li>
  </ul>
  <div v-if="isLoading" class="loading-message">Loading...</div>
 
  </div>
</template>
    
<script setup >
    import { ref} from 'vue';
import axios from 'axios';

const followers = ref([]);
const isLoading = ref(true);
const error = ref('');


const fetchUserData = async () => {
    const response = await axios.get('http://localhost:8080/user/follow',{withCredentials:true});
    console.log(response.data.data);
    followers.value = response.data.data;
    isLoading.value = false;
}
fetchUserData()
</script>
    
<style>
    
</style>