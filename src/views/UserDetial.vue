<template>
<h1>基本資料</h1>
<div class="circular-image-container">
  <img :src="decodedPhoto" alt="User Photo" class="circular-image">

</div>

   <ul class="list-group list-group-flush" v-if="user">
  <li class="list-group-item" >userName : {{ user.userName}}</li>
  <li class="list-group-item">identity : {{ identityString}}</li>
  <li class="list-group-item">nickName : {{ user.nickName}}</li>
  <li class="list-group-item">gender : {{ genderString}}</li>
  <li class="list-group-item">birthday : {{ user.birthday}}</li>
  <li class="list-group-item">email : {{ user.email}}</li>

</ul>
<div v-else>
    Loading user data...
</div>
<button class="btn btn-primary btn-lg" type="butten" @click="showModify">編輯</button>
</template>
    
<script setup>
    import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL


const router = useRouter();

const user = ref({

});
console.log(user.userName);
  
const fetchUserData = async () => {

  const response = await axios.get('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response.data.data

    console.log( user.value.gender);
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


const genderString = computed(() => {
  if( user.value.gender===1){
    return "男"
  }
  if( user.value.gender===2){
    return "女"
  }
  if( user.value.gender===1){
    return "其他"
  }
  
});
const identityString = computed(() => {
  if( user.value.identity===0){
    return "管理員"
  }
  if( user.value.identity===1){
    return "普通會員"
  }
  if( user.value.identity===2){
    return "店主"
  }
  
})

const decodedPhoto = computed(() => {
  if (user.value.photo) {
    try {
      return decodeURIComponent(atob(user.value.photo));
    } catch (error) {
      console.error("Error decoding photo:", error);
      return null; // Return a default value or handle the error in your own way
    }
  } else {
    return null; // Return a default value or handle the case where photo is not available
  }
});

const showModify = ()=>{
  router.push({ name: "UserModify"})
}
</script>
    
<style>
    .circular-image {
  width: 8rem;
  border: 2px solid #000000;
  margin-top: 5px;
  border-radius: 50%; /* Set the border-radius to 50% for a circular shape */
  display: block;
  margin: 0 auto;
}
</style>