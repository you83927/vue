<template>
    <h2 class="m-3">通知</h2>
    <el-container>
      <el-aside width="200px">

        <el-scrollbar>
        <el-menu >
          <el-menu-item @click="showMain('detial')">資料</el-menu-item>
          <el-menu-item @click="showMain('follower')">我的跟隨</el-menu-item>
          <el-menu-item @click="showMain('article')">我的文章</el-menu-item>
          <el-menu-item @click="showMain('favorite')">我的最愛</el-menu-item>

         
         
        </el-menu>
      </el-scrollbar>
      </el-aside>

        <el-main>

            <div v-if="aaa=='detial'">
            <ul class="list-group list-group-flush" >
            
                <li v-for="update in updatedFields" :key="update">
                  <!-- {{ update }} -->
                  {{ update.email ? 'Email 已更新为 ' + update.email : '' }}
        {{ update.nickname ? 'Nickname 已更新为 ' + update.nickname : '' }}
    
                
                </li>
                    
            </ul>
            </div>

            <div v-if="aaa=='follower'">
                <div  class="scrollable-container" ref="dataList" @scroll="handleScroll"> 
   <div v-if="followers">
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="follower in followers" :key="follower.id">
      <div >
        <div class="user-photo-container2" style=" float:left">
          <a @click="goToOrderUser(follower.id)">
          <img :src="follower.photo"  alt="User Photo" class="user-photo mx-auto d-block" >
          </a>
        </div>
        <div >
          <div style="font-size: large;font-weight:bolder;padding-left: 100px;padding-top: 10px;">
           <a  @click="goToOrderUser(follower.id)"> {{ follower.username}}</a>

          </div>
          
          
          <div style="font-size: smaller;font-weight:lighter;padding-left: 100px;">
            {{ follower.nickname}}
          </div>
          <!-- <div style="margin-left: 100px;">
              <div v-if="!isRemove[follower.id] || follower.id==user.id" >
                <el-button type="info" plain disabled>追蹤中</el-button>
              </div>
              <div v-else>
                <el-button type="primary" plain @click="addFollower(follower.id)">追蹤用戶</el-button>
                <button type="button" class="btn btn-info" @click="addFollower(follower.id)">追踪用戶</button>
              </div>
            </div> -->

  

          </div>
        </div>
    </li>
  </ul>
  <!-- <div v-if="isLoading" class="loading-message">Loading...</div> -->
 
  </div>
  <div v-else>查無資料</div>
</div>
            </div>

            <div v-else-if="aaa=='article'">

<div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
  <div class="demo-input-size">

    <el-button type="primary" @click="changeType(0)">食譜</el-button>
  <el-button type="success" @click="changeType(1)">食記</el-button>


  </div>

  <div v-if="bbb==1">
  <div class="scrollable-container" ref="AdataList" @scroll="handleScroll(bbb)">
      <ul >
        <li v-for="article in articles" :key="article[0].id" style="list-style-type: none;">
          
          <div class="accordion m-3" :id="article[0].id">
            <div class="accordion-item" >
              
  <!-- <el-card class="box-card" :id="'heading-' + article[0].id" > -->


    <div class="card-header"  style="display: flex;">
          <div style="flex ;">
        <div class="m-3" >
          {{ article[0].createdDate }} 新增了一篇食記
        </div>
      </div>
      <div style="flex: 1;">
        <div class="d-flex align-items-center justify-content-between m-3">
          <a href="" style="font-size:xx-large"> 
            {{ article[0].title.length > 20? article[0].title.substring(0, 20) + `...` : article[0].title }}
          </a>
        </div>
      </div>
      <!-- <div style="flex ;" >
        <div  class="user-photo-container2">
          <a @click="goToOrderUser(article[1].id)">
            <img :src="article[1].photo" alt="" class="user-photo mx-auto d-block">
          </a>
        </div>
      </div>
       -->
      
      <!-- <div style="flex ;" class="m-3">
        <div   style="font-size:x-large">
          <a  @click="goToOrderUser(article[1].id)">
            {{article[1].username}}
          </a>
        </div>
        
        <div   style="font-size:smaller">
          {{article[1].nickname}}
        </div>
      </div> -->
      <div style="flex ;">
        <div class="m-3" >
          <a >
            {{ article[0].type ==1 ?"#食記":"#食譜"}}
          </a>
        </div>
      </div>
      
  
      
      
    </div>
    <!-- <div class="accordion-body" style="font-size:larger;">
      {{ article[0].context.length > 20? article[0].context.substring(0, 20) + `...` : article[0].context }}
    </div> -->
    
  <!-- </el-card> -->
  
</div>
</div>

</li>
</ul>



</div>
</div>


  <div v-else-if="bbb==0">
  <div class="scrollable-container" ref="AdataList" @scroll="handleScroll(bbb)">
      <ul >
        <li v-for="article in articles" :key="article[0].id" style="list-style-type: none;">
          
          <div class="accordion m-3" :id="article[0].id">
            <div class="accordion-item" >
              
  <!-- <el-card class="box-card" :id="'heading-' + article[0].id" > -->
    
    
    <div class="card-header"  style="display: flex;">
         
      <div style="flex ;">
        <div class="m-3" >
          {{ article[0].createdDate }} 新增了一篇食譜
        </div>
      </div>
      
      <div style="flex: 1;">
        <div class="d-flex align-items-center justify-content-between m-3">
          <a href="" style="font-size:xx-large"> 
            {{ article[0].title.length > 20? article[0].title.substring(0, 20) + `...` : article[0].title }}
   
          </a>
        </div>
      </div>
      <!-- <div style="flex ;" >
        <div  class="user-photo-container2">
          <a @click="goToOrderUser(article[1].id)">
            <img :src="article[1].photo" alt="" class="user-photo mx-auto d-block">
          </a>
        </div>
      </div> -->
      
      
      <!-- <div style="flex ;" class="m-3">
        <div   style="font-size:x-large">
          <a  @click="goToOrderUser(article[1].id)">
            {{article[1].username}}
          </a>
        </div>
        
        <div   style="font-size:smaller">
          {{article[1].nickname}}
        </div>
      </div> -->
      <div style="flex ;">
        <div class="m-3" >
          <a >
            {{ article[0].type ==1 ?"#食記":"#食譜"}}
          </a>
        </div>
      </div>
   
      
      
    </div>
    <!-- <div class="accordion-body" style="font-size:larger;">
      {{ article[0].context.length > 20? article[0].context.substring(0, 20) + `...` : article[0].context }}
    </div> -->
    
  <!-- </el-card> -->
  
</div>
</div>

</li>
</ul>



</div>
</div>
</div>



</div>

     
        </el-main>
    
    </el-container>
</template>
    
<script setup>
     import { ref, onMounted,computed ,nextTick} from 'vue';
     import { useStore,mapGetters } from 'vuex';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet,axiosPut,axiosDelete} from '../global'
    import {
  Search,
  Iphone,
  Delete,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'


    const store = useStore();
const updateHistory = store.getters.getUpdateHistory;
const isUpdateHistoryChanged = store.getters.isUpdateHistoryChanged;
const updatedFields = store.getters.getUpdateHistory;

if (isUpdateHistoryChanged) {
  
  // 如果更新历史有变化，执行展示更新历史的操作
  // 并且在展示完后调用 clearUpdateHistoryChanged 来重置标志
  store.dispatch('clearUpdateHistoryChanged');
}
      console.log(updateHistory);


const aaa = ref('detial')
    const bbb = ref(1)
    const x = ref('')

    const router = useRouter();
    
    const user = ref({});
    const photo = ref("")

    const articles = ref([]);
    const articleUser = ref('');
    const Rinput = ref('')
    const AdataList = ref(null);
    const articlesitems = ref([]);
    const isLoading = ref(true);
    let searchTimeout = null;


const addFollowingUser = ref({
  id:{  
        
        following:''
    },
    isFav:0

})


// const store = useStore;
// const getUpdatedInfo = () => {
//   return store.state.updatedInfo;
// };

    const showMain = (index)=>{
  aaa.value = index
  
  if(index=="article"){
    changeType(1)
  }
}

const fetchUserData = async () => {
  // const result =  store.dispatch('getInformation');
  // console.log(result);
// getInformation
    const a = sessionStorage.getItem('userId')
      
      console.log(a);
      const response1 = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});
      user.value =response1
    // console.log(user.value.photo);
      if(user.value.photo==null){
        photo.value ="/img/noImage.jpg"
      }else{
        photo.value = decodeURIComponent(atob(user.value.photo))
        console.log(photo.value);
      }


    // const response = await axiosGet('http://localhost:8080/user/follow',{withCredentials:true,params:{page:0,size:6}});
    // console.log(response);
    // followers.value = response.content;
    // items.value = response.pageable
    // // user.value = response;
    
    // isLoading.value = false;
    // followers.value.forEach((follower)=>{
    //   if(follower.photo==null){
    //     follower.photo ="/img/noImage.jpg"
        
    //   }else{
    //     follower.photo = atob(follower.photo)
    //   }
    //   user.value = follower
    //   isRemove.value[follower.id] = false;
    // })
}
fetchUserData()

const changeType = async (type)=>{
  const a = sessionStorage.getItem('userId')
  Rinput.value = ''; // 清空搜索字段
  articles.value = []; // 清空已加载的数据
  const  response1 = await axiosGet('http://localhost:8080/user/findArticlceByUserIdAsc',{withCredentials:true ,params:{userId:a,type:type,page:0,size:6}});
      console.log(response1);   
      isLoading.value = false;
      articles.value = response1.content;
      articlesitems.value = response1.pageable
      articles.value.forEach((article)=>{
        console.log(article[1].username);
      articleUser.value = article[1]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[1].photo==null){
        article[1].photo ="/img/noImage.jpg"
        
      }else{
        // article[1].photo ="/img/noImage.jpg"
        article[1].photo = atob(article[1].photo)
      }
    })
  bbb.value = type
}


const handleScroll =async (type) => {
  const a = sessionStorage.getItem('userId')
  // console.log(type);
  x.value = !type?(type==0?type:1):(type==0?type:1)
  // console.log(x.value);
  const list = AdataList.value;
if (list) {
  // console.log(list);
  const threshold = 10;
  const isAtBottom =list.scrollTop + list.clientHeight + threshold >= list.scrollHeight;
  // console.log(isAtBottom);
  // console.log(isLoading.value);
  if (isAtBottom && !isLoading.value) {
    isLoading.value = true; 
    try {
          const pageToLoad = articlesitems.value.pageNumber++
          console.log(pageToLoad);
          // console.log(a);
          // console.log(Rinput.value);
          console.log(x.value);
          const response = await axiosGet('http://localhost:8080/user/findArticlceByUserIdAsc',{withCredentials:true ,params:{userId:a,type:x.value,page:pageToLoad+1,size:6}});
          // const response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle',{withCredentials:true, params:{userId:a,title:Rinput.value,page: pageToLoad+1,size:3}})
          console.log(response);
          // articles.value = response.content;
       
          
    //       articles.value.forEach((article)=>{
    //         console.log(article);
    //     console.log(article[1].username);
    //   articleUser.value = article[1]
    //   // console.log(decodeURIComponent(atob(article[1].photo)));
    //   // console.log(article[1].photo);
    //   if(article[1].photo==null){
    //     article[1].photo ="/img/noImage.jpg"
        
    //   }
    //   else{
    //     // article[1].photo ="/img/noImage.jpg"
    //     // article[1].photo = atob(article[1].photo)
    //   }
    // })

    const newArticles = response.content.map(article => {
      articleUser.value = article[1]
          if (article[1].photo == null) {
            article[1].photo = "/img/noImage.jpg";
          } else {
            article[1].photo = atob(article[1].photo);
          }
          return article;
        });
        console.log(newArticles);
     articles.value = [...articles.value,...newArticles]; 
          console.log(articles.value);
          // articles.value = [];
          // articlesitems.value = { pageNumber: 0 };

      

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
    }
  }




};  


</script>
    
<style>
    
</style>