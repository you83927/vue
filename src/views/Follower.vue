<template>
   <div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      {{ follower.username }}
    </li>
  </ul>
  <div v-if="isLoading" class="loading-message">Loading...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>
    
<script setup >
    import { ref, onMounted } from 'vue';
import axios from 'axios';

const followers = ref([]);
const isLoading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/user/follow');
    followers.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('An error occurred:', error);
    isLoading.value = false;
    error.value = 'Error fetching data';
  }
});
</script>
    
<style>
    
</style>