<template>
          <div class="demo-input-size">
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="搜尋使用者"
      :prefix-icon="Search"
      @input="searchUsername"
    /> 
  </div>
  
  <div class="scrollable-container" ref="dataList" @scroll="handleScroll">
  <div v-if="followers">
  <ul class="list-group list-group-flush"   v-infinite-scroll="load"  :infinite-scroll-disabled="disabled">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      <div >
        <div class="user-photo-container2" style=" float:left">
          <a @click="goToOrderUser(follower.id)">
          <img :src="follower.photo"  alt="User Photo" class="user-photo mx-auto d-block" >
          </a>
        </div>
        <div>
          <div style="font-size: large;font-weight:bolder;padding-left: 100px;padding-top: 10px;">
           <a  @click="goToOrderUser(follower.id)"> {{ follower.username}}</a>

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

          
          <div style="font-size: smaller;font-weight:lighter;padding-left: 100px;">
            {{ follower.nickname}}
          </div>
          <!-- <div >
              <div v-if="!isRemove[follower.id] || follower.id==user.id">
                追蹤中
              </div>
              <div v-else>
                <button type="button" class="btn btn-info" @click="addFollower(follower.id)">追踪用戶</button>
              </div>
            </div> -->
            
            <!-- <button class="delete btn btn-danger" style="float:right;" @click="toggleRemoveMode(follower.id)">刪除</button> -->
           

            

          </div>
        </div>
    </li>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </ul>
  <!-- <div v-if="isLoading" class="loading-message">Loading...</div> -->
 
  </div>
  
  <div v-else>查無資料</div>
</div>
</template>
    
<script setup>
  import { ref,computed,nextTick,reactive,onMounted } from 'vue';
  import axios from 'axios';
  import {axiosPost,axiosGet,axiosPut,axiosDelete, swalSuccess} from '../global'
  import { useRouter } from 'vue-router';
 import { Search } from '@element-plus/icons-vue'
 const buttons = [
  { type: '', text: 'plain' },
] 

// const count = ref(10)
const loading = ref(false)
const noMore = computed(() => followers.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    // count.value += 2
    loading.value = false
  }, 1000)
}

 const input1 = ref('')

const followers = ref([]);
const isLoading = ref(true);
const error = ref('');
const router = useRouter();

const isRemove = ref([]);

const user = ref('')

let searchTimeout = null;

const dataList = ref(null);
const noMoreData = ref(false); 

const items = ref([]);
onMounted(() => {
  fetchUserData(); // 初始加載數據
});

const handleScroll =async () => {
  
  const list = dataList.value;
  if (list) {
    const threshold = 10;
    const isAtBottom =list.scrollTop + list.clientHeight + threshold >= list.scrollHeight;
    if (isAtBottom && !isLoading.value && list.scrollTop != 0) {



      try {
        const pageToLoad = items.value.pageNumber++
        console.log(pageToLoad);
    const response = await axiosGet('http://localhost:8080/user/findOtherUsersByUsername',{params: {userName: input1.value,page: pageToLoad+1, size: 6 }},{withCredentials:true});
    
    console.log(response.content);

    response.content.forEach((follower)=>{
      if(follower.photo==null){
        follower.photo ="/img/noImage.jpg"
        
      }else{
        follower.photo = atob(follower.photo)
      }
      // isRemove.value[follower.id] = true;
    })
  
    followers.value = [...followers.value,...response.content];
    
    console.log(followers.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
    }
  }
};


// const addFollowingUser = ref({
//   id:{  
        
//         following:''
//     },
//     isFav:0

// })
 
    const fetchUserData = async () => {
    const response = await axiosPost('http://localhost:8080/user/findAllUser',{},{params: {page:0, size:6 }},{withCredentials:true});
    console.log(response.content);
    followers.value = response.content;
    console.log(response.pageable);
    items.value = response.pageable
    // user.value = response;
    console.log(response.pageable.pageNumber);
    isLoading.value = false;
    followers.value.forEach((follower)=>{
      if(follower.photo==null){
        follower.photo ="/img/noImage.jpg"
        
      }else{
        follower.photo = atob(follower.photo)
      }
      user.value = follower
      // isRemove.value[follower.id] = true;
    })

    

   
}


const searchUsername = async()=>{ 
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
    // 清空已加载的数据和页码
    followers.value = [];
  items.value = { pageNumber: 0 };

  searchTimeout = setTimeout(async () => {
    const a = sessionStorage.getItem('userId')
 const response = await axiosGet('http://localhost:8080/user/findOtherUsersByUsername',{withCredentials:true, params:{userName:input1.value,page:0,size:6}})
console.log(response.content);
 followers.value = response.content;
    // user.value = response;
    
    isLoading.value = false;
    if(response!=null){
    followers.value.forEach((follower)=>{
      if(follower.photo==null){
        follower.photo ="/img/noImage.jpg"
        
      }else{
        follower.photo = atob(follower.photo)
      }
      user.value = follower
      // isRemove.value[follower.id] = false;
      })
    };

     // 将滚动位置重置到顶部
     nextTick(() => {
        const list = dataList.value;
        if (list) {
          list.scrollTop = 0;
        }
      });

      
  }, 1000); // 延遲一秒後執行查詢
}
 
const goToOrderUser = async(userId)=>{
 const response = await axiosPost('http://localhost:8080/user/findOtherUsersById/'+userId,{withCredentials:true})
 const userDetial = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});

console.log(response.id);
console.log(userDetial);
if(userDetial){

  if(response.id==userDetial.id){
    router.push({path:"/userDetial"})
  }else{
    router.push({path:"/otherUsers/"+userId})
  }
}else{
  router.push({path:"/otherUsers/"+userId})
}

}




</script>
    
<style>
    .scrollable-container {
  max-height: 500px; /* 設定最大高度，超過會顯示滾動條 */
  overflow-y: auto; /* 添加垂直滾動條 */
}
</style>