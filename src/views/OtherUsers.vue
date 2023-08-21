<template>
    <h1>基本資料</h1>
    <div class="user-photo-container1">
      <img :src="decodedPhoto"  alt="User Photo" class="user-photo mx-auto d-block" >
      
    </div>
    <div>
      <div class="flex justify-space-between mb-4 flex-wrap gap-4">
               <el-dropdown trigger="click">
                 <span class="el-dropdown-link">
                   <el-button 
                   v-for="button in buttons"
                   :key="button.text"
                   :type="button.type"
                   link
                   ><i class='bx bx-dots-vertical-rounded bx-sm' ></i></el-button>
                   <el-icon class="el-icon--right"></el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item class="clearfix">
              <div v-if="!isRemove && user.id">
                <div  @click="toggleRemoveMode(user.id)">取消追蹤<i class='bx bx-x-circle '></i></div>
              </div>
              <div v-else >
                <div >取消追蹤<i class='bx bx-x-circle '></i></div>
                </div>
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
    <div >
              <div v-if="!isRemove && user.id">
                <el-button type="info" plain disabled>追蹤中</el-button>
              </div>
              <div v-else >
         
                 <el-button type="primary" plain @click="addFollower(user.id)">追蹤用戶</el-button>
              </div>
           

          
               </div>   
    <!-- <p >当前用户的 ID：{{ $route.params.userId }}</p> -->
    
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
<!--     
    <button class="btn btn-info m-3" type="butten" @click="showModify">編輯基本資料</button>
    <button class="btn btn-info" type="butten" @click="showPrivacySetting">更改密碼</button>
     -->
    </template>
        
    <script setup>
        import { ref ,computed} from 'vue';
        import axios from 'axios';
        import { useRouter } from 'vue-router';
        import {axiosPost,axiosGet,axiosDelete, swalSuccess} from '../global'

         import { Search,Delete } from '@element-plus/icons-vue'
        const buttons = [
  { type: '', text: 'plain' },
 
] 
    
    const URL = import.meta.env.VITE_API_JAVAURL
    
    const isRemove = ref([]);
    
    const router = useRouter();
    
    const user = ref({});

    const isFav = ref({});

  

    const photo = ref("")
    
    const userId = router.currentRoute.value.params.userId;

    console.log(userId);

    const addFollowingUser = ref({
  id:{  
        
        following:''
    },
    isFav:0

})
      
    const fetchUserData = async () => {

  

      const rep = await axiosGet('http://localhost:8080/user/findFollowingUsersByFollowing/'+userId,{withCredentials:true})
      isFav.value = rep
      console.log(isFav.value);

      const response = await axiosPost('http://localhost:8080/user/findOtherUsersById/'+userId,{withCredentials:true})
        user.value =response
        // console.log(user.value.photo);
          if(user.value.photo==null){
            photo.value ="/img/noImage.jpg"
          }else{
            photo.value = decodeURIComponent(atob(user.value.photo))
            // console.log(photo.value);
          }

          if(isFav.value==null){
            console.log(123);
            isRemove.value= true;
            
          }else{
            isRemove.value = false;
            
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
    
    const addFollower = async (userId)=>{
      addFollowingUser.value.id.following= userId
      const response = await axiosPost('http://localhost:8080/user/insertFollower',addFollowingUser.value,{withCredentials:true})

       swalSuccess(response)
      isRemove.value = false
    
      // router.push({ name: "UserModify"})
    }

    const deleteUser = async(deleteId)=>{
  console.log(11111);
  const response = await axiosDelete('http://localhost:8080/user/deleteFollower/'+deleteId,{withCredentials:true})
  swalSuccess(response)
  // location.reload()
  // fetchUserData()
}

    

    const toggleRemoveMode = async (followerId) => {
    console.log(followerId);
  
  if (user.value.id ==followerId) {
    await deleteUser(followerId);
    isRemove.value = !isRemove.value;
    // fetchUserData();
    } else {
   }
};
    
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