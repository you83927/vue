<template>
<h1>基本資料</h1>
<div class="user-photo-container">
  <img :src="decodedPhoto" alt="User Photo" class="user-photo mx-auto d-block" >
</div>
<button class="btn btn-info" type="butten" @click="showModify">編輯</button>

<button class="btn btn-info" type="butten" @click="showPrivacySetting">隱私設定</button>
   <ul class="list-group list-group-flush" v-if="user">
  <li class="list-group-item" >User Name : {{ user.userName}}</li>
  <li class="list-group-item">Identity : {{ identityString}}</li>
  <li class="list-group-item">Nick Name : {{ user.nickName}}</li>
  <li class="list-group-item">Gender : {{ genderString}}</li>
  <li class="list-group-item">Birthday : {{ user.birthday}}</li>
  <li class="list-group-item">Email : {{ user.email}}</li>

</ul>
<div v-else>
    Loading user data...
</div>


</template>
    
<script setup>
    import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL


const router = useRouter();

const user = ref({

});
  
const fetchUserData = async () => {

  const response = await axios.get('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response.data.data

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
  if( user.value.gender===0){
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

const showPrivacySetting = ()=>{
  router.push({name:"PrivacySetting"})
}
</script>
    
<style>
  .user-photo-container {
    width: 8rem;
    height: 8rem;
    margin-top: 5px;
    border: 2px solid #000000;
    border-radius: 50%; /* 添加圆形边框 */
    overflow: hidden; /* 隐藏超出容器的部分 */
  }

  .user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>