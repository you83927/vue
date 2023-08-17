<template>
<h1>基本資料</h1>
<div class="user-photo-container1">
  <img :src="decodedPhoto"  alt="User Photo" class="user-photo mx-auto d-block" >
 

</div>


   <ul class="list-group list-group-flush" v-if="user">
  <li class="list-group-item" >使用者 : {{ user.userName}}</li>
  <li class="list-group-item">身份 : {{ identityString}}</li>

  <li class="list-group-item" v-if="showNickName" >暱稱 : {{showNickName}}</li>
  <li class="list-group-item" v-else-if="showNickName==''" >暱稱 : {{showNickName}}</li>

  <li class="list-group-item" v-if="genderString=='男'">性別 : {{ genderString}}</li>
  <li class="list-group-item" v-else-if="genderString=='女'">性別 : {{ genderString}}</li>
  <li class="list-group-item" v-else-if="genderString==''">性別 : {{ genderString}}</li>



  <li class="list-group-item" v-if="showBirthday">生日 : {{ showBirthday}}</li>
  <li class="list-group-item" v-else-if="showBirthday==''">生日 : {{ showBirthday}}</li>


  <li class="list-group-item" v-if="showEmail">信箱 : {{ showEmail}}</li>
  <li class="list-group-item" v-else-if="showEmail==''">信箱 : {{ showEmail}}</li>

</ul>

<div v-else>
  Loading user data...
</div>

<button class="btn btn-info m-3" type="butten" @click="showModify">編輯基本資料</button>
<button class="btn btn-info" type="butten" @click="showPrivacySetting">更改密碼</button>

</template>
    
<script setup>
    import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet} from '../global'

const URL = import.meta.env.VITE_API_JAVAURL


const router = useRouter();

const user = ref({

});
const photo = ref("")

  
const fetchUserData = async () => {
  const response = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response
    console.log(user.value.photo);
      if(user.value.photo==null){
        photo.value ="/img/noImage.jpg"
      }else{
        photo.value = decodeURIComponent(atob(user.value.photo))
        console.log(photo.value);
      }
};
fetchUserData()


const genderString = computed(() => {
  if( user.value.gender===1){
    return "男"
  }
  if( user.value.gender===2){
    return "女"
  }
  if( user.value.gender==null || user.value.gender===0){
    return null
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

const showEmail = computed(()=>{

  if(user.value.email==null ||user.value.email==""){
    return null
}
  return user.value.email
})


const showNickName = computed(()=>{
if(user.value.nickName==null ||user.value.nickName==""){
  return null
}
return user.value.nickName
})

const showBirthday = computed(()=>{
if(user.value.birthday==null ||user.value.birthday=="0001-01-01"){
  return null
}
return user.value.birthday
})


const decodedPhoto = computed(() => {
  if (user.value.photo && user.value.photo !== null) {
    return decodeURIComponent(atob(user.value.photo));
  } else {
    return "/img/noImage.jpg";
  }
  // if(user.value.photo==null ){
  //   const noImage = "/img/noImage.jpg"
  //   return noImage
  // }

  // if (user.value.photo) {
  //   try {
  //     return decodeURIComponent(atob(user.value.photo));
  //   } catch (error) {
  //     console.error("Error decoding photo:", error);
  //     return null; // Return a default value or handle the error in your own way
  //   }
  // } else {
  //   return null; // Return a default value or handle the case where photo is not available
  // }
});

const showModify = ()=>{
  router.push({ name: "UserModify"})
}

const showPrivacySetting = ()=>{
  router.push({name:"PrivacySetting"})
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
  .user-photo-container1 {
    width: 8rem;
    height: 8rem;
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