<template>
   <ul class="list-group list-group-flush">
  <li class="list-group-item">{{aaa}}</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>
</template>
    
<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL


const aaa =123 
const router = useRouter();

const datas = ref(


    )
    {
        const requestData = {
            userName: userName.value,
            passWord: passWord.value
        };
  const config = {
        headers: {
    'Content-Type': 'application/json'
  }
  };
  axios
    .get('http://localhost:8080/user/detial', requestData, config)
    .then((res) => {
        console.log(res.data);
    
    })
    .catch((error) => {
        console.log(error.response.data.msg);
    });
};
</script>
    
<style>
    
</style>