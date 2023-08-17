<template>
   <div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      <div >
        <div class="user-photo-container2" style=" float:left">
          <img :src="follower.photo"  alt="User Photo" class="user-photo mx-auto d-block" >
        </div>
        <div>
          <div style="font-size: large;font-weight:bolder;padding-left: 100px;padding-top: 10px;">
            {{ follower.userName}}
          </div>
          <div style="font-size: smaller;font-weight:lighter;padding-left: 100px;">
            {{ follower.nickName}}
          </div>
          <div >
              <div v-if="!isRemove[follower.id] || follower.id==user.id">
                追蹤中
              </div>
              <div v-else>
                <button type="button" class="btn btn-info" @click="addFollower(follower.id)">追踪用戶</button>
              </div>
            </div>
            
            <!-- <button class="delete btn btn-danger" style="float:right;" @click="toggleRemoveMode(follower.id)">刪除</button> -->
           
            <div class="flex justify-space-between mb-4 flex-wrap gap-4">

              <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-button 
                v-for="button in buttons"
                :key="button.text"
                :type="button.type"
                link
                ><i class='bx bx-dots-vertical-rounded bx-sm' ></i></el-button
              >
                <el-icon class="el-icon--right"><caret-bottom /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="clearfix">
                    <div  @click="toggleRemoveMode(follower.id)">刪除</div>
                   
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    replies
                    <el-badge class="mark" :value="3" />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>


              

  </div>

          </div>
        </div>
    </li>
  </ul>
  <div v-if="isLoading" class="loading-message">Loading...</div>
 
  </div>
</template>
    
<script setup >
  import { ref,computed,nextTick } from 'vue';
  import axios from 'axios';
  import {axiosPost,axiosGet,axiosPut,axiosDelete, swalSuccess} from '../global'
  import { useRouter } from 'vue-router';

  const buttons = [
  { type: '', text: 'plain' },
 
] 

const followers = ref([]);
const isLoading = ref(true);
const error = ref('');
const router = useRouter();

const isRemove = ref([]);

const user = ref('')

const addFollowingUser = ref({
  id:{  
        
        following:''
    },
    isFav:0

})



const fetchUserData = async () => {
    const response = await axiosGet('http://localhost:8080/user/follow',{withCredentials:true});
    followers.value = response;
    // user.value = response;
    
    isLoading.value = false;
    followers.value.forEach((follower)=>{
      if(follower.photo==null){
        follower.photo ="/img/noImage.jpg"
        
      }else{
        follower.photo = atob(follower.photo)
      }
      user.value = follower
      isRemove.value[follower.id] = false;
    })
}
fetchUserData()

const deleteUser = async(deleteId)=>{
  console.log(11111);
  const response = await axiosDelete('http://localhost:8080/user/deleteFollower/'+deleteId,{withCredentials:true})
  swalSuccess(response)
  // location.reload()
  // fetchUserData()
}

const toggleRemoveMode = async (followerId) => {
  console.log(followers.value.find(follower => follower.id === followerId).id);
  console.log(followerId);
  
  if (followers.value.find(follower => follower.id === followerId).id) {
    await deleteUser(followerId);
    isRemove.value[followerId] = !isRemove.value[followerId];
    // fetchUserData();
    } else {
   }
};



const addFollower = async(addFollowing)=>{
  isRemove.value[addFollowing] = !isRemove.value[addFollowing];
  
  console.log(addFollowing);
  addFollowingUser.value.id.following= addFollowing
  console.log(addFollowingUser.value.id.following);
  console.log(addFollowingUser.value);
  // await nextTick() 
await axiosPost('http://localhost:8080/user/insertFollower',addFollowingUser.value,{withCredentials:true})
}

// const changeFollowerBtn = (follower)=>{
//   if (follower.id) {
//     console.log(11111111);
//       // 如果 follower.id 不为空，表示正在追踪中，点击后取消追踪
//       follower.id = null;
//     } else {
//     console.log(22222222);

//       // 如果 follower.id 为空，表示未追踪，点击后追踪
//       // 在这里调用追踪 API 或执行其他相关逻辑
//       // 例如，可以调用 addFollower 方法来执行追踪操作
//       addFollower(follower);
//     }
//     console.log(33333333);
// }
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
    width: 4rem;
    height: 4rem;
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
  .flex{
    float:right
  }
</style>