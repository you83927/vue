<template>
   <div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      <div>
        <div class="user-photo-container2">
          <img :src="follower.photo"  alt="User Photo" class="user-photo mx-auto d-block" >
        </div>
      <div>
        {{ follower.userName}}
      </div>
        {{ follower.nickName}}
      </div>
    </li>
  </ul>
  <div v-if="isLoading" class="loading-message">Loading...</div>
 
  </div>
</template>
    
<script setup >
  import { ref,computed} from 'vue';
  import axios from 'axios';
  import {axiosPost,axiosGet,axiosPut,axiosDelete} from '../global'


const followers = ref([]);
const isLoading = ref(true);
const error = ref('');
const photo = ref('')

const fetchUserData = async () => {
    const response = await axiosGet('http://localhost:8080/user/follow',{withCredentials:true});
    followers.value = response;
    isLoading.value = false;
    followers.value.forEach((follower)=>{
      if(follower.photo==null){
        follower.photo ="/img/noImage.jpg"
        
      }else{
        follower.photo = atob(follower.photo)
      }
        
    })
}
fetchUserData()

// const Photos = computed(() => {
//   return followers.value.map(follower => {
//     // console.log(follower.photo);
//     if (follower.photo && follower.photo !== null && follower.photo !=="/img/noImage.jpg") {
   
//      return follower.photo
//     } else {
//       return "/img/noImage.jpg";
//     }
//   });
// });
// const Photos = computed(() => {
//   console.log(followers.value.mpa);
//   if (followers.value.photo && followers.value.photo !== null) {
//     return decodeURIComponent(atob(followers.value.photo));
//   } else {
//     return "/img/noImage.jpg";
//   }
// });
</script>
    
<style>
  .user-photo-container2 {
    width: 5rem;
    height: 5rem;
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