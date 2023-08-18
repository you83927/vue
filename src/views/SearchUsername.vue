<template>
          <div class="demo-input-size">
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :prefix-icon="Search"
      @input="searchUsername"
    /> 
  </div>
  <div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      <div >
        <div class="user-photo-container2" style=" float:left">
          <a @click="goToOrderUser(follower.id)">
          <img :src="follower.photo"  alt="User Photo" class="user-photo mx-auto d-block" >
          </a>
        </div>
        <div>
          <div style="font-size: large;font-weight:bolder;padding-left: 100px;padding-top: 10px;">
           <a  @click="goToOrderUser(follower.id)"> {{ follower.userName}}</a>
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
                ><i class='bx bx-dots-vertical-rounded bx-sm' ></i></el-button>
                <el-icon class="el-icon--right"></el-icon>
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
  <!-- <div v-if="isLoading" class="loading-message">Loading...</div> -->
 
  </div>
</template>
    
<script setup>
  import { ref,computed,nextTick } from 'vue';
  import axios from 'axios';
  import {axiosPost,axiosGet,axiosPut,axiosDelete, swalSuccess} from '../global'
  import { useRouter } from 'vue-router';
 import { Search } from '@element-plus/icons-vue'

 const input1 = ref('')

const followers = ref([]);
const isLoading = ref(true);
const error = ref('');
const router = useRouter();

const isRemove = ref([]);

const user = ref('')
 
    const fetchUserData = async () => {
    const response = await axiosGet('http://localhost:8080/user/findAllUser',{withCredentials:true});
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

const searchUsername = async()=>{
 const response = await axiosGet('http://localhost:8080/user/findOtherUsersByUsername',{withCredentials:true, params:{userName:input1.value}})
console.log(response);
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
</script>
    
<style>
    
</style>